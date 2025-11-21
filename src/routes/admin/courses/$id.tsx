import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  PauseCircle,
  Clock,
  Users,
  Star,
  Calendar,
  BookOpen,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import {
  useSingleCourseAdmin,
  useUpdateCourseStatusAdmin,
} from "@/hooks/use-course";
import { NairaIcon } from "@/components/analytics/admin/NairaIcon";
import { CourseDetail, CourseStatus } from "@/types/course.types";
import Forbidden from "@/components/forbidden";
import useAuthStore from "@/store/useAuthStore";
import CourseStatusCon from "@/components/courses/admin/singleCourse/CourseStatus";
import CourseHeader from "@/components/courses/admin/singleCourse/CourseHeader";
import CourseTabs from "@/components/courses/admin/singleCourse/CourseTabs";
import ActionDialogCon from "@/components/courses/admin/singleCourse/ActionDialog";

export const Route = createFileRoute("/admin/courses/$id")({
  component: RouteComponent,
});

const getStatusBadge = (status: string) => {
  const statusConfig: Record<
    string,
    { label: string; className: string; icon: any }
  > = {
    [CourseStatus.APPROVED]: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    [CourseStatus.PENDING]: {
      label: "Pending Review",
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    [CourseStatus.REJECTED]: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
      icon: XCircle,
    },
    [CourseStatus.SUSPENDED]: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700",
      icon: PauseCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </Badge>
  );
};

function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();

  const navigate = useNavigate();
  const { id } = useParams({ from: "/admin/courses/$id" });

  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<CourseStatus | null>(null);
  const [actionReason, setActionReason] = useState("");

  const { data, isLoading, error } = useSingleCourseAdmin(id);
  console.log(data, "data");

  const course: CourseDetail | undefined = data?.course;

  const updateCourseMutation = useUpdateCourseStatusAdmin();

  const handleAction = (type: CourseStatus) => {
    setActionType(type);
    if (type === CourseStatus.APPROVED) {
      updateCourseMutation.mutate({ courseId: id, status: "APPROVED" });
    } else {
      setActionDialogOpen(true);
    }
  };

  const confirmAction = () => {
    if (!actionType) return;

    const status = actionType;
    const reason =
      status === CourseStatus.REJECTED || status === CourseStatus.SUSPENDED
        ? actionReason
        : undefined;

    updateCourseMutation.mutate(
      { courseId: id, status, reason },
      {
        onSuccess: () => {
          setActionDialogOpen(false);
          setActionReason("");
          setActionType(null);
        },
      }
    );
  };
  if (error && isForbidden) {
    return (
      <DashboardShell>
        <Forbidden />
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/admin/students" })}
          className="mt-4"
        >
          Back to Students
        </Button>
      </DashboardShell>
    );
  }
  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600 text-center">
            Failed to load course details.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate({ to: "/admin/courses" })}
          >
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!course) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">Course not found</p>
        </div>
      </DashboardShell>
    );
  }

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
          <CourseStatusCon
            course={course}
            handleAction={handleAction}
            isPending={updateCourseMutation.isPending}
          />
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
          isPending={updateCourseMutation.isPending}
        />
      </main>
    </DashboardShell>
  );
}
