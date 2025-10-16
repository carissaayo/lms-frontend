import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course.types";
import { Link } from "@tanstack/react-router";
import { memo, useState } from "react";
import { Star, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
  viewMode: string;
}

export function CourseCardComponent({ course, viewMode }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <Link to="/student/courses/$id" params={{ id: course._id }}>
        <Card
          className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating ?? 4.7}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrollments ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 text-base mb-4">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-500">NGN</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {course.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all">
                    Enroll
                  </Button>
                  <Button variant="outline">Details</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to="/student/courses/$id" params={{ id: course._id }}>
      <Card
        className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.15)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating ?? 4.7}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.enrollments ?? 0}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {course.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs border border-blue-100"
              >
                {tag}
              </span>
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
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all">
              Enroll
            </Button>
            <Button variant="outline" className="flex-1">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export const CourseCard = memo(CourseCardComponent);
