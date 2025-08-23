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

export type Course = {
  id: number;
  title: string;
  category: string;
  price: string; // Could be 'Free', '$15', etc.
  description: string;
  image: string;
  tags: string[];
};
interface CourseCardProps {
  course: Course;
  viewMode: "grid" | "list";
}
export function CourseCard({ course, viewMode }: CourseCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition">
        <img
          src={course.image}
          alt={course.title}
          className="w-full sm:w-60 h-40 object-cover"
        />
        <div className="flex flex-col flex-1">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm font-semibold">{course.price}</p>
          </CardContent>
          <CardFooter className="flex gap-2 mt-auto">
            <Button variant="default">Enroll</Button>
            <Button variant="outline">View Details</Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  // Grid View
  return (
    <Card className="hover:shadow-lg transition overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-semibold">{course.price}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="default">Enroll</Button>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
