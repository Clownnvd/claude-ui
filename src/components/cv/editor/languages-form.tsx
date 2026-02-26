"use client"

import { Plus, Trash2 } from "lucide-react"
import type { Language, LanguageProficiency } from "@/types/cv"

interface LanguagesFormProps {
  data: Language[]
  onChange: (data: Language[]) => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function emptyLanguage(): Language {
  return {
    id: generateId(),
    name: "",
    proficiency: "intermediate",
  }
}

interface ProficiencyOption {
  value: LanguageProficiency
  label: string
}

const proficiencyOptions: ProficiencyOption[] = [
  { value: "beginner", label: "Sơ cấp (A1)" },
  { value: "elementary", label: "Cơ bản (A2)" },
  { value: "intermediate", label: "Trung cấp (B1)" },
  { value: "upper-intermediate", label: "Khá (B2)" },
  { value: "advanced", label: "Giỏi (C1)" },
  { value: "fluent", label: "Thành thạo (C2)" },
  { value: "native", label: "Bản ngữ" },
]

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  function updateItem(index: number, updated: Language) {
    const next = [...data]
    next[index] = updated
    onChange(next)
  }

  function addItem() {
    onChange([...data, emptyLanguage()])
  }

  function removeItem(index: number) {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Ngôn ngữ</h2>
        <p className="text-xs text-[#64748B]">Các ngôn ngữ bạn có thể sử dụng</p>
      </div>

      {data.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#FAFAF8]">
          <p className="text-sm text-[#64748B] mb-4">Chưa có ngôn ngữ nào. Nhấn &apos;Thêm&apos; để bắt đầu.</p>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Thêm ngôn ngữ
          </button>
        </div>
      )}

      <div className="space-y-3">
        {data.map((lang, index) => (
          <div
            key={lang.id}
            className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4"
          >
            {/* Language name */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                Ngôn ngữ
              </label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateItem(index, { ...lang, name: e.target.value })}
                placeholder="Tiếng Anh, Tiếng Việt, 日本語..."
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>

            {/* Proficiency level */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                Trình độ
              </label>
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  updateItem(index, {
                    ...lang,
                    proficiency: e.target.value as LanguageProficiency,
                  })
                }
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
              >
                {proficiencyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Delete */}
            <div className="flex-shrink-0 self-end pb-0.5">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Xóa ngôn ngữ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#E2E8F0] hover:border-[#1B4FD8]/50 hover:bg-[#EEF2FF]/30 text-[#64748B] hover:text-[#1B4FD8] text-sm font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Thêm ngôn ngữ
        </button>
      )}
    </div>
  )
}
