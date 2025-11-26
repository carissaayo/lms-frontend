import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseDetail } from "@/types/course.types";
import {  Star } from "lucide-react";

const CourseInstructor = ({course}:{course:CourseDetail}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Instructor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {course?.instructor?.firstName?.charAt(0)}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </h3>
              <p className="text-gray-600">{course.instructor.email}</p>
            </div>
            {course.instructor.bio && (
              <p className="text-gray-700 leading-relaxed">
                {course.instructor.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-6 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600 mb-1">Students Taught</p>
                <p className="text-2xl font-bold text-gray-900">
                  {course.enrollments.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Course Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900">
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseInstructor;
