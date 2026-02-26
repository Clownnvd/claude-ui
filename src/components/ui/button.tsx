"use client"

import { Loader2 } from "lucide-react"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-[#1B4FD8] text-white hover:bg-[#1440A8]",
  secondary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-gray-50",
  ghost:
    "text-[#64748B] hover:bg-gray-100 hover:text-[#0F172A]",
  destructive:
    "bg-[#EF4444] text-white hover:bg-red-600",
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center gap-2",
          "transition-colors duration-200 cursor-pointer rounded-lg font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4FD8] focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          isDisabled ? "opacity-50 cursor-not-allowed" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
