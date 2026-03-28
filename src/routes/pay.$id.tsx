import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/pay/$id')({
  component: () => <Outlet />,
})
