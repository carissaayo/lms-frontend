import { api } from "./client";

export async function getAdminsApi({ search, sort, page, limit }: any) {
  const res = await api.get(`/admin-admins/`, {
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

export const createNewAdminApi = async (
  payload: { email:string }
) => {
  const { data } = await api.post(
    `/admin-admins/add-admin`,
    payload
  );
  return data;
};