"use client"
import { CVTemplate } from "@/types/cv"

interface Props {
  value: CVTemplate
  onChange: (t: CVTemplate) => void
  disabled?: boolean
  plan?: "FREE" | "PRO"
}

const templates: {
  id: CVTemplate
  name: string
  desc: string
  proOnly: boolean
  color: string
}[] = [
  {
    id: "classic",
    name: "Co dien",
    desc: "Truyen thong, phu hop moi nganh",
    proOnly: false,
    color: "#1B4FD8",
  },
  {
    id: "modern",
    name: "Hien dai",
    desc: "Toi gian, phong cach tre",
    proOnly: true,
    color: "#0EA5E9",
  },
  {
    id: "creative",
    name: "Sang tao",
    desc: "Noi bat, cho nganh creative",
    proOnly: true,
    color: "#7C3AED",
  },
]

export function TemplatePicker({
  value,
  onChange,
  disabled = false,
  plan = "FREE",
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((t) => {
        const isLocked = t.proOnly && plan === "FREE"
        const isSelected = value === t.id
        return (
          <button
            key={t.id}
            onClick={() => !isLocked && !disabled && onChange(t.id)}
            disabled={disabled || isLocked}
            className={`relative cursor-pointer rounded-lg border-2 p-3 text-left transition-all duration-200 ${
              isSelected
                ? "border-[#1B4FD8] bg-blue-50"
                : "border-[#E2E8F0] bg-white hover:border-[#1B4FD8]/50"
            } ${isLocked || disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {/* Preview swatch */}
            <div
              className="h-16 rounded mb-2 flex items-end p-2"
              style={{ backgroundColor: t.color + "15" }}
            >
              <div
                className="h-1 rounded w-1/2"
                style={{ backgroundColor: t.color }}
              />
            </div>
            <p className="text-xs font-semibold text-[#0F172A]">{t.name}</p>
            <p className="text-xs text-[#64748B]">{t.desc}</p>
            {isLocked && (
              <span className="absolute top-1 right-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                PRO
              </span>
            )}
            {isSelected && !isLocked && (
              <span className="absolute top-1 right-1 text-xs bg-blue-100 text-[#1B4FD8] px-1.5 py-0.5 rounded">
                ok
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
