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
