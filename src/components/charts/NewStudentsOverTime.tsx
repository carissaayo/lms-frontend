// NewStudentsOverTime.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", students: 4 },
  { date: "Tue", students: 7 },
  { date: "Wed", students: 10 },
  { date: "Thu", students: 6 },
  { date: "Fri", students: 12 },
  { date: "Sat", students: 8 },
  { date: "Sun", students: 14 },
];

export function NewStudentsOverTime() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-4">New Enrollments This Week</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="students"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
