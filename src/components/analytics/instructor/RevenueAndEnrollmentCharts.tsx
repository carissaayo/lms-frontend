import { CustomTooltip } from "@/components/analytics/instructor/CustomToolTip";
import { RevenueStats } from "@/types/instructor.types";
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const RevenueAndEnrollmentCharts = ({
  revenueStats,
}: {
  revenueStats: RevenueStats;
  
}) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Revenue & Enrollments Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueStats?.monthlyRevenue || []}>
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
  );
};

export default RevenueAndEnrollmentCharts;
