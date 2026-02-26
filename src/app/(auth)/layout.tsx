export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* CViet logo/brand at top */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#1B4FD8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="text-xl font-semibold text-[#0F172A]">CViet</span>
          </a>
        </div>
        {children}
      </div>
    </div>
  )
}
