import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-course";
import { Course, CourseStatus } from "@/types/course.types";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import {
  useSubmitCourse,
  usePublishCourse,
  useDeleteCourse,
} from "@/hooks/use-course";

import { Lesson } from "@/types/lesson.types";
import { useLessonsInACourse } from "@/hooks/use-lesson";
import SingleLoadingForbiddenError from "@/components/SingleLoadingForbiddenError";
import CourseAction from "@/components/courses/instructor/single-course/CourseAction";

export const Route = createFileRoute("/instructor/courses/$id")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useCourses();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const course:Course = data?.courses?.find((c: any) => c._id === id);

  const { data: lessonsData } = useLessonsInACourse(course?._id);
  const lessons: Lesson[] = lessonsData?.lessons as Lesson[];

  const [newLesson, setNewLesson] = useState("");

  const submitMutation = useSubmitCourse();
  const publishMutation = usePublishCourse();
  const deleteMutation = useDeleteCourse();

  const handleSubmitCourse = () => {
    if (!course) return;
    submitMutation.mutate(course._id, {
      onSuccess: () => {
        toast.success("Course submitted successfully", {
          description: "Your course has been submitted for review.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (error: any) => {
        toast.error("Course submission failed", {
          description:
            error?.response?.data?.message || "Something went wrong.",
          position: "top-center",
        });
      },
    });
  };

  const handlePublishCourse = () => {
    if (!course) return;
    publishMutation.mutate(course._id, {
      onSuccess: () => {
        toast.success("Course published successfully", {
          description: "Your course is now live for students.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (error: any) => {
        toast.error("Course publishing failed", {
          description:
            error?.response?.data?.message || "Something went wrong.",
          position: "top-center",
        });
      },
    });
  };

  const handleDeleteCourse = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Course deleted successfully", {
          description: "Your course has been removed.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        navigate({ to: "/instructor/courses" });
      },
      onError: (error: any) => {
        toast.error("Course deletion failed", {
          description:
            error?.response?.data?.message || "Something went wrong.",
          position: "top-center",
        });
      },
    });
  };

  const errorUI = SingleLoadingForbiddenError({
    error,
    isLoading,
    route: "/admin/instructors",
    item: course,
    itemName: "Course",
  });

  if (errorUI) return errorUI;
  if (!course) return null;

  return (
    <DashboardShell>
      <Toaster />
      <main className="space-y-10 mb-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          onClick={() => navigate({ to: "/instructor/courses" })}
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
              Manage your course details
            </p>
          </div>

          {/* Actions: Edit / Submit / Publish / Delete */}
         <CourseAction
         course={course}
         isPendingSubmit={submitMutation.isPending}
         isPendingPublish={publishMutation.isPending}
         isPendingDelete={deleteMutation.isPending}
         handleDeleteCourse={handleDeleteCourse}
         handlePublishCourse={handlePublishCourse}
         handleSubmitCourse={handleSubmitCourse}
         />
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
                  <Button>
                    <Link to="/instructor/lessons/new">Create New Lesson</Link>
                  </Button>
                </div>
              </div>

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
                ₦{course.price.toLocaleString?.() ?? course.price}
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
