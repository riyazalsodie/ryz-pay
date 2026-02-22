import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Loader2
} from 'lucide-react'
import { cn } from '../lib/utils'

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    )
}

export const Route = createFileRoute('/admin/gateways/$id')({
    component: EditGateway,
})

interface Gateway {
    id: string
    name: string
    displayName: string
    currency: string
    status: boolean
    logo?: string
    minAmount: number
    maxAmount: number
    fixedCharge: number
    percentCharge: number
    fixedDiscount: number
    percentDiscount: number
    type: string
    identifier: string
    subType: string
    config: any
    qrCode?: string
    instructions?: string
    number?: string
    pendingPayment?: boolean
}

function EditGateway() {
    const { id } = Route.useParams()
    const navigate = useNavigate()
    const [gateway, setGateway] = useState<Gateway | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchGateway = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
                const response = await fetch(`${apiUrl}/api/gateways/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setGateway(data)
                } else {
                    toast.error('Failed to fetch gateway details')
                    navigate({ to: '/admin/gateways' })
                }
            } catch (error) {
                console.error('Error fetching gateway:', error)
                toast.error('Network error')
            } finally {
                setLoading(false)
            }
        }
        fetchGateway()
    }, [id, navigate])

    const handleSave = async () => {
        if (!gateway) return

        setSaving(true)
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
            const response = await fetch(`${apiUrl}/api/gateways/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gateway)
            })

            if (response.ok) {
                toast.success('Gateway updated successfully')
                navigate({ to: '/admin/gateways' })
            } else {
                toast.error('Failed to update gateway')
            }
        } catch (error) {
            console.error('Error updating gateway:', error)
            toast.error('Network error')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!gateway) return null

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate({ to: '/admin/gateways' })}
                        className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">Edit Gateway</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate({ to: '/admin/gateways' })}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save changes
                    </button>
                </div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-white mb-1">Gateway Information</h2>
                    <p className="text-sm text-gray-400">Basic gateway configuration and settings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Gateway Name</label>
                        <input
                            type="text"
                            value={gateway.name}
                            onChange={(e) => setGateway({ ...gateway, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500">The internal name of the gateway provider</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Display Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={gateway.displayName}
                            onChange={(e) => setGateway({ ...gateway, displayName: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500">The name displayed to users during checkout</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Minimum Amount <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.minAmount}
                                onChange={(e) => setGateway({ ...gateway, minAmount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                        </div>
                        <p className="text-xs text-gray-500">The minimum transaction amount allowed</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Maximum Amount <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.maxAmount}
                                onChange={(e) => setGateway({ ...gateway, maxAmount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                        </div>
                        <p className="text-xs text-gray-500">The maximum transaction amount allowed</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Fixed Discount <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.fixedDiscount}
                                onChange={(e) => setGateway({ ...gateway, fixedDiscount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                        </div>
                        <p className="text-xs text-gray-500">Fixed discount amount applied per transaction</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Percentage Discount <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.percentDiscount}
                                onChange={(e) => setGateway({ ...gateway, percentDiscount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                        </div>
                        <p className="text-xs text-gray-500">Percentage discount applied per transaction</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Fixed Charge <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.fixedCharge}
                                onChange={(e) => setGateway({ ...gateway, fixedCharge: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                        </div>
                        <p className="text-xs text-gray-500">Fixed fee charged per transaction</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Percentage Charge <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={gateway.percentCharge}
                                onChange={(e) => setGateway({ ...gateway, percentCharge: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-4 pr-16 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                        </div>
                        <p className="text-xs text-gray-500">Percentage fee charged per transaction</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">QR Code</label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={gateway.qrCode || ''}
                                onChange={(e) => setGateway({ ...gateway, qrCode: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        {gateway.qrCode ? (
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
                                <img src={gateway.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                            </div>
                        ) : (
                            <div className="w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                                <ImageIcon className="text-gray-600 w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">Upload a QR code image for this gateway</p>
                </div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Configuration</label>
                    <p className="text-xs text-gray-500">Gateway-specific configuration parameters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Number <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={gateway.number || (gateway.config as any)?.walletNumber || ''}
                            onChange={(e) => setGateway({
                                ...gateway,
                                number: e.target.value,
                                config: { ...gateway.config, walletNumber: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Pending Payment</label>
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1F2937] border border-gray-700 rounded-lg">
                            <span className="text-gray-300">Enable Pending Payment</span>
                            <ToggleSwitch
                                checked={gateway.pendingPayment || false}
                                onChange={(checked) => setGateway({ ...gateway, pendingPayment: checked })}
                            />
                        </div>
                    </div>

                    {gateway.identifier === 'ibbl' && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Bank Name</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.bankName || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), bankName: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Account Name</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.accountName || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), accountName: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Account Number</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.accountNumber || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), accountNumber: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Branch Name</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.branchName || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), branchName: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Routing Number</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.routingNumber || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), routingNumber: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Swift Code</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.swiftCode || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), swiftCode: e.target.value }
                                    })}
                                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300">Disable</label>
                        <p className="text-xs text-gray-500">Toggle gateway status on/off</p>
                    </div>
                    <ToggleSwitch
                        checked={!gateway.status}
                        onChange={(checked) => setGateway({ ...gateway, status: !checked })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    onClick={() => navigate({ to: '/admin/gateways' })}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save changes
                </button>
            </div>
        </div>
    )
}
