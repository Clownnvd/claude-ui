import { InputHTMLAttributes, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={[
            "w-full border rounded-lg px-3 py-2 text-sm bg-white text-[#0F172A]",
            "placeholder:text-[#94A3B8]",
            "focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-[#EF4444] focus:ring-[#EF4444]"
              : "border-[#E2E8F0]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
