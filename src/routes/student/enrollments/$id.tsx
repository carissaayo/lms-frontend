import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard-shell";
import { useQueryClient } from "@tanstack/react-query";
import { useSingleEnrollment } from "@/hooks/use-enrollment";

export const Route = createFileRoute("/student/enrollments/$id")({
  component: RouteComponent,
});

function RouteComponent({ params }) {
  const { id } = Route.useParams();

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSingleEnrollment(id);
  const navigate = useNavigate();

  console.log("data=", data);

  const course = {
    _id: params?.courseId,
    title: "JavaScript for Beginners",
    description:
      "Learn the fundamentals of JavaScript — the language of the web. Perfect for beginners!",
    lessonsCount: 10,
    duration: "5h 30m",
    thumbnail:
      "https://images.unsplash.com/photo-1581090700227-4c4f50b4b8cb?q=80&w=800",
  };

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto py-8">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover rounded-2xl shadow-md mb-6"
        />

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground mb-4">{course.description}</p>

        <div className="flex gap-6 text-sm text-gray-600 mb-8">
          <span>📚 {course.lessonsCount} Lessons</span>
          <span>⏱ {course.duration}</span>
        </div>

        <div className="flex justify-center">
          <Link
            to={`/student/course/${course._id}/lessons/1`}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto text-lg px-6 py-4">
              Start Course
            </Button>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
