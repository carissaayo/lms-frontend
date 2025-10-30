import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseApi,
  getCoursesApi,
  submitCourseApi,
  publishCourseApi,
  deleteCourseApi,
  getCoursesForStudentsApi,
  getSingleCourseApi,
  enrollInCourseApi,
  getAdminCoursesApi,
} from "@/api/courses";

// ==============================
// Instructor Hooks
// ==============================

// 🔹 Fetch all courses (Instructor)
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCoursesApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// 🔹 Create a new course
export function useCreateCourse() {
  return useMutation({
    mutationFn: createCourseApi,
  });
}

// 🔹 Submit a course
export function useSubmitCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => submitCourseApi(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// 🔹 Publish a course
export function usePublishCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => publishCourseApi(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// 🔹 Delete a course
export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => deleteCourseApi(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// ==============================
// Student Hooks
// ==============================

// 🔹 Fetch all courses (with filters)
export function useStudentsCourses(filters: any) {
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
    queryFn: () => getCoursesForStudentsApi(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// 🔹 Fetch single course
export function useSingleCourse(id: string) {
  return useQuery({
    queryKey: ["singleCourse", id],
    queryFn: () => getSingleCourseApi(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
  });
}



// ADMIN
export function useAdminCourses(filters: any) {
  return useQuery({
    queryKey: ["admin-courses",   filters.search,
      filters.category,
      filters.status,],
    queryFn: () => getAdminCoursesApi(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    
  });
}
