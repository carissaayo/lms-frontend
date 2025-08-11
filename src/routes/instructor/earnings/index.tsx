import BestSellingCourse from "@/components/courses/BestSellingCourse";
import { DashboardShell } from "@/components/dashboard-shell";
import { EarningsChart } from "@/components/charts/EarningChart";
import EarningsSummary from "@/components/earning/EarningsSummary";
import { PayoutTable } from "@/components/earning/PayoutTable";
import { TopCourses } from "@/components/earning/TopCourses";
import { WithdrawalButton } from "@/components/earning/WithdrawalButton";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/instructor/earnings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardShell>
      <main className="mb-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-tight pb-8">
            Your Earnings
          </h1>
        </div>
        <EarningsSummary />

        <EarningsChart />
        <TopCourses />
        <PayoutTable />
        <WithdrawalButton />
      </main>
    </DashboardShell>
  );
}
