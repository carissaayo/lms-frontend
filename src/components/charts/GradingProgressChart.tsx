"use client";

import { PieChart, Pie, Cell } from "recharts";

export default function GradingProgressChart({
  graded,
  total,
}: {
  graded: number;
  total: number;
}) {
  const data = [
    { name: "Graded", value: graded },
    { name: "Ungraded", value: total - graded },
  ];

  const COLORS = ["#10B981", "#FBBF24"]; // green, yellow

  return (
    <div className="w-12 h-12">
      <PieChart width={48} height={48}>
        <Pie data={data} innerRadius={12} outerRadius={24} dataKey="value">
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
