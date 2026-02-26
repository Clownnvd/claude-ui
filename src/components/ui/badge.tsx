import { HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "brand" | "outline"
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-100 text-[#64748B]",
  success: "bg-[#D1FAE5] text-[#059669]",
  warning: "bg-[#FEF3C7] text-[#D97706]",
  brand: "bg-[#EEF2FF] text-[#1B4FD8]",
  outline: "border border-[#E2E8F0] text-[#64748B]",
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  )
}
