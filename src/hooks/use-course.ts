import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseApi,
  getCoursesApi,
  submitCourseApi,
  publishCourseApi,
  deleteCourseApi,
} from "@/api/courses";

// 🔹 Fetch all courses
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
