import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLessonApi,
  deleteLessonApi,
  getLessonsApi,
  getLessonsInACourseApi,
  getLessonsStudentApi,
  updateLessonApi,
} from "@/api/lessons";
import useAuthStore from "@/store/useAuthStore";

export function useLessons() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getLessonsApi();
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

export function useLessonsInACourse(courseId: string) {
  return useQuery({
    queryKey: ["lessons/course", courseId],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getLessonsInACourseApi(courseId);
    },
    enabled: !!courseId,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCreateLesson() {
  return useMutation({
    mutationFn: createLessonApi,
    onError: (error: any) => console.log("Mutation failed:", error),
    retry: false,
    
  });
}

export function useUpdateLesson() {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateLessonApi(id, formData),
    onError: (error: any) => console.log("Mutation failed:", error),
    retry: false,
    
  });
}

export function useDeleteLesson() {
  return useMutation({
    mutationFn: deleteLessonApi,
    onError: (error: any) => console.log("Mutation failed:", error),
    retry: false,
    
  });
}

// ======================STUDENT=============

export function useLessonsStudentApi(courseId: string) {
  return useQuery({
    queryKey: ["lessons/course", courseId, "all"],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getLessonsStudentApi(courseId);
    },
    enabled: !!courseId,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}
