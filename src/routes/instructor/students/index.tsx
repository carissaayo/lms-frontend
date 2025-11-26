import { DashboardShell } from "@/components/dashboard-shell"; // Keeping the original shell
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { StudentsTable } from "@/components/students/StudentsTable";
import { studentsColumns } from "@/components/students/Column";
import { useInstructorStudents } from "@/hooks/use-instructor";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/instructor/students/")({
  component: RouteComponent,
});

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  totalCourses: number;
  avgProgress: number;
}

function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();

  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, error } = useInstructorStudents({
    search,
  });

  const students: Student[] = data?.students || [];

  const columns = studentsColumns();

  return (
    <DashboardShell>
      <main className="pb-12">
        {/* Header and search bar - Cleaner, more separated look */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
              🎓 Your Students
            </h1>
            {!isLoading && !error && !isForbidden && (
              <p className="text-sm text-gray-500 hidden sm:block">
                {students.length} Total Students
              </p>
            )}
          </div>
          <LoadingForbiddenAndError
            error={error}
            isLoading={isLoading || isFetching}
            title="Students"
          />
          {!isLoading && !error && !isForbidden && (
            <div className="flex justify-end items-center mt-4 w-full">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        {!isLoading && !error && !isForbidden && (
          <>
            {/* Table Section */}
            <StudentsTable columns={columns} data={students} />
          </>
        )}
      </main>
    </DashboardShell>
  );
}
