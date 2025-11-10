// src/hooks/use-login-form.ts
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLogin } from "@/hooks/use-auth";
import useAuthStore from "@/store/useAuthStore";
import { Role } from "@/types/user.types";

export function useLoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(formData, {
      onSuccess: (data) => {
        toast.success("Welcome back", { position: "top-center" });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.profile));
        useAuthStore.getState().loginUser(data.profile);

        setTimeout(() => {
          if (data.profile.role === Role.INSTRUCTOR)
            navigate({ to: "/instructor/analytics" });
          else if (data.profile.role === Role.STUDENT)
            navigate({ to: "/student/analytics" });
          else navigate({ to: "/" });
        }, 1000);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again.";

        toast.error("Login failed", {
          description: message,
          position: "top-center",
        });
      },
    });
  };

  return { formData, handleChange, handleSubmit, isPending };
}
