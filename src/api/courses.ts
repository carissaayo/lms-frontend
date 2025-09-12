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
      title: search || undefined, // backend can match this with regex if you want
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
