import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../ui/badge";
import { Course } from "@/types/course.types";
import { Link } from "@tanstack/react-router";
import { memo, useState } from "react";

interface CourseCardProps {
  course: Course;
}
export function StudentCourseCardComponent({ course }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to="/student/enrollments/$id" params={{ id: course._id }}>
      <Card
        className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="px-3">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.15)" : "scale(1)",
            }}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {course?.tags &&
              course?.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-500">NGN</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {course.price.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-center"></CardFooter>
      </Card>
    </Link>
  );
}

export const CourseCard = memo(StudentCourseCardComponent);
