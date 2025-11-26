import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useSingleCourse } from "@/hooks/use-course";
import { useEnrollCourse } from "@/hooks/use-enrollment";
import { CourseDetail } from "@/types/course.types";
import SingleLoadingForbiddenError from "@/components/SingleLoadingForbiddenError";

export function useStudentCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/student/courses/$id" });

  // Local UI states
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Fetch course
  const { data, isLoading, error } = useSingleCourse(id);
  const course: CourseDetail | undefined = data?.course;

  // Enrollment logic
  const enrollMutation = useEnrollCourse();

  const handleEnroll = () => {
    enrollMutation.mutate(id, {
      onSuccess: (res: any) => {
        if (res?.message === "Payment required" && res?.paymentLink) {
          setPaymentLink(res.paymentLink);
          setPaymentDialogOpen(true);
          return;
        }

        toast.success("Successfully enrolled in course!");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to enroll in course");
      },
    });
  };

  const handleBack = () => {
    navigate({ to: "/student/courses" });
  };

  const totalLessons = course?.lessons?.length ?? 0;

    const errorUI = SingleLoadingForbiddenError({
      error,
      isLoading,
      route: "/student/courses",
      item: course,
      itemName: "Course",
    });

  return {
    id,
    course,
    isLoading,
    error,

    paymentDialogOpen,
    setPaymentDialogOpen,

    paymentLink,
    selectedTab,
    setSelectedTab,

    enrollMutation,
    handleEnroll,
    handleBack,

    totalLessons,
    errorUI,
  };
}
