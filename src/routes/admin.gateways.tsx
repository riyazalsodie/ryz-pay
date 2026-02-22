import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faEllipsisVertical, faPen, faTrash, faXmark, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    type SortingState,
    type ColumnDef,
} from '@tanstack/react-table'
import { cn } from '../lib/utils'
import { toast } from 'sonner'
import { Switch } from '../components/Switch'

import bkashImg from '/assets/bkash.png'
import nagadImg from '/assets/nagad.png'
import rocketImg from '/assets/rocket.png'
import upayImg from '/assets/upay.png'
import cellfinImg from '/assets/cellfin.png'
import ibblImg from '/assets/650b4744ef1353-87739222-60070744.png'

const getGatewayImage = (identifier: string | null | undefined) => {
    switch (identifier?.toLowerCase()) {
        case 'bkash': return bkashImg
        case 'nagad': return nagadImg
        case 'rocket': return rocketImg
        case 'upay': return upayImg
        case 'cellfin': return cellfinImg
        case 'ibbl': return ibblImg
        default: return bkashImg
    }
}

export const Route = createFileRoute('/admin/gateways')({
    component: AdminGateways,
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
    type: string
    identifier?: string
    subType?: string
}

function AdminGateways() {
    const [gateways, setGateways] = useState<Gateway[]>([])
    const [loading, setLoading] = useState(true)
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState<SortingState>([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const navigate = useNavigate()

    const fetchGateways = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
            const response = await fetch(`${apiUrl}/api/gateways`)
            if (response.ok) {
                const data = await response.json()
                setGateways(data)
            } else {
                toast.error('Failed to fetch gateways')
            }
        } catch (error) {
            console.error('Failed to fetch gateways', error)
            toast.error('Network error fetching gateways')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGateways()
    }, [])

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
            const response = await fetch(`${apiUrl}/api/gateways/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: !currentStatus })
            })

            if (response.ok) {
                setGateways(gateways.map(g => g.id === id ? { ...g, status: !currentStatus } : g))
                toast.success(`Gateway ${!currentStatus ? 'activated' : 'deactivated'}`)
            } else {
                toast.error('Failed to update status')
            }
        } catch (error) {
            toast.error('Error updating status')
        }
    }

    const deleteGateway = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gateway?')) return

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
            const response = await fetch(`${apiUrl}/api/gateways/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setGateways(gateways.filter(g => g.id !== id))
                toast.success('Gateway deleted')
            } else {
                toast.error('Failed to delete gateway')
            }
        } catch (error) {
            toast.error('Error deleting gateway')
        }
    }

    const columns = useMemo<ColumnDef<Gateway>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
                        className="rounded border-white/20 bg-white/5 text-white focus:ring-white/50 focus:ring-offset-[#0A0A0A]"
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={(e) => row.toggleSelected(!!e.target.checked)}
                        className="rounded border-white/20 bg-white/5 text-white focus:ring-white/50 focus:ring-offset-[#0A0A0A]"
                    />
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'displayName',
                header: 'Display name',
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-white/10">
                            {row.original.logo ? (
                                <img src={row.original.logo} alt={row.original.displayName} className="w-full h-full object-contain" />
                            ) : (
                                <img
                                    src={getGatewayImage(row.original.identifier)}
                                    alt={row.original.displayName}
                                    className="w-full h-full object-contain p-1"
                                />
                            )}
                        </div>
                        <div>
                            <span className="font-medium text-white block">{row.original.displayName}</span>
                            <span className="text-xs text-gray-500 capitalize">{row.original.subType || row.original.type}</span>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'currency',
                header: 'Currency',
                cell: ({ row }) => <span className="text-gray-300">{row.original.currency}</span>,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => (
                    <div className="flex items-center">
                         <motion.button
                            onClick={() => toggleStatus(row.original.id, row.original.status)}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-0 ring-0 border-0",
                                row.original.status ? "bg-white" : "bg-white/20"
                            )}
                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                            layout
                        >
                            <motion.span
                                layout
                                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full",
                                    row.original.status ? "bg-black" : "bg-white"
                                )}
                                animate={{
                                    x: row.original.status ? 22 : 2
                                }}
                            />
                        </motion.button>
                    </div>
                ),
            },
            {
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                window.location.href = `/admin/gateways/${row.original.id}`
                            }}
                            className="flex items-center gap-1 text-sm text-white hover:text-gray-200 transition-colors cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                            Edit
                        </button>
                        <button
                            onClick={() => deleteGateway(row.original.id)}
                            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [gateways, navigate]
    )

    const table = useReactTable({
        data: gateways,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Gateways</span>
                    <span className="text-gray-600">›</span>
                    <span className="text-gray-300">List</span>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Gateways</h1>
                    <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors text-sm font-medium"
                        >
                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                            New gateway
                        </button>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-end">
                    <div className="relative">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                            type="text"
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 placeholder-gray-600 transition-colors"
                        />
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-white animate-spin mb-4" />
                            <p className="text-gray-400">Loading gateways...</p>
                        </div>
                    ) : gateways.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" className="text-gray-600" />
                            </div>
                            <p className="text-lg font-medium text-gray-400">No gateways found</p>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="text-white hover:text-gray-200 text-sm font-medium"
                            >
                                Create your first gateway
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-3 font-semibold">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="hover:bg-white/5 transition-colors">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-gray-300">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <CreateGatewayModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    )
}

function CreateGatewayModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    if (!isOpen) return null

    const options = [
        { id: 'bkash_agent', name: 'Bkash Agent', type: 'manual' },
        { id: 'bkash_api', name: 'bKash API (Checkout)', type: 'api' },
        { id: 'bkash_merchant', name: 'Bkash Merchant', type: 'manual' },
        { id: 'bkash_personal', name: 'Bkash Personal', type: 'manual' },
        { id: 'nagad_personal', name: 'Nagad Personal', type: 'manual' },
        { id: 'nagad_agent', name: 'Nagad Agent', type: 'manual' },
        { id: 'nagad_merchant', name: 'Nagad Merchant', type: 'manual' },
        { id: 'rocket_personal', name: 'Rocket Personal', type: 'manual' },
        { id: 'rocket_agent', name: 'Rocket Agent', type: 'manual' },
        { id: 'rocket_merchant', name: 'Rocket Merchant', type: 'manual' },
        { id: 'upay_personal', name: 'Upay Personal', type: 'manual' },
        { id: 'upay_agent', name: 'Upay Agent', type: 'manual' },
        { id: 'upay_merchant', name: 'Upay Merchant', type: 'manual' },
        { id: 'cellfin_personal', name: 'Cellfin Personal', type: 'manual' },
        { id: 'ibbl_api', name: 'Islamic Bank (IBBL)', type: 'manual' },
    ]

    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCreate = async () => {
        if (!selectedOption) return

        const selected = options.find(o => o.id === selectedOption)
        if (!selected) return

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
            const response = await fetch(`${apiUrl}/api/gateways`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: selected.name,
                    displayName: selected.name,
                    type: selected.type,
                    identifier: selected.id.split('_')[0],
                    subType: selected.id.split('_')[1],
                    status: false,
                    currency: 'BDT',
                    minAmount: 0,
                    maxAmount: 0,
                    fixedCharge: 0,
                    percentCharge: 0,
                    fixedDiscount: 0,
                    percentDiscount: 0,
                    config: {}
                })
            })

            if (response.ok) {
                const newGateway = await response.json()
                onClose()
                navigate({ to: `/admin/gateways/${newGateway.id}` })
                toast.success('Gateway created')
            } else {
                toast.error('Failed to create gateway')
            }
        } catch (error) {
            toast.error('Error creating gateway')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Create Gateway</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Gateway <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <div
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    document.getElementById('gateway-search')?.focus()
                                    setIsDropdownOpen(true)
                                }}
                            >
                                <input
                                    id="gateway-search"
                                    type="text"
                                    className="bg-transparent border-none outline-none w-full placeholder-gray-600 text-white"
                                    placeholder="Select an option"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        setSelectedOption(null)
                                        setIsDropdownOpen(true)
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                />
                                <div className="text-gray-500">▼</div>
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map(option => (
                                            <div
                                                key={option.id}
                                                className="px-4 py-2 hover:bg-white/10 cursor-pointer text-gray-300 flex items-center justify-between"
                                                onClick={() => {
                                                    setSelectedOption(option.id)
                                                    setSearchTerm(option.name)
                                                    setIsDropdownOpen(false)
                                                }}
                                            >
                                                <span>{option.name}</span>
                                                {selectedOption === option.id && <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white" />}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-600 text-sm">No options found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/10 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!selectedOption}
                        className="px-4 py-2 bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-medium rounded-lg transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
