import { getSingleLessonApi, startLessonApi } from "@/api/lessons";
import { updateLessonProgressApi } from "@/api/lessons";
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
  });
}

export function useStartLesson() {
  return useMutation({
    mutationFn: (lessonId: string) => startLessonApi(lessonId),
  });
}

export function useSingleLesson(lessonId: string) {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getSingleLessonApi(lessonId),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
  });
}
