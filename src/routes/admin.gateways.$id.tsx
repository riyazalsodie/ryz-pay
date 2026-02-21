import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
    Save,
    ArrowLeft,
    Upload,
    Image as ImageIcon,
    Loader2,
    Trash2
} from 'lucide-react'
import { Switch } from '../components/Switch'
import { cn } from '../lib/utils'

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
}

function EditGateway() {
    const { id } = Route.useParams()
    const navigate = useNavigate()
    const [gateway, setGateway] = useState<Gateway | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<'basic' | 'config' | 'instructions'>('basic')

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
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="cursor-pointer hover:text-white" onClick={() => navigate({ to: '/admin/gateways' })}>Gateways</span>
                    <span className="text-gray-600">›</span>
                    <span className="text-gray-200">{gateway.displayName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate({ to: '/admin/gateways' })}
                            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Edit Gateway</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-900/20"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-4">Basic Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Gateway Type</label>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium uppercase">{gateway.identifier}</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium uppercase">{gateway.type}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Display Name</label>
                                <input
                                    type="text"
                                    value={gateway.displayName}
                                    onChange={(e) => setGateway({ ...gateway, displayName: e.target.value })}
                                    className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Currency</label>
                                <input
                                    type="text"
                                    value={gateway.currency}
                                    onChange={(e) => setGateway({ ...gateway, currency: e.target.value })}
                                    className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Logo URL</label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={gateway.logo || ''}
                                        onChange={(e) => setGateway({ ...gateway, logo: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
                                    {gateway.logo ? (
                                        <img src={gateway.logo} alt="Preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <ImageIcon className="text-gray-600 w-5 h-5" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Limits & Charges Card */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-4">Limits & Charges</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Minimum Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={gateway.minAmount}
                                        onChange={(e) => setGateway({ ...gateway, minAmount: parseFloat(e.target.value) || 0 })}
                                        className="w-full pl-4 pr-12 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Maximum Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={gateway.maxAmount}
                                        onChange={(e) => setGateway({ ...gateway, maxAmount: parseFloat(e.target.value) || 0 })}
                                        className="w-full pl-4 pr-12 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Fixed Charge</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={gateway.fixedCharge}
                                        onChange={(e) => setGateway({ ...gateway, fixedCharge: parseFloat(e.target.value) || 0 })}
                                        className="w-full pl-4 pr-12 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{gateway.currency}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Percent Charge</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={gateway.percentCharge}
                                        onChange={(e) => setGateway({ ...gateway, percentCharge: parseFloat(e.target.value) || 0 })}
                                        className="w-full pl-4 pr-12 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Card */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-4">Payment Instructions</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Instruction Text (supports HTML)</label>
                            <textarea
                                value={gateway.instructions || ''}
                                onChange={(e) => setGateway({ ...gateway, instructions: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
                                placeholder="<h3>How to pay</h3><p>Send money to...</p>"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & Config */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Enable Gateway</span>
                            <Switch
                                checked={gateway.status}
                                onCheckedChange={(checked) => setGateway({ ...gateway, status: checked })}
                            />
                        </div>
                    </div>

                    {/* Type Configuration Card */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-4">
                            {gateway.identifier?.toUpperCase()} Configuration
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Sub Type</label>
                            <select
                                value={gateway.subType || ''}
                                onChange={(e) => setGateway({ ...gateway, subType: e.target.value })}
                                className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="personal">Personal</option>
                                <option value="agent">Agent</option>
                                <option value="merchant">Merchant</option>
                                <option value="api">API</option>
                            </select>
                        </div>

                        {gateway.identifier === 'ibbl' ? (
                            <div className="space-y-4 pt-4 border-t border-gray-800">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Bank Name</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.bankName || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), bankName: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Account Name</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.accountName || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), accountName: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Account Number</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.accountNumber || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), accountNumber: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Branch Name</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.branchName || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), branchName: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Routing Number</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.routingNumber || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), routingNumber: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Swift Code</label>
                                    <input
                                        type="text"
                                        value={(gateway.config as any)?.swiftCode || ''}
                                        onChange={(e) => setGateway({
                                            ...gateway,
                                            config: { ...(gateway.config as object), swiftCode: e.target.value }
                                        })}
                                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Wallet Number</label>
                                <input
                                    type="text"
                                    value={(gateway.config as any)?.walletNumber || ''}
                                    onChange={(e) => setGateway({
                                        ...gateway,
                                        config: { ...(gateway.config as object), walletNumber: e.target.value }
                                    })}
                                    placeholder="017..."
                                    className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        )}

                        {/* QR Code */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">QR Code URL</label>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={gateway.qrCode || ''}
                                    onChange={(e) => setGateway({ ...gateway, qrCode: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {gateway.qrCode && (
                                    <div className="w-full aspect-square bg-white rounded-lg p-2 flex items-center justify-center">
                                        <img src={gateway.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Config Fields - Dynamic based on type if needed */}
                        {/* Currently using simple fields, can expand to use gateway.config object */}
                    </div>
                </div>
            </div>
        </div>
    )
}
