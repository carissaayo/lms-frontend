import { api } from "./client";

// ==============================
// Instructor APIs
// ==============================

// ==============================
// Student APIs
// ==============================

// Get all courses (with filters)
export async function getUserEnrollmentsApi() {
  const res = await api.get(`students/courses`);
  console.log("API response:", res.data);
  return res.data;
}

export async function getStudentEnrollmentsApi({
  category,
  search,
  sort,
  minPrice,
  maxPrice,
  page,
  limit,
}: any) {
  const res = await api.get(`students/courses`, {
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

export async function getEnrolledCourseApi(courseId: string) {

  const res = await api.get(`student-courses/${courseId}`);
  return res.data;
}


// Enroll a student in a course
export async function enrollInCourseApi(courseId: string) {
  const res = await api.post(`students/enroll/${courseId}`);
  return res.data;
}
