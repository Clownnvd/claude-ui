"use client"

import { Check } from "lucide-react"
import Link from "next/link"

const freePlanFeatures = [
  "1 CV",
  "1 mẫu cơ bản (Classic)",
  "3 lần AI/tháng",
  "Xuất PDF",
]

const proPlanFeatures = [
  "Không giới hạn CV",
  "Tất cả 3 mẫu",
  "AI không giới hạn",
  "CV song ngữ VI/EN",
  "Ưu tiên hỗ trợ",
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Đơn giản, minh bạch
            <br />
            <span className="text-[#1B4FD8]">Chọn gói phù hợp</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Bắt đầu miễn phí, nâng cấp khi bạn cần thêm sức mạnh.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-[#0F172A] font-bold text-xl mb-1">Miễn Phí</h3>
              <p className="text-[#64748B] text-sm">Bắt đầu không tốn xu nào</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-[#0F172A]">$0</span>
              <span className="text-[#64748B] mb-1">/tháng</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {freePlanFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#0F172A]">
                  <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#64748B]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/sign-up"
              className="w-full block text-center px-6 py-3 border border-[#E2E8F0] text-[#0F172A] font-semibold rounded-xl hover:border-[#1B4FD8] hover:text-[#1B4FD8] hover:bg-[#EEF2FF] transition-colors duration-200 cursor-pointer"
            >
              Bắt đầu miễn phí
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl border-2 border-[#1B4FD8] p-8 flex flex-col relative shadow-xl shadow-[#1B4FD8]/10">
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#10B981] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                Phổ biến nhất
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-[#0F172A] font-bold text-xl mb-1">Pro</h3>
              <p className="text-[#64748B] text-sm">Dành cho người nghiêm túc với sự nghiệp</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold text-[#0F172A]">$5</span>
              <span className="text-[#64748B] mb-1">/tháng</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {proPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#0F172A]">
                  <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#1B4FD8]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/sign-up?plan=pro"
              className="w-full block text-center px-6 py-3 bg-[#1B4FD8] text-white font-semibold rounded-xl hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Dùng thử Pro
            </Link>
          </div>
        </div>

        {/* Guarantee note */}
        <p className="text-center text-sm text-[#64748B] mt-8">
          Không cần thẻ tín dụng. Hủy bất cứ lúc nào.
        </p>
      </div>
    </section>
  )
}
