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
  data,
}: {
  data: { month: string; earnings: number }[];
}) {
  return (
    <div className="w-full h-80 bg-white rounded-xl border p-4 mb-12">
      <h2 className="text-lg font-semibold mb-4">Monthly Earnings</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `₦${v / 1000}k`} />
          <Tooltip formatter={(v: any) => `₦${v.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#4f46e5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
