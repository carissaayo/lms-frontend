import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";

import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
    videoPreview,
    setFormData,
  } = useCreateLessonForm();

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Lesson</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter lesson title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Lesson Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description"
              rows={6}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              name="duration"
              min={1}
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 15"
              required
            />
          </div>

          {/* Video File */}
          <div className="space-y-2">
            <Label>Video File *</Label>
            <Input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="mt-3 w-full rounded-lg border"
              />
            )}
          </div>

          {/* Note File */}
          <div className="space-y-2">
            <Label>Note File (optional)</Label>
            <Input
              type="file"
              name="note"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleNoteChange}
            />
          </div>

          {/* Select Course */}
          <div className="space-y-2">
            <Label>Select Course</Label>

            <Select
              value={formData.courseId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, courseId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
