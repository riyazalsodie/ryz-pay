import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import PaymentDetailsPage from '../components/PaymentDetailsPage'
import useStore from '../store/useStore'
import { useEffect } from 'react'

const getTransactionFn = createServerFn({ method: "GET" }).handler(async (ctx) => {
  const id = (ctx.data as unknown) as string
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

const getGatewayFn = createServerFn({ method: "GET" }).handler(async (ctx) => {
  const id = (ctx.data as unknown) as string
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201"
    const response = await fetch(`${apiUrl}/api/gateways/${id}`)
    if (!response.ok) throw new Error("Failed to fetch gateway")
    return await response.json()
  } catch (error) {
    return null
  }
})

export const Route = createFileRoute("/pay/$id/$gatewayId")({
  loader: async ({ params }) => {
    const transaction = await getTransactionFn({ data: (params.id as any) })
    const gateway = await getGatewayFn({ data: (params.gatewayId as any) })

    if (!transaction) throw new Error("Transaction not found")
    if (!gateway) throw new Error("Gateway not found")

    return {
      transaction,
      gateway,
    }
  },
  component: CheckoutRouteComponent,
})

import NagadMFSPage from '../components/NagadMFSPage'
import BkashMFSPage from '../components/BkashMFSPage'
import RocketMFSPage from '../components/RocketMFSPage'
import UpayMFSPage from '../components/UpayMFSPage'
import CellfinMFSPage from '../components/CellfinMFSPage'
import { useNavigate } from '@tanstack/react-router'

function CheckoutRouteComponent() {
  const { transaction, gateway } = Route.useLoaderData()
  const navigate = useNavigate()
  const { setSelectedPaymentMethod, setView } = useStore()
  
  const identifier = gateway.identifier?.toLowerCase()

  // Sync store with loader data so components can use it
  useEffect(() => {
    if (gateway) {
      setSelectedPaymentMethod({
        id: identifier || gateway.id,
        name: gateway.displayName || gateway.name,
        img: gateway.logo || `/assets/${identifier || 'nagad'}.png`,
      })
      setView('payment_details')
    }
  }, [gateway, setSelectedPaymentMethod, setView, identifier])

  const backProps = {
    onBack: () => navigate({ to: '/pay/$id', params: { id: transaction.id } }),
    onCancel: () => navigate({ to: '/pay/$id', params: { id: transaction.id } }),
    gateway,
    transaction
  }

  if (identifier === 'nagad') return <NagadMFSPage {...backProps} />
  if (identifier === 'bkash') return <BkashMFSPage {...backProps} />
  if (identifier === 'rocket') return <RocketMFSPage {...backProps} />
  if (identifier === 'upay') return <UpayMFSPage {...backProps} />
  if (identifier === 'cellfin') return <CellfinMFSPage {...backProps} />

  return <PaymentDetailsPage dynamicData={{ transaction, gateway }} />
}
