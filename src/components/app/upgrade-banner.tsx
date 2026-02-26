"use client"

import { useState } from "react"
import { Crown, ArrowRight } from "lucide-react"

interface UpgradeBannerProps {
  message?: string
  compact?: boolean
}

export default function UpgradeBanner({
  message = "mở khóa tất cả tính năng",
  compact = false,
}: UpgradeBannerProps) {
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

  // Compact variant — small inline badge
  if (compact) {
    return (
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="inline-flex items-center gap-1.5 bg-[#1B4FD8]/10 text-[#1B4FD8] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#1B4FD8]/20 transition-colors duration-200 cursor-pointer disabled:opacity-50"
      >
        <Crown className="w-3 h-3" />
        {loading ? "Đang xử lý..." : "Nâng cấp Pro"}
      </button>
    )
  }

  // Default full banner
  return (
    <div className="bg-gradient-to-r from-[#EEF2FF] to-[#E0F2FE] border border-[#1B4FD8]/20 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1B4FD8]/10 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-[#1B4FD8]" />
        </div>
        <p className="text-sm font-medium text-[#0F172A]">
          Nâng cấp lên Pro để{" "}
          <span className="text-[#1B4FD8]">{message}</span>
        </p>
      </div>

      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="flex items-center gap-2 bg-[#1B4FD8] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer disabled:opacity-50 flex-shrink-0 min-h-[44px]"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            Nâng cấp ngay
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  )
}
