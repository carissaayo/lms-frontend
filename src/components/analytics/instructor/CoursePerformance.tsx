import { CoursePerformanceItem, EngagementDataItem } from "@/types/instructor.types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PerformanceBar } from "./PerformanceBar";
const CoursePerformance = ({
  coursePerformance,
  engagementData,
}: {
  coursePerformance: CoursePerformanceItem[];
  engagementData: EngagementDataItem[];
}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Course Performance
        </h2>
        <div className="space-y-4">
          {coursePerformance?.length > 0 ? (
            coursePerformance
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
            <BarChart data={engagementData?.slice(0, 5) || []}>
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
  );
};

export default CoursePerformance;
