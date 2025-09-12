import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-course";
import { CourseStatus } from "@/types/course.types";
import { ArrowLeft, Trash2, Upload, CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import {
  useSubmitCourse,
  usePublishCourse,
  useDeleteCourse,
} from "@/hooks/use-course";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lesson } from "@/types/lesson.types";
import { useLessonsInACourse } from "@/hooks/use-lesson";

export const Route = createFileRoute("/instructor/courses/$id")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useCourses();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const course = data?.courses?.find((c: any) => c._id === id);

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
          <div className="flex gap-2 flex-wrap">
            <Button>Edit Course</Button>

            <Button
              variant="outline"
              disabled={submitMutation.isPending || course.isSubmitted}
              onClick={handleSubmitCourse}
            >
              <Upload className="w-4 h-4 mr-1" />
              Submit Course
            </Button>

            <Button
              variant="outline"
              disabled={
                publishMutation.isPending ||
                course.status !== CourseStatus.APPROVED ||
                course.isApproved === false ||
                course.isPublished === true
              }
              onClick={handlePublishCourse}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Publish
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  className="bg-error"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="w-full text-center text-lg">
                    Delete Course
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-center">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{course.title}</span>? This
                    action cannot be undone and all related lessons will also be
                    removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className=" w-full flex flex-row items-center justify-center gap-10">
                  <AlertDialogCancel className="flex-1 text-base">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-error hover:bg-error/90 flex-1 text-base"
                  >
                    Confirm Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
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
