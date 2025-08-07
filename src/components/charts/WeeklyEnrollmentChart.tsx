// src/components/charts/WeeklyEnrollmentChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", students: 5 },
  { day: "Tue", students: 8 },
  { day: "Wed", students: 4 },
  { day: "Thu", students: 10 },
  { day: "Fri", students: 6 },
  { day: "Sat", students: 7 },
  { day: "Sun", students: 9 },
];

export function WeeklyEnrollmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Enrollments</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="students" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
