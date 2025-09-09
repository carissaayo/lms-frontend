import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-course";
import { CourseStatus } from "@/types/course.types";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/instructor/courses/$id")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useCourses();
  const navigate = useNavigate(); // 🔹 Router navigation

  const course = data?.courses?.find((c: any) => c._id === id);

  // 🔹 Local state for lessons
  const [lessons, setLessons] = useState<{ number: number; name: string }[]>(
    course?.lessons ?? []
  );
  const [newLesson, setNewLesson] = useState("");

  const handleAddLesson = () => {
    if (!newLesson.trim()) return;
    setLessons((prev) => [
      ...prev,
      { number: prev.length + 1, name: newLesson },
    ]);
    setNewLesson("");
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
      <main className="space-y-10 mb-8">
        {/* 🔹 Back Button */}
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          onClick={() => navigate({ to: "/instructor/courses" })}
        >
          <ArrowLeft className="!w-12 !h-8" />
        </Button>

        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold font-primary tracking-tight">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your course details
              </p>
            </div>
          </div>

          <Button className="border-white text-white rounded-lg font-secondary text-base">
            Edit Course
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
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lessons</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLesson}
                    onChange={(e) => setNewLesson(e.target.value)}
                    placeholder="Lesson name..."
                    className="border rounded-lg px-3 py-1 text-sm"
                  />
                  <Button onClick={handleAddLesson}>+ Add</Button>
                </div>
              </div>

              {lessons.length > 0 ? (
                <ul className="space-y-2">
                  {lessons.map((lesson) => (
                    <li
                      key={lesson.number}
                      className="flex gap-3 items-center border-b pb-2"
                    >
                      <span className="font-semibold">{lesson.number}.</span>
                      <span>{lesson.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">
                  No lessons yet. Add your first lesson.
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
                ₦{course.price.toLocaleString()}
              </span>
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Enrolled Students:</span>
              <span className="font-medium">{course.enrollments ?? 0}</span>
            </div>
          </aside>
        </div>
      </main>
    </DashboardShell>
  );
}
