import { useMutation, useQuery } from "@tanstack/react-query";
import { createLessonApi, getLessonsApi } from "@/api/lessons";

export function useLessons() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: getLessonsApi,
    refetchOnWindowFocus: false, // ⛔ don't spam on focus
    refetchOnReconnect: false, // ⛔ don't spam on reconnect
  });
}

export function useCreateLesson() {
  return useMutation({
    mutationFn: createLessonApi,
  });
}
