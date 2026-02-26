"use client"
import { useState } from "react"
import { CVData } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, ChevronDown, ChevronUp, Wand2, BookOpen, Globe, Brain } from "lucide-react"

interface AIPanelProps {
  cvData: CVData
  onUpdate: (patch: Partial<CVData>) => void
  plan: "FREE" | "PRO"
  aiUsageRemaining: number
}

type AIAction = "enhance" | "summary" | "skills" | "translate"

export function AIPanel({ cvData, onUpdate, plan, aiUsageRemaining }: AIPanelProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<AIAction | null>(null)
  const [message, setMessage] = useState("")

  const isLimited = plan === "FREE" && aiUsageRemaining <= 0

  async function runAI(action: AIAction) {
    if (isLimited) {
      setMessage("Đã hết lượt AI. Nâng cấp Pro để dùng không giới hạn.")
      return
    }
    setLoading(action)
    setMessage("")

    try {
      let res: Response
      const lang = "vi"

      if (action === "enhance") {
        const allBullets = (cvData.experience || []).flatMap(e => e.bullets).filter(Boolean)
        if (!allBullets.length) { setMessage("Chưa có bullet point nào để cải thiện."); setLoading(null); return }
        res = await fetch("/api/ai/enhance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bullets: allBullets, role: cvData.personalInfo.headline, language: lang }),
        })
        const data = await res.json()
        if (!res.ok) { setMessage(data.error || "Lỗi"); setLoading(null); return }
        // Redistribute improved bullets back to experiences
        let bulletIdx = 0
        const updatedExperience = (cvData.experience || []).map(exp => {
          const count = exp.bullets.filter(Boolean).length
          const improved = data.bullets.slice(bulletIdx, bulletIdx + count)
          bulletIdx += count
          return { ...exp, bullets: improved.length ? improved : exp.bullets }
        })
        onUpdate({ experience: updatedExperience })
        setMessage(`✓ Đã cải thiện ${data.bullets.length} bullet points`)

      } else if (action === "summary") {
        res = await fetch("/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cvData.personalInfo.fullName,
            headline: cvData.personalInfo.headline,
            experience: cvData.experience?.slice(0, 3),
            skills: (cvData.skillGroups || []).flatMap(g => g.skills.map(s => s.name)).slice(0, 5),
            language: lang,
          }),
        })
        const data = await res.json()
        if (!res.ok) { setMessage(data.error || "Lỗi"); setLoading(null); return }
        onUpdate({ personalInfo: { ...cvData.personalInfo, summary: data.summary } })
        setMessage("✓ Đã tạo phần giới thiệu")

      } else if (action === "skills") {
        res = await fetch("/api/ai/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: cvData.personalInfo.headline || "Software Engineer", language: lang }),
        })
        const data = await res.json()
        if (!res.ok) { setMessage(data.error || "Lỗi"); setLoading(null); return }
        const newGroups = Object.entries(data.skillGroups).map(([category, skills]) => ({
          id: crypto.randomUUID(),
          category,
          skills: (skills as string[]).map(s => ({ id: crypto.randomUUID(), name: s })),
        }))
        onUpdate({ skillGroups: [...(cvData.skillGroups || []), ...newGroups] })
        setMessage(`✓ Đã gợi ý ${Object.values(data.skillGroups).flat().length} kỹ năng`)

      } else if (action === "translate") {
        const targetLang = "en"
        res = await fetch("/api/ai/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvData, from: lang, to: targetLang }),
        })
        const data = await res.json()
        if (!res.ok) { setMessage(data.error || "Lỗi"); setLoading(null); return }
        onUpdate(data.cvData)
        setMessage("✓ Đã dịch CV sang tiếng Anh")
      }
    } catch {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.")
    }

    setLoading(null)
  }

  const actions = [
    { id: "enhance" as AIAction, label: "Cải thiện bullet points", desc: "Viết lại các bullet point chuyên nghiệp hơn", icon: Wand2, color: "text-purple-600" },
    { id: "summary" as AIAction, label: "Tạo phần giới thiệu", desc: "Tự động tạo professional summary", icon: BookOpen, color: "text-blue-600" },
    { id: "skills" as AIAction, label: "Gợi ý kỹ năng", desc: "Gợi ý kỹ năng phù hợp với vị trí", icon: Brain, color: "text-green-600" },
    { id: "translate" as AIAction, label: "Dịch sang tiếng Anh", desc: "Dịch toàn bộ CV VI → EN", icon: Globe, color: "text-orange-600" },
  ]

  return (
    <div className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#1B4FD8]" size={16} />
          <span className="font-medium text-[#0F172A] text-sm">AI Hỗ trợ</span>
          {plan === "FREE" && (
            <span className="text-xs bg-blue-50 text-[#1B4FD8] px-2 py-0.5 rounded-full border border-blue-200">
              {aiUsageRemaining}/3 lượt
            </span>
          )}
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="border-t border-[#E2E8F0] p-4 space-y-3">
          {isLimited && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              Đã dùng hết 3 lượt AI miễn phí tháng này.{" "}
              <a href="/billing" className="underline font-medium cursor-pointer">Nâng cấp Pro</a> để dùng không giới hạn.
            </div>
          )}

          {actions.map(action => (
            <button
              key={action.id}
              onClick={() => runAI(action.id)}
              disabled={!!loading || isLimited}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-left"
            >
              {loading === action.id ? (
                <Loader2 className="animate-spin text-[#1B4FD8] shrink-0" size={16} />
              ) : (
                <action.icon className={`${action.color} shrink-0`} size={16} />
              )}
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{action.label}</p>
                <p className="text-xs text-[#64748B]">{action.desc}</p>
              </div>
            </button>
          ))}

          {message && (
            <p className={`text-xs px-2 py-1 rounded ${message.startsWith("✓") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
