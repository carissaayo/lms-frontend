import { api } from "./client";

export async function getInstructorStudentsApi(params = {}) {
  const res = await api.get("/instructor/students", { params });
  return res.data;
}

export async function getInstructorEarningsApi(params = {}) {
  const res = await api.get("/instructor/earnings", { params });
  return res.data;
}
