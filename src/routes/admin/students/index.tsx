import {  useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  BookOpen,
  UserCheck,
  UserX,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { StudentStatus } from "@/types/user.types";
import { PaginationControls } from "@/components/courses/Pagination";
import { useAdminStudents } from "@/hooks/use-student";
import { NairaIcon } from "@/components/analytics/admin/NairaIcon";
import { StudentsTable } from "@/components/admin/UserTable";
import useAuthStore from "@/store/useAuthStore";
import Forbidden from "@/components/forbidden";

export const Route = createFileRoute("/admin/students/")({
  component: AdminStudentsPage,
});


export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  status: StudentStatus;
  enrollmentsCount: number;
  completedCoursesCount: number;
  totalSpent: number;
  averageProgress: number;
  createdAt: string;
  lastActive: string;
  totalEnrollments:number;
  totalPayments:number
}



const StudentStatCard = ({
  title,
  description,
  count,
  bgColor,
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-600",
  icon: Icon,
}: {
  title: string;
  description: string;
  count: number | string;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
  icon: React.ElementType;
}) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${descriptionTextColor}`}>
          {description}
        </p>
        <p className={`text-3xl font-bold ${textColor} mt-2`}>{count}</p>
        <p className={`text-lg font-semibold ${textColor} mt-1`}>{title}</p>
      </div>
      <div
        className={`h-12 w-12 rounded-lg ${
          bgColor === "bg-primary" ? "bg-primary/20" : "bg-white/20"
        } flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
    </div>
  </div>
);


function AdminStudentsPage() {
  const { isForbidden } = useAuthStore.getState();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [debouncedSearch] = useDebounce(search, 500);

 

  const { data, isLoading, error } = useAdminStudents({
    search: debouncedSearch,
    status,
    page,
    limit,
  });
  console.log("data",data);
  
  const students: Student[] = data?.students ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 0;
  const totalPayments = data?.totalAppPayments;
  const totalEnrollments = data?.totalAppEnrollments;

  // Calculate stats
  const totalStudents = students.length;
  const activeStudents = students.filter(
    (s) => s.status === StudentStatus.APPROVED
  ).length;
  const suspendedStudents = students.filter(
    (s) => s.status === StudentStatus.SUSPENDED
  ).length;
 

  const handleStudentAction = async (studentId: string, action: string) => {
    try {
      const response = await fetch(
        `/api/admin/students/${studentId}/${action}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error(`Failed to ${action} student`);
      // Invalidate and refetch
      // queryClient.invalidateQueries(["admin-students"]);
    } catch (err) {
      console.error(`Error ${action}ing student:`, err);
    }
  };

  const handleViewStudent = (studentId: string) => {
    navigate({ to: `/admin/students/${studentId}` });
  };


  return (
    <DashboardShell>
      <main className="space-y-8 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Student Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor and manage all platform students
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {isForbidden && error && <Forbidden />}

        {error && !isForbidden && (
          <p className="text-red-600 text-center mt-10">
            Failed to load admins.
          </p>
        )}

        {!isLoading && !isForbidden && (
          <>
            {/* Stats Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StudentStatCard
                title="Total Students"
                description="All registered students"
                count={totalStudents}
                bgColor="bg-blue-500"
                textColor="text-white"
                descriptionTextColor="text-white/90"
                icon={Users}
              />
              <StudentStatCard
                title="Active"
                description="Currently learning"
                count={activeStudents}
                bgColor="bg-green-600"
                textColor="text-white"
                descriptionTextColor="text-white/90"
                icon={UserCheck}
              />
              <StudentStatCard
                title="Suspended"
                description="Account suspended"
                count={suspendedStudents}
                bgColor="bg-red-200"
                icon={UserX}
              />
              <StudentStatCard
                title="Total Revenue"
                description="From all students"
                count={`₦${(totalPayments / 1000).toFixed(0)}k`}
                bgColor="bg-purple-100"
                icon={NairaIcon}
              />
              <StudentStatCard
                title="Enrollments"
                description="Total course enrollments"
                count={totalEnrollments}
                bgColor="bg-orange-100"
                icon={BookOpen}
              />
            </div>

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
                    <SelectItem value={StudentStatus.APPROVED}>
                      Active
                    </SelectItem>
                    <SelectItem value={StudentStatus.SUSPENDED}>
                      Suspended
                    </SelectItem>
                    <SelectItem value={StudentStatus.PENDING}>
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{pages || 1}</span>
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

            {/* Students Table */}
            <StudentsTable
              students={students}
              search={search}
              status={status}
              handleViewStudent={handleViewStudent}
              handleStudentAction={handleStudentAction}
            />

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
