import { api } from "./client";

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

// Student

export async function getCoursesForStudentsApi(filters?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (filters?.category && filters.category !== "all")
    params.append("category", filters.category);

  if (filters?.search) params.append("title", filters.search);

  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const res = await api.get(`/api/courses?${params.toString()}`);
  console.log("API response:", res.data);

  return res.data;
}
