"use client"

import { Check, User, Briefcase, GraduationCap, Wrench, Languages, Award } from "lucide-react"
import type { EditorStep } from "@/types/cv"

// ─── String-based step navigation (named export) ─────────────────────────────

const STRING_STEPS: { id: EditorStep; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Thông tin cá nhân", icon: User },
  { id: "experience", label: "Kinh nghiệm làm việc", icon: Briefcase },
  { id: "education", label: "Học vấn", icon: GraduationCap },
  { id: "skills", label: "Kỹ năng", icon: Wrench },
  { id: "languages", label: "Ngôn ngữ", icon: Languages },
  { id: "certifications", label: "Chứng chỉ", icon: Award },
]

interface EditorStepsNamedProps {
  current: EditorStep
  onChange: (step: EditorStep) => void
  completedSteps?: Set<EditorStep>
}

export function EditorSteps({ current, onChange, completedSteps = new Set() }: EditorStepsNamedProps) {
  return (
    <nav className="w-full" aria-label="Các bước chỉnh sửa CV">
      <ul className="space-y-1">
        {STRING_STEPS.map((step, index) => {
          const Icon = step.icon
          const isActive = current === step.id
          const isCompleted = completedSteps.has(step.id) && !isActive
          const isLast = index === STRING_STEPS.length - 1

          return (
            <li key={step.id} className="relative">
              {!isLast && (
                <div
                  className={`absolute left-[19px] top-[44px] w-0.5 h-5 transition-colors duration-200 ${
                    isCompleted ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                  }`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => onChange(step.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200 cursor-pointer min-h-[44px] ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#1B4FD8]"
                    : "hover:bg-gray-50 text-[#64748B] hover:text-[#0F172A]"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isCompleted
                      ? "bg-[#10B981] text-white"
                      : isActive
                      ? "bg-[#1B4FD8] text-white"
                      : "bg-[#F1F5F9] text-[#94A3B8]"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-sm font-medium leading-tight truncate ${
                    isActive ? "text-[#1B4FD8]" : isCompleted ? "text-[#0F172A]" : "text-[#64748B]"
                  }`}
                >
                  {step.label}
                </span>
                {isCompleted && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Number-based step navigation (default export, used by existing editor page)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Step definitions ─────────────────────────────────────────────────────────

export interface Step {
  id: number
  label: string
  sublabel: string
  icon: React.ElementType
}

export const STEPS: Step[] = [
  { id: 0, label: "Thông tin cá nhân", sublabel: "Họ tên, email, điện thoại", icon: User },
  { id: 1, label: "Kinh nghiệm", sublabel: "Lịch sử làm việc", icon: Briefcase },
  { id: 2, label: "Học vấn", sublabel: "Trường, bằng cấp", icon: GraduationCap },
  { id: 3, label: "Kỹ năng", sublabel: "Nhóm kỹ năng", icon: Wrench },
  { id: 4, label: "Ngôn ngữ", sublabel: "Ngoại ngữ & trình độ", icon: Languages },
  { id: 5, label: "Chứng chỉ", sublabel: "Bằng cấp & chứng nhận", icon: Award },
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditorStepsProps {
  activeStep: number
  onStepChange: (step: number) => void
  completedSteps: Set<number>
}

// ─── Component ────────────────────────────────────────────────────────────────

function EditorStepsNumeric({
  activeStep,
  onStepChange,
  completedSteps,
}: EditorStepsProps) {
  return (
    <nav className="w-full" aria-label="Các bước chỉnh sửa CV">
      <ul className="space-y-1">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          const isActive = activeStep === step.id
          const isCompleted = completedSteps.has(step.id)
          const isLast = index === STEPS.length - 1

          return (
            <li key={step.id} className="relative">
              {/* Connecting line between steps */}
              {!isLast && (
                <div
                  className={`absolute left-[19px] top-[44px] w-0.5 h-5 transition-colors duration-200 ${
                    isCompleted ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                  }`}
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                onClick={() => onStepChange(step.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200 cursor-pointer min-h-[44px] ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#1B4FD8]"
                    : "hover:bg-gray-50 text-[#64748B] hover:text-[#0F172A]"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Step indicator circle */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isCompleted
                      ? "bg-[#10B981] text-white"
                      : isActive
                      ? "bg-[#1B4FD8] text-white"
                      : "bg-[#F1F5F9] text-[#94A3B8]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Labels */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-tight truncate ${
                      isActive ? "text-[#1B4FD8]" : isCompleted ? "text-[#0F172A]" : "text-[#64748B]"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-tight truncate mt-0.5">
                    {step.sublabel}
                  </p>
                </div>

                {/* Completed dot */}
                {isCompleted && !isActive && (
                  <div className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default EditorStepsNumeric
