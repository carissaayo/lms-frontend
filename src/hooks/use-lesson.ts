import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLessonApi,
  deleteLessonApi,
  getLessonsApi,
  getLessonsInACourseApi,
  getLessonsStudentApi,
  updateLessonApi,
} from "@/api/lessons";

export function useLessons() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: getLessonsApi,
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false, 
  });
}

export function useLessonsInACourse(courseId: string) {
  return useQuery({
    queryKey: ["lessons/course", courseId],
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

// ======================STUDENT=============

export function useLessonsStudentApi(courseId: string) {
  return useQuery({
    queryKey: ["lessons/course", courseId, "all"],
    queryFn: () => getLessonsStudentApi(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 10,
  });
}
