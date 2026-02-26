"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, FileText, Edit, Trash2, Loader2 } from "lucide-react"

interface CVSummary {
  id: string
  title: string
  template: "classic" | "modern" | "creative"
  language: string
  updatedAt: string
}

const templateColors: Record<string, string> = {
  classic: "bg-[#F1F5F9] text-[#475569]",
  modern: "bg-[#EEF2FF] text-[#1B4FD8]",
  creative: "bg-[#FDF4FF] text-[#7C3AED]",
}

const templateLabels: Record<string, string> = {
  classic: "Cổ điển",
  modern: "Hiện đại",
  creative: "Sáng tạo",
}

function CVCard({ cv, onDelete }: { cv: CVSummary; onDelete: (id: string) => void }) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm("Bạn có chắc muốn xoá CV này không?")) return
    setDeleting(true)
    await fetch(`/api/cv/${cv.id}`, { method: "DELETE" })
    onDelete(cv.id)
  }

  const updatedDate = new Date(cv.updatedAt).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  })

  return (
    <div
      onClick={() => router.push(`/cv/${cv.id}`)}
      className="group bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-4"
    >
      {/* CV preview thumbnail */}
      <div className="h-32 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
        <FileText className="w-8 h-8 text-[#CBD5E1]" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-[#0F172A] truncate">{cv.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${templateColors[cv.template] || "bg-gray-100 text-gray-600"}`}>
            {templateLabels[cv.template] || cv.template}
          </span>
          <span className="text-xs text-[#64748B]">Cập nhật {updatedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/cv/${cv.id}`) }}
          className="flex items-center gap-1.5 text-sm text-[#1B4FD8] hover:text-[#1440A8] font-medium cursor-pointer transition-colors"
        >
          <Edit className="w-3.5 h-3.5" /> Chỉnh sửa
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 cursor-pointer transition-colors disabled:opacity-50"
        >
          {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          Xoá
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [cvs, setCvs] = useState<CVSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/cv")
      .then(r => {
        if (!r.ok) throw new Error("Không thể tải danh sách CV")
        return r.json()
      })
      .then(data => {
        setCvs(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function handleDelete(id: string) {
    setCvs(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAF8]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">CV của tôi</h1>
              <p className="text-[#64748B] mt-1">Quản lý và chỉnh sửa các CV của bạn</p>
            </div>
            <button
              onClick={() => router.push("/cv/new")}
              className="flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tạo CV mới
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-[#1B4FD8]" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && cvs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <FileText className="w-10 h-10 text-[#1B4FD8]" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#0F172A]">Chưa có CV nào</h2>
                <p className="text-[#64748B] mt-2">Tạo CV đầu tiên của bạn ngay hôm nay</p>
              </div>
              <button
                onClick={() => router.push("/cv/new")}
                className="flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tạo CV đầu tiên
              </button>
            </div>
          )}

          {/* CV grid */}
          {!loading && cvs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cvs.map(cv => (
                <CVCard key={cv.id} cv={cv} onDelete={handleDelete} />
              ))}
              {/* Add new CV card */}
              <button
                onClick={() => router.push("/cv/new")}
                className="bg-white rounded-xl border-2 border-dashed border-[#E2E8F0] p-5 flex flex-col items-center justify-center gap-3 text-[#64748B] hover:border-[#1B4FD8] hover:text-[#1B4FD8] transition-colors duration-200 cursor-pointer min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                  <Plus className="w-6 h-6 text-[#1B4FD8]" />
                </div>
                <span className="font-medium text-sm">Tạo CV mới</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
