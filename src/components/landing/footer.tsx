import { Linkedin, Twitter, Facebook } from "lucide-react"
import Link from "next/link"

const footerLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Bảng giá", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Hỗ trợ", href: "/support" },
]

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter/X" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 cursor-pointer w-fit">
              <div className="w-8 h-8 bg-[#1B4FD8] rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold tracking-tight">CV</span>
              </div>
              <span className="text-white font-semibold text-lg">CViet</span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
              Tạo CV chuyên nghiệp với AI. Dành cho người Việt, phù hợp thị trường trong nước và quốc tế.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors duration-200 cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Liên kết
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#94A3B8] text-sm hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Bắt đầu ngay
            </h4>
            <p className="text-[#94A3B8] text-sm mb-4 leading-relaxed">
              Tạo CV miễn phí trong vài phút. Không cần thẻ tín dụng.
            </p>
            <Link
              href="/sign-up"
              className="inline-block px-5 py-2.5 bg-[#1B4FD8] text-white text-sm font-semibold rounded-lg hover:bg-[#1440A8] transition-colors duration-200 cursor-pointer"
            >
              Tạo CV miễn phí
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            &copy; 2026 CViet. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="text-[#64748B] text-sm hover:text-[#94A3B8] transition-colors duration-200 cursor-pointer"
            >
              Chính sách bảo mật
            </a>
            <a
              href="/terms"
              className="text-[#64748B] text-sm hover:text-[#94A3B8] transition-colors duration-200 cursor-pointer"
            >
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
