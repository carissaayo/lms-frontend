import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Course } from "@/types/course.types";
import { Link } from "@tanstack/react-router";
import { memo } from "react";

interface CourseCardProps {
  course: Course;
}
export function StudentCourseCardComponent({ course }: CourseCardProps) {
  return (
    <Link to="/student/enrollments/$id" params={{ id: course._id }}>
      <Card className="hover:shadow-lg transition overflow-hidden cursor-pointer hover:scale-105">
        <div className="px-3">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-60 object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-medium text-xl font-heading">
            {course.title}
          </CardTitle>
          <CardDescription className="text-lg  font-secondary">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-2">
            {course?.tags &&
              course?.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          <p className="text-3xl font-primary ">
            <span className="text-2xl mr-2">NGN</span>
            {course.price}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-center"></CardFooter>
      </Card>
    </Link>
  );
}

export const CourseCard = memo(StudentCourseCardComponent);
