import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";
import { useAdminLogin } from "../use-auth";


export function useAdminLoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useAdminLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { ...formData },
      {
        onSuccess: (data:any) => {
          toast.success("Welcome back, Admin", {
            position: "top-center",
          });

        useAuthStore.getState().loginUser({
          user: data.profile,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

          setTimeout(() => {
            navigate({ to: "/admin/analytics" });
          }, 1000);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Invalid admin credentials. Please try again.";

          toast.error("Login failed", {
            description: message,
            position: "top-center",
          });
        },
      }
    );
  };

  return { formData, handleChange, handleSubmit, isPending };
}
