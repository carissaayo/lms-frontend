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
    retry: false,
    retryOnMount: false,
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
    queryFn: () => getCoursesForStudentsApi(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
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
    retry: false,
    retryOnMount: false,
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
    queryFn: () => getSingleCourseAdminApi(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
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