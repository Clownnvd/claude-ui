"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Download,
  Check,
  AlertCircle,
} from "lucide-react"

import EditorSteps, { STEPS } from "@/components/cv/editor-steps"
import CVPreview from "@/components/cv/cv-preview"
import PersonalForm from "@/components/cv/editor/personal-form"
import ExperienceForm from "@/components/cv/editor/experience-form"
import EducationForm from "@/components/cv/editor/education-form"
import SkillsForm from "@/components/cv/editor/skills-form"
import LanguagesForm from "@/components/cv/editor/languages-form"
import CertificationsForm from "@/components/cv/editor/certifications-form"
import { AIPanel } from "@/components/cv/ai-panel"

import type { CVData, CVTemplate, PersonalInfo, Experience, Education, SkillGroup, Language, Certification } from "@/types/cv"

// ─── Default empty CV data ────────────────────────────────────────────────────

const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    headline: "",
    linkedIn: "",
    website: "",
  },
  experience: [],
  education: [],
  skillGroups: [],
  languages: [],
  certifications: [],
}

// ─── Completion heuristics ────────────────────────────────────────────────────

function getCompletedSteps(data: CVData): Set<number> {
  const completed = new Set<number>()
  if (data.personalInfo.fullName && data.personalInfo.email) completed.add(0)
  if ((data.experience?.length ?? 0) > 0) completed.add(1)
  if ((data.education?.length ?? 0) > 0) completed.add(2)
  if ((data.skillGroups?.length ?? 0) > 0) completed.add(3)
  if ((data.languages?.length ?? 0) > 0) completed.add(4)
  if ((data.certifications?.length ?? 0) > 0) completed.add(5)
  return completed
}

// ─── Save status ──────────────────────────────────────────────────────────────

type SaveStatus = "idle" | "saving" | "saved" | "error"

function formatTime(date: Date): string {
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CVEditorPage() {
  const params = useParams()
  const router = useRouter()
  const cvId = params.id as string

  // ── State ──────────────────────────────────────────────────────────────────
  const [cvData, setCvData] = useState<CVData>(defaultCVData)
  const [cvTitle, setCvTitle] = useState("CV của tôi")
  const [template, setTemplate] = useState<CVTemplate>("classic")
  const [activeStep, setActiveStep] = useState(0)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isTitleEditing, setIsTitleEditing] = useState(false)

  // debounce timer ref
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // track latest data to avoid stale closures in save fn
  const cvDataRef = useRef(cvData)
  const cvTitleRef = useRef(cvTitle)

  useEffect(() => { cvDataRef.current = cvData }, [cvData])
  useEffect(() => { cvTitleRef.current = cvTitle }, [cvTitle])

  // ── Fetch initial data ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!cvId) return
    setIsLoading(true)

    fetch(`/api/cv/${cvId}`)
      .then(async (res) => {
        if (!res.ok) {
          const json = await res.json().catch(() => ({}))
          throw new Error(json.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((cv) => {
        setCvTitle(cv.title ?? "CV của tôi")
        setTemplate(cv.template ?? "classic")
        // Merge fetched data on top of defaults to avoid undefined fields
        setCvData({ ...defaultCVData, ...(cv.data ?? {}) })
        setIsLoading(false)
      })
      .catch((err) => {
        setLoadError(err.message || "Không thể tải CV. Vui lòng thử lại.")
        setIsLoading(false)
      })
  }, [cvId])

  // ── Save function ──────────────────────────────────────────────────────────
  const save = useCallback(
    async (data: CVData, title: string) => {
      setSaveStatus("saving")
      try {
        const res = await fetch(`/api/cv/${cvId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, data }),
        })
        if (!res.ok) throw new Error("Save failed")
        setLastSaved(new Date())
        setSaveStatus("saved")
        // reset back to idle after 2s
        setTimeout(() => setSaveStatus((s) => (s === "saved" ? "idle" : s)), 2000)
      } catch {
        setSaveStatus("error")
      }
    },
    [cvId]
  )

  // ── Auto-save: debounced 1s after any cvData or cvTitle change ─────────────
  useEffect(() => {
    if (isLoading) return // don't auto-save while loading initial data

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      save(cvDataRef.current, cvTitleRef.current)
    }, 1000)

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData, cvTitle, isLoading])

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handlePersonalChange(personal: PersonalInfo) {
    setCvData((prev) => ({ ...prev, personalInfo: personal }))
  }
  function handleExperienceChange(experience: Experience[]) {
    setCvData((prev) => ({ ...prev, experience }))
  }
  function handleEducationChange(education: Education[]) {
    setCvData((prev) => ({ ...prev, education }))
  }
  function handleSkillGroupsChange(skillGroups: SkillGroup[]) {
    setCvData((prev) => ({ ...prev, skillGroups }))
  }
  function handleLanguagesChange(languages: Language[]) {
    setCvData((prev) => ({ ...prev, languages }))
  }
  function handleCertificationsChange(certifications: Certification[]) {
    setCvData((prev) => ({ ...prev, certifications }))
  }

  function handleManualSave() {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    save(cvData, cvTitle)
  }

  // ── Loading + error states ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-[#1B4FD8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-[#64748B]">Đang tải CV...</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center px-6">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-sm text-[#0F172A] font-medium">{loadError}</p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-sm text-[#1B4FD8] hover:underline cursor-pointer"
          >
            ← Quay về Dashboard
          </button>
        </div>
      </div>
    )
  }

  const completedSteps = getCompletedSteps(cvData)

  // ── Render active form ─────────────────────────────────────────────────────
  function renderActiveForm() {
    switch (activeStep) {
      case 0:
        return <PersonalForm data={cvData.personalInfo} onChange={handlePersonalChange} />
      case 1:
        return <ExperienceForm data={cvData.experience ?? []} onChange={handleExperienceChange} />
      case 2:
        return <EducationForm data={cvData.education ?? []} onChange={handleEducationChange} />
      case 3:
        return <SkillsForm data={cvData.skillGroups ?? []} onChange={handleSkillGroupsChange} />
      case 4:
        return <LanguagesForm data={cvData.languages ?? []} onChange={handleLanguagesChange} />
      case 5:
        return <CertificationsForm data={cvData.certifications ?? []} onChange={handleCertificationsChange} />
      default:
        return null
    }
  }

  // ── Layout ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAF8]">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center gap-3 z-10">
        {/* Back to dashboard */}
        <a
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors duration-200 cursor-pointer min-h-[44px] px-2 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </a>

        <div className="w-px h-6 bg-[#E2E8F0] flex-shrink-0" />

        {/* CV Title — inline editable */}
        <div className="flex-1 min-w-0">
          {isTitleEditing ? (
            <input
              type="text"
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              onBlur={() => setIsTitleEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setIsTitleEditing(false)
              }}
              autoFocus
              className="text-sm font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#1B4FD8] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] w-full max-w-xs"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsTitleEditing(true)}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#1B4FD8] transition-colors duration-200 cursor-pointer truncate max-w-xs px-1 py-1 rounded hover:bg-[#EEF2FF]"
              title="Nhấn để đổi tên CV"
            >
              {cvTitle}
            </button>
          )}
        </div>

        {/* Save status */}
        <div className="flex-shrink-0 flex items-center gap-1 text-xs">
          {saveStatus === "saving" && (
            <span className="text-[#64748B] flex items-center gap-1.5">
              <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang lưu...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="text-[#10B981] flex items-center gap-1">
              <Check className="w-3 h-3" />
              Đã lưu
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Lỗi lưu
            </span>
          )}
          {saveStatus === "idle" && lastSaved && (
            <span className="text-[#94A3B8]">Đã lưu lúc {formatTime(lastSaved)}</span>
          )}
        </div>

        {/* Manual Save button */}
        <button
          type="button"
          onClick={handleManualSave}
          disabled={saveStatus === "saving"}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer min-h-[36px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-3.5 h-3.5" />
          Lưu
        </button>

        {/* Download PDF — navigate to preview/export page */}
        <button
          type="button"
          onClick={() => router.push(`/cv/${cvId}/preview`)}
          className="flex-shrink-0 flex items-center gap-1.5 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer min-h-[36px]"
        >
          <Download className="w-3.5 h-3.5" />
          Xem & Tải PDF
        </button>
      </header>

      {/* ── Main content: split pane ──────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ─ Left pane: Editor ─────────────────────────────────────────────── */}
        <div className="w-1/2 flex flex-col border-r border-[#E2E8F0] overflow-hidden">
          {/* Steps sidebar + form area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Steps navigation */}
            <div className="w-52 flex-shrink-0 border-r border-[#E2E8F0] bg-white overflow-y-auto py-4 px-3">
              <EditorSteps
                activeStep={activeStep}
                onStepChange={setActiveStep}
                completedSteps={completedSteps}
              />

              {/* Progress summary */}
              <div className="mt-6 px-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#64748B]">Hoàn thành</span>
                  <span className="text-xs font-semibold text-[#1B4FD8]">
                    {completedSteps.size}/{STEPS.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B4FD8] rounded-full transition-all duration-500"
                    style={{ width: `${(completedSteps.size / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* AI panel */}
              <div className="mt-6">
                <AIPanel
                  cvData={cvData}
                  onUpdate={(patch) => setCvData(prev => ({ ...prev, ...patch }))}
                  plan="FREE"
                  aiUsageRemaining={3}
                />
              </div>
            </div>

            {/* Form area */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderActiveForm()}

              {/* Step navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 min-h-[44px]"
                >
                  ← Bước trước
                </button>
                {activeStep < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => Math.min(STEPS.length - 1, s + 1))}
                    className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#1B4FD8] hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer px-4 py-2 rounded-lg min-h-[44px]"
                  >
                    Bước tiếp theo →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#10B981] hover:bg-[#059669] transition-colors duration-200 cursor-pointer px-4 py-2 rounded-lg min-h-[44px]"
                    title="Sắp ra mắt"
                  >
                    <Download className="w-4 h-4" />
                    Hoàn thành & Tải PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─ Right pane: Preview ───────────────────────────────────────────── */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          {/* Preview toolbar */}
          <div className="flex-shrink-0 bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between">
            <p className="text-xs font-medium text-[#64748B]">Xem trước CV</p>
            {/* Template switcher */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] rounded-lg p-0.5">
              {(["classic", "modern", "creative"] as CVTemplate[]).map((tmpl) => (
                <button
                  key={tmpl}
                  type="button"
                  onClick={async () => {
                    setTemplate(tmpl)
                    // Persist template change
                    await fetch(`/api/cv/${cvId}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ template: tmpl }),
                    })
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer capitalize ${
                    template === tmpl
                      ? "bg-white text-[#1B4FD8] shadow-sm"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {tmpl === "classic" ? "Classic" : tmpl === "modern" ? "Modern" : "Creative"}
                </button>
              ))}
            </div>
          </div>

          {/* Preview content — sets the CSS variable for scale */}
          <div
            className="flex-1 overflow-hidden"
            style={{ "--cv-scale": "0.62" } as React.CSSProperties}
          >
            <CVPreview cvData={cvData} template={template} />
          </div>
        </div>
      </div>
    </div>
  )
}
