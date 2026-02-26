import { CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFAF8] to-white py-24">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1B4FD8]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#EEF2FF] text-[#1B4FD8] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <Sparkles size={14} className="text-[#1B4FD8]" />
          AI-Powered CV Builder
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
          Tạo CV chuyên nghiệp
          <br />
          <span className="text-[#1B4FD8]">chỉ trong 5 phút</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-10">
          CViet dùng AI để giúp bạn viết CV ấn tượng, tăng cơ hội được nhà tuyển dụng chú ý.
          Hỗ trợ đầy đủ tiếng Việt và tiếng Anh.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto px-8 py-4 bg-[#1B4FD8] text-white font-semibold rounded-xl hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer text-base shadow-sm shadow-[#1B4FD8]/20"
          >
            Tạo CV miễn phí
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#0F172A] font-semibold rounded-xl border border-[#E2E8F0] hover:border-[#1B4FD8] hover:text-[#1B4FD8] transition-colors duration-200 cursor-pointer text-base"
          >
            Xem mẫu CV
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#64748B] mb-16">
          {[
            "Miễn phí, không cần thẻ tín dụng",
            "3 mẫu đẹp sẵn có",
            "Xuất PDF chất lượng cao",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#10B981] flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>

        {/* CV Editor Mockup */}
        <div className="mx-auto max-w-2xl bg-white rounded-2xl border border-[#E2E8F0] shadow-xl overflow-hidden">
          {/* Editor top bar */}
          <div className="flex items-center justify-between bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <span className="text-xs text-[#64748B] font-medium">CViet Editor</span>
            <div className="w-16 h-5 bg-[#E2E8F0] rounded animate-pulse" />
          </div>

          {/* Fake CV preview content */}
          <div className="grid grid-cols-3 min-h-[280px]">
            {/* Left sidebar panel */}
            <div className="bg-[#1B4FD8] p-5 col-span-1 flex flex-col gap-4">
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-white/20 mx-auto" />
              {/* Name lines */}
              <div className="space-y-1.5">
                <div className="h-3 bg-white/80 rounded w-full" />
                <div className="h-2.5 bg-white/50 rounded w-3/4 mx-auto" />
              </div>
              {/* Contact info */}
              <div className="space-y-1.5 pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 bg-white/30 rounded w-full" />
                ))}
              </div>
              {/* Skills section */}
              <div className="pt-2 space-y-1.5">
                <div className="h-2.5 bg-white/60 rounded w-1/2" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-2 bg-white/25 rounded w-full" />
                ))}
              </div>
            </div>

            {/* Right content panel */}
            <div className="col-span-2 p-5 space-y-4">
              {/* Summary */}
              <div>
                <div className="h-2.5 bg-[#1B4FD8]/30 rounded w-1/3 mb-2" />
                <div className="space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-2 bg-[#E2E8F0] rounded ${i === 3 ? "w-2/3" : "w-full"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="h-2.5 bg-[#1B4FD8]/30 rounded w-1/3 mb-2" />
                <div className="space-y-1.5">
                  <div className="h-2.5 bg-[#0F172A]/40 rounded w-1/2" />
                  <div className="h-2 bg-[#E2E8F0] rounded w-1/3" />
                  {[1, 2].map((i) => (
                    <div key={i} className="h-2 bg-[#E2E8F0] rounded w-full" />
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="h-2.5 bg-[#1B4FD8]/30 rounded w-1/4 mb-2" />
                <div className="space-y-1.5">
                  <div className="h-2.5 bg-[#0F172A]/40 rounded w-2/3" />
                  <div className="h-2 bg-[#E2E8F0] rounded w-1/2" />
                </div>
              </div>

              {/* AI badge */}
              <div className="flex justify-end pt-2">
                <span className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#1B4FD8] text-xs font-medium px-2.5 py-1 rounded-full">
                  <Sparkles size={10} />
                  AI đã tối ưu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
