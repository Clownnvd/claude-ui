"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { CVData, CVTemplate } from "@/types/cv"
import CVPreviewDefault from "@/components/cv/cv-preview"
import { ArrowLeft, Download, Loader2 } from "lucide-react"

export default function CVPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const cvId = params.id as string

  const [cvData, setCvData] = useState<CVData | null>(null)
  const [template, setTemplate] = useState<CVTemplate>("classic")
  const [title, setTitle] = useState("")
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/cv/${cvId}`)
      .then(r => r.json())
      .then(cv => {
        setCvData(cv.data)
        setTemplate(cv.template ?? "classic")
        setTitle(cv.title ?? "CV của tôi")
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [cvId])

  async function downloadPDF() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/export/${cvId}`)
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${title || "cv"}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      } else {
        // Fallback: open print dialog
        window.print()
      }
    } catch {
      window.print()
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#1B4FD8]" size={32} />
          <p className="text-sm text-[#64748B]">Đang tải CV...</p>
        </div>
      </div>
    )
  }

  if (!cvData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAF8]">
        <div className="text-center">
          <p className="text-[#0F172A] font-medium mb-3">Không thể tải CV</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-[#1B4FD8] hover:underline cursor-pointer"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Top toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E2E8F0] px-6 py-3 flex items-center justify-between print:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors duration-200 text-sm"
        >
          <ArrowLeft size={16} /> Quay lại chỉnh sửa
        </button>
        <h1 className="font-semibold text-[#0F172A] text-sm truncate max-w-xs">{title}</h1>
        <div className="flex items-center gap-2">
          <select
            value={template}
            onChange={e => setTemplate(e.target.value as CVTemplate)}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] bg-white text-[#0F172A]"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="creative">Creative</option>
          </select>
          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer min-h-[36px]"
          >
            {downloading ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Download size={14} />
            )}
            {downloading ? "Đang xuất..." : "Tải PDF"}
          </button>
        </div>
      </div>

      {/* CV preview */}
      <div
        className="max-w-[850px] mx-auto my-8 shadow-2xl rounded overflow-hidden print:shadow-none print:my-0 print:max-w-none"
        style={{ "--cv-scale": "1" } as React.CSSProperties}
      >
        <CVPreviewDefault cvData={cvData} template={template} />
      </div>
    </div>
  )
}
