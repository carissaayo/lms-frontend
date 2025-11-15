import { api } from "./client";

export async function getuserProfileApi() {
  const res = await api.get("users/profile");
  console.log("API response:", res.data);
  return res.data;
}

export async function updateProfileApi(payload: FormData) {
  const res = await api.patch("/users/profile", payload);
  return res.data;
}


export async function getAdminProfileApi() {
  const res = await api.get("/admin-users/profile");
  console.log("API response:", res.data);
  return res.data;
}

export async function updateAdminProfileApi(payload: FormData) {
  const res = await api.patch("/admin-users/profile", payload);
  return res.data;
}
