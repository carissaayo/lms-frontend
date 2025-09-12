import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCourses } from "@/hooks/use-course";
import { useUpdateLesson, useDeleteLesson } from "@/hooks/use-lesson";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Course } from "@/types/course.types";
import { Lesson } from "@/types/lesson.types";

export const Route = createFileRoute("/instructor/lessons/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, Lesson>): { lesson: Lesson } => {
    return {
      lesson: search.lesson as Lesson,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { lesson: initialLesson } = Route.useSearch();
  const navigate = useNavigate();
  const { data } = useCourses();
  const courses: Course[] = data?.courses ?? [];

  const updateLessonMutation = useUpdateLesson();
  const deleteLessonMutation = useDeleteLesson();

  const [formData, setFormData] = useState({
    title: initialLesson?.title || "",
    description: initialLesson?.description || "",
    courseId: initialLesson?.courseId || "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!initialLesson) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">Lesson not found</h2>
          <p className="text-muted-foreground mt-2">
            The lesson you're looking for doesn't exist or you don't have access
            to it.
          </p>
          <Link to="/instructor/lessons" className="mt-4 inline-block">
            <Button className="mt-4">Back to Lessons</Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNoteFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    // Fix: Ensure courseId is always a string
    if (formData.courseId) {
      formDataToSend.append("courseId", formData.courseId);
    }

    if (videoFile) {
      formDataToSend.append("video", videoFile);
    }
    if (noteFile) {
      formDataToSend.append("note", noteFile);
    }

    // Fix: Pass parameters as a tuple to match the mutation function signature
    updateLessonMutation.mutate(
      { id, formData: formDataToSend },
      {
        onSuccess: () => {
          toast.success("Lesson updated successfully", {
            description: "Your lesson has been updated.",
            position: "top-center",
          });
          setTimeout(() => {
            navigate({ to: "/instructor/lessons" });
          }, 1500);
        },
        onError: (error: any) => {
          const messages =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";

          const errorText = Array.isArray(messages)
            ? messages.join("\n")
            : messages;

          toast.error("Lesson update failed", {
            description: errorText,
            position: "top-center",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    deleteLessonMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Lesson deleted successfully", {
          description: "Your lesson has been deleted.",
          position: "top-center",
        });
        setTimeout(() => {
          navigate({ to: "/instructor/lessons" });
        }, 1500);
      },
      onError: (error: any) => {
        const messages =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        const errorText = Array.isArray(messages)
          ? messages.join("\n")
          : messages;

        toast.error("Lesson deletion failed", {
          description: errorText,
          position: "top-center",
        });
        setIsDeleting(false);
      },
    });
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-3xl mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Lesson</h1>
          <Link to="/instructor/lessons">
            <Button
              variant="outline"
              className="rounded-lg font-secondary text-base"
            >
              Back to Lessons
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lesson Title"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Lesson Description"
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Video File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Video File (Leave empty to keep current)
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
            {initialLesson.videoUrl && (
              <p className="text-sm text-muted-foreground mt-2">
                Current video: {initialLesson.videoUrl.split("/").pop()}
              </p>
            )}
          </div>

          {/* Note File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Note File (Leave empty to keep current)
            </label>
            <input
              type="file"
              name="note"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleNoteChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
            {initialLesson.noteUrl && (
              <p className="text-sm text-muted-foreground mt-2">
                Current note: {initialLesson.noteUrl.split("/").pop()}
              </p>
            )}
          </div>

          {/* Course Select */}
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={updateLessonMutation.isPending}
            className="w-full rounded-lg text-white font-medium py-3"
          >
            {updateLessonMutation.isPending ? "Updating..." : "Update Lesson"}
          </Button>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t border-gray-200 mb-12">
          <h3 className="text-lg font-medium text-text mb-4">Danger Zone</h3>
          {!isDeleting ? (
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="rounded-lg font-secondary text-base bg-error"
            >
              Delete Lesson
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this lesson? This action cannot
                be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDelete}
                  disabled={deleteLessonMutation.isPending}
                  variant="destructive"
                  className="rounded-lg font-secondary text-base bg-error"
                >
                  {deleteLessonMutation.isPending
                    ? "Deleting..."
                    : "Yes, Delete Lesson"}
                </Button>
                <Button
                  onClick={handleCancelDelete}
                  variant="outline"
                  className="rounded-lg font-secondary text-base"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </DashboardShell>
  );
}
