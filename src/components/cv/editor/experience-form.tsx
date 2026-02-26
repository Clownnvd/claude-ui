"use client"

import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles } from "lucide-react"
import type { Experience } from "@/types/cv"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function emptyExperience(): Experience {
  return {
    id: generateId(),
    company: "",
    jobTitle: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    bullets: [""],
  }
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  function updateItem(index: number, updated: Experience) {
    const next = [...data]
    next[index] = updated
    onChange(next)
  }

  function addItem() {
    onChange([...data, emptyExperience()])
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

  function addBullet(expIndex: number) {
    const exp = data[expIndex]
    updateItem(expIndex, { ...exp, bullets: [...exp.bullets, ""] })
  }

  function updateBullet(expIndex: number, bulletIndex: number, value: string) {
    const exp = data[expIndex]
    const bullets = [...exp.bullets]
    bullets[bulletIndex] = value
    updateItem(expIndex, { ...exp, bullets })
  }

  function removeBullet(expIndex: number, bulletIndex: number) {
    const exp = data[expIndex]
    const bullets = exp.bullets.filter((_, i) => i !== bulletIndex)
    updateItem(expIndex, { ...exp, bullets: bullets.length ? bullets : [""] })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Kinh nghiệm làm việc</h2>
        <p className="text-xs text-[#64748B]">Thêm các vị trí đã làm theo thứ tự mới nhất trước</p>
      </div>

      {data.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#FAFAF8]">
          <p className="text-sm text-[#64748B] mb-4">Chưa có kinh nghiệm nào. Nhấn &apos;Thêm&apos; để bắt đầu.</p>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Thêm kinh nghiệm
          </button>
        </div>
      )}

      {data.map((exp, expIndex) => (
        <div
          key={exp.id}
          className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden"
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8] border-b border-[#E2E8F0]">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {exp.jobTitle || exp.company
                ? `${exp.jobTitle || "(Chức vụ)"} · ${exp.company || "(Công ty)"}`
                : `Kinh nghiệm ${expIndex + 1}`}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => moveUp(expIndex)}
                disabled={expIndex === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                aria-label="Di chuyển lên"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(expIndex)}
                disabled={expIndex === data.length - 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                aria-label="Di chuyển xuống"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(expIndex)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Xóa kinh nghiệm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4 space-y-4">
            {/* Company + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Công ty</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateItem(expIndex, { ...exp, company: e.target.value })}
                  placeholder="Google, VNG, ..."
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Vị trí</label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => updateItem(expIndex, { ...exp, jobTitle: e.target.value })}
                  placeholder="Senior Fullstack Developer"
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Từ tháng/năm</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateItem(expIndex, { ...exp, startDate: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Đến tháng/năm</label>
                <input
                  type="month"
                  value={exp.isCurrent ? "" : (exp.endDate ?? "")}
                  onChange={(e) => updateItem(expIndex, { ...exp, endDate: e.target.value })}
                  disabled={exp.isCurrent}
                  placeholder={exp.isCurrent ? "Hiện tại" : ""}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white disabled:bg-[#F8FAFC] disabled:text-[#94A3B8]"
                />
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent ?? false}
                    onChange={(e) =>
                      updateItem(expIndex, {
                        ...exp,
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? undefined : exp.endDate,
                      })
                    }
                    className="w-3.5 h-3.5 accent-[#1B4FD8] cursor-pointer"
                  />
                  <span className="text-xs text-[#64748B]">Hiện tại (đang làm)</span>
                </label>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Địa điểm (tuỳ chọn)</label>
              <input
                type="text"
                value={exp.location ?? ""}
                onChange={(e) => updateItem(expIndex, { ...exp, location: e.target.value })}
                placeholder="Hà Nội / Remote"
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>

            {/* Bullets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-[#0F172A]">
                  Thành tích / Mô tả
                </label>
              </div>
              <div className="space-y-2">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#64748B] flex-shrink-0" />
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBullet(expIndex, bIdx, e.target.value)}
                      placeholder="Mô tả thành tích, trách nhiệm..."
                      className="flex-1 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                    />
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        className="w-8 h-10 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-[#EEF2FF] hover:text-[#1B4FD8] transition-colors duration-200 cursor-pointer"
                        title="AI cải thiện (sắp ra mắt)"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBullet(expIndex, bIdx)}
                        disabled={exp.bullets.length === 1}
                        className="w-8 h-10 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                        aria-label="Xóa dòng"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addBullet(expIndex)}
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#1B4FD8] hover:text-[#1440A8] hover:bg-[#EEF2FF] px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Thêm dòng
              </button>
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
          Thêm kinh nghiệm
        </button>
      )}
    </div>
  )
}
