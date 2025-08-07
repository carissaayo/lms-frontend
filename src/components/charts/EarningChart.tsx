import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", earnings: 120000 },
  { month: "Feb", earnings: 95000 },
  { month: "Mar", earnings: 140000 },
  { month: "Apr", earnings: 80000 },
  { month: "May", earnings: 160000 },
];

export function EarningsChart() {
  return (
    <div className="w-full h-80  bg-white rounded-xl border p-4 mb-12">
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
