import { createFileRoute } from '@tanstack/react-router'
import PaymentDetailsPage from '../components/PaymentDetailsPage'

export const Route = createFileRoute('/payment/$id')({
  component: PaymentDetailsPage,
})
