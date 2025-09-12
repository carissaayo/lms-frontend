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

interface CourseCardProps {
  course: Course;
  viewMode: string;
}
export function CourseCard({ course, viewMode }: CourseCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition px-6 cursor-pointer hover:scale-105">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full sm:w-100 h-60 object-fill"
        />
        <div className="flex flex-col flex-1 text-base">
          <CardHeader>
            <CardTitle className="font-semibold text-2xl font-heading">
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
            <p className="text-3xl font-primary mt-6">
              <span className="text-2xl mr-2">NGN</span>
              {course.price}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2 mt-auto">
            <Button variant="default" className="text-base mr-2">
              Enroll
            </Button>
            <Button variant="outline" className="text-base ">
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  // Grid View
  return (
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
      <CardFooter className="flex gap-2">
        <Button variant="default" className="text-base mr-2">
          Enroll
        </Button>
        <Button variant="outline" className="text-base ">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
