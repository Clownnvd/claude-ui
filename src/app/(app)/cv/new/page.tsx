"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, FileText } from "lucide-react"
import type { CVTemplate } from "@/types/cv"

// ─── Template definitions ─────────────────────────────────────────────────────

interface TemplateOption {
  id: CVTemplate
  name: string
  description: string
  preview: React.ReactNode
}

function ClassicPreview() {
  return (
    <div className="w-full h-40 bg-white rounded border border-[#E2E8F0] overflow-hidden p-3 text-[5px] font-sans">
      {/* Name + contact row */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="w-16 h-2 bg-[#0F172A] rounded mb-1" />
          <div className="w-10 h-1.5 bg-[#64748B] rounded" />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="w-12 h-1 bg-[#94A3B8] rounded" />
          <div className="w-10 h-1 bg-[#94A3B8] rounded" />
          <div className="w-14 h-1 bg-[#94A3B8] rounded" />
        </div>
      </div>
      {/* Section */}
      <div className="mb-2">
        <div className="w-12 h-1.5 bg-[#1B4FD8] rounded mb-1" />
        <div className="border-b border-[#1B4FD8] mb-1" />
        <div className="w-full h-1 bg-[#E2E8F0] rounded mb-0.5" />
        <div className="w-4/5 h-1 bg-[#E2E8F0] rounded" />
      </div>
      {/* Experience section */}
      <div>
        <div className="w-12 h-1.5 bg-[#1B4FD8] rounded mb-1" />
        <div className="border-b border-[#1B4FD8] mb-1" />
        <div className="flex justify-between mb-0.5">
          <div className="w-12 h-1 bg-[#0F172A] rounded" />
          <div className="w-8 h-1 bg-[#94A3B8] rounded" />
        </div>
        <div className="w-10 h-1 bg-[#64748B] rounded mb-0.5" />
        <div className="flex gap-1 mt-0.5">
          <div className="w-1 h-1 bg-[#64748B] rounded-full mt-0.5 flex-shrink-0" />
          <div className="w-full h-1 bg-[#E2E8F0] rounded" />
        </div>
        <div className="flex gap-1 mt-0.5">
          <div className="w-1 h-1 bg-[#64748B] rounded-full mt-0.5 flex-shrink-0" />
          <div className="w-3/4 h-1 bg-[#E2E8F0] rounded" />
        </div>
      </div>
    </div>
  )
}

function ModernPreview() {
  return (
    <div className="w-full h-40 bg-white rounded border border-[#E2E8F0] overflow-hidden p-3 text-[5px] font-sans">
      {/* Blue left accent + name */}
      <div className="flex gap-2 mb-2">
        <div className="w-1 bg-[#1B4FD8] rounded-full flex-shrink-0" />
        <div>
          <div className="w-16 h-2 bg-[#0F172A] rounded mb-1" />
          <div className="w-10 h-1.5 bg-[#1B4FD8] rounded" />
        </div>
      </div>
      {/* Contact info inline */}
      <div className="flex gap-2 mb-2">
        <div className="w-10 h-1 bg-[#94A3B8] rounded" />
        <div className="w-10 h-1 bg-[#94A3B8] rounded" />
        <div className="w-10 h-1 bg-[#94A3B8] rounded" />
      </div>
      {/* Summary */}
      <div className="mb-2">
        <div className="w-8 h-1.5 bg-[#0F172A] rounded mb-1" />
        <div className="w-full h-1 bg-[#E2E8F0] rounded mb-0.5" />
        <div className="w-4/5 h-1 bg-[#E2E8F0] rounded" />
      </div>
      {/* Horizontal rule */}
      <div className="border-b border-[#E2E8F0] mb-2" />
      {/* Experience */}
      <div>
        <div className="w-14 h-1.5 bg-[#0F172A] rounded mb-1" />
        <div className="flex justify-between mb-0.5">
          <div className="w-12 h-1 bg-[#0F172A] rounded" />
          <div className="w-8 h-1 bg-[#94A3B8] rounded" />
        </div>
        <div className="w-10 h-1 bg-[#1B4FD8] rounded mb-0.5" />
        <div className="w-full h-1 bg-[#E2E8F0] rounded" />
      </div>
    </div>
  )
}

function CreativePreview() {
  return (
    <div className="w-full h-40 bg-white rounded border border-[#E2E8F0] overflow-hidden flex text-[5px] font-sans">
      {/* Blue sidebar */}
      <div className="w-2/5 bg-[#1B4FD8] p-2 flex flex-col gap-1.5">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-1" />
        {/* Name */}
        <div className="w-full h-1.5 bg-white rounded" />
        <div className="w-3/4 h-1 bg-white/70 rounded" />
        {/* Divider */}
        <div className="border-b border-white/30 my-0.5" />
        {/* Contact */}
        <div className="w-full h-1 bg-white/70 rounded" />
        <div className="w-4/5 h-1 bg-white/70 rounded" />
        <div className="w-full h-1 bg-white/70 rounded" />
        {/* Skills label */}
        <div className="border-b border-white/30 my-0.5" />
        <div className="w-8 h-1.5 bg-white rounded" />
        <div className="flex flex-wrap gap-0.5">
          <div className="w-6 h-1.5 bg-white/40 rounded-full" />
          <div className="w-8 h-1.5 bg-white/40 rounded-full" />
          <div className="w-5 h-1.5 bg-white/40 rounded-full" />
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 p-2">
        <div className="w-10 h-1.5 bg-[#1B4FD8] rounded mb-1" />
        <div className="w-full h-1 bg-[#E2E8F0] rounded mb-0.5" />
        <div className="w-4/5 h-1 bg-[#E2E8F0] rounded mb-2" />
        <div className="w-10 h-1.5 bg-[#1B4FD8] rounded mb-1" />
        <div className="flex justify-between mb-0.5">
          <div className="w-10 h-1 bg-[#0F172A] rounded" />
          <div className="w-7 h-1 bg-[#94A3B8] rounded" />
        </div>
        <div className="w-8 h-1 bg-[#64748B] rounded mb-0.5" />
        <div className="w-full h-1 bg-[#E2E8F0] rounded mb-0.5" />
        <div className="w-3/4 h-1 bg-[#E2E8F0] rounded" />
      </div>
    </div>
  )
}

const templates: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Truyền thống, chuyên nghiệp — phù hợp với mọi ngành nghề",
    preview: <ClassicPreview />,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Hiện đại, tối giản — nổi bật với thiết kế sạch sẽ",
    preview: <ModernPreview />,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Sáng tạo, nổi bật — sidebar màu ấn tượng",
    preview: <CreativePreview />,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewCVPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null)
  const [title, setTitle] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate() {
    if (!selectedTemplate) return
    setIsCreating(true)
    setError(null)

    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          title: title.trim() || "CV của tôi",
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || "Có lỗi xảy ra. Vui lòng thử lại.")
        return
      }

      const cv = await res.json()
      router.push(`/cv/${cv.id}`)
    } catch {
      setError("Không thể kết nối tới máy chủ. Vui lòng thử lại.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#EEF2FF] rounded-2xl mb-4">
            <FileText className="w-7 h-7 text-[#1B4FD8]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#0F172A] mb-2">
            Chọn mẫu CV của bạn
          </h1>
          <p className="text-[#64748B] text-sm">
            Bạn có thể đổi mẫu bất kỳ lúc nào trong khi chỉnh sửa
          </p>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {templates.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`relative text-left rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:ring-offset-2 ${
                  isSelected
                    ? "border-[#1B4FD8] bg-[#EEF2FF] shadow-md"
                    : "border-[#E2E8F0] bg-white hover:border-[#1B4FD8]/40 hover:shadow-sm"
                }`}
              >
                {/* Selected badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#1B4FD8] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                {/* Preview */}
                <div className="mb-4">{tmpl.preview}</div>

                {/* Info */}
                <h3
                  className={`font-semibold text-sm mb-1 ${
                    isSelected ? "text-[#1B4FD8]" : "text-[#0F172A]"
                  }`}
                >
                  {tmpl.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {tmpl.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* CV title input */}
        <div className="max-w-md mx-auto mb-8">
          <label
            htmlFor="cv-title"
            className="block text-sm font-medium text-[#0F172A] mb-2"
          >
            Tên CV của bạn
          </label>
          <input
            id="cv-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="VD: CV Fullstack Developer"
            className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
          <p className="text-xs text-[#94A3B8] mt-1.5">
            Để trống sẽ dùng tên mặc định &quot;CV của tôi&quot;
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCreate}
            disabled={!selectedTemplate || isCreating}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            {isCreating ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Đang tạo CV...
              </>
            ) : selectedTemplate ? (
              `Tạo CV với mẫu ${templates.find((t) => t.id === selectedTemplate)?.name}`
            ) : (
              "Chọn một mẫu để tiếp tục"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
