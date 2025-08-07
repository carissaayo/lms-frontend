import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", days: 35 },
  { day: "Tue", days: 40 },
  { day: "Wed", days: 42 },
  { day: "Thu", days: 38 },
  { day: "Fri", days: 44 },
  { day: "Sat", days: 41 },
  { day: "Sun", days: 42 },
];

export function AverageTimeToCompletion() {
  return (
    <div className="rounded-lg border bg-white dark:bg-muted p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Avg. Time to Completion</h2>
      <p className="text-4xl font-bold mb-4">42 days</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#888888" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="days"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
