import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Layout from '../components/Layout'

const getPaymentMethodsFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/payment-methods');
    if (!response.ok) throw new Error('Failed to fetch payment methods');
    const methods = await response.json();
    return (methods || []) as any[];
  } catch (error) {
    console.error('Failed to fetch payment methods via HTTP:', error);
    return [] as any[];
  }
})

export const Route = createFileRoute('/')({
  loader: async () => {
    return {
      paymentMethods: await getPaymentMethodsFn()
    }
  },
  component: Layout,
})
