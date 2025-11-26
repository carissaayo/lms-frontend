import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { PaymentDialog } from "@/components/enrollments/PaymentDialog";
import { useStudentCourseDetail } from "@/hooks/students/use-enroll-course";
import CourseHero from "@/components/courses/student/CourseHero";
import CourseDescription from "@/components/courses/student/CourseDescription";
import CourseCurriculum from "@/components/courses/student/CourseCurriculum";
import CourseInstructor from "@/components/courses/student/CourseInstructor";
import CourseReview from "@/components/courses/student/CourseReview";

export const Route = createFileRoute("/student/courses/$id")({
  component: StudentCourseDetailPage,
});

function StudentCourseDetailPage() {
  const navigate = useNavigate();
  const {
    course,
    paymentDialogOpen,
    setPaymentDialogOpen,
    paymentLink,
    selectedTab,
    setSelectedTab,
    enrollMutation,
    handleEnroll,
    totalLessons,
    errorUI,
  } = useStudentCourseDetail();
  if (errorUI) return errorUI;
  if (!course) return null;

  return (
    <DashboardShell>
      {/* <Toaster/> */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentLink={paymentLink}
      />
      <main className="space-y-6 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/student/courses" })}
            className="gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </div>

        {/* Course Hero Section */}
        <CourseHero
          totalLessons={totalLessons}
          handleEnroll={handleEnroll}
          course={course}
          isPending={enrollMutation.isPending}
        />

        {/* Tabs Section */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="cursor-pointer">Overview</TabsTrigger>
            <TabsTrigger value="curriculum" className="cursor-pointer">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor" className="cursor-pointer">Instructor</TabsTrigger>
            <TabsTrigger value="reviews" className="cursor-pointer">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <CourseDescription course={course} />
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6 mt-6">
            <CourseCurriculum course={course} totalLessons={totalLessons} />
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6 mt-6">
            <CourseInstructor course={course} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <CourseReview course={course} />
          </TabsContent>
        </Tabs>
      </main>
    </DashboardShell>
  );
}
