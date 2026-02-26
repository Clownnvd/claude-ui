import Anthropic from "@anthropic-ai/sdk"
import { db } from "@/lib/db"

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const MODEL = "claude-sonnet-4-6"

export async function callClaude(
  prompt: string,
  systemPrompt: string,
  userId: string
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""
  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  // Track usage
  await db.user.update({
    where: { id: userId },
    data: { aiUsageThisMonth: { increment: 1 } },
  })

  return { text, inputTokens, outputTokens }
}

export async function checkAILimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, aiUsageThisMonth: true, aiUsageResetAt: true },
  })
  if (!user) return { allowed: false, remaining: 0 }

  // Pro users: unlimited
  if (user.plan === "PRO") return { allowed: true, remaining: Infinity }

  // Check monthly reset (lazy reset)
  const now = new Date()
  const resetAt = new Date(user.aiUsageResetAt)
  const needsReset = now.getMonth() !== resetAt.getMonth() || now.getFullYear() !== resetAt.getFullYear()

  if (needsReset) {
    await db.user.update({
      where: { id: userId },
      data: { aiUsageThisMonth: 0, aiUsageResetAt: now },
    })
    return { allowed: true, remaining: 3 }
  }

  const FREE_LIMIT = 3
  const remaining = FREE_LIMIT - user.aiUsageThisMonth
  return { allowed: remaining > 0, remaining }
}
