import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  useSingleCourseAdmin,
  useUpdateCourseStatusAdmin,
} from "@/hooks/use-course";
import { CourseDetail, CourseStatus } from "@/types/course.types";

export function useAdminSingleCourse(courseId: string) {
  const navigate = useNavigate();

  // UI state
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<CourseStatus | null>(null);
  const [actionReason, setActionReason] = useState("");

  // Query + Mutation
  const { data, isLoading, error } = useSingleCourseAdmin(courseId);
  const updateCourseMutation = useUpdateCourseStatusAdmin();

  const course: CourseDetail | undefined = data?.course;

  // Approve / Reject / Suspend triggers
  const handleAction = (type: CourseStatus) => {
    setActionType(type);

    if (type === CourseStatus.APPROVED) {
      updateCourseMutation.mutate({ courseId, status: "APPROVED" });
    } else {
      setActionDialogOpen(true);
    }
  };

  // Confirm Reject/Suspend
  const confirmAction = () => {
    if (!actionType) return;

    const status = actionType;
    const reason =
      status === CourseStatus.REJECTED || status === CourseStatus.SUSPENDED
        ? actionReason
        : undefined;

    updateCourseMutation.mutate(
      { courseId, status, reason },
      {
        onSuccess: () => {
          setActionDialogOpen(false);
          setActionReason("");
          setActionType(null);
        },
      }
    );
  };

  return {
    // data
    course,
    isLoading,
    error,

    // dialog state
    actionDialogOpen,
    setActionDialogOpen,
    actionType,
    setActionType,
    actionReason,
    setActionReason,

    // handlers
    handleAction,
    confirmAction,

    // mutation state
    isPending: updateCourseMutation.isPending,

    // navigation
    navigate,
  };
}
