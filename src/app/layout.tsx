import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CViet — AI CV Builder",
  description:
    "Tạo CV chuyên nghiệp với trí tuệ nhân tạo. CViet giúp bạn xây dựng CV ấn tượng, tăng cơ hội việc làm tại Việt Nam và quốc tế.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
