import { api } from "./client";

// ==============================
// Instructor APIs
// ==============================

export async function getCoursesApi() {
  const res = await api.get("/instructor-courses/");
  console.log("API response:", res.data);
  return res.data;
}

export async function createCourseApi(formData: FormData) {
  const res = await api.post("/instructor-courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function submitCourseApi(courseId: string) {
  const res = await api.patch(`/instructor-courses/${courseId}/submit`);
  return res.data;
}

export async function publishCourseApi(courseId: string) {
  const res = await api.patch(`/instructor-courses/${courseId}/publish`);
  return res.data;
}

export async function deleteCourseApi(courseId: string) {
  const res = await api.delete(`/instructor-courses/${courseId}`);
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
  status: string,
  reason?: string
) {

  console.log(status,"status");
  
  const payload: any = { action: status.toLowerCase() };

  if (status === "rejected") payload.rejectReason = reason;
  if (status === "suspended") payload.suspendReason = reason;

  const { data } = await api.patch(
    `/admin-courses/${courseId}/action`,
    payload
  );
  return data;
}

