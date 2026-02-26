import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { polar } from "@/lib/polar"
import { headers } from "next/headers"

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [process.env.POLAR_PRO_PRODUCT_ID!],
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      customerEmail: session.user.email,
      metadata: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error("Polar checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    )
  }
}
