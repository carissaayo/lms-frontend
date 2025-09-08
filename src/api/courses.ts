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
