import { RegisterData } from "@/types/user.types";
import { api } from "./client";

export const loginApi = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const adminLoginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/admin-auth/login", data);
  return res.data;
};

export interface AdminRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const adminRegisterApi = async (data: AdminRegisterData) => {
  const res = await api.post("/admin-auth/register", data);
  return res.data;
};
