import { getSingleLessonApi, startLessonApi } from "@/api/lessons";
import { updateLessonProgressApi } from "@/api/lessons";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUpdateLessonProgress() {
  return useMutation({
    mutationFn: ({
      lessonId,
      videoDuration,
      watchedDuration,
    }: {
      lessonId: string;
      videoDuration: number;
      watchedDuration: number;
    }) => updateLessonProgressApi(lessonId, { videoDuration, watchedDuration }),
    retry: false,
  });
}

export function useStartLesson() {
  return useMutation({
    mutationFn: (lessonId: string) => startLessonApi(lessonId),
    retry: false,
  });
}

export function useSingleLesson(lessonId: string) {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getSingleLessonApi(lessonId);
    },
    enabled: !!lessonId,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}
