import { createFileRoute } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Payment = {
  id: string
  amount: number
  provider: string
}

const defaultData: Payment[] = [
  {
    id: '1',
    amount: 100,
    provider: 'bKash',
  },
  {
    id: '2',
    amount: 250,
    provider: 'Nagad',
  },
]

const columnHelper = createColumnHelper<Payment>()

const columns = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor('provider', {
    header: () => <span>Provider</span>,
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Amount</span>,
  }),
]

export const Route = createFileRoute('/tanstack-test')({
  component: TanStackTest,
})

function TanStackTest() {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">TanStack Ecosystem Test</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 p-2 text-left bg-gray-100">
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
