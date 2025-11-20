import { Card } from "@/components/ui/card";
import { GrowthDataItem, RevenueDataItem } from "@/types/adminAnalytics.types";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GrowthDataProps {
  growthData: GrowthDataItem[];
  revenueData: RevenueDataItem[];
}

const GrowthTrendRevenuCharts: React.FC<GrowthDataProps> = ({
  growthData,
  revenueData,
}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Platform Growth Trends
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={growthData || []}>
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
          <AreaChart data={revenueData || []}>
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
  );
};

export default GrowthTrendRevenuCharts;
