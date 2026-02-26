import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const cvs = await db.cV.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      template: true,
      language: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  return NextResponse.json(cvs)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Free plan: max 1 CV
  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (user?.plan === "FREE") {
    const count = await db.cV.count({ where: { userId: session.user.id } })
    if (count >= 1) {
      return NextResponse.json(
        { error: "Nâng cấp Pro để tạo thêm CV" },
        { status: 403 }
      )
    }
  }

  const body = await req.json()

  const cv = await db.cV.create({
    data: {
      userId: session.user.id,
      title: body.title || "CV của tôi",
      template: body.template || "classic",
      language: body.language || "vi",
      data: {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
        },
        experience: [],
        education: [],
        skillGroups: [],
        languages: [],
        certifications: [],
      },
    },
  })

  return NextResponse.json(cv, { status: 201 })
}
