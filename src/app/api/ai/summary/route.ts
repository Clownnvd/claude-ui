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

  const { name, headline, experience, education, skills, language = "vi" } = await req.json()

  const langInstruction = language === "vi"
    ? "Viết bằng tiếng Việt chuyên nghiệp, súc tích."
    : "Write in professional English, concise."

  const system = `You are an expert CV writer. ${langInstruction}
Write a compelling professional summary (3-4 sentences) for a CV.
Focus on: key skills, years of experience, industry expertise, and career goals.
Return ONLY the summary paragraph, no headers or extra text.`

  const expSummary = experience?.slice(0, 2).map((e: { jobTitle: string; company: string }) => `${e.jobTitle} tại ${e.company}`).join(", ") || ""
  const skillList = skills?.slice(0, 5).join(", ") || ""

  const prompt = `Name: ${name || "Ứng viên"}
Current role: ${headline || "Chuyên viên"}
Recent experience: ${expSummary || "Kinh nghiệm làm việc"}
Education: ${education || "Cử nhân"}
Top skills: ${skillList || "Kỹ năng chuyên môn"}

Write a professional summary for this person:`

  const { text } = await callClaude(prompt, system, session.user.id)

  return NextResponse.json({ summary: text.trim(), remaining: remaining - 1 })
}
