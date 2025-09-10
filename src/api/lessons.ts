import { api } from "./client";

export async function getLessonsApi() {
  const res = await api.get("/lessons");
  console.log("API response:", res.data);

  return res.data;
}

export async function createLessonApi(formData: FormData) {
  const res = await api.post("/lessons/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
