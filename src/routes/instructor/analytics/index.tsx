import { createFileRoute } from "@tanstack/react-router";

import CourseCompletionRates from "@/components/charts/CourseCompletionRates";
import MonthlyEnrollmentChart from "@/components/charts/MonthlyEnrollmentChart";
import RevenueByCourse from "@/components/charts/RevenueByCourse";
import { DashboardShell } from "@/components/dashboard-shell";
import { WeeklyEnrollmentChart } from "@/components/charts/WeeklyEnrollmentChart";
import { AverageTimeToCompletion } from "@/components/charts/AverageTimeToCompletion";
import { NewStudentsOverTime } from "@/components/charts/NewStudentsOverTime";
import { TopStudentFeedback } from "@/components/analytics/TopStudentsFeedback";

export const Route = createFileRoute("/instructor/analytics/")({
  component: RouteComponent,
});
export default function RouteComponent() {
  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-tight pb-4">
            Analytics
          </h1>
        </div>
        {/* Side-by-side charts */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <MonthlyEnrollmentChart />
          </div>
          <div className="flex-1">
            <WeeklyEnrollmentChart />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <RevenueByCourse />
          </div>
          <div className="flex-1">
            <CourseCompletionRates />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <AverageTimeToCompletion />
          </div>
          <div className="flex-1">
            <NewStudentsOverTime />
          </div>{" "}
          <div className="flex-1">
            <NewStudentsOverTime />
          </div>
        </div>
        <div className="">
          <TopStudentFeedback />
        </div>
      </main>
    </DashboardShell>
  );
}
