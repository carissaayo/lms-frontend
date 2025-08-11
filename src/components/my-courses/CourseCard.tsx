import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CourseCard({ course }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="truncate">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={course.progress} />
          <p className="text-sm text-muted-foreground">
            {course.progress}% completed
          </p>
          <button className="text-primary hover:underline text-sm">
            {course.status === "completed"
              ? "View Certificate"
              : "Resume Course"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
