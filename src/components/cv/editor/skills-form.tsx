"use client"

import { useState, KeyboardEvent } from "react"
import { Plus, Trash2, X, Sparkles, ChevronUp, ChevronDown } from "lucide-react"
import type { SkillGroup, Skill } from "@/types/cv"

interface SkillsFormProps {
  data: SkillGroup[]
  onChange: (data: SkillGroup[]) => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function emptyGroup(): SkillGroup {
  return {
    id: generateId(),
    category: "",
    skills: [],
  }
}

function emptySkill(name: string): Skill {
  return { id: generateId(), name }
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  // per-group input state for tag entry
  const [inputs, setInputs] = useState<Record<string, string>>({})

  function updateGroup(index: number, updated: SkillGroup) {
    const next = [...data]
    next[index] = updated
    onChange(next)
  }

  function addGroup() {
    const newGroup = emptyGroup()
    onChange([...data, newGroup])
    setInputs((prev) => ({ ...prev, [newGroup.id]: "" }))
  }

  function removeGroup(index: number) {
    const removed = data[index]
    onChange(data.filter((_, i) => i !== index))
    setInputs((prev) => {
      const next = { ...prev }
      delete next[removed.id]
      return next
    })
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

  function addSkill(groupIndex: number, name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    const group = data[groupIndex]
    // avoid duplicates
    if (group.skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) return
    updateGroup(groupIndex, {
      ...group,
      skills: [...group.skills, emptySkill(trimmed)],
    })
    setInputs((prev) => ({ ...prev, [group.id]: "" }))
  }

  function removeSkill(groupIndex: number, skillId: string) {
    const group = data[groupIndex]
    updateGroup(groupIndex, {
      ...group,
      skills: group.skills.filter((s) => s.id !== skillId),
    })
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    groupIndex: number
  ) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const group = data[groupIndex]
      addSkill(groupIndex, inputs[group.id] ?? "")
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Kỹ năng</h2>
        <p className="text-xs text-[#64748B]">Nhóm kỹ năng theo danh mục — nhập tên kỹ năng rồi nhấn Enter</p>
      </div>

      {data.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#FAFAF8]">
          <p className="text-sm text-[#64748B] mb-4">Chưa có kỹ năng nào. Nhấn &apos;Thêm nhóm&apos; để bắt đầu.</p>
          <button
            type="button"
            onClick={addGroup}
            className="inline-flex items-center gap-2 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            Thêm nhóm kỹ năng
          </button>
        </div>
      )}

      {data.map((group, groupIndex) => (
        <div
          key={group.id}
          className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8] border-b border-[#E2E8F0]">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {group.category || `Nhóm kỹ năng ${groupIndex + 1}`}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => moveUp(groupIndex)}
                disabled={groupIndex === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(groupIndex)}
                disabled={groupIndex === data.length - 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-gray-100 hover:text-[#0F172A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-[#EEF2FF] hover:text-[#1B4FD8] transition-colors duration-200 cursor-pointer"
                title="AI gợi ý kỹ năng (sắp ra mắt)"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => removeGroup(groupIndex)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Xóa nhóm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            {/* Category name */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                Tên nhóm kỹ năng
              </label>
              <input
                type="text"
                value={group.category}
                onChange={(e) =>
                  updateGroup(groupIndex, { ...group, category: e.target.value })
                }
                placeholder="VD: Lập trình, Công cụ, Ngôn ngữ..."
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
              />
            </div>

            {/* Tag input */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                Kỹ năng trong nhóm
              </label>

              {/* Tags */}
              {group.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#1B4FD8] text-xs font-medium px-2.5 py-1.5 rounded-full"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => removeSkill(groupIndex, skill.id)}
                        className="w-3.5 h-3.5 flex items-center justify-center hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        aria-label={`Xóa ${skill.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputs[group.id] ?? ""}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [group.id]: e.target.value }))
                  }
                  onKeyDown={(e) => handleKeyDown(e, groupIndex)}
                  placeholder="Nhập kỹ năng rồi nhấn Enter..."
                  className="flex-1 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => addSkill(groupIndex, inputs[group.id] ?? "")}
                  className="px-3 py-2.5 bg-[#1B4FD8] hover:bg-[#1440A8] text-white rounded-lg transition-colors duration-200 cursor-pointer min-w-[44px] flex items-center justify-center"
                  aria-label="Thêm kỹ năng"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1.5">
                Nhấn <kbd className="bg-gray-100 border border-gray-200 rounded px-1 text-[10px]">Enter</kbd> hoặc{" "}
                <kbd className="bg-gray-100 border border-gray-200 rounded px-1 text-[10px]">,</kbd> để thêm
              </p>
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <button
          type="button"
          onClick={addGroup}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#E2E8F0] hover:border-[#1B4FD8]/50 hover:bg-[#EEF2FF]/30 text-[#64748B] hover:text-[#1B4FD8] text-sm font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Thêm nhóm kỹ năng
        </button>
      )}
    </div>
  )
}
