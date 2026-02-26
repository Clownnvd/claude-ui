import { SelectHTMLAttributes, forwardRef } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className = "", children, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <select
            ref={ref}
            className={[
              "w-full appearance-none border rounded-lg px-3 py-2 text-sm bg-white text-[#0F172A]",
              "placeholder:text-[#94A3B8]",
              "focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent",
              "transition-all duration-200",
              "cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "pr-9",
              error
                ? "border-[#EF4444] focus:ring-[#EF4444]"
                : "border-[#E2E8F0]",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"
