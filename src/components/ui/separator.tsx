interface SeparatorProps {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return (
    <hr
      className={["border-[#E2E8F0]", className ?? ""].filter(Boolean).join(" ")}
    />
  )
}
