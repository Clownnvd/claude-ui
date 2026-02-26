import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Nguyễn Minh Khoa",
    role: "Software Engineer",
    initials: "NK",
    avatarColor: "bg-[#1B4FD8]",
    quote:
      "CViet giúp mình có job ở công ty dream trong 2 tuần! AI viết lại bullet points cực kỳ ấn tượng.",
  },
  {
    name: "Trần Thị Mai",
    role: "Marketing Manager",
    initials: "TM",
    avatarColor: "bg-[#0EA5E9]",
    quote:
      "Tính năng dịch CV sang tiếng Anh rất chính xác và tự nhiên. Tiết kiệm cả buổi tối dịch thủ công.",
  },
  {
    name: "Lê Văn Hùng",
    role: "Recent Graduate",
    initials: "LH",
    avatarColor: "bg-[#10B981]",
    quote:
      "Mình là sinh viên mới ra trường, không biết viết CV thế nào. CViet hướng dẫn từng bước, AI suggest skills rất hợp lý.",
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className="text-[#F59E0B] fill-[#F59E0B]"
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Hơn 1,000 người
            <br />
            <span className="text-[#1B4FD8]">đã tin dùng CViet</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Người dùng thực, kết quả thực. Đây là những gì họ nói.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-md hover:border-[#1B4FD8]/20 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Stars */}
              <StarRating />

              {/* Quote */}
              <blockquote className="text-[#0F172A] text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <div className="text-[#0F172A] font-semibold text-sm">{t.name}</div>
                  <div className="text-[#64748B] text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof stat strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "1,000+", label: "CV đã tạo" },
            { value: "95%", label: "Khách hàng hài lòng" },
            { value: "5 phút", label: "Thời gian trung bình" },
            { value: "3 mẫu", label: "Template chuyên nghiệp" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-[#1B4FD8]">{stat.value}</span>
              <span className="text-[#64748B] text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
