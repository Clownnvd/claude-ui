"use client"
import type { Language, LanguageProficiency } from "@/types/cv"
import { Plus, Trash2 } from "lucide-react"

const proficiencyOptions: { value: LanguageProficiency; label: string }[] = [
  { value: "native", label: "Bản ngữ" },
  { value: "fluent", label: "Thông thạo (C2)" },
  { value: "advanced", label: "Nâng cao (C1)" },
  { value: "upper-intermediate", label: "Trên trung cấp (B2)" },
  { value: "intermediate", label: "Trung cấp (B1)" },
  { value: "elementary", label: "Sơ cấp (A2)" },
  { value: "beginner", label: "Bắt đầu (A1)" },
]

interface Props {
  data: Language[]
  onChange: (data: Language[]) => void
}

export function FormLanguages({ data, onChange }: Props) {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), name: "", proficiency: "intermediate" }])

  const remove = (id: string) => onChange(data.filter(l => l.id !== id))

  const update = (id: string, patch: Partial<Language>) =>
    onChange(data.map(l => l.id === id ? { ...l, ...patch } : l))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Ngôn ngữ</h2>
          <p className="text-sm text-[#64748B]">Các ngôn ngữ bạn sử dụng được</p>
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
          <p>Thêm ngôn ngữ bạn biết</p>
        </div>
      )}

      {data.map(lang => (
        <div key={lang.id} className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl p-4 bg-white">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Ngôn ngữ</label>
              <input
                type="text"
                value={lang.name}
                onChange={e => update(lang.id, { name: e.target.value })}
                placeholder="Tiếng Anh"
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Trình độ</label>
              <select
                value={lang.proficiency}
                onChange={e => update(lang.id, { proficiency: e.target.value as LanguageProficiency })}
                className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] bg-white cursor-pointer"
              >
                {proficiencyOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => remove(lang.id)}
            className="text-[#94A3B8] hover:text-red-500 cursor-pointer mt-5 transition-colors duration-200"
            aria-label="Xóa ngôn ngữ"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
