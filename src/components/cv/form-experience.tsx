"use client"
import { useState } from "react"
import type { Experience } from "@/types/cv"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface Props {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

function newExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    jobTitle: "",
    company: "",
    startDate: "",
    bullets: [""],
    isCurrent: false,
  }
}

export function FormExperience({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id ?? null)

  const add = () => {
    const exp = newExperience()
    onChange([...data, exp])
    setExpanded(exp.id)
  }

  const remove = (id: string) => onChange(data.filter(e => e.id !== id))

  const update = (id: string, patch: Partial<Experience>) => {
    onChange(data.map(e => e.id === id ? { ...e, ...patch } : e))
  }

  const addBullet = (id: string) => {
    const exp = data.find(e => e.id === id)!
    update(id, { bullets: [...exp.bullets, ""] })
  }

  const updateBullet = (id: string, idx: number, val: string) => {
    const exp = data.find(e => e.id === id)!
    const bullets = [...exp.bullets]
    bullets[idx] = val
    update(id, { bullets })
  }

  const removeBullet = (id: string, idx: number) => {
    const exp = data.find(e => e.id === id)!
    update(id, { bullets: exp.bullets.filter((_, i) => i !== idx) })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Kinh nghiệm làm việc</h2>
          <p className="text-sm text-[#64748B]">Thêm các vị trí đã làm, mới nhất trước</p>
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer min-h-[36px]"
        >
          <Plus size={14} /> Thêm
        </button>
      </div>

      {data.length === 0 && (
        <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 text-center text-[#64748B]">
          <p>Chưa có kinh nghiệm nào. Nhấn &quot;Thêm&quot; để bắt đầu.</p>
        </div>
      )}

      {data.map((exp) => (
        <div key={exp.id} className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
          >
            <div>
              <p className="font-medium text-[#0F172A]">{exp.jobTitle || "Vị trí mới"}</p>
              <p className="text-sm text-[#64748B]">{exp.company || "Công ty"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(exp.id) }}
                className="text-[#94A3B8] hover:text-red-500 cursor-pointer p-1 transition-colors duration-200"
                aria-label="Xóa kinh nghiệm"
              >
                <Trash2 size={14} />
              </button>
              {expanded === exp.id ? <ChevronUp size={16} className="text-[#64748B]" /> : <ChevronDown size={16} className="text-[#64748B]" />}
            </div>
          </div>

          {expanded === exp.id && (
            <div className="px-4 pb-4 border-t border-[#E2E8F0] pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Chức danh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={e => update(exp.id, { jobTitle: e.target.value })}
                    placeholder="Frontend Developer"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Công ty <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={e => update(exp.id, { company: e.target.value })}
                    placeholder="Tên công ty"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Địa điểm</label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={e => update(exp.id, { location: e.target.value })}
                    placeholder="Hà Nội / Remote"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center gap-2 cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent || false}
                      onChange={e => update(exp.id, { isCurrent: e.target.checked, endDate: e.target.checked ? undefined : exp.endDate })}
                      className="w-3.5 h-3.5 accent-[#1B4FD8] cursor-pointer"
                    />
                    <span className="text-xs text-[#64748B]">Đang làm việc tại đây</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Từ (MM/YYYY)</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={e => update(exp.id, { startDate: e.target.value })}
                    placeholder="01/2022"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                {!exp.isCurrent && (
                  <div>
                    <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Đến (MM/YYYY)</label>
                    <input
                      type="text"
                      value={exp.endDate || ""}
                      onChange={e => update(exp.id, { endDate: e.target.value })}
                      placeholder="12/2024"
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-2">Mô tả công việc / Thành tích</label>
                <div className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <textarea
                        value={b}
                        onChange={e => updateBullet(exp.id, i, e.target.value)}
                        placeholder={`Bullet ${i + 1}: mô tả thành tích với số liệu cụ thể`}
                        rows={2}
                        className="flex-1 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet(exp.id, i)}
                        className="text-[#94A3B8] hover:text-red-500 cursor-pointer mt-1 transition-colors duration-200"
                        aria-label="Xóa bullet"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBullet(exp.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#1B4FD8] hover:text-[#1440A8] hover:bg-[#EEF2FF] px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <Plus size={12} /> Thêm bullet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
