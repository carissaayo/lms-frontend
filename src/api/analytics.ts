import { api } from "./client";

export async function getStudentAnalyticsApi(params = {}) {
  const res = await api.get(`students/analytics`, { params });
  return res.data;
}
