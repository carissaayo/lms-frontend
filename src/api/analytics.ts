import { api } from "./client";

export async function getStudentAnalyticsApi() {
  const res = await api.get(`students/analytics`);
  return res.data;
}
