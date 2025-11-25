import { DashboardShell } from "@/components/dashboard-shell";
import { EarningsChart } from "@/components/charts/EarningChart";
import EarningsSummary from "@/components/earning/EarningsSummary";

import { createFileRoute } from "@tanstack/react-router";
import WithdrawalSection from "@/components/earning/WithdrawalButton";
import PayoutTable from "@/components/earning/PayoutTable";
import TopCourses from "@/components/earning/TopCourses";
import { useInstructorEarnings } from "@/hooks/use-instructor";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/instructor/earnings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();

  const { data, isLoading, error } = useInstructorEarnings();
  
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

        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="Earnings"
        />
           {!isLoading && !isForbidden && !error && (<>
        <EarningsSummary summary={summary} />
        <WithdrawalSection withdrawal={withdrawal} />
        <EarningsChart data={chartData} />
        <TopCourses courses={topCourses} />
        <PayoutTable payouts={payouts} />
           </>
             )}
      </main>
    </DashboardShell>
  );
}
