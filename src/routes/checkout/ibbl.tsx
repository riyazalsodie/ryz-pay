import { createFileRoute, useNavigate } from '@tanstack/react-router'
import IBBLBankingPage from '../../components/IBBLBankingPage'

export const Route = createFileRoute('/checkout/ibbl')({
    component: IBBLRouteComponent,
})

function IBBLRouteComponent() {
    const navigate = useNavigate()

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
        />
    )
}
