import { api } from "./client";

export async function getInstructorStudentsApi(params = {}) {
  const res = await api.get("/instructor/students", { params });
  return res.data;
}

export async function getInstructorEarningsApi(params = {}) {
  const res = await api.get("/instructor/earnings", { params });
  return res.data;
}

export const getAdminInstructors = async (params: any) => {
  const { data } = await api.get("/admin-users/instructors", { params });
  return data;
};

export const getSingleInstructorAdmin = async (id: string) => {
  const res = await api.get(`/admin-instructors/${id}`);
  return res.data;
};

export const updateInstructorStatusAdmin = async ({
  instructorId,
  status,
  reason,
}: {
  instructorId: string;
  status: string;
  reason?: string;
}) => {
  const res = await api.patch(
    `/admin/instructors/${instructorId}/status`,
    {
      status,
      reason,
    }
  );
  return res.data;
};