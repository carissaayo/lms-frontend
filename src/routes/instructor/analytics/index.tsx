import { useState } from "react";
import { motion } from "framer-motion";

import { DashboardShell } from "@/components/dashboard-shell";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { useInstructorAnalytics } from "@/hooks/use-analytics";
import { CourseStatusCard } from "@/components/analytics/instructor/CourseStatusCard";

import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import { InstructorAnalytics } from "@/types/instructor.types";
import useAuthStore from "@/store/useAuthStore";
import InstructorStatsCon from "@/components/analytics/instructor/InstructorStatsCon";
import RevenueAndEnrollmentCharts from "@/components/analytics/instructor/RevenueAndEnrollmentCharts";

import TopSellingCourseCon from "@/components/analytics/instructor/TopSellingCourse";
import CoursePerformance from "@/components/analytics/instructor/CoursePerformance";
import AdditionalStatsCon from "@/components/analytics/instructor/AdditionalStatsCon";
import InsightPanel from "@/components/analytics/instructor/InsightPanel";

export const Route = createFileRoute("/instructor/analytics/")({
  component: InstructorAnalyticsPage,
});

function InstructorAnalyticsPage() {
  const { isForbidden } = useAuthStore.getState();

  const [timeRange, setTimeRange] = useState("6months");

  const { data, isLoading, error } = useInstructorAnalytics(timeRange);

  const analytics: InstructorAnalytics = data?.analytics;

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
      <main className="space-y-8 mb-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Instructor Analytics
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Monitor your course performance, revenue, and student engagement
              {timeRange && (
                <span className="text-blue-600 font-medium ml-2">
                  • {getTimeRangeLabel(timeRange)}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lll">All Time</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="Analytics"
        />

        {!isLoading && !isForbidden && !error && (
          <>
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <InstructorStatsCon
                courseStats={analytics.courseStats}
                studentStats={analytics.studentStats}
                revenueStats={analytics.revenueStats}
              />
            </motion.div>
            {/* Course Stats and Revenue Chart */}

            <div className="grid gap-8 lg:grid-cols-3">
              <CourseStatusCard courses={analytics?.courseStats || {}} />

              <RevenueAndEnrollmentCharts
                revenueStats={analytics.revenueStats}
              />
            </div>

            {/* Top Performing Courses and Recent Courses */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <TopSellingCourseCon
                topSellingCourses={analytics.topSellingCourses}
                recentCourses={analytics.recentCourses}
              />
            </motion.div>

            {/* Course Performance and Engagement */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <CoursePerformance
                coursePerformance={analytics.coursePerformance}
                engagementData={analytics.engagementData}
              />
            </motion.div>

            {/* Additional Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <AdditionalStatsCon
                revenueStats={analytics.revenueStats}
                coursePerformance={analytics.coursePerformance}
              />
            </motion.div>
            {/* Insights Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <InsightPanel
                topSellingCourses={analytics.topSellingCourses}
                engagementData={analytics.engagementData}
              />
            </motion.div>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
