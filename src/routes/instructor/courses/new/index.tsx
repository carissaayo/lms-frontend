import { Toaster } from "sonner";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { useCreateCourse } from "@/hooks/instructors/use-create-course";

import BasicInfo from "@/components/courses/instructor/single-course/form/BasicInfo";
import TagsInput from "@/components/courses/instructor/single-course/form/TagsInput";
import LearningOutcomes from "@/components/courses/instructor/single-course/form/LearningOutcome";
import Requirements from "@/components/courses/instructor/single-course/form/RequirementInput";
import CoverImage from "@/components/courses/instructor/single-course/form/CoverImageInput";
import SubmitButtons from "@/components/courses/instructor/single-course/form/SubmitButtons";

export const Route = createFileRoute("/instructor/courses/new/")({
  component: RouteComponent,
});

function RouteComponent() {
   const {
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
   } = useCreateCourse();

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
          <BasicInfo
            formData={formData}
            handleChange={handleChange}
            level={level}
            setLevel={setLevel}
            language={language}
            setLanguage={setLanguage}
            COURSE_LEVELS={COURSE_LEVELS}
            LANGUAGES={LANGUAGES}
          />
          {/* Tags  */}
          <TagsInput
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            updateTag={updateTag}
          />

          {/* Learning Outcomes */}
          <LearningOutcomes
            learningOutcomes={learningOutcomes}
            addLearningOutcome={addLearningOutcome}
            removeLearningOutcome={removeLearningOutcome}
            updateLearningOutcome={updateLearningOutcome}
          />

          {/* Requirements */}
          <Requirements
            requirements={requirements}
            addRequirement={addRequirement}
            removeRequirement={removeRequirement}
            updateRequirement={updateRequirement}
          />

          {/* Cover Image */}
          <CoverImage
            previewUrl={previewUrl}
            handleFileChange={handleFileChange}
          />

          {/* Submit Button */}
          <SubmitButtons isPending={isPending} />
        </form>
      </main>
    </DashboardShell>
  );
}
