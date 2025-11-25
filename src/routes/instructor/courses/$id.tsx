import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { Toaster } from "sonner";

import CourseAction from "@/components/courses/instructor/single-course/CourseAction";
import { useCourseDetail } from "@/hooks/instructors/use-single-course";
import SingleCourse from "@/components/courses/instructor/single-course/SingleCourse";

export const Route = createFileRoute("/instructor/courses/$id")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const {
    course,
    lessons,
    newLesson,
    setNewLesson,
    submitMutation,
    publishMutation,
    deleteMutation,
    handleSubmitCourse,
    handlePublishCourse,
    handleDeleteCourse,
    errorUI,
  } = useCourseDetail(id);

  if (errorUI) return errorUI;
  if (!course) return null;
  return (
    <DashboardShell>
      <Toaster />
      <main className="space-y-10 mb-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          onClick={() => navigate({ to: "/instructor/courses" })}
        >
          <ArrowLeft className="!w-12 !h-8" />
        </Button>

        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your course details
            </p>
          </div>


          {/* Actions: Edit / Submit / Publish / Delete */}
          <CourseAction
            course={course}
            isPendingSubmit={submitMutation.isPending}
            isPendingPublish={publishMutation.isPending}
            isPendingDelete={deleteMutation.isPending}
            handleDeleteCourse={handleDeleteCourse}
            handlePublishCourse={handlePublishCourse}
            handleSubmitCourse={handleSubmitCourse}
          />
        </div>
        <SingleCourse
          course={course}
          lessons={lessons}
          newLesson={newLesson}
          setNewLesson={setNewLesson}
        />
      </main>
    </DashboardShell>
  );
}
