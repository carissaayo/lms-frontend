import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseApi,
  getCoursesApi,
  submitCourseApi,
  publishCourseApi,
  deleteCourseApi,
  getCoursesForStudentsApi,
  getSingleCourseApi,
  getAdminCoursesApi,
  getSingleCourseAdminApi,
  updateCourseStatusAdminApi,
} from "@/api/courses";
import useAuthStore from "@/store/useAuthStore";

// ==============================
// Instructor Hooks
// ==============================

// 🔹 Fetch all courses (Instructor)
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getCoursesApi();
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

// 🔹 Create a new course
export function useCreateCourse() {
  return useMutation({
    mutationFn: createCourseApi,
    retry: false,
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
    retry: false,
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
    retry: false,
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
    retry: false,
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
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getCoursesForStudentsApi(filters);},
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

// 🔹 Fetch single course
export function useSingleCourse(id: string) {
  return useQuery({
    queryKey: ["singleCourse", id],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getSingleCourseApi(id)},
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}



// ADMIN
export function useAdminCourses(filters: any) {
  const { search, category, status, page = 1, limit = 10 } = filters;

  return useQuery({
    queryKey: ["admin-courses", search, category, status, page, limit],
    queryFn: () =>
      getAdminCoursesApi({ search, category, status, page, limit }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    retry: false,
    retryOnMount: false,
    
  });
}


export function useSingleCourseAdmin(courseId: string) {
  return useQuery({
    queryKey: ["singleCourse", courseId],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getSingleCourseAdminApi(courseId);
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

export function useUpdateCourseStatusAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      status,
      reason,
    }: {
      courseId: string;
      status: string;
      reason?: string;
    }) => updateCourseStatusAdminApi(courseId, status, reason),

    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["singleCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },

    onError: (error: any) => {
      console.error(
        "Failed to update course status:",
        error?.response?.data || error
      );
    },
    retry: false,
    
  });
}