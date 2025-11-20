import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DashboardShell } from "@/components/dashboard-shell";
import { useAdminAnalytics } from "@/hooks/use-analytics";

import useAuthStore from "@/store/useAuthStore";
import Forbidden from "@/components/forbidden";
import AnalyticStatsCon from "@/components/analytics/admin/analyticStatsCon";
import { AnalyticsResponse } from "@/types/adminAnalytics.types";
import EnrollmentStats from "@/components/analytics/admin/EnrollmentStats";
import GrowthTrendRevenuCharts from "@/components/analytics/admin/GrowthTrendRevenuCharts";
import CourseDistributionStats from "@/components/analytics/admin/CourseDistributionStats";

import TopInstructorsAndTopCourses from "@/components/analytics/admin/TopInstructors";
import EngagementMetricsCon from "@/components/analytics/admin/EngagementMetrics";
import SummaryInsight from "@/components/analytics/admin/SummaryInsight";

export const Route = createFileRoute("/admin/analytics/")({
  component: RouteComponent,
});



function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();
  const [timeRange, setTimeRange] = useState("6months");
  const { data, isLoading, error } = useAdminAnalytics(timeRange);

  const analytics: AnalyticsResponse = data?.analytics;

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "7days":
        return "Last 7 Days";
      case "1month":
        return "Last Month";
      case "3months":
        return "Last 3 Months";
      case "6months":
        return "Last 6 Months";
      case "1year":
        return "Last Year";
      default:
        return "All Time";
    }
  };

  return (
    <DashboardShell>
      <main className="space-y-8 mb-10 p-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Analytics Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Comprehensive platform insights and performance metrics
              <span className="text-blue-600 font-medium ml-2">
                • {getTimeRangeLabel(timeRange)}
              </span>
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        {isForbidden && error && <Forbidden />}
        {error && !isForbidden && (
          <p className="text-red-600 text-center mt-10">
            Failed to load analytics.
          </p>
        )}

        {!isLoading && !isForbidden && (
          <>
            {/* Overview Stats */}
            <AnalyticStatsCon overview={analytics?.overview} />

            {/* Enrollments & Withdrawals */}
            <EnrollmentStats
              overview={analytics.overview}
              engagementMetrics={analytics.engagementMetrics}
            />

            {/* Growth Trends & Revenue */}
            <GrowthTrendRevenuCharts
              growthData={analytics.growthData}
              revenueData={analytics.revenueData}
            />

            {/* Course Distribution & Status */}
            <CourseDistributionStats
              courseStats={analytics.courseStats}
              categoryDistribution={analytics.categoryDistribution}
            />

            {/* Top Instructors & Courses */}
            <TopInstructorsAndTopCourses topCourses={analytics.topCourses} topInstructors={analytics.topInstructors} />

            {/* Engagement Metrics & Withdrawal Reasons */}
           <EngagementMetricsCon engagementMetrics={analytics.engagementMetrics} recentWithdrawals={analytics.recentWithdrawals}/>

            {/* Summary Insights */}
            <SummaryInsight overview={analytics.overview}/>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
