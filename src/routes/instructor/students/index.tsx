import { DashboardShell } from "@/components/dashboard-shell"; // Keeping the original shell
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { StudentsTable } from "@/components/students/StudentsTable";
import { studentsColumns } from "@/components/students/Column";
import { useInstructorStudents } from "@/hooks/use-instructor";

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
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, error } = useInstructorStudents({
    search,
  });

  const students: Student[] = data?.students || [];

  // --- MODERN LOADING/ERROR STATES ---

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-red-200 bg-red-50 rounded-lg p-6">
          <p className="text-red-700 text-lg font-medium">
            🚨 Failed to load students. Please try again.
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading || isFetching) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="h-10 w-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your students...</p>
        </div>
      </DashboardShell>
    );
  }

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
            <p className="text-sm text-gray-500 hidden sm:block">
              {students.length} Total Students
            </p>
          </div>

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
        </div>

        {/* Table Section */}
        <StudentsTable columns={columns} data={students} />
      </main>
    </DashboardShell>
  );
}
