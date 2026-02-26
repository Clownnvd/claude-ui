"use client"
import type { PersonalInfo } from "@/types/cv"

interface Props {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export function FormPersonal({ data, onChange }: Props) {
  const update = (key: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-1">Thông tin cá nhân</h2>
        <p className="text-sm text-[#64748B]">Thông tin cơ bản hiển thị trên CV</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={e => update("fullName", e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="headline" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Chức danh / Vị trí
          </label>
          <input
            id="headline"
            type="text"
            value={data.headline || ""}
            onChange={e => update("headline", e.target.value)}
            placeholder="Frontend Developer"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={e => update("email", e.target.value)}
            placeholder="example@email.com"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone || ""}
            onChange={e => update("phone", e.target.value)}
            placeholder="+84 901 234 567"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Địa chỉ / Thành phố
          </label>
          <input
            id="location"
            type="text"
            value={data.location || ""}
            onChange={e => update("location", e.target.value)}
            placeholder="Hà Nội, Việt Nam"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="linkedIn" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            LinkedIn
          </label>
          <input
            id="linkedIn"
            type="text"
            value={data.linkedIn || ""}
            onChange={e => update("linkedIn", e.target.value)}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Website / Portfolio
          </label>
          <input
            id="website"
            type="text"
            value={data.website || ""}
            onChange={e => update("website", e.target.value)}
            placeholder="portfolio.vn"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label htmlFor="github" className="block text-xs font-medium text-[#0F172A] mb-1.5">
            GitHub
          </label>
          <input
            id="github"
            type="text"
            value={data.github || ""}
            onChange={e => update("github", e.target.value)}
            placeholder="github.com/username"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="block text-xs font-medium text-[#0F172A] mb-1.5">
          Giới thiệu bản thân
        </label>
        <textarea
          id="summary"
          value={data.summary || ""}
          onChange={e => update("summary", e.target.value)}
          placeholder="Mô tả ngắn về bản thân, kỹ năng nổi bật và mục tiêu nghề nghiệp..."
          rows={4}
          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white resize-none"
        />
        <p className="text-xs text-[#64748B] mt-1">{(data.summary || "").length} / 500 ký tự</p>
      </div>
    </div>
  )
}
