import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 30 },
  { month: "Feb", students: 45 },
  { month: "Mar", students: 60 },
  { month: "Apr", students: 40 },
  { month: "May", students: 70 },
  { month: "Jun", students: 55 },
];

const MonthlyEnrollmentChart = () => {
  return (
    <div className="">
      {/* Enrollment Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Enrollments</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyEnrollmentChart;
