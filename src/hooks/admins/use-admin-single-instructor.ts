import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { InstructorStatus } from "@/types/user.types";
import {
  useSingleInstructorAdmin,
  useUpdateInstructorStatusAdmin,
} from "@/hooks/use-instructor";

export const useAdminSingleInstructor = (id: string) => {
  const navigate = useNavigate();

  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<InstructorStatus | null>(null);
  const [actionReason, setActionReason] = useState("");

  // Fetch instructor
  const { data, isLoading, error } = useSingleInstructorAdmin(id);
  const instructor = data?.instructor;

  // Mutation
  const updateMutation = useUpdateInstructorStatusAdmin();

  const handleAction = (type: InstructorStatus) => {
    setActionType(type);

    // Auto-approve (no dialog required)
    if (type === InstructorStatus.APPROVED) {
      updateMutation.mutate({
        instructorId: id,
        status: InstructorStatus.APPROVED,
      });
    } else {
      setActionDialogOpen(true);
    }
  };

  const confirmAction = () => {
    if (!actionType) return;

    const payload: any = {
      instructorId: id,
      status: actionType,
    };

    if (actionType === InstructorStatus.REJECTED) {
      payload.rejectReason = actionReason;
    }

    if (actionType === InstructorStatus.SUSPENDED) {
      payload.suspendReason = actionReason;
    }

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setActionDialogOpen(false);
        setActionReason("");
        setActionType(null);
      },
    });
  };

  return {
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

    isPending: updateMutation.isPending,
  };
};
