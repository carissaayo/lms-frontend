import { createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard-shell";

import useAuthStore from "@/store/useAuthStore";
import OverviewCards from "@/components/home/OverviewCards";
import QuickActions from "@/components/home/QuickActions";
import UpcomingTasks from "@/components/home/UpcomingTasks";
import RecentActivity from "@/components/home/RecentActivities";
import NotificationsPanel from "@/components/home/Notifications";
export const Route = createFileRoute("/instructor/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);

  return (
    <DashboardShell>
      <main className="mb-8">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 ">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              {" "}
              👋 Welcome back, {`${user.firstName}!`}
            </h1>
            <p className="">
              Manage your courses, assignments, and student progress
            </p>
          </div>
        </div>

        <OverviewCards />
        <QuickActions />
        <div className="w-full flex my-8 items-center ">
          <UpcomingTasks />
        </div>

        <RecentActivity />

        <NotificationsPanel />
      </main>
    </DashboardShell>
  );
}
