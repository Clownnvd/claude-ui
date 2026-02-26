import { LabelHTMLAttributes } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className = "", children, ...props }: LabelProps) {
  return (
    <label
      className={[
        "text-sm font-medium text-[#0F172A] leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </label>
  )
}
