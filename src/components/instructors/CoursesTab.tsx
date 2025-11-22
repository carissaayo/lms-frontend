import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Star, Users } from "lucide-react";
import { InstructorDetail } from "@/types/instructor.types";
import { Badge } from "../ui/badge";
import { Link } from "@tanstack/react-router";

const CoursesTab = ({ instructor }: { instructor: InstructorDetail }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Courses</CardTitle>
        <CardDescription>Courses created by this instructor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {instructor.courses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <Badge variant="outline" className="ml-2 shrink-0 text-xs">
                    {course.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{course.enrollments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₦{course.price.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/admin/courses/$id"
                  params={{ id: course._id }}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                >
                  <Eye className="h-4 w-4" />
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesTab;
