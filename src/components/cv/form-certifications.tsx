"use client"
import type { Certification } from "@/types/cv"
import { Plus, Trash2 } from "lucide-react"

interface Props {
  data: Certification[]
  onChange: (data: Certification[]) => void
}

export function FormCertifications({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: crypto.randomUUID(), name: "" }])

  const remove = (id: string) => onChange(data.filter(c => c.id !== id))

  const update = (id: string, patch: Partial<Certification>) =>
    onChange(data.map(c => c.id === id ? { ...c, ...patch } : c))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Chứng chỉ &amp; Giải thưởng</h2>
          <p className="text-sm text-[#64748B]">Chứng chỉ chuyên môn, giải thưởng, thành tích</p>
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
          <p>Thêm chứng chỉ hoặc giải thưởng của bạn</p>
        </div>
      )}

      {data.map(cert => (
        <div key={cert.id} className="border border-[#E2E8F0] rounded-xl p-4 bg-white">
          <div className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                  Tên chứng chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={e => update(cert.id, { name: e.target.value })}
                  placeholder="TOEIC 900, AWS Certified..."
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Tổ chức cấp</label>
                <input
                  type="text"
                  value={cert.issuer || ""}
                  onChange={e => update(cert.id, { issuer: e.target.value })}
                  placeholder="ETS, Amazon, Google..."
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Ngày cấp (MM/YYYY)</label>
                <input
                  type="text"
                  value={cert.issueDate || ""}
                  onChange={e => update(cert.id, { issueDate: e.target.value })}
                  placeholder="06/2024"
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1.5">Link xác minh</label>
                <input
                  type="text"
                  value={cert.credentialUrl || ""}
                  onChange={e => update(cert.id, { credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(cert.id)}
              className="text-[#94A3B8] hover:text-red-500 cursor-pointer mt-6 transition-colors duration-200"
              aria-label="Xóa chứng chỉ"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
