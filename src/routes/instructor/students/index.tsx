import { DashboardShell } from "@/components/dashboard-shell";
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

  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Failed to load students.</p>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading || isFetching) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  // ✅ If data loaded successfully, show dashboard
  const columns = studentsColumns();

  return (
    <DashboardShell>
      <main className="pb-12">
        {/* Header and search bar */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="w-full">
            <h1 className="text-3xl font-bold font-primary tracking-tight pb-4">
              Your Students
            </h1>

            <div className="flex justify-end items-center mb-4 w-full">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <StudentsTable columns={columns} data={students} />
      </main>
    </DashboardShell>
  );
}
