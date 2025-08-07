import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const courseCompletion = [
  { name: "React Basics", completion: 90 },
  { name: "Node.js Mastery", completion: 60 },
  { name: "Design Systems", completion: 75 },
];
const CourseCompletionRates = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Course Completion Rates</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseCompletion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCompletionRates;
