import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCourses } from "@/hooks/use-course";
import { useCreateLesson } from "@/hooks/use-lesson";
import type { Course } from "@/types/course.types";

export function useCreateLessonForm() {
  const navigate = useNavigate();
  const { data } = useCourses();
  const courses: Course[] = data?.courses ?? [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    duration:""
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [noteFile, setNoteFile] = useState<File | null>(null);
const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const { mutate: createLesson, isPending } = useCreateLesson();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
     if (!file) return;
    if (file) setVideoFile(file);
     const previewUrl = URL.createObjectURL(file);
     setVideoPreview(previewUrl);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNoteFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("courseId", formData.courseId);
    dataToSend.append("duration", formData.duration);
    if (videoFile) dataToSend.append("video", videoFile);
    if (noteFile) dataToSend.append("note", noteFile);

    createLesson(dataToSend, {
      onSuccess: () => {
        toast.success("Lesson created successfully", {
          description: "Your new lesson is now live.",
          position: "top-center",
        });
        setTimeout(() => navigate({ to: "/instructor/lessons" }), 1500);
      },
      onError: (error: any) => {
        const messages =
          error.response?.data?.message || "Something went wrong.";
        toast.error("Lesson creation failed", {
          description: Array.isArray(messages) ? messages.join("\n") : messages,
          position: "top-center",
        });
      },
    });
  };

  return {
    formData,
    courses,
    videoFile,
    noteFile,
    isPending,
    handleChange,
    handleVideoChange,
    handleNoteChange,
    handleSubmit,
    videoPreview,
    setFormData,
  };
}
