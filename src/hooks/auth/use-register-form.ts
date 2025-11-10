import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Role } from "@/types/user.types";
import { useRegister } from "@/hooks/use-auth";

export function useRegisterForm() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: Role.STUDENT,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as Role }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match", {
        description: "Please make sure your passwords match.",
        position: "top-center",
      });
      return;
    }

    register(formData, {
      onSuccess: () => {
        toast.success("Registration successful", {
          description: "Your account has been created successfully.",
          position: "top-center",
        });
        setTimeout(() => {
          navigate({ to: "/auth/login" });
        }, 2000);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed. Please try again.";

        toast.error("Registration failed", {
          description: message,
          position: "top-center",
        });
      },
    });
  };

  return {
    formData,
    handleChange,
    handleRoleChange,
    handleSubmit,
    isPending,
  };
}
