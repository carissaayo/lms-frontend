import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCourses,
  useSubmitCourse,
  usePublishCourse,
  useDeleteCourse,
} from "@/hooks/use-course";
import { useLessonsInACourse } from "@/hooks/use-lesson";
import SingleLoadingForbiddenError from "@/components/SingleLoadingForbiddenError";
import { Course } from "@/types/course.types";
import { Lesson } from "@/types/lesson.types";

export function useCourseDetail(id: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all courses
  const { data, isLoading, error } = useCourses();

  // Actual course
  const course: Course | undefined = useMemo(() => {
    return data?.courses?.find((c: any) => c._id === id);
  }, [data, id]);

  // Fetch lessons for this course
  const { data: lessonsData } = useLessonsInACourse(course?._id as string);
  const lessons: Lesson[] = lessonsData?.lessons ?? [];

  // Local state
  const [newLesson, setNewLesson] = useState("");

  // Mutations
  const submitMutation = useSubmitCourse();
  const publishMutation = usePublishCourse();
  const deleteMutation = useDeleteCourse();

  // Handlers
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
      onError: (err: any) => {
        toast.error("Course submission failed", {
          description: err?.response?.data?.message || "Something went wrong.",
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
          description: "Your course is now live.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err: any) => {
        toast.error("Course publishing failed", {
          description: err?.response?.data?.message || "Something went wrong.",
          position: "top-center",
        });
      },
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    deleteMutation.mutate(courseId, {
      onSuccess: () => {
        toast.success("Course deleted successfully", {
          description: "Your course has been removed.",
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        navigate({ to: "/instructor/courses" });
      },
      onError: (err: any) => {
        toast.error("Course deletion failed", {
          description: err?.response?.data?.message || "Something went wrong.",
          position: "top-center",
        });
      },
    });
  };


  const errorUI = SingleLoadingForbiddenError({
    error,
    isLoading,
    route: "/admin/instructors",
    item: course,
    itemName: "Course",
  });

  return {
    course,
    lessons,
    newLesson,
    setNewLesson,
    submitMutation,
    publishMutation,
    deleteMutation,
    handleSubmitCourse,
    handlePublishCourse,
    handleDeleteCourse,
    errorUI,
  };
}
