import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as NewCourseRoute } from "./new";

import { Button } from "@/components/ui/button";

import BestSellingCourse from "@/components/courses/BestSellingCourse";
import { columns } from "@/components/courses/Column";
import { DataTable } from "@/components/courses/CoursesTable";

import { useCourses } from "@/hooks/use-course";
import { Course, CourseStatus } from "@/types/course.types";

import { motion } from "framer-motion";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import useAuthStore from "@/store/useAuthStore";
import InstructorCourseStatsCon from "@/components/analytics/instructor/CourseStatsCon";
import { PlusCircle } from "lucide-react"; // Imported PlusCircle for the button
import RecentCoursesTable from "@/components/courses/recentCoursesTable";

export const Route = createFileRoute("/instructor/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();

  const { data, isLoading, error } = useCourses();
  const courses: Course[] = data?.courses ?? [];
  const results = data?.results ?? 0;

  // Group by status
  const totalCourses = courses.length;
  const approvedCourses = courses.filter(
    (c) => c.status === CourseStatus.APPROVED
  ).length;
  const pendingCourses = courses.filter(
    (c) => c.status === CourseStatus.PENDING
  ).length;
  const rejectedCourses = courses.filter(
    (c) => c.status === CourseStatus.REJECTED
  ).length;
  const suspendedCourses = courses.filter(
    (c) => c.status === CourseStatus.SUSPENDED
  ).length;

  return (
    <DashboardShell>
      <main className="space-y-10 mb-10">
        {/* Header - Cleaner layout with prominent button, matching lessons page */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Manage Your Courses
            </h1>
            <p className="text-base text-gray-500 mt-1">
              Create, update, and manage your courses effortlessly
            </p>
          </div>
          <Link to={NewCourseRoute.to}>
            {/* Styled Button: Primary color, strong shadow, and clear icon */}
            <Button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Loading Spinner */}
        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="Courses"
        />

        {!isLoading && !error && !isForbidden && (
          <>
            {/* Stats Section */}
            <motion.div
              className="my-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5" // Adjusted to 5 columns for stats cards
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <InstructorCourseStatsCon
                totalCourses={totalCourses}
                approvedCourses={approvedCourses}
                pendingCourses={pendingCourses}
                rejectedCourses={rejectedCourses}
                suspendedCourses={suspendedCourses}
              />
            </motion.div>

            {/* Best Selling + Recent Courses (Now Visual Lists) */}
            {results > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row gap-8 mt-10 w-full">
                  <motion.div
                    className="flex-1 lg:max-w-[400px] min-w-[300px]" // Limited width for Best Sellers for focus
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BestSellingCourse courses={courses} />
                  </motion.div>

                  <motion.div
                    className="flex-1 min-w-[300px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <RecentCoursesTable courses={courses} />
                  </motion.div>
                </div>

                {/* Table Overview  */}
                <section className="mt-10">
                  <h1 className="font-primary text-2xl font-semibold mb-4 text-gray-900">
                    Courses Overview (Detailed Table)
                  </h1>
                  <div className="container mx-auto py-6 bg-white rounded-xl shadow-xl border border-gray-100">
                    <DataTable columns={columns} data={courses} />
                  </div>
                </section>
              </>
            ) : (
              // Empty State
              <motion.div
                className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-gray-300 shadow-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  You don’t have any courses yet
                </h2>
                <p className="text-muted-foreground mt-2">
                  Start by creating your first course to see it listed here.
                </p>
                <Link to={NewCourseRoute.to}>
                  <Button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                    Create Your First Course
                  </Button>
                </Link>
              </motion.div>
            )}
          </>
        )}
      </main>
    </DashboardShell>
  );
}
