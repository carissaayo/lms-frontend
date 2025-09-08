// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "@/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("data", data);
      // Save token (if not cookie-based)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log("data", data);
    },
  });
}
