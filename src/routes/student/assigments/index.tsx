import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/assigments/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/student/assigments/"!</div>
}
