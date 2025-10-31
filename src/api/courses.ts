import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

// ==============================
// Instructor APIs
// ==============================

export async function getCoursesApi() {
  const res = await api.get("/courses");
  console.log("API response:", res.data);
  return res.data;
}

export async function createCourseApi(formData: FormData) {
  const res = await api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function submitCourseApi(courseId: string) {
  const res = await api.patch(`/courses/${courseId}/submit`);
  return res.data;
}

export async function publishCourseApi(courseId: string) {
  const res = await api.patch(`/courses/${courseId}/publish`);
  return res.data;
}

export async function deleteCourseApi(courseId: string) {
  const res = await api.delete(`/courses/${courseId}`);
  return res.data;
}

// ==============================
// Student APIs
// ==============================

// Get all courses (with filters)
export async function getCoursesForStudentsApi({
  category,
  search,
  sort,
  minPrice,
  maxPrice,
  page,
  limit,
}: any) {
  const res = await api.get(`/courses`, {
    params: {
      category: category !== "all" ? category : undefined,
      title: search || undefined,
      sort: sort || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page: page || 1,
      limit: limit || 10,
    },
  });

  console.log("API response:", res.data);
  return res.data;
}

// Get a single course (for student detail page)
export async function getSingleCourseApi(courseId: string) {
  const res = await api.get(`/courses/${courseId}`);
  return res.data;
}

// Enroll a student in a course
export async function enrollInCourseApi(courseId: string) {
  const res = await api.post(`students/enroll/${courseId}`);
  return res.data;
}

// ADMIN
export async function getAdminCoursesApi(filters: any) {
  const res = await api.get("/admin-courses", { params: filters });
  console.log("API response:", res.data);
  return res.data;
}

export async function getSingleCourseAdminApi(courseId: string) {
  const res = await api.get(`/admin-courses/${courseId}`);
  return res.data;
}

export async function updateCourseStatusAdminApi(
  courseId: string,
  status: string
) {
  const res = await api.patch(`/admin/courses/${courseId}/status`, {
    status,
  });
  return res.data;
}

export function useUpdateCourseStatusAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, status }: { courseId: string; status: string }) =>
      updateCourseStatusAdminApi(courseId, status),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["singleCourse", courseId] });
    },

    onError: (error: any) => {
      console.error(
        "Failed to update course status:",
        error?.response?.data || error
      );
    },
  });
}