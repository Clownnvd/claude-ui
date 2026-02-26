"use client"
import { useState } from "react"
import type { SkillGroup, Skill } from "@/types/cv"
import { Plus, Trash2, X } from "lucide-react"

interface Props {
  data: SkillGroup[]
  onChange: (data: SkillGroup[]) => void
}

export function FormSkills({ data, onChange }: Props) {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({})

  const addGroup = () => {
    const group: SkillGroup = { id: crypto.randomUUID(), category: "", skills: [] }
    onChange([...data, group])
  }

  const removeGroup = (id: string) => onChange(data.filter(g => g.id !== id))

  const updateGroup = (id: string, patch: Partial<SkillGroup>) =>
    onChange(data.map(g => g.id === id ? { ...g, ...patch } : g))

  const addSkill = (groupId: string) => {
    const val = newSkillInputs[groupId]?.trim()
    if (!val) return
    const group = data.find(g => g.id === groupId)!
    const skill: Skill = { id: crypto.randomUUID(), name: val }
    updateGroup(groupId, { skills: [...group.skills, skill] })
    setNewSkillInputs(prev => ({ ...prev, [groupId]: "" }))
  }

  const removeSkill = (groupId: string, skillId: string) => {
    const group = data.find(g => g.id === groupId)!
    updateGroup(groupId, { skills: group.skills.filter(s => s.id !== skillId) })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Kỹ năng</h2>
          <p className="text-sm text-[#64748B]">Nhóm kỹ năng theo danh mục</p>
        </div>
        <button
          type="button"
          onClick={addGroup}
          className="inline-flex items-center gap-1.5 bg-[#1B4FD8] hover:bg-[#1440A8] text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer min-h-[36px]"
        >
          <Plus size={14} /> Thêm nhóm
        </button>
      </div>

      {data.length === 0 && (
        <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 text-center text-[#64748B]">
          <p>Thêm nhóm kỹ năng để bắt đầu</p>
        </div>
      )}

      {data.map(group => (
        <div key={group.id} className="border border-[#E2E8F0] rounded-xl p-4 bg-white space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={group.category}
              onChange={e => updateGroup(group.id, { category: e.target.value })}
              placeholder="VD: Frontend, Backend, Soft Skills..."
              className="flex-1 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
            />
            <button
              type="button"
              onClick={() => removeGroup(group.id)}
              className="text-[#94A3B8] hover:text-red-500 cursor-pointer transition-colors duration-200"
              aria-label="Xóa nhóm kỹ năng"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.skills.map(skill => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#1B4FD8] rounded-full text-sm border border-blue-200"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => removeSkill(group.id, skill.id)}
                  className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                  aria-label={`Xóa kỹ năng ${skill.name}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillInputs[group.id] || ""}
              onChange={e => setNewSkillInputs(prev => ({ ...prev, [group.id]: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && addSkill(group.id)}
              placeholder="Nhập kỹ năng rồi Enter..."
              className="flex-1 px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
            />
            <button
              type="button"
              onClick={() => addSkill(group.id)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              Thêm
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
