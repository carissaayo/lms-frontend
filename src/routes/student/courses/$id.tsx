// File: /admin/courses/$courseId.tsx
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  PauseCircle,
  Clock,
  Users,
  DollarSign,
  Star,
  Calendar,
  BookOpen,
  PlayCircle,
  FileText,
  Award,
  AlertCircle,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define types
interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    email: string;
    rating: number;
    totalCourses: number;
  };
  status: "APPROVED" | "PENDING" | "REJECTED" | "SUSPENDED";
  thumbnail: string;
  price: number;
  enrollments: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  duration: string;
  level: string;
  language: string;
  modules: Array<{
    id: string;
    title: string;
    lessons: number;
  }>;
  requirements: string[];
  learningOutcomes: string[];
  rejectionReason?: string;
  suspensionReason?: string;
}

// API hooks
const useCourseDetail = (courseId: string) => {
  return useQuery({
    queryKey: ["admin-course", courseId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/courses/${courseId}`);
      if (!response.ok) throw new Error("Failed to fetch course");
      return response.json();
    },
  });
};

export const Route = createFileRoute("/student/courses/$id")({
  component: AdminCourseDetailPage,
});

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
    APPROVED: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    PENDING: {
      label: "Pending Review",
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
      icon: XCircle,
    },
    SUSPENDED: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700",
      icon: PauseCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </Badge>
  );
};

function AdminCourseDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/admin/courses/$id" });
  const queryClient = useQueryClient();

  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | "suspend" | null>(null);
  const [actionReason, setActionReason] = useState("");

  const { data, isLoading, error } = useCourseDetail(id);
  const course: CourseDetail | undefined = data?.course;

  const updateCourseMutation = useMutation({
    mutationFn: async ({ action, reason }: { action: string; reason?: string }) => {
      const response = await fetch(`/api/admin/courses/${id}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error(`Failed to ${action} course`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setActionDialogOpen(false);
      setActionReason("");
      setActionType(null);
    },
  });

  const handleAction = (type: "approve" | "reject" | "suspend") => {
    setActionType(type);
    if (type === "approve") {
      // Approve directly without dialog
      updateCourseMutation.mutate({ action: "approve" });
    } else {
      setActionDialogOpen(true);
    }
  };

  const confirmAction = () => {
    if (actionType) {
      updateCourseMutation.mutate({
        action: actionType,
        reason: actionReason,
      });
    }
  };

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600 text-center">Failed to load course details.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate({ to: "/admin/courses" })}
          >
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!course) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">Course not found</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <main className="space-y-6 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/admin/courses" })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <div className="flex items-center gap-3">
            {course.status === "PENDING" && (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleAction("reject")}
                  disabled={updateCourseMutation.isPending}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Course
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction("approve")}
                  disabled={updateCourseMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Course
                </Button>
              </>
            )}
            {course.status === "APPROVED" && (
              <Button
                variant="outline"
                onClick={() => handleAction("suspend")}
                disabled={updateCourseMutation.isPending}
              >
                <PauseCircle className="h-4 w-4 mr-2" />
                Suspend Course
              </Button>
            )}
            {course.status === "SUSPENDED" && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction("approve")}
                disabled={updateCourseMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Reactivate Course
              </Button>
            )}
            {course.status === "REJECTED" && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction("approve")}
                disabled={updateCourseMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Course
              </Button>
            )}
          </div>
        </div>

        {/* Course Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full lg:w-80 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600">
                    by{" "}
                    <span className="font-semibold text-primary">
                      {course.instructor.name}
                    </span>
                  </p>
                </div>
                {getStatusBadge(course.status)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{course.enrollments}</p>
                    <p className="text-gray-600">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-gray-900">{course.rating}</p>
                    <p className="text-gray-600">{course.totalReviews} reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{course.duration}</p>
                    <p className="text-gray-600">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      ₦{course.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Price</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.language}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Rejection/Suspension Reason */}
        {(course.rejectionReason || course.suspensionReason) && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {course.status === "REJECTED" ? "Rejection Reason" : "Suspension Reason"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                {course.rejectionReason || course.suspensionReason}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{course.description}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {course.modules.length} modules •{" "}
                  {course.modules.reduce((sum, m) => sum + m.lessons, 0)} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-600">{module.lessons} lessons</p>
                          </div>
                        </div>
                        <PlayCircle className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {course.instructor.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{course.instructor.email}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Instructor Rating</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">
                            {course.instructor.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Courses</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {course.instructor.totalCourses}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {course.enrollments * course.instructor.totalCourses}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Enrollments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">{course.enrollments}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">{course.rating}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">{course.totalReviews}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    ₦{(course.enrollments * course.price).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Created</p>
                      <p className="text-sm text-gray-600">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-600">
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Dialog */}
        <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "reject" ? "Reject Course" : "Suspend Course"}
              </DialogTitle>
              <DialogDescription>
                Please provide a reason for {actionType === "reject" ? "rejecting" : "suspending"}{" "}
                this course. This will be visible to the instructor.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Enter reason..."
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setActionDialogOpen(false);
                  setActionReason("");
                  setActionType(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                disabled={!actionReason.trim() || updateCourseMutation.isPending}
                className={
                  actionType === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : ""
                }
              >
                {updateCourseMutation.isPending ? "Processing..." : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </DashboardShell>
  );
}