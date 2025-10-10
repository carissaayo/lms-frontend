import { useState } from "react";
import {
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Users,
  CheckCircle,
  Target,
  Star,
  Trophy,
  Activity,
} from "lucide-react";
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
import { CustomTooltip } from "@/components/analytics/instructor/CustomToolTip";
import { TopSellingCourseCard } from "@/components/analytics/instructor/TopSellingCourses";
import { PerformanceBar } from "@/components/analytics/instructor/PerformanceBar";
import { RecentCourseCard } from "@/components/analytics/instructor/RecentCourseCard";
import { CourseStatusCard } from "@/components/analytics/instructor/CourseStatusCard";
import { StatsCard } from "@/components/analytics/instructor/StatsCard";

export const Route = createFileRoute("/instructor/analytics/")({
  component: InstructorAnalyticsPage,
});

function InstructorAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");

  const { data, isLoading, error } = useInstructorAnalytics(timeRange);

  console.log("data", data);

  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Failed to load analytics data.</p>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  const analytics = data?.analytics;

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
      <main className="space-y-8 mb-10">
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

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={`₦${analytics?.revenueStats?.totalRevenue?.toLocaleString() || 0}`}
            change="+12% from last month"
            icon={Target}
            trend="up"
            color="green"
          />
          <StatsCard
            title="Total Students"
            value={analytics?.studentStats?.totalStudents || 0}
            change="+8% from last month"
            icon={Users}
            trend="up"
            color="blue"
          />
          <StatsCard
            title="Published Courses"
            value={analytics?.courseStats?.published || 0}
            change={`${analytics?.courseStats?.total || 0} total courses`}
            icon={BookOpen}
            trend="up"
            color="purple"
          />
          <StatsCard
            title="Active Students"
            value={analytics?.studentStats?.activeStudents || 0}
            change={`${analytics?.studentStats?.retentionRate || 0}% retention rate`}
            icon={Activity}
            trend="up"
            color="orange"
          />
        </div>

        {/* Course Stats and Revenue Chart */}
        <div className="grid gap-8 lg:grid-cols-3">
          <CourseStatusCard courses={analytics?.courseStats || {}} />

          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Revenue & Enrollments Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics?.revenueStats?.monthlyRevenue || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis yAxisId="left" stroke="#666" />
                <YAxis yAxisId="right" orientation="right" stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Courses and Recent Courses */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Top Selling Courses
            </h2>
            <div className="space-y-3">
              {analytics?.topSellingCourses?.length > 0 ? (
                analytics.topSellingCourses.map(
                  (course: any, index: number) => (
                    <TopSellingCourseCard
                      key={course.courseId}
                      course={course}
                      rank={index + 1}
                    />
                  )
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent courses available
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Courses
            </h2>
            <div className="space-y-3">
              {analytics?.recentCourses?.length > 0 ? (
                analytics.recentCourses.map((course: any) => (
                  <RecentCourseCard key={course.courseId} course={course} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent courses available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Course Performance and Engagement */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Course Performance
            </h2>
            <div className="space-y-4">
              {analytics?.coursePerformance?.length > 0 ? (
                analytics.coursePerformance
                  .slice(0, 5)
                  .map((course: any, index: number) => (
                    <PerformanceBar key={index} course={course} />
                  ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No performance data available
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Student Engagement
            </h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.engagementData?.slice(0, 5) || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="courseName"
                    stroke="#666"
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#666" />
                  <Tooltip
                    formatter={(value: any, name: any) => {
                      if (name === "engagementScore")
                        return [`${value}%`, "Engagement Score"];
                      if (name === "averageWatchTime")
                        return [
                          `${Math.round(value / 60)}h ${value % 60}m`,
                          "Avg Watch Time",
                        ];
                      return [value, name];
                    }}
                  />
                  <Bar
                    dataKey="engagementScore"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Average Revenue/Student"
            value={`₦${
              (
                analytics?.revenueStats?.averageRevenuePerStudent as
                  | number
                  | undefined
              )?.toFixed?.(2) || 0
            }`}
            change="Industry avg: $45"
            icon={Target}
            trend="up"
            color="green"
          />
          <StatsCard
            title="Course Completion Rate"
            value={`${
              analytics?.coursePerformance?.length > 0
                ? Math.round(
                    analytics.coursePerformance.reduce(
                      (sum: number, course: { completionRate: number }) =>
                        sum + course.completionRate,
                      0
                    ) / analytics.coursePerformance.length
                  )
                : 0
            }%`}
            change="Across all courses"
            icon={CheckCircle}
            trend="up"
            color="blue"
          />
          <StatsCard
            title="Student Satisfaction"
            value="4.7/5"
            change="Based on reviews"
            icon={Star}
            trend="up"
            color="yellow"
          />
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Performance Insights
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Best Performing Course
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {analytics?.topSellingCourses?.[0]?.courseName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Highest Engagement
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {analytics?.engagementData?.reduce(
                      (
                        max: { engagementScore: number; courseName: string },
                        course: { engagementScore: number; courseName: string }
                      ) =>
                        course.engagementScore > max.engagementScore
                          ? course
                          : max,
                      (analytics.engagementData[0] as {
                        engagementScore: number;
                        courseName: string;
                      }) || { engagementScore: 0, courseName: "" }
                    )?.courseName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Growth
                  </p>
                  <p className="text-lg font-bold text-blue-600">+12.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
