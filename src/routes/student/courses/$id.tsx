import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useSingleCourse, useEnrollCourse } from "@/hooks/use-course";
import { Lesson } from "@/types/lesson.types";
import { useLessonsInACourse } from "@/hooks/use-lesson";
import { CourseStatus } from "@/types/course.types";

export const Route = createFileRoute("/student/courses/$id")({
  component: StudentCourseDetailPage,
});

function StudentCourseDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 🔥 Fetch the single course
  const { data, isLoading, error } = useSingleCourse(id);
  const course = data?.course;

  const { data: lessonsData } = useLessonsInACourse(course?._id);
  const lessons: Lesson[] = lessonsData?.lessons ?? [];

  const enrollMutation = useEnrollCourse();

  const handleEnroll = () => {
    if (!course) return;
    enrollMutation.mutate(course._id, {
      onSuccess: () => {
        toast.success("Enrolled successfully!", {
          description: "You are now enrolled in this course.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (error: any) => {
        toast.error("Enrollment failed", {
          description:
            error?.response?.data?.message || "Something went wrong.",
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

  if (error || !course) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-red-600">
            Course not found
          </h2>
          <p className="text-muted-foreground mt-2">
            Please check if the course ID is correct.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Toaster />
      <main className="space-y-10 mb-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          onClick={() => navigate({ to: "/student/courses" })}
        >
          <ArrowLeft className="!w-12 !h-8" />
        </Button>

        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn from {course.instructorName}
            </p>
          </div>

          {/* Enroll Button */}
          <Button
            size="lg"
            disabled={enrollMutation.isPending}
            onClick={handleEnroll}
          >
            {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
          </Button>
        </div>

        {/* Cover Image */}
        {course.coverImage && (
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Course Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Category</h2>
              <p className="text-muted-foreground">{course.category}</p>
            </section>

            {/* Lessons Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Lessons</h2>
              {lessons?.length > 0 ? (
                <ul className="space-y-2 mb-10">
                  {lessons.map((lesson) => (
                    <li
                      key={lesson.position}
                      className="flex gap-3 items-center border-b border-gray-200 pb-2"
                    >
                      <span className="font-semibold">{lesson.position}.</span>
                      <span>{lesson.title}</span>
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

          {/* Sidebar */}
          <aside className="bg-card p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Course Info</h2>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium">
                ₦{course.price.toLocaleString?.() ?? course.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Enrolled Students:</span>
              <span className="font-medium">{course.enrollments ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span
                className={`font-medium ${
                  course.status === CourseStatus.APPROVED
                    ? "text-green-600"
                    : course.status === CourseStatus.PENDING
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {course.status}
              </span>
            </div>
          </aside>
        </div>
      </main>
    </DashboardShell>
  );
}
