import { api } from "./client";

export async function getLessonsApi() {
  const res = await api.get("/lessons");
  console.log("API response:", res.data);

  return res.data;
}

export async function getLessonsInACourseApi(id: string) {
  const res = await api.get(`/lessons/course/${id}`);
  console.log("API response:", res.data);

  return res.data;
}

export async function createLessonApi(formData: FormData) {
  const res = await api.post("/lessons/create", formData, {});
  return res.data;
}

// Update a lesson by ID
export async function updateLessonApi(id: string, formData: FormData) {
  const res = await api.put(`/lessons/${id}`, formData);
  return res.data.lesson;
}

// Delete a lesson by ID
export async function deleteLessonApi(id: string) {
  const res = await api.delete(`/lessons/${id}`);
  return res.data;
}

// =================STUDENT========================

export async function getLessonsStudentApi(id: string) {
  const res = await api.get(`/lessons/course/${id}/all`);
  console.log("API response:", res.data);

  return res.data;
}

export async function updateLessonProgressApi(
  lessonId: string,
  payload: { videoDuration: number; watchedDuration: number }
) {
  const res = await api.patch(`/students/lessons/${lessonId}`, payload);
  return res.data;
}

export async function startLessonApi(lessonId: string) {
  const res = await api.post(`students/lessons/${lessonId}/start`);
  return res.data;
}

export async function getSingleLessonApi(lessonId: string) {
  const res = await api.get(`students/lessons/${lessonId}`);
  return res.data;
}

export async function updateLessonProgress(lessonId: string, payload: any) {
  const res = await api.patch(`/lessons/${lessonId}/`, payload);
  return res.data;
}
