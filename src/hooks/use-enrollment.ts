import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  enrollInCourseApi,
  getEnrolledCourseApi,
  getStudentEnrollmentsApi,
  getUserEnrollmentsApi,
} from "@/api/enrollments";

export function useUserEnrollments() {
  return useQuery({
    queryKey: [],
    queryFn: () => getUserEnrollmentsApi(),
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  });
}
export function useStudentEnrollments(filters: any) {
  return useQuery({
    queryKey: [
      "courses",
      filters.category,
      filters.search,
      filters.sort,
      filters.minPrice,
      filters.maxPrice,
      filters.page,
      filters.limit,
    ],
    queryFn: () => getStudentEnrollmentsApi(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSingleEnrollment(courseId: string) {
  return useQuery({
    queryKey: [courseId],
    queryFn: () => getEnrolledCourseApi(courseId),
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  });
}


// 🔹 Enroll in course
export function useEnrollCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => enrollInCourseApi(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
    },
    retry: false,
    
  });
}