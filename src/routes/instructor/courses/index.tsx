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
import { CourseStatus } from "@/types/course.types";

export const Route = createFileRoute("/instructor/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useCourses();

  const courses = data?.courses ?? [];
  const results = data?.results ?? 0;

  console.log(courses, "courses");

  if (error) {
    return <p className="text-red-600">Failed to load courses.</p>;
  }

  // 🟢 Group courses by status
  const totalCourses = courses.length;
  const approvedCourses = courses.filter(
    (c: any) => c.status === CourseStatus.APPROVED
  ).length;
  const pendingCourses = courses.filter(
    (c: any) => c.status === CourseStatus.PENDING
  ).length;
  const rejectedCourses = courses.filter(
    (c: any) => c.status === CourseStatus.REJECTED
  ).length;
  const suspendedCourses = courses.filter(
    (c: any) => c.status === CourseStatus.SUSPENDED
  ).length;

  return (
    <DashboardShell>
      <main>
        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              Manage your Courses
            </h1>
            <p className="text-lg">Create, update and delete courses</p>
          </div>
          <Link to={NewCourseRoute.to}>
            <Button className="border-white text-white rounded-lg cursor-pointer font-secondary text-base">
              Create New Course
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="w-full flex justify-center my-6">
            <div className="h-8 w-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Courses Stats */}
            <div className="my-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CourseStatCard
                title="Total Courses"
                description="All the courses you have created"
                count={totalCourses}
                bgColor="bg-primary-light"
              />

              <CourseStatCard
                title="Approved Courses"
                description="Courses approved by moderators"
                count={approvedCourses}
                bgColor="bg-success"
                textColor="text-white"
                descriptionTextColor="text-white/90"
              />

              <CourseStatCard
                title="Pending Courses"
                description="Courses awaiting approval by moderators"
                count={pendingCourses}
                bgColor="bg-accent-light"
              />

              <CourseStatCard
                title="Rejected Courses"
                description="Courses rejected by moderators"
                count={rejectedCourses}
                bgColor="bg-error-light"
              />

              <CourseStatCard
                title="Suspended Courses"
                description="Courses suspended by moderators"
                count={suspendedCourses}
                bgColor="bg-background"
              />
            </div>

            {results > 0 ? (
              <>
                <div className="w-full flex items-center justify-between my-10 gap-24">
                  <BestSellingCourse courses={courses} />
                  <RecentCoursesTable courses={courses} />
                </div>{" "}
                <section>
                  <h1 className="font-primary text-2xl font-semibold">
                    Courses
                  </h1>
                  <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={courses} />
                  </div>
                </section>
              </>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold">
                  You do not have any course yet
                </h2>
                <p className="text-muted-foreground mt-2">
                  Start by creating your first course to see it listed here.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </DashboardShell>
  );
}
