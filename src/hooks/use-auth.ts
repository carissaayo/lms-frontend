import { useMutation } from "@tanstack/react-query";
import {
  adminLoginApi,
  adminRegisterApi,
  loginApi,
  registerApi,
} from "@/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("data", data);
    },
    retry: false,
    
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log("data", data);
    },
    retry: false,
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: adminLoginApi,
    onSuccess: (data) => {
      console.log("Admin login data", data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.profile));
    },
    retry: false,
  });
}

export function useAdminRegister() {
  return useMutation({
    mutationFn: adminRegisterApi,
    onSuccess: (data) => {
      console.log("Admin registration data", data);
    },
    retry: false,
  });
}
