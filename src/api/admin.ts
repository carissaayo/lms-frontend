import { api } from "./client";

export async function updateProfileApi(payload: FormData) {
  const res = await api.patch("/admin-admins/", payload);
  return res.data;
}
export async function getAdminsApi({
  search,
  sort,
  page,
  limit,
}: any) {
  const res = await api.get(`admin-admins/`, {
    params: {
      title: search || undefined,
      sort: sort || undefined,
      page: page || 1,
      limit: limit || 10,
    },
  });

  console.log("API response:", res.data);
  return res.data;
}