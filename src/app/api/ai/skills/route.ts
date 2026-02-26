import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callClaude, checkAILimit } from "@/lib/claude"

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { allowed, remaining } = await checkAILimit(session.user.id)
  if (!allowed) {
    return NextResponse.json({ error: "Đã hết lượt AI tháng này.", remaining: 0 }, { status: 429 })
  }

  const { role, industry, language = "vi" } = await req.json()
  if (!role) return NextResponse.json({ error: "Thiếu vị trí công việc" }, { status: 400 })

  const langInstruction = language === "vi"
    ? "Trả lời bằng tiếng Anh cho tên kỹ năng (tên công nghệ giữ nguyên tiếng Anh)."
    : "Return skill names in English."

  const system = `You are a career counselor specializing in the Vietnamese job market 2026.
${langInstruction}
Suggest relevant, in-demand skills for the given role.
Return ONLY a JSON object with skill categories, no explanation:
{
  "Technical": ["skill1", "skill2", ...],
  "Tools": ["tool1", ...],
  "Soft Skills": ["skill1", ...]
}
Each category should have 4-6 skills.`

  const prompt = `Role: ${role}
Industry: ${industry || "Technology"}
Vietnam job market 2026

Suggest 15 most relevant and in-demand skills, grouped by category:`

  const { text } = await callClaude(prompt, system, session.user.id)

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const skillGroups = jsonMatch ? JSON.parse(jsonMatch[0]) : {}
    return NextResponse.json({ skillGroups, remaining: remaining - 1 })
  } catch {
    return NextResponse.json({ error: "Không thể phân tích kết quả AI" }, { status: 500 })
  }
}
