import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callClaude, checkAILimit } from "@/lib/claude"
import { CVData } from "@/types/cv"

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { allowed, remaining } = await checkAILimit(session.user.id)
  if (!allowed) {
    return NextResponse.json({ error: "Đã hết lượt AI tháng này.", remaining: 0 }, { status: 429 })
  }

  const { cvData, from, to } = await req.json() as { cvData: CVData; from: string; to: string }

  const system = `You are a professional CV translator specializing in Vietnamese ↔ English translation.
Translate the CV content from ${from === "vi" ? "Vietnamese" : "English"} to ${to === "vi" ? "Vietnamese" : "English"}.
Keep technical terms, company names, and proper nouns as-is.
Maintain professional tone and CV-appropriate language.
Return ONLY the translated JSON with the same structure, no explanation.`

  const prompt = `Translate this CV data from ${from} to ${to}:

${JSON.stringify(cvData, null, 2)}

Return only the translated JSON object with identical structure.`

  const { text } = await callClaude(prompt, system, session.user.id)

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const translated = jsonMatch ? JSON.parse(jsonMatch[0]) : cvData
    return NextResponse.json({ cvData: translated, remaining: remaining - 1 })
  } catch {
    return NextResponse.json({ error: "Không thể dịch CV" }, { status: 500 })
  }
}
