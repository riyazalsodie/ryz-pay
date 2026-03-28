import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Layout from '../components/Layout'

const getTransactionFn = createServerFn({ method: "GET" }).handler(async (ctx) => {
  const id = ctx.data as unknown as string
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201"
    const response = await fetch(`${apiUrl}/api/transactions/${id}`)
    if (!response.ok) throw new Error("Failed to fetch transaction")
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch transaction:", error)
    return null
  }
})

const getPaymentMethodsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201"
    const response = await fetch(`${apiUrl}/api/payment-methods`)
    if (!response.ok) throw new Error("Failed to fetch payment methods")
    return await response.json()
  } catch (error) {
    return []
  }
})

const getGatewaysFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201"
    const response = await fetch(`${apiUrl}/api/gateways`)
    if (!response.ok) throw new Error("Failed to fetch gateways")
    return await response.json()
  } catch (error) {
    return []
  }
})

export const Route = createFileRoute("/pay/$id/")({
    loader: async ({ params }) => {
        const transaction = await getTransactionFn({ data: params.id as any })
        const [paymentMethods, gateways] = await Promise.all([getPaymentMethodsFn(), getGatewaysFn()])

        if (!transaction) throw new Error("Transaction not found")

        return {
            transaction,
            paymentMethods,
            gateways,
        }
    },
    component: Layout,
})
