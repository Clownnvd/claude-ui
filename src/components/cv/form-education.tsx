"use client"
import { useState } from "react"
import type { Education } from "@/types/cv"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface Props {
  data: Education[]
  onChange: (data: Education[]) => void
}

function newEdu(): Education {
  return { id: crypto.randomUUID(), institution: "", degree: "", startDate: "" }
}

export function FormEducation({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id ?? null)

  const add = () => {
    const e = newEdu()
    onChange([...data, e])
    setExpanded(e.id)
  }

  const remove = (id: string) => onChange(data.filter(e => e.id !== id))

  const update = (id: string, patch: Partial<Education>) =>
    onChange(data.map(e => e.id === id ? { ...e, ...patch } : e))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Học vấn</h2>
          <p className="text-sm text-[#64748B]">Bằng cấp và trường học</p>
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
          <p>Chưa có thông tin học vấn. Nhấn &quot;Thêm&quot; để bắt đầu.</p>
        </div>
      )}

      {data.map((edu) => (
        <div key={edu.id} className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
          >
            <div>
              <p className="font-medium text-[#0F172A]">{edu.institution || "Trường học mới"}</p>
              <p className="text-sm text-[#64748B]">{edu.degree || "Bằng cấp"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(edu.id) }}
                className="text-[#94A3B8] hover:text-red-500 cursor-pointer p-1 transition-colors duration-200"
                aria-label="Xóa học vấn"
              >
                <Trash2 size={14} />
              </button>
              {expanded === edu.id ? <ChevronUp size={16} className="text-[#64748B]" /> : <ChevronDown size={16} className="text-[#64748B]" />}
            </div>
          </div>

          {expanded === edu.id && (
            <div className="px-4 pb-4 border-t border-[#E2E8F0] pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Tên trường <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={e => update(edu.id, { institution: e.target.value })}
                    placeholder="Đại học Bách Khoa Hà Nội"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Bằng cấp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={e => update(edu.id, { degree: e.target.value })}
                    placeholder="Kỹ sư Công nghệ thông tin"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Chuyên ngành</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={e => update(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="Khoa học máy tính"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">GPA / Xếp loại</label>
                  <input
                    type="text"
                    value={edu.grade || ""}
                    onChange={e => update(edu.id, { grade: e.target.value })}
                    placeholder="3.8/4.0 hoặc Giỏi"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Từ (MM/YYYY)</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={e => update(edu.id, { startDate: e.target.value })}
                    placeholder="09/2019"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Đến (MM/YYYY)</label>
                  <input
                    type="text"
                    value={edu.endDate || ""}
                    onChange={e => update(edu.id, { endDate: e.target.value })}
                    placeholder="06/2023"
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
