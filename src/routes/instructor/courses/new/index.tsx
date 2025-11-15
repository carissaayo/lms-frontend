import { Toaster } from "sonner";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCategory } from "@/types/course.types";
import { useCreateCourseForm } from "@/hooks/course/instructor/use-create-course-form";
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/instructor/courses/new/")({
  component: RouteComponent,
});

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

function RouteComponent() {
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");

  const {
    formData,
    previewUrl,
    isPending,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateCourseForm();

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

    const addTag = () => {
      setTags([...tags, ""]);
    };

    const removeTag = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    const updateTag = (index: number, value: string) => {
      const updated = [...tags];
      updated[index] = value;
      setTags(updated);
    };


  const addLearningOutcome = () => {
    setLearningOutcomes([...learningOutcomes, ""]);
  };

  const removeLearningOutcome = (index: number) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  };

  const updateLearningOutcome = (index: number, value: string) => {
    const updated = [...learningOutcomes];
    updated[index] = value;
    setLearningOutcomes(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty values
    const validRequirements = requirements.filter((req) => req.trim() !== "");
    const validOutcomes = learningOutcomes.filter(
      (outcome) => outcome.trim() !== ""
    );

       const validTags = tags.filter(
         (outcome) => outcome.trim() !== ""
       );


    // Merge with formData
    const completeFormData = {
      ...formData,
      requirements: validRequirements,
      learningOutcomes: validOutcomes,
      tags:validTags,
      level,
      language,
    };

    handleSubmit(e, completeFormData);
  };

  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600">
            Fill in the details below to create your course
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Complete Web Development Bootcamp"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what students will learn in this course..."
                  required
                  rows={6}
                  className="mt-1.5"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "category", value },
                      } as any)
                    }
                    required
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(CourseCategory).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level">Course Level *</Label>
                  <Select value={level} onValueChange={setLevel} required>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_LEVELS.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Select value={language} onValueChange={setLanguage} required>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    required
                    min="1"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (₦) *</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  required
                  min="0"
                  className="mt-1.5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Set to 0 for free courses
                </p>
              </div>
            </CardContent>
          </Card>
          {/* Tags  */}
          <Card>
            <CardHeader>
              <CardTitle>Add tags for the course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Add relevant tags for the course
              </p>
              {tags.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder={`Tag ${index + 1}`}
                    className="flex-1"
                  />
                  {tags.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTag(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tags
              </Button>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle>What Students Will Learn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Add key learning outcomes that students will achieve
              </p>
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) =>
                      updateLearningOutcome(index, e.target.value)
                    }
                    placeholder={`Learning outcome ${index + 1}`}
                    className="flex-1"
                  />
                  {learningOutcomes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeLearningOutcome(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addLearningOutcome}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Outcome
              </Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Course Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                List any prerequisites or requirements for taking this course
              </p>
              {requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="flex-1"
                  />
                  {requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addRequirement}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Course Cover Image *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Cover Preview"
                      className="mx-auto rounded-lg max-h-64 object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("cover-upload")?.click()
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Upload a course cover image
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("cover-upload")?.click()
                        }
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Recommended: 1280x720px, JPG or PNG
                    </p>
                  </div>
                )}
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required={!previewUrl}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[150px]"
            >
              {isPending ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </main>
    </DashboardShell>
  );
}
