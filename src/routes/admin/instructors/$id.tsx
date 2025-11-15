import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  createFileRoute,
  useNavigate,
  useParams,
  Link,
} from "@tanstack/react-router";
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  PauseCircle,
  Users,
  Star,
  Calendar,
  BookOpen,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  DollarSign,
  Award,
  MessageSquare,
  Eye,
} from "lucide-react";

import { InstructorStatus } from "@/types/user.types";
import { useSingleInstructorAdmin, useUpdateInstructorStatusAdmin } from "@/hooks/use-instructor";



interface InstructorDetail {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  picture: string;
  bio: string;
  status: InstructorStatus;
  specialization: string;
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  courses: Array<{
    _id: string;
    title: string;
    coverImage: string;
    price: number;
    enrollments: number;
    rating: number;
    status: string;
  }>;
  stats: {
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
    approvedCourses: number;
    pendingCourses: number;
  };
  joinedDate: string;
  lastActive?: string;
  suspendReason?: string;
  rejecctReason?:string;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}





export const Route = createFileRoute("/admin/instructors/$id")({
  component: RouteComponent,
});

const getStatusBadge = (status: string) => {
  const statusConfig: Record<
    string,
    { label: string; className: string; icon: any }
  > = {
    [InstructorStatus.APPROVED]: {
      label: "Active",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    [InstructorStatus.SUSPENDED]: {
      label: "Suspended",
      className: "bg-red-100 text-red-700",
      icon: XCircle,
    },
    [InstructorStatus.PENDING]: {
      label: "Pending Approval",
      className: "bg-yellow-100 text-yellow-700",
      icon: PauseCircle,
    },
  };

  const config = statusConfig[status] || statusConfig[InstructorStatus.PENDING];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </Badge>
  );
};

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/admin/instructors/$id" });


  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<InstructorStatus | null>(null);
  const [actionReason, setActionReason] = useState("");

  const { data, isLoading, error } = useSingleInstructorAdmin(id);
  console.log(data);
  
  const instructor: InstructorDetail | undefined = data?.instructor;

  const updateInstructorMutation = useUpdateInstructorStatusAdmin();

  const handleAction = (type: InstructorStatus) => {
    setActionType(type);
    if (type === InstructorStatus.APPROVED) {
      updateInstructorMutation.mutate({
        instructorId: id,
        status: InstructorStatus.APPROVED,
      });
    } else {
      setActionDialogOpen(true);
    }
  };

  const confirmAction = () => {
    if (!actionType) return;

    const status = actionType;
      const rejectReason = InstructorStatus.REJECTED
        ? actionReason
        : undefined;
        const suspendReason = InstructorStatus.SUSPENDED
          ? actionReason
          : undefined;

    updateInstructorMutation.mutate(
      { instructorId: id, status, rejectReason,suspendReason },
      {
        onSuccess: () => {
          setActionDialogOpen(false);
          setActionReason("");
          setActionType(null);
        },
      }
    );
  };

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600 text-center">
            Failed to load instructor details.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate({ to: "/admin/instructors" })}
          >
            Back to Instructors
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

  if (!instructor) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <Users className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">Instructor not found</p>
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
            onClick={() => navigate({ to: "/admin/instructors" })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Instructors
          </Button>
          <div className="flex items-center gap-3">
            {instructor.status === InstructorStatus.PENDING && (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleAction(InstructorStatus.SUSPENDED)}
                  disabled={updateInstructorMutation.isPending}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction(InstructorStatus.APPROVED)}
                  disabled={updateInstructorMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {instructor.status === InstructorStatus.APPROVED && (
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => handleAction(InstructorStatus.SUSPENDED)}
                disabled={updateInstructorMutation.isPending}
              >
                <PauseCircle className="h-4 w-4 mr-2" />
                Suspend Account
              </Button>
            )}
            {instructor.status === InstructorStatus.SUSPENDED && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction(InstructorStatus.APPROVED)}
                disabled={updateInstructorMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Reactivate Account
              </Button>
            )}
          </div>
        </div>

        {/* Instructor Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <img
                src={instructor.picture}
                alt={`${instructor.firstName} ${instructor.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {instructor.firstName} {instructor.lastName}
                    </h1>
                    <p className="text-lg text-primary font-semibold mb-2">
                      {instructor.specialization}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{instructor.email}</span>
                      </div>
                      {instructor.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{instructor.phone}</span>
                        </div>
                      )}
                      {instructor.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{instructor.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(instructor.status)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <BookOpen className="h-5 w-5 text-primary mb-1" />
                    <p className="text-2xl font-bold text-gray-900">
                      {instructor.stats.totalCourses}
                    </p>
                    <p className="text-xs text-gray-600">Courses</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Users className="h-5 w-5 text-primary mb-1" />
                    <p className="text-2xl font-bold text-gray-900">
                      {instructor.stats.totalEnrollments}
                    </p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Star className="h-5 w-5 text-yellow-500 mb-1" />
                    <p className="text-2xl font-bold text-gray-900">
                      {instructor.stats.averageRating}
                    </p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <MessageSquare className="h-5 w-5 text-primary mb-1" />
                    <p className="text-2xl font-bold text-gray-900">
                      {instructor.stats.totalReviews}
                    </p>
                    <p className="text-xs text-gray-600">Reviews</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <DollarSign className="h-5 w-5 text-green-600 mb-1" />
                    <p className="text-2xl font-bold text-gray-900">
                      ₦{(instructor.stats.totalRevenue / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suspension Reason */}
        {instructor.suspendReason && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Suspension Reason
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">{instructor.suspendReason}</p>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">
              Courses ({instructor.stats.totalCourses})
            </TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {instructor.bio}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Joined</p>
                      <p className="font-medium text-gray-900">
                        {new Date(instructor.joinedDate).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  {instructor.lastActive && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Last Active</p>
                        <p className="font-medium text-gray-900">
                          {new Date(instructor.lastActive).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {instructor.website && (
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a
                          href={instructor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          {instructor.website}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Approved Courses</span>
                    <span className="font-semibold text-green-600">
                      {instructor.stats.approvedCourses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Courses</span>
                    <span className="font-semibold text-yellow-600">
                      {instructor.stats.pendingCourses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-semibold text-gray-900">
                      {instructor.stats.totalEnrollments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-semibold text-gray-900">
                      ₦{instructor.stats.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>
                  Courses created by this instructor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {instructor.courses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 line-clamp-2">
                            {course.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="ml-2 shrink-0 text-xs"
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{course.enrollments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ₦{course.price.toLocaleString()}
                          </span>
                        </div>
                        <Link
                          to="/admin/courses/$id"
                          params={{ id: course._id }}
                          className="mt-3 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Eye className="h-4 w-4" />
                          View Course
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            {instructor.education && instructor.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {instructor.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b last:border-0"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {instructor.certifications &&
              instructor.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {instructor.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 pb-4 border-b last:border-0"
                        >
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {cert.name}
                            </h4>
                            <p className="text-gray-600">{cert.issuer}</p>
                            <p className="text-sm text-gray-500">{cert.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    ₦{instructor.stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    {instructor.stats.averageRating}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    From {instructor.stats.totalReviews} reviews
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    {instructor.stats.totalEnrollments}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Across all courses
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg. per Course
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(
                      instructor.stats.totalEnrollments /
                        instructor.stats.totalCourses || 0
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Students/course</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Course Approval Rate
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {(
                          (instructor.stats.approvedCourses /
                            instructor.stats.totalCourses) *
                            100 || 0
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (instructor.stats.approvedCourses /
                              instructor.stats.totalCourses) *
                              100 || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Student Satisfaction
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {((instructor.stats.averageRating / 5) * 100).toFixed(
                          0
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (instructor.stats.averageRating / 5) * 100
                          }%`,
                        }}
                      ></div>
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
                {actionType === InstructorStatus.SUSPENDED
                  ? "Suspend Instructor"
                  : "Reject Application"}
              </DialogTitle>
              <DialogDescription>
                Please provide a reason for{" "}
                {actionType === InstructorStatus.SUSPENDED
                  ? "suspending"
                  : "rejecting"}{" "}
                this instructor. This will be visible to them.
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
                disabled={
                  !actionReason.trim() || updateInstructorMutation.isPending
                }
                className="bg-red-600 hover:bg-red-700"
              >
                {updateInstructorMutation.isPending
                  ? "Processing..."
                  : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </DashboardShell>
  );
}
