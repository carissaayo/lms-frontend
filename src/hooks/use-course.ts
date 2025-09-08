import { useMutation, useQuery } from "@tanstack/react-query";
import { createCourseApi, getCoursesApi } from "@/api/courses";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCoursesApi,
    refetchOnWindowFocus: false, // ⛔ don't spam on focus
    refetchOnReconnect: false, // ⛔ don't spam on reconnect
  });
}

export function useCreateCourse() {
  return useMutation({
    mutationFn: createCourseApi,
  });
}
