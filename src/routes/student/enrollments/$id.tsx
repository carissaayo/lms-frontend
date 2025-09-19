import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard-shell";
import { useQueryClient } from "@tanstack/react-query";
import { useSingleEnrollment } from "@/hooks/use-enrollment";
import { Lesson } from "@/types/lesson.types";
import { Course } from "@/types/course.types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useStartLesson } from "@/hooks/use-lessons";

export const Route = createFileRoute("/student/enrollments/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useSingleEnrollment(id);

  const { mutate: startCourse, isPending: isStarting } = useStartLesson();

  const course: Course = data?.course;
  const lessons: Lesson[] = data?.lessons ?? [];

  const lessonId = lessons[0]?._id;
  const handleStartCourse = () => {
    startCourse(lessonId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [lessonId] });
        toast.success(" Course started successfully", {
          description: "You will be redirected to lesson 1 page",
          position: "top-center",
        });
        setTimeout(() => {
          navigate({ to: `/student/enrollments/lessons/${lessonId}` });
        }, 2500);
      },
      onError: (error: any) => {
        console.error("Failed to start course:", error);
        const messages =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        const errorText = Array.isArray(messages)
          ? messages.join("\n")
          : messages;

        toast.error("Unable to start course", {
          description: errorText,
          position: "top-center",
        });
      },
    });
  };
  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-96">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !data?.course) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-red-600">
            Enrollment not found
          </h2>
          <p className="text-muted-foreground mt-2">
            Please check if the enrollment ID is correct.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Toaster />

      <div className="max-w-4xl mx-auto py-8">
        {/* Course Cover */}
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-64 object-cover rounded-2xl shadow-md mb-6"
        />

        {/* Course Title + Description */}
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground mb-4">{course.description}</p>

        <div className="flex gap-6 text-sm text-gray-600 mb-8">
          <span>📚 {lessons.length} Lessons</span>
          {/* <span>⏱ {course.duration}</span> */}
        </div>

        {/* Start Course Button */}
        <div className="flex justify-center mb-10">
          <Button
            onClick={handleStartCourse}
            disabled={isStarting}
            className="w-full sm:w-auto text-lg px-6 py-4"
          >
            {isStarting ? "Starting..." : "Start Course"}
          </Button>
        </div>

        {/* Lessons List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          {lessons.length > 0 ? (
            <ul className="space-y-4 w-full">
              {lessons.map((lesson) => (
                <li
                  key={lesson._id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-primary">
                      {lesson.position}.
                    </span>
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">
              No lessons available yet.
            </p>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
