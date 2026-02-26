import { HTMLAttributes } from "react"

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "bg-white rounded-xl border border-[#E2E8F0] shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["p-6 pb-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={[
        "text-lg font-semibold text-[#0F172A]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        "text-sm text-[#64748B] mt-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardContent({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["p-6", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardFooter({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["p-6 pt-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}
