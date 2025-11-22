import { DashboardShell } from "@/components/dashboard-shell";
import {
  createFileRoute,
  useParams,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import {  CourseStatus } from "@/types/course.types";
import CourseStatusCon from "@/components/courses/admin/singleCourse/CourseStatus";
import CourseHeader from "@/components/courses/admin/singleCourse/CourseHeader";
import CourseTabs from "@/components/courses/admin/singleCourse/CourseTabs";
import ActionDialogCon from "@/components/courses/admin/singleCourse/ActionDialog";
import { useAdminSingleCourse } from "@/hooks/admins/use-admin-single-course";
import SingleLoadingForbiddenError from "@/components/SingleLoadingForbiddenError";

export const Route = createFileRoute("/admin/courses/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/admin/courses/$id" });

    const {
      course,
      isLoading,
      error,
      navigate,
      actionDialogOpen,
      setActionDialogOpen,
      actionType,
      setActionType,
      actionReason,
      setActionReason,
      handleAction,
      confirmAction,
      isPending,
    } = useAdminSingleCourse(id);

const errorUI = SingleLoadingForbiddenError({
  error,
  isLoading,
  route: "/admin/courses",
  item: course,
  itemName: "Course",
});


if (errorUI) return errorUI;
if (!course) return null;
  return (
    <DashboardShell>
      <main className="space-y-6 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/admin/courses" })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          {
            course &&
          <CourseStatusCon
            course={course}
            handleAction={handleAction}
            isPending={isPending}
          />
          }
        </div>

        {/* Course Header */}
        <CourseHeader course={course} />

        {/* Rejection/Suspension Reason */}
        {(course.rejectionReason || course.suspensionReason) && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {course.status === CourseStatus.REJECTED
                  ? "Rejection Reason"
                  : "Suspension Reason"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                {course.rejectionReason || course.suspensionReason}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <CourseTabs course={course} />

        {/* Action Dialog */}
        <ActionDialogCon
          actionDialogOpen={actionDialogOpen}
          setActionDialogOpen={setActionDialogOpen}
          actionType={actionType}
          actionReason={actionReason}
          setActionReason={setActionReason}
          setActionType={setActionType}
          confirmAction={confirmAction}
          isPending={isPending}
        />
      </main>
    </DashboardShell>
  );
}
