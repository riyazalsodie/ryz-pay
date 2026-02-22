import { createFileRoute } from '@tanstack/react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter, faEllipsisVertical, faArrowsUpDown, faDownload, faRotateRight, faCircleCheck, faClock, faCircleXmark, faCircleExclamation, faTrash, faRotateLeft, faXmark, faChevronDown, faList, faChevronLeft, faChevronRight, faEye, faReceipt, faCopy } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper,
    type SortingState,
    type ColumnDef,
} from '@tanstack/react-table'
import { cn } from '../lib/utils'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/payments')({
    component: AdminPayments,
})

type PaymentStatus = 'ALL' | 'COMPLETED' | 'PENDING' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'FAILED' | 'VOIDED' | 'INITIATED' | 'TRASHED'

interface Payment {
    id: string
    amount: number
    currency: string
    status: string
    method: string | null
    createdAt: string
    user?: {
        name: string | null
        email: string | null
    }
}

function AdminPayments() {
    const [activeTab, setActiveTab] = useState<PaymentStatus>('ALL')
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3201'
                const response = await fetch(`${apiUrl}/api/transactions`)
                if (response.ok) {
                    const data = await response.json()
                    setPayments(data)
                } else {
                    toast.error('Failed to fetch payments')
                }
            } catch (error) {
                console.error('Failed to fetch payments', error)
                toast.error('Network error fetching payments')
            } finally {
                setLoading(false)
            }
        }
        fetchPayments()
    }, [])

    const filteredData = useMemo(() => {
        if (activeTab === 'ALL') return payments
        return payments.filter((payment) => payment.status === activeTab)
    }, [payments, activeTab])

    const columns = useMemo<ColumnDef<Payment>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
                        className="rounded border-white/20 bg-white/10 text-white focus:ring-white/50 focus:ring-offset-gray-900"
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={(e) => row.toggleSelected(!!e.target.checked)}
                        className="rounded border-white/20 bg-white/10 text-white focus:ring-white/50 focus:ring-offset-gray-900"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'user.name',
                header: ({ column }) => {
                    return (
                        <button
                            className="flex items-center gap-2 hover:text-white transition-colors"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Customer
                            <FontAwesomeIcon icon={faArrowsUpDown} className="ml-2 h-3 w-3" />
                        </button>
                    )
                },
                cell: ({ row }) => {
                    const user = row.original.user
                    return (
                        <div className="flex flex-col">
                            <span className="font-medium text-white">{user?.name || 'Unknown User'}</span>
                            <span className="text-xs text-gray-500">{user?.email}</span>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'method',
                header: 'Gateway',
                cell: ({ row }) => row.original.method || 'N/A',
            },
            {
                accessorKey: 'amount',
                header: ({ column }) => (
                    <button
                        className="flex items-center gap-2 hover:text-white transition-colors"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Amount
                        <FontAwesomeIcon icon={faArrowsUpDown} className="ml-2 h-3 w-3" />
                    </button>
                ),
                cell: ({ row }) => (
                    <div className="font-medium text-white">
                        {row.original.currency} {row.original.amount.toFixed(2)}
                    </div>
                ),
            },
            {
                id: 'net_amount',
                header: 'Net Amount',
                cell: ({ row }) => (
                    <div className="text-gray-400">
                        {row.original.currency} {row.original.amount.toFixed(2)}
                    </div>
                ),
            },
            {
                accessorKey: 'id',
                header: 'Transaction ID',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
                        navigator.clipboard.writeText(row.original.id)
                        toast.success('Copied to clipboard')
                    }}>
                        <span className="font-mono text-xs text-gray-400 group-hover:text-white/60 transition-colors">
                            {row.original.id.substring(0, 8)}...
                        </span>
                        <FontAwesomeIcon icon={faCopy} className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: ({ column }) => (
                    <button
                        className="flex items-center gap-2 hover:text-white transition-colors"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Date
                        <FontAwesomeIcon icon={faArrowsUpDown} className="ml-2 h-3 w-3" />
                    </button>
                ),
                cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM d, yyyy HH:mm'),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.original.status
                    return (
                        <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium border",
                            status === 'SUCCESS' || status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            status === 'REFUNDED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                            'bg-red-500/10 text-red-500 border-red-500/20'
                        )}>
                            {status}
                        </span>
                    )
                },
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    return (
                        <div className="relative group">
                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
                            </button>
                            {/* Simple Dropdown using group-hover for now, or use a state if needed.
                                Since we don't have a Dropdown component, sticking to a button for now
                                that logs or shows toast as placeholder
                            */}
                        </div>
                    )
                },
            },
        ],
        []
    )

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter,
            rowSelection,
        },
    })

    const tabs: { id: PaymentStatus; label: string; icon?: any }[] = [
        { id: 'ALL', label: 'All' },
        { id: 'COMPLETED', label: 'Completed', icon: faCircleCheck },
        { id: 'PENDING', label: 'Pending', icon: faClock },
        { id: 'REFUNDED', label: 'Refunded', icon: faRotateLeft },
        { id: 'PARTIALLY_REFUNDED', label: 'Partially refunded' },
        { id: 'FAILED', label: 'Failed', icon: faCircleXmark },
        { id: 'VOIDED', label: 'Voided', icon: faCircleXmark },
        { id: 'INITIATED', label: 'Initiated' },
        { id: 'TRASHED', label: 'Trashed', icon: faTrash },
    ]

    // Stats calculation
    const stats = useMemo(() => {
        const total = payments.length
        const completed = payments.filter(p => p.status === 'COMPLETED' || p.status === 'SUCCESS').length
        const pending = payments.filter(p => p.status === 'PENDING').length
        const failed = payments.filter(p => p.status === 'FAILED').length
        const totalAmount = payments.reduce((acc, curr) => acc + curr.amount, 0)

        return { total, completed, pending, failed, totalAmount }
    }, [payments])

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Payments</span>
                    <span className="text-gray-600">›</span>
                    <span className="text-gray-200">List</span>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Payments</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium border border-white/20">
                            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                            Export CSV
                        </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="text-gray-400 text-sm font-medium">Total Volume</div>
                    <div className="text-2xl font-bold text-white mt-1">
                        BDT {stats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="text-gray-400 text-sm font-medium">Completed</div>
                    <div className="text-2xl font-bold text-green-400 mt-1">{stats.completed}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="text-gray-400 text-sm font-medium">Pending</div>
                    <div className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="text-gray-400 text-sm font-medium">Failed</div>
                    <div className="text-2xl font-bold text-red-400 mt-1">{stats.failed}</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                            activeTab === tab.id
                                ? 'bg-white/10 text-white shadow-lg shadow-white/10 border border-white/20'
                                : 'bg-[#1E293B] text-gray-400 hover:bg-[#2A3855] hover:text-gray-200'
                        )}
                    >
                        {tab.icon && <FontAwesomeIcon icon={tab.icon} size={14} />}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-xl">
                {/* Card Header */}
                <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                         <div className="relative">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative">
                                <FontAwesomeIcon icon={faFilter} className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 text-[10px] flex items-center justify-center rounded-full text-white border border-white/10">0</span>
                            </button>
                         </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 w-64 placeholder-gray-500 transition-colors"
                            />
                        </div>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faList} className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="relative overflow-x-auto">
                    {loading ? (
                         <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                            <FontAwesomeIcon icon={faRotateRight} className="w-8 h-8 text-white/50 animate-spin" />
                            <p className="text-gray-400">Loading payments...</p>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <FontAwesomeIcon icon={faXmark} size="2x" className="text-gray-600" />
                            </div>
                            <p className="text-lg font-medium text-gray-400">No payments found</p>
                            <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-3 font-semibold">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={cn(
                                            "hover:bg-white/5 transition-colors group",
                                            row.getIsSelected() && "bg-white/10"
                                        )}
                                    >
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

                {/* Footer Pagination */}
                {filteredData.length > 0 && (
                    <div className="p-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Showing {table.getRowModel().rows.length} of {filteredData.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 mr-4">
                                <span className="text-sm text-gray-400">Rows per page</span>
                                <select
                                    value={table.getState().pagination.pageSize}
                                    onChange={(e) => {
                                        table.setPageSize(Number(e.target.value))
                                    }}
                                    className="bg-white/10 border border-white/10 text-white rounded px-2 py-1 text-sm focus:outline-none focus:border-white/30"
                                >
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
