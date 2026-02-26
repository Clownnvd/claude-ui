import { Wand2, Globe, Palette, Download, Lightbulb, Shield } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "AI Viết Lại",
    description:
      "AI tự động cải thiện câu chữ, giúp bullet points ấn tượng và ATS-friendly hơn",
  },
  {
    icon: Globe,
    title: "Song Ngữ VI/EN",
    description: "Tạo CV tiếng Việt và tiếng Anh chỉ với một cú click",
  },
  {
    icon: Palette,
    title: "3 Mẫu Đẹp",
    description: "Classic, Modern, Creative — phù hợp với mọi ngành nghề",
  },
  {
    icon: Download,
    title: "Xuất PDF",
    description: "Tải xuống PDF chất lượng cao, chuẩn format ATS",
  },
  {
    icon: Lightbulb,
    title: "Gợi Ý Kỹ Năng",
    description: "AI gợi ý kỹ năng phù hợp với vị trí bạn đang ứng tuyển",
  },
  {
    icon: Shield,
    title: "Bảo Mật",
    description: "Dữ liệu của bạn được mã hóa và bảo vệ tuyệt đối",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Tất cả những gì bạn cần
            <br />
            <span className="text-[#1B4FD8]">để có một CV tốt</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Từ AI viết lại nội dung đến xuất PDF chuyên nghiệp — CViet có tất cả.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-md hover:border-[#1B4FD8]/20 transition-all duration-200 cursor-default group"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 group-hover:bg-[#1B4FD8] transition-colors duration-200">
                  <Icon
                    size={20}
                    className="text-[#1B4FD8] group-hover:text-white transition-colors duration-200"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[#0F172A] font-semibold text-base mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
