import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCreateCourse } from "@/hooks/use-course";
import { toast } from "sonner";

export function useCreateCourseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate: createCourse, isPending } = useCreateCourse();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("duration", formData.duration);

    if (coverImage) data.append("coverImage", coverImage);

    createCourse(data, {
      onSuccess: () => {
        toast.success("Course created successfully", {
          description: "Your new course is now live.",
          position: "top-center",
        });
        setTimeout(() => {
          navigate({ to: "/instructor/courses" });
        }, 1500);
      },
      onError: (error: any) => {
        const messages =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        const errorText = Array.isArray(messages)
          ? messages.join("\n")
          : messages;
        toast.error("Course creation failed", {
          description: errorText,
          position: "top-center",
        });
      },
    });
  };

  return {
    formData,
    previewUrl,
    isPending,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
