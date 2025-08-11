import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const data = [
  { name: "Mon", hours: 2 },
  { name: "Tue", hours: 3 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 2.5 },
  { name: "Fri", hours: 1 },
  { name: "Sat", hours: 4 },
  { name: "Sun", hours: 2 },
];

export function CoursesChart() {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Learning Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
