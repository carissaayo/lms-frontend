// src/components/charts/CoursePerformanceChart.tsx
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    name: "React Basics",
    students: 120,
    completion: 85,
    rating: 4.5,
  },
  {
    name: "Node.js Mastery",
    students: 90,
    completion: 60,
    rating: 4.1,
  },
  {
    name: "Design Systems",
    students: 60,
    completion: 72,
    rating: 4.8,
  },
];

export function CoursePerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" name="Total Students" />
            <Bar
              dataKey="completion"
              fill="#82ca9d"
              name="Completion Rate (%)"
            />
            <Bar dataKey="rating" fill="#ffc658" name="Rating" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
