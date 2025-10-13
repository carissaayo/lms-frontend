import { DashboardShell } from "@/components/dashboard-shell";
import { EarningsChart } from "@/components/charts/EarningChart";
import EarningsSummary from "@/components/earning/EarningsSummary";

import { createFileRoute } from "@tanstack/react-router";
import WithdrawalSection from "@/components/earning/WithdrawalButton";
import PayoutTable from "@/components/earning/PayoutTable";
import TopCourses from "@/components/earning/TopCourses";
import { useInstructorEarnings } from "@/hooks/use-instructor";

export const Route = createFileRoute("/instructor/earnings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useInstructorEarnings();

  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Failed to load earnings data.</p>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  const { summary, withdrawal, chartData, topCourses, payouts } = data || {};

  return (
    <DashboardShell>
      <main className="mb-20">
        <div className="w-full mb-8">
          <h1 className="text-3xl font-bold font-primary tracking-tight">
            Your Earnings
          </h1>
          <p className="text-gray-600">Track your revenue and manage payouts</p>
        </div>

        <EarningsSummary summary={summary} />
        <WithdrawalSection withdrawal={withdrawal} />
        <EarningsChart data={chartData} />
        <TopCourses courses={topCourses} />
        <PayoutTable payouts={payouts} />
      </main>
    </DashboardShell>
  );
}
