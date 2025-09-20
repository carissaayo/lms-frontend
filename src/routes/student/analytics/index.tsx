import { useState } from "react";
import {
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
  Award,
  Clock,
  BookOpen,
  Activity,
  Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { useStudentAnalytics } from "@/hooks/use-analytics";

// Mock data for charts that aren't from API yet
const learningProgressData = [
  { month: "Jan", hours: 12, courses: 2, completionRate: 65 },
  { month: "Feb", hours: 18, courses: 3, completionRate: 72 },
  { month: "Mar", hours: 25, courses: 4, completionRate: 78 },
  { month: "Apr", hours: 32, courses: 5, completionRate: 85 },
  { month: "May", hours: 28, courses: 6, completionRate: 82 },
  { month: "Jun", hours: 35, courses: 7, completionRate: 88 },
  { month: "Jul", hours: 42, courses: 8, completionRate: 92 },
];

const weeklyActivityData = [
  { day: "Mon", hours: 3.5, lessons: 8 },
  { day: "Tue", hours: 2.8, lessons: 6 },
  { day: "Wed", hours: 4.2, lessons: 10 },
  { day: "Thu", hours: 3.1, lessons: 7 },
  { day: "Fri", hours: 2.5, lessons: 5 },
  { day: "Sat", hours: 5.2, lessons: 12 },
  { day: "Sun", hours: 4.8, lessons: 11 },
];

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    icon: "🎓",
    date: "2024-01-15",
    type: "milestone",
  },
  {
    id: 2,
    title: "Week Streak Champion",
    icon: "🔥",
    date: "2024-02-10",
    type: "streak",
  },
  {
    id: 3,
    title: "JavaScript Master",
    icon: "⭐",
    date: "2024-02-28",
    type: "skill",
  },
  {
    id: 4,
    title: "Speed Learner",
    icon: "⚡",
    date: "2024-03-15",
    type: "performance",
  },
];

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  trend: string;
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>
);

type Progress = {
  courseName: string;
  progress: string;
  totalDurationHours: string;
  status: string;
  instructor: string;
};
const CourseProgressBar = ({
  courseName,
  progress,
  totalDurationHours,
  status,
  instructor,
}: Progress) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "active":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900 line-clamp-1">
            {courseName}
          </span>
          <span className="text-xs text-gray-500">
            by {instructor} • {totalDurationHours}h
          </span>
        </div>
        <span className={`text-sm font-medium ${getStatusColor(status)}`}>
          {Math.round(parseInt(progress))}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

type Achievement = {
  id: number;
  title: string;
  icon: string;
  date: string;
  type: string;
};
const AchievementBadge = ({ achievement }: { achievement: Achievement }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-blue-100 text-blue-800";
      case "streak":
        return "bg-orange-100 text-orange-800";
      case "skill":
        return "bg-green-100 text-green-800";
      case "performance":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="text-2xl mr-3">{achievement.icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
        <p className="text-sm text-gray-500">
          {new Date(achievement.date).toLocaleDateString()}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(achievement.type)}`}
      >
        {achievement.type}
      </span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Route = createFileRoute("/student/analytics/")({
  component: StudentAnalyticsPage,
});

function StudentAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("hours");

  // Fetch analytics data with time range filter
  const { data, isLoading, error } = useStudentAnalytics(timeRange);

  // Helper function to get display name for time range
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
  const categoryColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
  ];

  return (
    <DashboardShell>
      <main className="space-y-8 mb-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Learning Analytics
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Track your progress and discover insights about your learning
              journey
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
                <SelectItem value="All time">All Time</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Learning Hours"
            value={`${analytics?.totalLearningHours || 0}h`}
            change="+23% from last month"
            icon={Clock}
            trend="up"
          />
          <StatsCard
            title="Courses Completed"
            value={analytics?.completedCourses || 0}
            change="+2 this month"
            icon={Award}
            trend="up"
          />
          <StatsCard
            title="Total Courses"
            value={analytics?.totalCourses || 0}
            change="Current enrollments"
            icon={BookOpen}
            trend="up"
          />
          <StatsCard
            title="Completion Rate"
            value={`${analytics?.courseCompletionRate || 0}%`}
            change="+5% improvement"
            icon={Star}
            trend="up"
          />
        </div>

        {/* Learning Progress Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Learning Progress Over Time
            </h2>
            <div className="flex gap-2">
              <Button
                variant={selectedMetric === "hours" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric("hours")}
              >
                Hours
              </Button>
              <Button
                variant={selectedMetric === "courses" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric("courses")}
              >
                Courses
              </Button>
              <Button
                variant={
                  selectedMetric === "completion" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedMetric("completion")}
              >
                Completion Rate
              </Button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics?.learningProgressData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={
                  selectedMetric === "hours"
                    ? "hours"
                    : selectedMetric === "courses"
                      ? "courses"
                      : "completionRate"
                }
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Weekly Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Learning by Category
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              {analytics?.learningByCategory?.length > 0 &&
              analytics.learningByCategory.some(
                (category: any) => category.value > 0
              ) ? (
                <PieChart>
                  <Pie
                    data={analytics.learningByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.learningByCategory.map((index: any) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[index % categoryColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}h`, "Learning Hours"]}
                    labelFormatter={(name: any) => name}
                  />
                </PieChart>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No Learning Data Yet
                  </h3>
                  <p className="text-sm text-gray-500 text-center max-w-xs">
                    Start learning to see your progress across different
                    categories
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {["Development", "Design", "Business", "Marketing"].map(
                      (category) => (
                        <span
                          key={category}
                          className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-600"
                        >
                          {category}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Course Progress */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Course Progress
            </h2>
            <div className="space-y-4">
              {analytics?.recentCourseProgress?.length > 0 ? (
                analytics.recentCourseProgress.map((course: any) => (
                  <CourseProgressBar
                    key={course.courseId}
                    courseName={course.courseName}
                    progress={course.progress}
                    totalDurationHours={course.totalDurationHours}
                    status={course.status}
                    instructor={course.instructor}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent course progress available
                </p>
              )}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Study Habits Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Study Insights
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Peak Learning Time
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    2:00 PM - 4:00 PM
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Most Active Day
                  </p>
                  <p className="text-lg font-bold text-blue-600">Saturday</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Session
                  </p>
                  <p className="text-lg font-bold text-blue-600">45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
