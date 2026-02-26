"use client"

import { Sparkles } from "lucide-react"
import type { PersonalInfo } from "@/types/cv"

interface PersonalFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

const MAX_SUMMARY_LENGTH = 600

export default function PersonalForm({ data, onChange }: PersonalFormProps) {
  function update<K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  const summaryLength = (data.summary ?? "").length

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-1">Thông tin cá nhân</h2>
        <p className="text-xs text-[#64748B]">Thông tin liên hệ và giới thiệu bản thân</p>
      </div>

      {/* Row: Full name + Headline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Chức danh
          </label>
          <input
            type="text"
            value={data.headline ?? ""}
            onChange={(e) => update("headline", e.target.value)}
            placeholder="Fullstack Developer"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="nguyenvana@email.com"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={data.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+84 90 123 4567"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
          Địa chỉ
        </label>
        <input
          type="text"
          value={data.location ?? ""}
          onChange={(e) => update("location", e.target.value)}
          placeholder="Hà Nội, Việt Nam"
          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
        />
      </div>

      {/* Row: LinkedIn + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={data.linkedIn ?? ""}
            onChange={(e) => update("linkedIn", e.target.value)}
            placeholder="linkedin.com/in/nguyenvana"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Website / Portfolio
          </label>
          <input
            type="url"
            value={data.website ?? ""}
            onChange={(e) => update("website", e.target.value)}
            placeholder="nguyenvana.dev"
            className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-[#0F172A]">
            Giới thiệu bản thân
          </label>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-[#1B4FD8] hover:text-[#1440A8] transition-colors duration-200 cursor-pointer px-2 py-1 rounded hover:bg-[#EEF2FF]"
            title="Tính năng AI đang được phát triển"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI tạo summary
          </button>
        </div>
        <textarea
          value={data.summary ?? ""}
          onChange={(e) => {
            if (e.target.value.length <= MAX_SUMMARY_LENGTH) {
              update("summary", e.target.value)
            }
          }}
          rows={5}
          placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp của bạn..."
          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-all duration-200 bg-white resize-none leading-relaxed"
        />
        <div className="flex justify-end mt-1">
          <span
            className={`text-xs ${
              summaryLength > MAX_SUMMARY_LENGTH * 0.9
                ? summaryLength >= MAX_SUMMARY_LENGTH
                  ? "text-red-500"
                  : "text-amber-500"
                : "text-[#94A3B8]"
            }`}
          >
            {summaryLength} / {MAX_SUMMARY_LENGTH}
          </span>
        </div>
      </div>
    </div>
  )
}
