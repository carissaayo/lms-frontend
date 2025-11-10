import { AdminStudentsFilters } from "@/types/student.types";
import { api } from "./client";

export async function getStudentPaymentsApi(params = {}) {
  const res = await api.get("/students/payments", { params });
  return res.data;
}

export const getAdminStudentsApi = async (filters: AdminStudentsFilters) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.status && filters.status !== "all")
    params.append("status", filters.status);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const { data } = await api.get(`/admin-users/students?${params.toString()}`);
  return data;
};

export const getSingleStudentAdmin = async (id: string) => {
  const { data } = await api.get(`/admin-students/${id}`);
  return data;
};

export const updateStudentStatus = async (
  id: string,
  payload: { status: string; reason?: string }
) => {
  const { data } = await api.patch(`/admin-users/students/${id}/status`, payload);
  return data;
};