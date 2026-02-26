"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Crown, X } from "lucide-react"
import Topbar from "@/components/app/topbar"

// ---------------------------------------------------------------------------
// UpgradeButton — client island
// ---------------------------------------------------------------------------
function UpgradeButton({ label = "Nâng cấp lên Pro · $5/tháng" }: { label?: string }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch("/api/polar/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-[#1B4FD8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Đang xử lý...
        </>
      ) : (
        label
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// StatusBanner — reads search params
// ---------------------------------------------------------------------------
function StatusBanner() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success") === "true"
  const canceled = searchParams.get("canceled") === "true"

  if (success) {
    return (
      <div className="mb-6 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="font-semibold text-emerald-800">Nâng cấp thành công!</p>
          <p className="text-sm text-emerald-700 mt-0.5">
            Chúc mừng! Bạn đã nâng cấp lên Pro thành công. Tất cả tính năng Pro đã được mở khóa.
          </p>
        </div>
      </div>
    )
  }

  if (canceled) {
    return (
      <div className="mb-6 flex items-start gap-3 bg-slate-50 border border-[#E2E8F0] rounded-xl p-4">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
          <X className="w-4 h-4 text-[#64748B]" />
        </div>
        <div>
          <p className="font-semibold text-[#0F172A]">Đã hủy nâng cấp</p>
          <p className="text-sm text-[#64748B] mt-0.5">
            Bạn đã hủy quá trình nâng cấp. Bạn có thể thử lại bất cứ lúc nào.
          </p>
        </div>
      </div>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Plan feature lists
// ---------------------------------------------------------------------------
const freePlanFeatures = [
  { text: "1 CV", included: true },
  { text: "1 mẫu cơ bản (Classic)", included: true },
  { text: "3 lần dùng AI/tháng", included: true },
  { text: "Xuất PDF", included: true },
  { text: "Không giới hạn CV", included: false },
  { text: "Tất cả 3 mẫu (Classic, Modern, Creative)", included: false },
  { text: "AI không giới hạn", included: false },
  { text: "CV song ngữ VI/EN", included: false },
  { text: "Ưu tiên hỗ trợ", included: false },
]

const proPlanFeatures = [
  { text: "Không giới hạn CV", included: true },
  { text: "Tất cả 3 mẫu (Classic, Modern, Creative)", included: true },
  { text: "AI không giới hạn", included: true },
  { text: "CV song ngữ VI/EN", included: true },
  { text: "Xuất PDF", included: true },
  { text: "Ưu tiên hỗ trợ", included: true },
]

const faqItems = [
  {
    q: "Tôi có thể hủy bất cứ lúc nào không?",
    a: "Có, bạn có thể hủy bất cứ lúc nào từ tài khoản Polar. Sau khi hủy, bạn vẫn giữ quyền truy cập Pro đến hết chu kỳ thanh toán hiện tại.",
  },
  {
    q: "Thanh toán bằng gì?",
    a: "Thẻ tín dụng/ghi nợ quốc tế (Visa, Mastercard) qua Polar — nền tảng thanh toán uy tín cho sản phẩm phần mềm.",
  },
  {
    q: "CV của tôi có bị xóa khi hủy Pro không?",
    a: "Không. CV và dữ liệu của bạn luôn được giữ nguyên. Chỉ các tính năng Pro sẽ bị hạn chế lại sau khi hủy.",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function BillingPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Billing" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">

          {/* Status banners */}
          <Suspense>
            <StatusBanner />
          </Suspense>

          {/* Current plan card */}
          <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 mb-8">
            <p className="text-sm font-medium text-[#64748B] uppercase tracking-wide mb-3">
              Gói hiện tại
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Miễn Phí</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Đã dùng: <span className="font-medium text-[#0F172A]">1/1 CV</span>
                  {" · "}
                  <span className="font-medium text-[#0F172A]">2/3 lần AI</span> tháng này
                </p>
              </div>
              <UpgradeButton label="Nâng cấp lên Pro" />
            </div>
          </section>

          {/* Plan comparison */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">So sánh gói</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Free card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                <div className="mb-4">
                  <p className="text-base font-semibold text-[#0F172A]">Miễn Phí</p>
                  <p className="text-2xl font-bold text-[#0F172A] mt-1">$0<span className="text-sm font-normal text-[#64748B]">/tháng</span></p>
                </div>
                <ul className="space-y-3">
                  {freePlanFeatures.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      {f.included ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-[#64748B]" />
                        </div>
                      )}
                      <span className={`text-sm ${f.included ? "text-[#0F172A]" : "text-[#64748B]"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro card */}
              <div className="bg-white border-2 border-[#1B4FD8] rounded-xl p-6 relative">
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#1B4FD8] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Được đề xuất
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-base font-semibold text-[#0F172A]">Pro</p>
                  <p className="text-2xl font-bold text-[#0F172A] mt-1">$5<span className="text-sm font-normal text-[#64748B]">/tháng</span></p>
                </div>
                <ul className="space-y-3 mb-6">
                  {proPlanFeatures.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1B4FD8]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#1B4FD8]" />
                      </div>
                      <span className="text-sm text-[#0F172A]">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <UpgradeButton label="Nâng cấp lên Pro · $5/tháng" />
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Câu hỏi thường gặp</h3>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                  <p className="font-medium text-[#0F172A] mb-2">{item.q}</p>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
