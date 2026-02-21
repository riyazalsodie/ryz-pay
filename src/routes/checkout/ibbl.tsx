import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import IBBLBankingPage from '../../components/IBBLBankingPage'

const getIBBLGatewayFn = createServerFn({ method: 'GET' }).handler(async () => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201';
        const response = await fetch(`${apiUrl}/api/gateways`);
        if (!response.ok) return null;
        const gateways = await response.json();
        // Find the first active gateway with identifier 'ibbl'
        return gateways.find((g: any) => g.identifier === 'ibbl' && g.status) || null;
    } catch (error) {
        console.error('Failed to fetch IBBL gateway:', error);
        return null;
    }
})

export const Route = createFileRoute('/checkout/ibbl')({
    loader: async () => {
        try {
            const gateway = await getIBBLGatewayFn();
            return { gateway };
        } catch (e) {
            console.error('Loader error:', e);
        }
        return { gateway: null };
    },
    component: IBBLRouteComponent,
})

function IBBLRouteComponent() {
    const navigate = useNavigate()
    const { gateway } = Route.useLoaderData()

    const handleBack = () => {
        navigate({ to: '/' })
    }

    const handleCancel = () => {
        navigate({ to: '/' })
    }

    const handleSubmit = (file: File) => {
        console.log('File submitted:', file)
        // Add submission logic here if needed
        alert('Payment slip uploaded successfully!')
        navigate({ to: '/' })
    }

    return (
        <IBBLBankingPage
            onBack={handleBack}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            gateway={gateway || undefined}
        />
    )
}
