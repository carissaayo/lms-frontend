import { api } from "./client";

export async function getStudentPaymentsApi(params = {}) {
  const res = await api.get("/students/payments", { params });
  return res.data;
}
