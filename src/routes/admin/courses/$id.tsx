import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/courses/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/courses/$id"!</div>
}
