import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

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
      <h3 className="text-lg font-semibold text-gray-900  mb-12">
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
