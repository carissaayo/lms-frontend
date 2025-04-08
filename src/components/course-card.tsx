import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    description: string;
    category: string;
    duration: number;
    price: string;
    instructor: string;
    isApproved: boolean;
    isPublished: boolean;
    deleted: boolean;
    image: {
      url: string;
      imageName: string;
      caption: string;
    };
    lectures: string[];
    quizz: string;
    studentsEnrolled: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  href: string;
  actions?: ReactNode;
}

export function CourseCard({ course, href, actions }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link
        //   href={href}
        to="/"
        className="block"
      >
        <img
          src={course.image.url || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          {/* {course.status && (
            <Badge
              variant={
                course.isPublished === "published"
                  ? "default"
                  : course.status === "draft"
                    ? "outline"
                    : course.status === "pending"
                      ? "secondary"
                      : "destructive"
              }
            >
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
          )} */}
        </div>
        <CardDescription className="line-clamp-2">
          {course.instructor
            ? `Instructor: ${course.instructor}`
            : course.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {course.studentsEnrolled !== undefined && (
          <p className="text-sm text-muted-foreground">
            {course.studentsEnrolled} students enrolled
          </p>
        )}
        {/* {course.progress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )} */}
      </CardContent>
      {actions && <CardFooter className="flex gap-2">{actions}</CardFooter>}
    </Card>
  );
}
