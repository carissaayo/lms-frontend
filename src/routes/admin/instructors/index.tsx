import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
} from "lucide-react";

import { PaginationControls } from "@/components/courses/Pagination";
import { InstructorStatus } from "@/types/user.types";
import useAuthStore from "@/store/useAuthStore";
import AdminInstructorStats from "@/components/instructors/admin/AdminInstructorStats";
import InstructorsCon from "@/components/instructors/admin/InstructorsCon";
import { useAdminInstructorsPage } from "@/hooks/admins/use-admin-instructors";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";

export const Route = createFileRoute("/admin/instructors/")({
  component: AdminInstructorsPage,
});


function AdminInstructorsPage() {
  const { isForbidden } = useAuthStore.getState();

  
  const {
    search,
    setSearch,
    status,
    setStatus,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    error,
    instructors,
    total,
    totalInstructors,
    activeInstructors,
    suspendedInstructors,
    pendingInstructors,
    totalCourses,
    handleViewInstructor,
  } = useAdminInstructorsPage();

  return (
    <DashboardShell>
      <main className="space-y-8 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Instructor Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor, approve, and manage platform instructors
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
     <LoadingForbiddenAndError
     error={error}
     isLoading={isLoading}
     title="Instructors"
     />

        {!isLoading && !isForbidden && (
          <>
            {/* Stats Section */}
            <AdminInstructorStats
              totalInstructors={totalInstructors}
              activeInstructors={activeInstructors}
              suspendedInstructors={suspendedInstructors}
              pendingInstructors={pendingInstructors}
              totalCourses={totalCourses}
            />
            {/* Filters Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value={InstructorStatus.APPROVED}>
                      Active
                    </SelectItem>
                    <SelectItem value={InstructorStatus.SUSPENDED}>
                      Suspended
                    </SelectItem>
                    <SelectItem value={InstructorStatus.PENDING}>
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">
                    {Math.ceil(total / limit) || 1}
                  </span>
                </p>
                {(search || status !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setStatus("all");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
            {/* Instructors Grid */}
            {instructors.length > 0 ? (
           <InstructorsCon
              handleViewInstructor={handleViewInstructor}
               instructors={instructors}
           />
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  No instructors found
                </h2>
                <p className="text-gray-600 mt-2">
                  {search || status !== "all"
                    ? "Try adjusting your filters to see more results"
                    : "No instructors have been registered yet"}
                </p>
              </div>
            )}{" "}
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
