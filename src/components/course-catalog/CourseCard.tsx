import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CourseCard({ course }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="truncate">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold">{course.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" className="text-tex">
          Enroll
        </Button>
        <Button
          variant="outline"
          className="border-primary-dark bg-transparent hover:bg-primary-light"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
