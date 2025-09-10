import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCourses } from "@/hooks/use-course";
import { useCreateLesson } from "@/hooks/use-lesson";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Course } from "@/types/course.types";

export const Route = createFileRoute("/instructor/lessons/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data } = useCourses();
  const courses: Course[] = data?.courses ?? [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [noteFile, setNoteFile] = useState<File | null>(null);

  const { mutate: createLesson, isPending } = useCreateLesson();

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
    formDataToSend.append("courseId", formData.courseId);

    if (videoFile) {
      formDataToSend.append("video", videoFile);
    }
    if (noteFile) {
      formDataToSend.append("note", noteFile);
    }

    createLesson(formDataToSend, {
      onSuccess: () => {
        toast.success("Lesson created successfully", {
          description: "Your new lesson is now live.",
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

        toast.error("Lesson creation failed", {
          description: errorText,
          position: "top-center",
        });
      },
    });
  };

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Lesson</h1>
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
              Video File *
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Note File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Note File (optional)
            </label>
            <input
              type="file"
              name="note"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleNoteChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
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

          {/* Submit */}
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
