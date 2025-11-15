import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as NewCourseRoute } from "./new";

import { Button } from "@/components/ui/button";
import CourseStatCard from "@/components/courses/courseStatsCard";
import RecentCoursesTable from "@/components/courses/recentCoursesTable";
import BestSellingCourse from "@/components/courses/BestSellingCourse";
import { columns } from "@/components/courses/Column";
import { DataTable } from "@/components/courses/CoursesTable";

import { useCourses } from "@/hooks/use-course";
import { Course, CourseStatus } from "@/types/course.types";

import { motion } from "framer-motion";

export const Route = createFileRoute("/instructor/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useCourses();
  const courses: Course[] = data?.courses ?? [];
  const results = data?.results ?? 0;
  console.log(data?.courses,"courses");
  


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
        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              Manage Your Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Create, update, and manage your courses effortlessly
            </p>
          </div>
          <Link to={NewCourseRoute.to}>
            <Button className="border-white text-white rounded-lg font-secondary text-base hover:scale-105 transition-all">
              + Create New Course
            </Button>
          </Link>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="w-full flex justify-center my-10">
            <p className="text-red-600 text-center mt-10">
              Failed to load courses.
            </p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Stats Section */}
            <motion.div
              className="my-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <CourseStatCard
                title="Total Courses"
                description="All created courses"
                count={totalCourses}
                bgColor="bg-primary-light"
              />

              <CourseStatCard
                title="Approved"
                description="Approved by moderators"
                count={approvedCourses}
                bgColor="bg-green-600"
                textColor="text-white"
                descriptionTextColor="text-white/90"
              />

              <CourseStatCard
                title="Pending"
                description="Awaiting approval"
                count={pendingCourses}
                bgColor="bg-yellow-100"
              />

              <CourseStatCard
                title="Rejected"
                description="Not approved"
                count={rejectedCourses}
                bgColor="bg-red-200"
              />

              <CourseStatCard
                title="Suspended"
                description="Temporarily inactive"
                count={suspendedCourses}
                bgColor="bg-gray-100"
              />
            </motion.div>

            {/* Best Selling + Recent Courses */}
            {results > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row gap-8 mt-10 w-full">
                  <motion.div
                    className="flex-1 min-w-[300px]"
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

                {/* Table */}
                <section className="mt-10">
                  <h1 className="font-primary text-2xl font-semibold mb-4">
                    Courses Overview
                  </h1>
                  <div className="container mx-auto py-6 bg-card rounded-xl shadow-sm">
                    <DataTable columns={columns} data={courses} />
                  </div>
                </section>
              </>
            ) : (
              // Empty State
              <motion.div
                className="text-center py-20 bg-muted/20 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-semibold">
                  You don’t have any courses yet
                </h2>
                <p className="text-muted-foreground mt-2">
                  Start by creating your first course to see it listed here.
                </p>
                <Link to={NewCourseRoute.to}>
                  <Button className="mt-6">Create Your First Course</Button>
                </Link>
              </motion.div>
            )}
          </>
        )}
      </main>
    </DashboardShell>
  );
}
