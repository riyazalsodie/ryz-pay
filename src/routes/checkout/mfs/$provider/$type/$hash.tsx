import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import BkashMFSPage from '../../../../../components/BkashMFSPage'
import NagadMFSPage from '../../../../../components/NagadMFSPage'
import RocketMFSPage from '../../../../../components/RocketMFSPage'
import CellfinMFSPage from '../../../../../components/CellfinMFSPage'
import UpayMFSPage from '../../../../../components/UpayMFSPage'

const getGatewayFn = createServerFn({ method: 'GET' })
  .handler(async ({ data }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201';
      const response = await fetch(`${apiUrl}/api/gateways/${data.id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch gateway:', error);
      return null;
    }
  })

export const Route = createFileRoute('/checkout/mfs/$provider/$type/$hash')({
  loader: async ({ params }) => {
    try {
      // If type looks like a CUID or UUID (long string), try to fetch gateway
      // Otherwise it might be '1', 'personal', etc. (legacy/fallback)
      if (params.type && params.type.length > 10) {
        const gateway = await getGatewayFn({ data: { id: params.type } });
        return { gateway };
      }
    } catch (e) {
      console.error('Loader error:', e);
    }
    return { gateway: null };
  },
  component: MFSCheckoutPage,
})

function MFSCheckoutPage() {
  const { provider, type, hash } = Route.useParams()
  const { gateway } = Route.useLoaderData()
  const navigate = Route.useNavigate()

  const handleBack = () => {
    navigate({ to: '/' })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  const handleVerify = (trxId: string, phone?: string) => {
    console.log(`${provider} Transaction ID:`, trxId, 'Phone:', phone, 'Type:', type, 'Hash:', hash)
    // Here you would typically make an API call to verify the transaction
  }

  const commonProps = {
    onBack: handleBack,
    onCancel: handleCancel,
    onVerify: handleVerify,
    gateway: gateway || undefined
  }

  switch (provider.toLowerCase()) {
    case 'bkash':
      return <BkashMFSPage {...commonProps} />
    case 'nagad':
      return <NagadMFSPage {...commonProps} />
    case 'rocket':
      return <RocketMFSPage {...commonProps} />
    case 'cellfin':
      return <CellfinMFSPage {...commonProps} />
    case 'upay':
      return <UpayMFSPage {...commonProps} />
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Invalid Provider</h1>
            <button onClick={handleBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Go Back
            </button>
          </div>
        </div>
      )
  }
}