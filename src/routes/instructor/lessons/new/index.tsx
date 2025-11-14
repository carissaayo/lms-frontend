import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { useCreateLessonForm } from "@/hooks/lessons/use-create-lesson";


export const Route = createFileRoute("/instructor/lessons/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    formData,
    courses,
    isPending,
    handleChange,
    handleVideoChange,
    handleNoteChange,
    handleSubmit,
  } = useCreateLessonForm();

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Lesson</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lesson Title"
            required
            className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Lesson Description"
            rows={6}
            className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Video File *
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Note File (optional)
            </label>
            <input
              type="file"
              name="note"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleNoteChange}
              className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3 focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg text-white font-medium py-3"
          >
            {isPending ? "Creating..." : "Create Lesson"}
          </Button>
        </form>
      </main>
    </DashboardShell>
  );
}
