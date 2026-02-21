import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Layout from '../components/Layout'

const getPaymentMethodsFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    // Use VITE_API_URL from environment
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201';
    const response = await fetch(`${apiUrl}/api/payment-methods`);
    if (!response.ok) throw new Error('Failed to fetch payment methods');
    const methods = await response.json();
    return (methods || []) as any[];
  } catch (error) {
    console.error('Failed to fetch payment methods via HTTP:', error);
    return [] as any[];
  }
})

const getGatewaysFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201';
    const response = await fetch(`${apiUrl}/api/gateways`);
    if (!response.ok) throw new Error('Failed to fetch gateways');
    const gateways = await response.json();
    return (gateways || []) as any[];
  } catch (error) {
    console.error('Failed to fetch gateways via HTTP:', error);
    return [] as any[];
  }
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const [paymentMethods, gateways] = await Promise.all([
      getPaymentMethodsFn(),
      getGatewaysFn()
    ]);
    return {
      paymentMethods,
      gateways
    }
  },
  component: Layout,
})
