import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLessonApi,
  deleteLessonApi,
  getLessonsApi,
  getLessonsInACourseApi,
  updateLessonApi,
} from "@/api/lessons";

export function useLessons() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: getLessonsApi,
    refetchOnWindowFocus: false, // ⛔ don't spam on focus
    refetchOnReconnect: false, // ⛔ don't spam on reconnect
  });
}

export function useLessonsInACourse(courseId: string) {
  return useQuery({
    queryKey: ["lessons/", courseId],
    queryFn: () => getLessonsInACourseApi(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useCreateLesson() {
  return useMutation({
    mutationFn: createLessonApi,
    onError: (error: any) => console.log("Mutation failed:", error),
  });
}

export function useUpdateLesson() {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateLessonApi(id, formData),
    onError: (error: any) => console.log("Mutation failed:", error),
  });
}

export function useDeleteLesson() {
  return useMutation({
    mutationFn: deleteLessonApi,
    onError: (error: any) => console.log("Mutation failed:", error),
  });
}
