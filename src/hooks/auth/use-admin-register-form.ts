import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAdminRegister } from "@/hooks/use-auth"; 
import { Role } from "@/types/user.types";

export function useAdminRegisterForm() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useAdminRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: Role.ADMIN || "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your passwords match.",
        position: "top-center",
      });
      return;
    }

    register(formData, {
      onSuccess: (data) => {
        toast.success("Admin account created", {
          description: "Your account is pending approval.",
          position: "top-center",
        });

        console.log("Admin registration data:", data);

        setTimeout(() => {
          navigate({ to: "/admin/auth/login" });
        }, 1500);
      },
      onError: (error: any) => {
        console.error("Registration failed", error);
        const errorMessage =
          error?.response?.data?.message ||
          "There was an error creating your account. Please try again.";

        toast.error("Registration failed", {
          description: errorMessage,
          position: "top-center",
        });
      },
    });
  };

  return { formData, handleChange, handleSubmit, isPending };
}
