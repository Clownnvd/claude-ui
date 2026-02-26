"use client"

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Education } from "@/types/cv"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function emptyEducation(): Education {
  return {
    id: generateId(),
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
  }
}

const degreeOptions = [
  { value: "", label: "Chọn bằng cấp..." },
  { value: "Trung cấp", label: "Trung cấp" },
  { value: "Cao đẳng", label: "Cao đẳng" },
  { value: "Đại học", label: "Đại học" },
  { value: "Thạc sĩ", label: "Thạc sĩ" },
  { value: "Tiến sĩ", label: "Tiến sĩ" },
  { value: "Chứng chỉ", label: "Chứng chỉ / Khóa học" },
]

export default function EducationForm({ data, onChange }: EducationFormProps) {
  function updateItem(index: number, updated: Education) {
    const next = [...data]
    next[index] = updated
    onChange(next)
  }

  function addItem() {
    onChange([...data, emptyEducation()])
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
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Học vấn</h2>
        <p className="text-xs text-[#64748B]">Thêm trình độ học vấn theo thứ tự mới nhất trước</p>
      </div>

      {data.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#FAFAF8]">
          <p className="text-sm text-[#64748B] mb-4">Chưa có học vấn nào. Nhấn &apos;Thêm&apos; để bắt đầu.</p>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Thêm học vấn
          </button>
        </div>
      )}

      {data.map((edu, index) => (
        <div
          key={edu.id}
          className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8] border-b border-[#E2E8F0]">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {edu.institution || edu.degree
                ? `${edu.degree || "(Bằng cấp)"} · ${edu.institution || "(Trường)"}`
                : `Học vấn ${index + 1}`}
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
                aria-label="Xóa học vấn"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Institution + Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Trường học</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateItem(index, { ...edu, institution: e.target.value })}
                  placeholder="Đại học Bách Khoa Hà Nội"
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Bằng cấp</label>
                <select
                  value={edu.degree}
                  onChange={(e) => updateItem(index, { ...edu, degree: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
                >
                  {degreeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field of study */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Chuyên ngành</label>
              <input
                type="text"
                value={edu.fieldOfStudy ?? ""}
                onChange={(e) => updateItem(index, { ...edu, fieldOfStudy: e.target.value })}
                placeholder="Công nghệ Thông tin"
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Năm bắt đầu</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateItem(index, { ...edu, startDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Năm kết thúc</label>
                <input
                  type="month"
                  value={edu.isCurrent ? "" : (edu.endDate ?? "")}
                  onChange={(e) => updateItem(index, { ...edu, endDate: e.target.value })}
                  disabled={edu.isCurrent}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white disabled:bg-[#F8FAFC] disabled:text-[#94A3B8]"
                />
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={edu.isCurrent ?? false}
                    onChange={(e) =>
                      updateItem(index, {
                        ...edu,
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? undefined : edu.endDate,
                      })
                    }
                    className="w-3.5 h-3.5 accent-[#1B4FD8] cursor-pointer"
                  />
                  <span className="text-xs text-[#64748B]">Đang học</span>
                </label>
              </div>
            </div>

            {/* GPA */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">GPA / Xếp loại (tuỳ chọn)</label>
              <input
                type="text"
                value={edu.grade ?? ""}
                onChange={(e) => updateItem(index, { ...edu, grade: e.target.value })}
                placeholder="3.8 / 4.0 hoặc Giỏi"
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
          Thêm học vấn
        </button>
      )}
    </div>
  )
}
