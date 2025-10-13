import { Users, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Course {
  title: string;
  enrolled: number;
  earnings: number;
  growth: number;
}

const TopCourses = ({ courses = [] }: { courses: Course[] }) => {
  if (courses.length === 0) {
    return (
      <Card className="rounded-2xl border border-gray-200 shadow-sm mb-8 p-6 text-center text-gray-500">
        No course data available
      </Card>
    );
  }

  const maxEnrolled = Math.max(...courses.map((c) => c.enrolled));

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Top Selling Courses
        </CardTitle>
        <Button
          variant="ghost"
          className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrolled} students
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <TrendingUp className="w-4 h-4" />+{course.growth}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(course.earnings)}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(course.enrolled / maxEnrolled) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopCourses;
