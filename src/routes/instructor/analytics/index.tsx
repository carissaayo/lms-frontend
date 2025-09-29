import React, { useState } from "react";
import {
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  BookOpen,
  Users,
  DollarSign,
  CheckCircle,
  Target,
  Star,
  Trophy,
  Activity,
  TrendingDown,
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

type StatsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}`}
            >
              {trend === "up" && <TrendingUp className="w-4 h-4 mr-1" />}
              {trend === "down" && <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export const CourseStatusCard = ({
  courses,
}: {
  courses: {
    published: number;
    submitted: number;
    drafted: number;
    rejected: number;
    suspended: number;
  };
}) => {
  const statusData = [
    { name: "Published", value: courses.published, color: "#10B981" },
    { name: "Submitted", value: courses.submitted, color: "#3B82F6" },
    { name: "Drafted", value: courses.drafted, color: "#F59E0B" },
    { name: "Rejected", value: courses.rejected, color: "#EF4444" },
    { name: "Suspended", value: courses.suspended, color: "#8B5CF6" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Course Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={statusData.filter((item) => item.value > 0)}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TopSellingCourseCard = ({
  course,
  rank,
}: {
  course: {
    courseName: string;
    enrollments: number;
    price: number;
    revenue: number;
  };
  rank: number;
}) => (
  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
      <span className="text-sm font-bold text-blue-600">#{rank}</span>
    </div>
    <div className="flex-1">
      <h4 className="font-medium text-gray-900 line-clamp-1">
        {course.courseName}
      </h4>
      <p className="text-sm text-gray-500">
        {course.enrollments} students • ${course.price}
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">
        ${course.revenue.toLocaleString()}
      </p>
    </div>
  </div>
);

export const RecentCourseCard = ({
  course,
}: {
  course: {
    title: string;
    status: string;
    category: string;
    price: number;
    enrollments: number;
    revenue: number;
  };
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 line-clamp-1">
          {course.title}
        </h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}
        >
          {course.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-2">{course.category}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">${course.price}</span>
        <div className="text-right">
          <p className="font-medium">{course.enrollments} students</p>
          <p className="text-gray-500">${course.revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export const PerformanceBar = ({
  course,
}: {
  course: {
    courseName: string;
    completionRate: number;
    enrollments: number;
    revenue: number;
  };
}) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700 line-clamp-1">
        {course.courseName}
      </span>
      <span className="text-sm text-gray-500">{course.completionRate}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${course.completionRate}%` }}
      />
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{course.enrollments} students</span>
      <span>${course.revenue.toLocaleString()}</span>
    </div>
  </div>
);

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.name === "revenue" ? "$" : ""}${entry.value}${entry.name === "revenue" ? "" : ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Route = createFileRoute("/instructor/analytics/")({
  component: InstructorAnalyticsPage,
});

function InstructorAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");

  const { data, isLoading, error } = useInstructorAnalytics(timeRange);

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
      <main className="space-y-8">
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
            value={`$${analytics?.revenueStats?.totalRevenue?.toLocaleString() || 0}`}
            change="+12% from last month"
            icon={DollarSign}
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
        </div>

        {/* Course Performance and Engagement */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Course Performance
            </h2>
            <div className="space-y-4">
              {analytics?.coursePerformance?.length > 0 ? (
                analytics.coursePerformance.map(
                  (course: any, index: number) => (
                    <PerformanceBar key={index} course={course} />
                  )
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No performance data available
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Student Engagement
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics?.engagementData || []}>
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

        {/* Additional Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Average Revenue/Student"
            value={`$${
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
