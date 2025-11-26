import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { useEditLesson } from "@/hooks/lessons/use-edit-lesson";
import { Toaster } from "@/components/ui/sonner";
import EditLessonForm from "@/components/lessons/EditLessonForm";
import EditLessonDangerZone from "@/components/lessons/EditLessonAlert";

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
        <div className="text-center py-20 bg-white m-8 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-bold">Lesson not found</h2>
          <p className="text-gray-500 mt-2">
            The lesson doesn't exist or you don't have access.
          </p>
          <Link to="/instructor/lessons">
            <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 py-3 px-6">
              Back to Lessons
            </Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <header>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Edit Lesson: {initialLesson.title}
            </h1>
            <p className="text-lg text-gray-500 mt-1">
              Update lesson content, duration, and associated course.
            </p>
          </header>
          <Link to="/instructor/lessons">
            <Button variant="outline" className="h-12 rounded-lg py-3 px-6">
              Back to Lessons
            </Button>
          </Link>
        </div>

        <EditLessonForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleVideoChange={handleVideoChange}
          handleNoteChange={handleNoteChange}
          courses={courses}
          initialLesson={initialLesson}
          updateLessonMutation={updateLessonMutation}
        />

        {/* Danger Zone */}
        <EditLessonDangerZone
          isDeleting={isDeleting}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
          deleteLessonMutation={deleteLessonMutation}
        />
      </main>
    </DashboardShell>
  );
}
