import { useState } from "react";
import { useCreateCourseForm } from "@/hooks/course/instructor/use-create-course-form";

const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Arabic",
  "Portuguese",
];

export function useCreateCourse() {
  // Arrays
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);

  // Selects
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");

  // Form logic
  const {
    formData,
    previewUrl,
    isPending,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateCourseForm();

  // --- Array Handlers ---
  const addRequirement = () => setRequirements([...requirements, ""]);
  const removeRequirement = (index: number) =>
    setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addLearningOutcome = () =>
    setLearningOutcomes([...learningOutcomes, ""]);
  const removeLearningOutcome = (index: number) =>
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  const updateLearningOutcome = (index: number, value: string) => {
    const updated = [...learningOutcomes];
    updated[index] = value;
    setLearningOutcomes(updated);
  };

  const addTag = () => setTags([...tags, ""]);
  const removeTag = (index: number) =>
    setTags(tags.filter((_, i) => i !== index));
  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  // --- Form Submit ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validRequirements = requirements.filter((req) => req.trim() !== "");
    const validOutcomes = learningOutcomes.filter(
      (outcome) => outcome.trim() !== ""
    );
    const validTags = tags.filter((tag) => tag.trim() !== "");

    const completeFormData = {
      ...formData,
      requirements: validRequirements,
      learningOutcomes: validOutcomes,
      tags: validTags,
      level,
      language,
    };

    handleSubmit(e, completeFormData);
  };

  return {
    formData,
    previewUrl,
    isPending,
    handleChange,
    handleFileChange,
    handleFormSubmit,

    requirements,
    addRequirement,
    removeRequirement,
    updateRequirement,

    learningOutcomes,
    addLearningOutcome,
    removeLearningOutcome,
    updateLearningOutcome,

    tags,
    addTag,
    removeTag,
    updateTag,

    level,
    setLevel,
    language,
    setLanguage,

    COURSE_LEVELS,
    LANGUAGES,
  };
}
