import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, Activity, UserX, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CategoryDistribution, CourseStats } from "@/types/adminAnalytics.types";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
interface CourseStatsProps {
  courseStats: CourseStats;
  categoryDistribution: CategoryDistribution[];
}
const CourseDistributionStats: React.FC<CourseStatsProps> = ({categoryDistribution,courseStats}) => {
  return (
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
              <span className="font-medium text-gray-900">Published</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {courseStats?.published || 0}
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
              {courseStats?.draft || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <Activity className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="font-medium text-gray-900">Pending Review</span>
            </div>
            <span className="text-2xl font-bold text-yellow-600">
              {courseStats?.pending || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <span className="font-medium text-gray-900">Archived</span>
            </div>
            <span className="text-2xl font-bold text-red-600">
              {courseStats?.archived || 0}
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
                data={categoryDistribution || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution?.map(
                  (_entry: any, index: number) => (
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
            {categoryDistribution?.map((cat: any, index: number) => (
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
                  <span className="font-medium text-gray-900">{cat.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{cat.value} courses</p>
                  <p className="text-sm text-gray-600">
                    {cat.students} students
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseDistributionStats;
