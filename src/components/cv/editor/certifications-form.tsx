"use client"

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Certification } from "@/types/cv"

interface CertificationsFormProps {
  data: Certification[]
  onChange: (data: Certification[]) => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function emptyCertification(): Certification {
  return {
    id: generateId(),
    name: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
  }
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  function updateItem(index: number, updated: Certification) {
    const next = [...data]
    next[index] = updated
    onChange(next)
  }

  function addItem() {
    onChange([...data, emptyCertification()])
  }

  function removeItem(index: number) {
    onChange(data.filter((_, i) => i !== index))
  }

  function moveUp(index: number) {
    if (index === 0) return
    const next = [...data]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    onChange(next)
  }

  function moveDown(index: number) {
    if (index === data.length - 1) return
    const next = [...data]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Chứng chỉ & Giải thưởng</h2>
        <p className="text-xs text-[#64748B]">Chứng chỉ chuyên môn, khóa học, giải thưởng nổi bật</p>
      </div>

      {data.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#FAFAF8]">
          <p className="text-sm text-[#64748B] mb-4">Chưa có chứng chỉ nào. Nhấn &apos;Thêm&apos; để bắt đầu.</p>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Thêm chứng chỉ
          </button>
        </div>
      )}

      {data.map((cert, index) => (
        <div
          key={cert.id}
          className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8] border-b border-[#E2E8F0]">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {cert.name || `Chứng chỉ ${index + 1}`}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                aria-label="Di chuyển lên"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === data.length - 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                aria-label="Di chuyển xuống"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Xóa chứng chỉ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                Tên chứng chỉ
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateItem(index, { ...cert, name: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>

            {/* Issuer + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                  Tổ chức cấp
                </label>
                <input
                  type="text"
                  value={cert.issuer ?? ""}
                  onChange={(e) => updateItem(index, { ...cert, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                  Ngày cấp
                </label>
                <input
                  type="month"
                  value={cert.issueDate ?? ""}
                  onChange={(e) => updateItem(index, { ...cert, issueDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                URL xác minh (tuỳ chọn)
              </label>
              <input
                type="url"
                value={cert.credentialUrl ?? ""}
                onChange={(e) => updateItem(index, { ...cert, credentialUrl: e.target.value })}
                placeholder="https://www.credly.com/badges/..."
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <button
          type="button"
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#E2E8F0] hover:border-[#1B4FD8]/50 hover:bg-[#EEF2FF]/30 text-[#64748B] hover:text-[#1B4FD8] text-sm font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Thêm chứng chỉ
        </button>
      )}
    </div>
  )
}
