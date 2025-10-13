import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function EarningsChart({
  data = [],
}: {
  data: { month: string; earnings: number }[];
}) {
  return (
    <div className="w-full h-80 bg-white rounded-2xl border border-gray-200 p-6 mb-12 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Monthly Earnings
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} />
          <YAxis
            tickFormatter={(v) => `₦${v / 1000}k`}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <Tooltip
            formatter={(v: number) => `₦${v.toLocaleString()}`}
            contentStyle={{ borderRadius: "12px" }}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#4f46e5", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7, fill: "#4f46e5" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
