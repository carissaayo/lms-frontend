import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useStartLesson } from "@/hooks/use-lessons";
import { useSingleEnrollment } from "@/hooks/use-enrollment";

export function useEnrollmentPage(id: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

  const { data, isLoading, error } = useSingleEnrollment(id);
  const { mutate: startCourse, isPending: isStarting } = useStartLesson();

  const course = data?.course;
  const lessons = course?.lessons ?? [];

  const lessonId = lessons[0]?._id;
  const completedLessons = 0;

  const progressPercentage =
    lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  const handleStartCourse = () => {
    startCourse(lessonId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [lessonId] });
        toast.success("Course started successfully", {
          description: "Redirecting to lesson 1...",
          position: "top-center",
        });

        setTimeout(() => {
          navigate({ to: `/student/enrollments/lessons/${lessonId}` });
        }, 2500);
      },

      onError: (error: any) => {
        const messages =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        const errorText = Array.isArray(messages)
          ? messages.join("\n")
          : messages;

        toast.error("Unable to start course", {
          description: errorText,
          position: "top-center",
        });
      },
    });
  };

  return {
    navigate,
    data,
    course,
    lessons,
    error,
    isLoading,
    hoveredLesson,
    setHoveredLesson,
    handleStartCourse,
    progressPercentage,
    completedLessons,
    isStarting,
  };
}
