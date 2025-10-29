import { api } from "./client";

export async function getAdminAnalyticsApi(params = {}) {
  const res = await api.get("/admin-analytics", { params });
  return res.data;
}

export async function getInstructorAnalyticsApi(params = {}) {
  const res = await api.get("/instructor/analytics", { params });
  return res.data;
}

export async function getStudentAnalyticsApi(params = {}) {
  const res = await api.get("/student/analytics", { params });
  return res.data;
}
