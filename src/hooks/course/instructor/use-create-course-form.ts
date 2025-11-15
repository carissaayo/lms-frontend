
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCreateCourse } from "@/hooks/use-course";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
}

export function useCreateCourseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { mutate: createCourse, isPending } = useCreateCourse();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent, completeFormData?: any) => {
    e.preventDefault();

    const dataToSubmit = completeFormData || formData;

    // Validation
    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    if (!dataToSubmit.level) {
      toast.error("Please select a course level");
      return;
    }

    if (!dataToSubmit.language) {
      toast.error("Please select a language");
      return;
    }

    // Create FormData
    const formDataToSend = new FormData();
    formDataToSend.append("title", dataToSubmit.title);
    formDataToSend.append("description", dataToSubmit.description);
    formDataToSend.append("category", dataToSubmit.category);
    formDataToSend.append("duration", dataToSubmit.duration);
    formDataToSend.append("price", dataToSubmit.price);
    formDataToSend.append("level", dataToSubmit.level);
    formDataToSend.append("language", dataToSubmit.language);


    // Handle arrays
    if (dataToSubmit.requirements && dataToSubmit.requirements.length > 0) {
      formDataToSend.append(
        "requirements",
        JSON.stringify(dataToSubmit.requirements)
      );
    }
     if (dataToSubmit.tags && dataToSubmit.tags.length > 0) {
       formDataToSend.append(
         "tags",
         JSON.stringify(dataToSubmit.tags)
       );
     }

    if (
      dataToSubmit.learningOutcomes &&
      dataToSubmit.learningOutcomes.length > 0
    ) {
      formDataToSend.append(
        "learningOutcomes",
        JSON.stringify(dataToSubmit.learningOutcomes)
      );
    }

    if (coverImage) {
      formDataToSend.append("coverImage", coverImage);
    }
createCourse(formDataToSend, {
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
    const errorText = Array.isArray(messages) ? messages.join("\n") : messages;
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
