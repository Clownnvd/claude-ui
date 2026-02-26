import { Webhooks } from "@polar-sh/nextjs"
import {
  WebhookSubscriptionCreatedPayload,
  WebhookSubscriptionUpdatedPayload,
  WebhookSubscriptionCanceledPayload,
  WebhookSubscriptionRevokedPayload,
} from "@polar-sh/sdk/models/components"
import { db } from "@/lib/db"

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: async (payload: WebhookSubscriptionCreatedPayload) => {
    const sub = payload.data
    const userId = sub.metadata?.userId as string | undefined
    if (userId) {
      await db.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
          polarCustomerId: sub.customerId,
        },
      })
    }
  },

  onSubscriptionUpdated: async (payload: WebhookSubscriptionUpdatedPayload) => {
    const sub = payload.data
    const userId = sub.metadata?.userId as string | undefined
    if (userId) {
      await db.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
          polarCustomerId: sub.customerId,
        },
      })
    }
  },

  onSubscriptionCanceled: async (payload: WebhookSubscriptionCanceledPayload) => {
    const sub = payload.data
    const userId = sub.metadata?.userId as string | undefined
    if (userId) {
      await db.user.update({
        where: { id: userId },
        data: { plan: "FREE" },
      })
    }
  },

  onSubscriptionRevoked: async (payload: WebhookSubscriptionRevokedPayload) => {
    const sub = payload.data
    const userId = sub.metadata?.userId as string | undefined
    if (userId) {
      await db.user.update({
        where: { id: userId },
        data: { plan: "FREE" },
      })
    }
  },
})
