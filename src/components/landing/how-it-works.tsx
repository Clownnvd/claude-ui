import { FileText, Sparkles, Download } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "Nhập thông tin",
    description:
      "Điền thông tin cá nhân, kinh nghiệm, học vấn theo từng bước hướng dẫn",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI tối ưu hoá",
    description:
      "AI phân tích và cải thiện nội dung CV, gợi ý từ khoá phù hợp với ngành",
  },
  {
    number: 3,
    icon: Download,
    title: "Tải xuống PDF",
    description:
      "Chọn mẫu yêu thích và tải về CV chuẩn chuyên nghiệp",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Chỉ 3 bước
            <br />
            <span className="text-[#1B4FD8]">để có CV hoàn hảo</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Quy trình đơn giản, nhanh chóng. Không cần kinh nghiệm thiết kế.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(16.666%+32px)] right-[calc(16.666%+32px)] h-0.5 bg-gradient-to-r from-[#1B4FD8]/20 via-[#1B4FD8]/40 to-[#1B4FD8]/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex flex-col items-center text-center relative">
                  {/* Step number + icon ring */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div className="w-[104px] h-[104px] rounded-full border-2 border-dashed border-[#1B4FD8]/20 flex items-center justify-center">
                      {/* Inner filled circle */}
                      <div className="w-[76px] h-[76px] rounded-full bg-[#1B4FD8] flex items-center justify-center shadow-lg shadow-[#1B4FD8]/20">
                        <Icon size={30} className="text-white" />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center border-2 border-white shadow-sm">
                      <span className="text-white text-xs font-bold">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="text-[#0F172A] font-semibold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] text-base leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B4FD8] text-white font-semibold rounded-xl hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer shadow-sm shadow-[#1B4FD8]/20"
          >
            Bắt đầu ngay — Miễn phí
          </a>
        </div>
      </div>
    </section>
  )
}
