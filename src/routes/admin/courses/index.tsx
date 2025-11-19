import {useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute,  useNavigate } from "@tanstack/react-router";
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
  BookOpen,
  Search,
  Clock,
  Users,
  
} from "lucide-react";
import { Course, CourseCategories, CourseStatus } from "@/types/course.types";
import { useAdminCourses } from "@/hooks/use-course";
import { useDebounce } from "@/hooks/use-debounce";
import {  PaginationControls } from "@/components/courses/Pagination";
import { NairaIcon } from "@/components/analytics/admin/NairaIcon";
import Forbidden from "@/components/forbidden";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/admin/courses/")({
  component: AdminCoursesPage,
});

const CourseStatCard = ({
  title,
  description,
  count,
  bgColor,
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-600",
}: {
  title: string;
  description: string;
  count: number;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
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
        <BookOpen className={`h-6 w-6 ${textColor}`} />
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
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-700 hover:bg-red-100",
    },
    suspended: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    },
  };

  const key = status?.toLowerCase() as keyof typeof statusConfig;
  const config = statusConfig[key] || statusConfig.pending;

  return <Badge className={config.className}>{config.label}</Badge>;
};

function AdminCoursesPage() {
  const { isForbidden } = useAuthStore.getState();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);
  const [debouncedSearch] = useDebounce(search, 500);

  
const { data, isLoading, error } = useAdminCourses({
  search: debouncedSearch,
  category,
  status,
  page,
  limit,
});


  const courses: Course[] = data?.courses ?? [];
  const total = data?.total ?? 0;
  
  console.log(data, "data");

  
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate stats
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


  const handleViewCourse = (courseId: string) => {
    navigate({ to: `/admin/courses/${courseId}` });
  };

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
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        {isForbidden && error && <Forbidden />}

        {error && !isForbidden && (
          <p className="text-red-600 text-center mt-10">
            Failed to load courses.
          </p>
        )}

        {!isLoading && !isForbidden && (
          <>
            {/* Stats Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <CourseStatCard
                title="Total Courses"
                description="All platform courses"
                count={totalCourses}
                bgColor="bg-blue-500"
                textColor="text-white"
                descriptionTextColor="text-white/90"
              />
              <CourseStatCard
                title="Approved"
                description="Live on platform"
                count={approvedCourses}
                bgColor="bg-green-600"
                textColor="text-white"
                descriptionTextColor="text-white/90"
              />
              <CourseStatCard
                title="Pending"
                description="Awaiting review"
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
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by course title or instructor..."
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
                    <SelectItem value={CourseStatus.APPROVED}>
                      Approved
                    </SelectItem>
                    <SelectItem value={CourseStatus.PENDING}>
                      Pending
                    </SelectItem>
                    <SelectItem value={CourseStatus.REJECTED}>
                      Rejected
                    </SelectItem>
                    <SelectItem value={CourseStatus.SUSPENDED}>
                      Suspended
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CourseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredCourses.length}
                  </span>{" "}
                  of <span className="font-semibold">{totalCourses}</span>{" "}
                  courses
                </p>
                {(searchQuery ||
                  statusFilter !== "all" ||
                  categoryFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div
                      className="relative"
                      onClick={() => handleViewCourse(course._id)}
                    >
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(course.status)}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className="font-semibold text-lg text-gray-900 line-clamp-2  cursor-pointer flex-1 h-16"
                          onClick={() => handleViewCourse(course._id)}
                        >
                          {course.title}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        by{" "}
                        <span className="font-medium">
                          {course.instructorName}
                        </span>
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.enrollments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-900 font-semibold ">
                          <NairaIcon className="h-4 w-4  " />
                          <span className="pt-2">
                            {course.price.toLocaleString()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
