
import { useState } from "react";

import { toast } from "sonner";
import { useEnrollCourse } from "../use-enrollment";

export function useEnrollInCourse() {
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const enrollMutation = useEnrollCourse();

  const enroll = (courseId: string) => {
    enrollMutation.mutate(courseId, {
      onSuccess: (res: any) => {
        if (res?.message === "Payment required" && res?.paymentLink) {
          setPaymentLink(res.paymentLink);
          setDialogOpen(true);
          return;
        }
        toast.success("Successfully enrolled in course!");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to enroll in course");
      },
    });
  };

  return {
    enroll,
    dialogOpen,
    setDialogOpen,
    paymentLink,
    isPending: enrollMutation.isPending,
  };
}
