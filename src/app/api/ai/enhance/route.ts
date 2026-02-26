import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callClaude, checkAILimit } from "@/lib/claude"

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { allowed, remaining } = await checkAILimit(session.user.id)
  if (!allowed) {
    return NextResponse.json(
      { error: "Đã hết lượt AI tháng này. Nâng cấp Pro để dùng không giới hạn.", remaining: 0 },
      { status: 429 }
    )
  }

  const { bullets, role, language = "vi" } = await req.json()
  if (!bullets?.length) {
    return NextResponse.json({ error: "Thiếu nội dung cần cải thiện" }, { status: 400 })
  }

  const langInstruction = language === "vi"
    ? "Viết bằng tiếng Việt chuyên nghiệp."
    : "Write in professional English."

  const system = `You are an expert CV writer specializing in the Vietnamese job market.
${langInstruction}
Rewrite the provided bullet points to be more impactful, specific, and ATS-friendly.
Use action verbs and include quantifiable metrics where possible.
Return ONLY the improved bullet points, one per line, starting with •
Do not add explanations or commentary.`

  const prompt = `Role/Position: ${role || "Software Engineer"}

Original bullet points:
${bullets.map((b: string, i: number) => `${i + 1}. ${b}`).join("\n")}

Rewrite these to be more impactful and professional:`

  const { text } = await callClaude(prompt, system, session.user.id)

  const improvedBullets = text
    .split("\n")
    .map((line: string) => line.replace(/^[•\-\*\d\.]\s*/, "").trim())
    .filter((line: string) => line.length > 0)

  return NextResponse.json({ bullets: improvedBullets, remaining: remaining - 1 })
}
