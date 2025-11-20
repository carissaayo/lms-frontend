import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BookOpen,
  Activity,
  UserCheck,
  UserX,
  Award,
  Clock,
  Target,
  Banknote,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard-shell";
import { useAdminAnalytics } from "@/hooks/use-analytics";

import useAuthStore from "@/store/useAuthStore";
import Forbidden from "@/components/forbidden";
import AnalyticStatsCon from "@/components/analytics/admin/analyticStatsCon";
import { AnalyticsResponse } from "@/types/adminAnalytics.types";
import EnrollmentStats from "@/components/analytics/admin/EnrollmentStats";

export const Route = createFileRoute("/admin/analytics/")({
  component: RouteComponent,
});

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

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
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Platform Growth Trends
                </h2>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={analytics?.growthData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Students"
                    />
                    <Line
                      type="monotone"
                      dataKey="instructors"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Instructors"
                    />
                    <Line
                      type="monotone"
                      dataKey="courses"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      name="Courses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Revenue & Enrollment Trends
                </h2>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={analytics?.revenueData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis yAxisId="left" stroke="#666" />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Revenue (₦)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="enrollments"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Enrollments"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Course Distribution & Status */}
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Course Status Distribution
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Published
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      {analytics?.courseStats?.published || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">Draft</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">
                      {analytics?.courseStats?.draft || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <Activity className="h-5 w-5 text-yellow-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Pending Review
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">
                      {analytics?.courseStats?.pending || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <UserX className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Archived
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">
                      {analytics?.courseStats?.archived || 0}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-2 p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Course Category Distribution
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <ResponsiveContainer width="50%" height={280}>
                    <PieChart>
                      <Pie
                        data={analytics?.categoryDistribution || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics?.categoryDistribution?.map(
                          (entry: any, index: number) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 flex-1">
                    {analytics?.categoryDistribution?.map(
                      (cat: any, index: number) => (
                        <div
                          key={cat.name}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div
                              className="h-4 w-4 rounded-full mr-3"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                            <span className="font-medium text-gray-900">
                              {cat.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {cat.value} courses
                            </p>
                            <p className="text-sm text-gray-600">
                              {cat.students} students
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Top Instructors & Courses */}
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Top Performing Instructors
                </h2>
                <div className="space-y-3">
                  {analytics?.topInstructors?.map(
                    (instructor: any, index: number) => (
                      <div
                        key={instructor.name}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center flex-1">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {instructor.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {instructor.courses} courses •{" "}
                              {instructor.students} students
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₦{instructor.revenue.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-end">
                            <Award className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {instructor.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Top Selling Courses
                </h2>
                <div className="space-y-3">
                  {analytics?.topCourses?.map((course: any, index: number) => (
                    <div
                      key={course.title}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {course.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {course.students} students enrolled
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          ₦{course.revenue.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-end">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Engagement Metrics & Withdrawal Reasons */}
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Engagement Metrics
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Avg. Session Duration
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {analytics?.engagementMetrics?.avgSessionDuration}m
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(analytics?.engagementMetrics?.avgSessionDuration / 60) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Avg. Completion Rate
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {analytics?.engagementMetrics?.avgCompletionRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{
                          width: `${analytics?.engagementMetrics?.avgCompletionRate}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Avg. Course Rating
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {analytics?.engagementMetrics?.avgCourseRating}/5
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{
                          width: `${(analytics?.engagementMetrics?.avgCourseRating / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Student Retention
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {analytics?.engagementMetrics?.studentRetentionRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{
                          width: `${analytics?.engagementMetrics?.studentRetentionRate}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-2 p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Withdrawals
                </h2>

                {analytics?.recentWithdrawals?.length ? (
                  <div className="space-y-4">
                    {analytics.recentWithdrawals.map((w: any) => (
                      <div
                        key={w._id}
                        className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4 border border-gray-200"
                      >
                        <div>
                          <p className="text-gray-800 font-medium">
                            {w.instructor?.firstName} {w.instructor?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(w.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              w.status === "successful"
                                ? "text-green-600"
                                : w.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            ₦{w.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {w.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-6">
                    No recent withdrawals found.
                  </p>
                )}
              </Card>
            </div>

            {/* Summary Insights */}
            <Card className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Platform Performance Summary
                  </h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Growth Rate
                      </p>
                      <p className="text-lg font-bold text-blue-600">+15.3%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active Rate
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {(
                          (analytics?.overview?.activeStudents /
                            analytics?.overview?.totalStudents) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avg. Revenue/Student
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        ₦
                        {Math.round(
                          analytics?.overview?.totalRevenue /
                            analytics?.overview?.totalStudents
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Withdrawal Rate
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {(
                          (analytics?.overview?.totalWithdrawals /
                            analytics?.overview?.totalEnrollments) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
