import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"

// ─── Shared helper ────────────────────────────────────────────────────────────

async function getAuthorizedCV(id: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "Unauthorized", status: 401, cv: null, session: null }

  const cv = await db.cV.findUnique({ where: { id } })
  if (!cv) return { error: "CV không tìm thấy", status: 404, cv: null, session }
  if (cv.userId !== session.user.id) return { error: "Không có quyền truy cập", status: 403, cv: null, session }

  return { error: null, status: 200, cv, session }
}

// ─── GET /api/cv/[id] ─────────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { error, status, cv } = await getAuthorizedCV(id)

  if (error || !cv) {
    return NextResponse.json({ error }, { status })
  }

  return NextResponse.json(cv)
}

// ─── PUT /api/cv/[id] ─────────────────────────────────────────────────────────

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { error, status, cv } = await getAuthorizedCV(id)

  if (error || !cv) {
    return NextResponse.json({ error }, { status })
  }

  const body = await req.json()

  // Merge data with existing CV data (deep merge for the data field)
  const existingData = (cv.data as Record<string, unknown>) ?? {}
  const incomingData = (body.data as Record<string, unknown>) ?? {}

  const mergedData = Object.keys(incomingData).length > 0
    ? { ...existingData, ...incomingData }
    : existingData

  const updated = await db.cV.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.template !== undefined && { template: body.template }),
      ...(body.language !== undefined && { language: body.language }),
      ...(Object.keys(incomingData).length > 0 && { data: mergedData }),
    },
  })

  return NextResponse.json(updated)
}

// ─── DELETE /api/cv/[id] ──────────────────────────────────────────────────────

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { error, status } = await getAuthorizedCV(id)

  if (error) {
    return NextResponse.json({ error }, { status })
  }

  await db.cV.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
