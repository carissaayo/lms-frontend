import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

import SingleLoadingForbiddenError from "@/components/SingleLoadingForbiddenError";
import SingleInstructorHeader from "@/components/instructors/admin/SingleInstructorHeader";
import SingleInstructorStatus from "@/components/instructors/admin/SingleInstructorStatus";
import SuspensionReasonCard from "@/components/instructors/admin/SuspensionReason";
import OverviewTab from "@/components/instructors/admin/OverviewTab";
import CoursesTab from "@/components/instructors/admin/CoursesTab";
import CredentialsTab from "@/components/instructors/admin/Credentials";
import InstructorAnalyticTab from "@/components/instructors/admin/InstructorAnalyticTab";
import SingleInstructorActionDialog from "@/components/instructors/admin/SingleInstructorActionDialog";
import { useAdminSingleInstructor } from "@/hooks/admins/use-admin-single-instructor";

export const Route = createFileRoute("/admin/instructors/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/admin/instructors/$id" });
  const {
    instructor,
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
  } = useAdminSingleInstructor(id);

  const errorUI = SingleLoadingForbiddenError({
    error,
    isLoading,
    route: "/admin/instructors",
    item: instructor,
    itemName: "Course",
  });

  if (errorUI) return errorUI;
  if (!instructor) return null;

  return (
    <DashboardShell>
      <main className="space-y-6 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/admin/instructors" })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Instructors
          </Button>
          <SingleInstructorStatus
            instructor={instructor}
            handleAction={handleAction}
            isPending={isPending}
          />
        </div>

        {/* Instructor Header */}
        <SingleInstructorHeader instructor={instructor} />

        {/* Suspension Reason */}
        {instructor.suspendReason && (
          <SuspensionReasonCard suspendReason={instructor.suspendReason} />
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">
              Courses ({instructor.stats.totalCourses})
            </TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab instructor={instructor} />
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <CoursesTab instructor={instructor} />
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <CredentialsTab instructor={instructor} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <InstructorAnalyticTab instructor={instructor} />
          </TabsContent>
        </Tabs>

        {/* Action Dialog */}
        <SingleInstructorActionDialog
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
