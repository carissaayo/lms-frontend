import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";

import {
  Users,
  Search,
  Eye,
  PauseCircle,
  BookOpen,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { PaginationControls } from "@/components/courses/Pagination";
import { InstructorStatus } from "@/types/user.types";
import { useAdminInstructors } from "@/hooks/use-instructor";

export const Route = createFileRoute("/admin/instructors/")({
  component: AdminInstructorsPage,
});

interface Instructor {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  status: InstructorStatus;
  coursesCount: number;
  studentsCount: number;
  totalRevenue: number;
  rating: number;
  createdAt: string;
  specialization: string;
}

const InstructorStatCard = ({
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
  count: number;
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

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    approved: {
      label: "Approved",
      className: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    suspended: {
      label: "Suspended",
      className: "bg-red-100 text-red-700 hover:bg-red-100",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
  };

  const key = status?.toLowerCase() as keyof typeof statusConfig;
  const config = statusConfig[key] || statusConfig.pending;

  return <Badge className={config.className}>{config.label}</Badge>;
};

function AdminInstructorsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, error } = useAdminInstructors({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  console.log(data, "data");

  const instructors: Instructor[] = data?.instructors ?? [];
  const total = data?.total ?? 0;

  // Calculate stats
  const totalInstructors = instructors.length;
  const activeInstructors = instructors.filter(
    (i) => i.status === InstructorStatus.APPROVED
  ).length;
  const suspendedInstructors = instructors.filter(
    (i) => i.status === InstructorStatus.SUSPENDED
  ).length;
  const pendingInstructors = instructors.filter(
    (i) => i.status === InstructorStatus.PENDING
  ).length;
  const totalCourses = instructors.reduce((acc, i) => acc + i.coursesCount, 0);

  const handleViewInstructor = (instructorId: string) => {
    navigate({ to: `/admin/instructors/${instructorId}` });
  };

  if (error) {
    return (
      <DashboardShell>
        <p className="text-red-600 text-center mt-10">
          Failed to load instructors.
        </p>
      </DashboardShell>
    );
  }

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
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Stats Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <InstructorStatCard
                title="Total Instructors"
                description="All platform instructors"
                count={totalInstructors}
                bgColor="bg-blue-500"
                textColor="text-white"
                descriptionTextColor="text-white/90"
                icon={Users}
              />
              <InstructorStatCard
                title="Active"
                description="Currently teaching"
                count={activeInstructors}
                bgColor="bg-green-600"
                textColor="text-white"
                descriptionTextColor="text-white/90"
                icon={UserCheck}
              />
              <InstructorStatCard
                title="Suspended"
                description="Account suspended"
                count={suspendedInstructors}
                bgColor="bg-red-200"
                icon={UserX}
              />
              <InstructorStatCard
                title="Pending"
                description="Awaiting approval"
                count={pendingInstructors}
                bgColor="bg-yellow-100"
                icon={PauseCircle}
              />
              <InstructorStatCard
                title="Total Courses"
                description="Across all instructors"
                count={totalCourses}
                bgColor="bg-purple-100"
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {instructors.map((instructor) => (
                  <div
                    key={instructor._id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          <div>
                            <h3
                              className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-primary transition-colors"
                              onClick={() =>
                                handleViewInstructor(instructor._id)
                              }
                            >
                              {instructor.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {instructor.specialization}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(instructor.status)}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{instructor.email}</span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {instructor.bio}
                      </p>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <p className="text-lg font-semibold text-gray-900">
                            {instructor.coursesCount}
                          </p>
                          <p className="text-xs text-gray-600">Courses</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <p className="text-lg font-semibold text-gray-900">
                            {instructor.studentsCount}
                          </p>
                          <p className="text-xs text-gray-600">Students</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <p className="text-lg font-semibold text-gray-900">
                            {instructor.rating}
                          </p>
                          <p className="text-xs text-gray-600">Rating</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Joined{" "}
                            {new Date(instructor?.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )}
                          </span>
                        </div>
                        <div className="text-gray-900 font-semibold">
                          ₦{instructor?.totalRevenue?.toLocaleString()}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewInstructor(instructor?._id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
