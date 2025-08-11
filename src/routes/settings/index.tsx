import { DashboardShell } from "@/components/dashboard-shell";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PasswordChangeForm from "@/components/settings/PasswordForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-tight pb-4">
            Settings
          </h1>
        </div>
        <NotificationSettings />
        <PasswordChangeForm />
      </main>
    </DashboardShell>
  );
}
