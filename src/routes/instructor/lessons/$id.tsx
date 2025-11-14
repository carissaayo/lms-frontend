import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster } from "sonner";
import { useEditLesson } from "@/hooks/lessons/use-edit-lesson";


export const Route = createFileRoute("/instructor/lessons/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>) => ({ lesson: search.lesson }),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { lesson: initialLesson } = Route.useSearch();

  const {
    formData,
    courses,
    isDeleting,
    updateLessonMutation,
    deleteLessonMutation,
    handleChange,
    handleVideoChange,
    handleNoteChange,
    handleSubmit,
    handleDelete,
    handleCancelDelete,
  } = useEditLesson({ lessonId: id, initialLesson });

  if (!initialLesson) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">Lesson not found</h2>
          <p className="text-muted-foreground mt-2">
            The lesson doesn't exist or you don't have access.
          </p>
          <Link to="/instructor/lessons">
            <Button className="mt-4">Back to Lessons</Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-3xl mx-auto py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Lesson</h1>
          <Link to="/instructor/lessons">
            <Button variant="outline">Back to Lessons</Button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
              className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Video */}
          <div>
            <Label>Video</Label>
            {initialLesson.videoUrl && (
              <video
                src={initialLesson.videoUrl}
                className="w-full h-90 object-cover my-6"
                muted
                controls
                loop
              />
            )}
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>

          {/* Note */}
          <div>
            <Label>Document</Label>
            <input
              type="file"
              name="note"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleNoteChange}
            />
          </div>

          {/* Course select */}
          <div className="space-y-2">
            <Label>Select Course</Label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            disabled={updateLessonMutation.isPending}
            className="w-full"
          >
            {updateLessonMutation.isPending ? "Updating..." : "Update Lesson"}
          </Button>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t">
          {!isDeleting ? (
            <Button onClick={handleDelete} variant="destructive">
              Delete Lesson
            </Button>
          ) : (
            <div className="space-y-4">
              <p>Are you sure? This action cannot be undone.</p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDelete}
                  disabled={deleteLessonMutation.isPending}
                  variant="destructive"
                >
                  {deleteLessonMutation.isPending
                    ? "Deleting..."
                    : "Yes, Delete Lesson"}
                </Button>
                <Button onClick={handleCancelDelete} variant="outline">
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
