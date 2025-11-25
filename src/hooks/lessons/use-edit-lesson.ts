import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCourses } from "@/hooks/use-course";
import { useUpdateLesson, useDeleteLesson } from "@/hooks/use-lesson";
import type { Lesson } from "@/types/lesson.types";
import type { Course } from "@/types/course.types";

interface UseEditLessonProps {
  initialLesson?: Lesson;
  lessonId: string;
}

export function useEditLesson({ initialLesson, lessonId }: UseEditLessonProps) {
  const navigate = useNavigate();
  const { data} = useCourses();
  const courses: Course[] = data?.courses ?? [];

  const updateLessonMutation = useUpdateLesson();
  const deleteLessonMutation = useDeleteLesson();

  const [formData, setFormData] = useState({
    title: initialLesson?.title || "",
    description: initialLesson?.description || "",
    courseId: initialLesson?.courseId || "",
    duration: initialLesson?.duration || "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
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
    if (formData.courseId) dataToSend.append("courseId", formData.courseId);
    if (videoFile) dataToSend.append("video", videoFile);
    if (noteFile) dataToSend.append("note", noteFile);

    updateLessonMutation.mutate(
      { id: lessonId, formData: dataToSend },
      {
        onSuccess: () => {
          toast.success("Lesson updated successfully", {
            position: "top-center",
          });
          setTimeout(() => navigate({ to: "/instructor/lessons" }), 1500);
        },
        onError: (error: any) => {
          const messages =
            error.response?.data?.message || "Something went wrong.";
          toast.error("Lesson update failed", {
            description: Array.isArray(messages)
              ? messages.join("\n")
              : messages,
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
    deleteLessonMutation.mutate(lessonId, {
      onSuccess: () => {
        toast.success("Lesson deleted successfully", {
          position: "top-center",
        });
        setTimeout(() => navigate({ to: "/instructor/lessons" }), 1500);
      },
      onError: (error: any) => {
        const messages =
          error.response?.data?.message || "Something went wrong.";
        toast.error("Lesson deletion failed", {
          description: Array.isArray(messages) ? messages.join("\n") : messages,
          position: "top-center",
        });
        setIsDeleting(false);
      },
    });
  };

  const handleCancelDelete = () => setIsDeleting(false);

  return {
    formData,
    setFormData,
    videoFile,
    noteFile,
    isDeleting,
    courses,
    updateLessonMutation,
    deleteLessonMutation,
    handleChange,
    handleVideoChange,
    handleNoteChange,
    handleSubmit,
    handleDelete,
    handleCancelDelete,
  };
}
