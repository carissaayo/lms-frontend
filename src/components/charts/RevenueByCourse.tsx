import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const revenueByCourse = [
  { name: "React Basics", revenue: 120000 },
  { name: "Node.js Mastery", revenue: 95000 },
  { name: "Design Systems", revenue: 60000 },
];

const RevenueByCourse = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Course</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueByCourse}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {revenueByCourse.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueByCourse;
