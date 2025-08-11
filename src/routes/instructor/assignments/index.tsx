import AssignmentTable from "@/components/assignments/Assignments";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/instructor/assignments/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-tight pb-4">
            Assignments
          </h1>
        </div>
        <AssignmentTable />
      </main>
    </DashboardShell>
  );
}
