import { createFileRoute,  } from "@tanstack/react-router";
import { BookOpen,} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PaginationControls } from "@/components/courses/Pagination";
import AdminCourseStatsCon from "@/components/courses/admin/AdminCourseStatsCon";
import CourseFilter from "@/components/courses/admin/CourseFilter";
import FilteredCourses from "@/components/courses/admin/FilteredCourses";

import useAuthStore from "@/store/useAuthStore";

import { useAdminCoursesManagement } from "@/hooks/admins/use-admin-courses";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";

export const Route = createFileRoute("/admin/courses/")({
  component: AdminCoursesPage,
});



function AdminCoursesPage() {
  const { isForbidden } = useAuthStore.getState();
const {
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  search,
  setSearch,
  category,
  setCategory,
  setStatus,
  page,
  setPage,
  limit,
  setLimit,
  isLoading,
  error,
  total,
  filteredCourses,
  totalCourses,
  approvedCourses,
  pendingCourses,
  rejectedCourses,
  suspendedCourses,
  handleViewCourse,
} = useAdminCoursesManagement();
  return (
    <DashboardShell>
      <main className="space-y-8 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Course Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Review, approve, and manage all platform courses
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="courses"
        />

        {!isLoading && !isForbidden && (
          <>
            {/* Stats Section */}
            <AdminCourseStatsCon
              totalCourses={totalCourses}
              approvedCourses={approvedCourses}
              pendingCourses={pendingCourses}
              rejectedCourses={rejectedCourses}
              suspendedCourses={suspendedCourses}
            />

            {/* Filters Section */}
            <CourseFilter
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              setStatus={setStatus}
              filteredCourses={filteredCourses}
              totalCourses={totalCourses}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              setSearchQuery={setSearchQuery}
              setStatusFilter={setStatusFilter}
            />

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <FilteredCourses
                filteredCourses={filteredCourses}
                handleViewCourse={handleViewCourse}
              />
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  No courses found
                </h2>
                <p className="text-gray-600 mt-2">
                  {searchQuery ||
                  statusFilter !== "all" ||
                  categoryFilter !== "all"
                    ? "Try adjusting your filters to see more results"
                    : "No courses have been created yet"}
                </p>
              </div>
            )}
            <PaginationControls
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
              limit={limit}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              className="mt-8"
            />
          </>
        )}
      </main>
    </DashboardShell>
  );
}
