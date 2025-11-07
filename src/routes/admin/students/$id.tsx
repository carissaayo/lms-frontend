import { useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useParams,
  Link,
} from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  CheckCircle,
  Ban,
  AlertCircle,
  BookOpen,
  Clock,
  DollarSign,
 
  Phone,
  MapPin,
  Eye,
} from "lucide-react";
import {
  useSingleStudentAdmin,
  useUpdateStudentStatusAdmin,
} from "@/hooks/use-student";
import { StudentStatus } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/students/$id")({
  component: RouteComponent,
});



function getStatusBadge(status: string) {
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: any }
  > = {
    [StudentStatus.ACTIVE]: {
      label: "Active",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    [StudentStatus.SUSPENDED]: {
      label: "Suspended",
      color: "bg-red-100 text-red-700",
      icon: Ban,
    },
    [StudentStatus.INACTIVE]: {
      label: "Inactive",
      color: "bg-gray-100 text-gray-700",
      icon: Clock,
    },
  };

  const config = statusConfig[status] || statusConfig[StudentStatus.INACTIVE];
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </Badge>
  );
}

function RouteComponent() {
  const { id } = useParams({ from: "/admin/students/$id" });
  const navigate = useNavigate();

  const { data, isLoading, error } = useSingleStudentAdmin(id);
  const updateStudent = useUpdateStudentStatusAdmin();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");

  const student = data?.student;

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-64">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !student) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600">Failed to load student details.</p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/admin/students" })}
            className="mt-4"
          >
            Back to Students
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/admin/students" })}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Students
        </Button>

        {student.status === StudentStatus.ACTIVE ? (
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => setDialogOpen(true)}
          >
            <Ban className="h-4 w-4 mr-2" /> Suspend
          </Button>
        ) : (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() =>
              updateStudent.mutate({ id, status: StudentStatus.ACTIVE })
            }
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Reactivate
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
          <img
            src={student.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-gray-600">{student.email}</p>
                {student.phone && (
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="h-4 w-4" /> {student.phone}
                  </p>
                )}
                {student.location && (
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {student.location}
                  </p>
                )}
              </div>
              {getStatusBadge(student.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <BookOpen className="h-5 w-5 text-primary mb-1" />
                <p className="text-2xl font-bold">
                  {student.stats.totalEnrollments}
                </p>
                <p className="text-xs text-gray-600">Enrollments</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
                <p className="text-2xl font-bold">
                  {student.stats.completedCourses}
                </p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <DollarSign className="h-5 w-5 text-green-600 mb-1" />
                <p className="text-2xl font-bold">
                  ₦{student.stats.totalSpent.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Total Spent</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <Clock className="h-5 w-5 text-gray-500 mb-1" />
                <p className="text-2xl font-bold">
                  {student.stats.averageProgress}%
                </p>
                <p className="text-xs text-gray-600">Avg. Progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Course Enrollments</CardTitle>
          <CardDescription>
            All courses this student is enrolled in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {student.enrollments.map((enr:any) => (
            <div
              key={enr._id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={enr.course.coverImage}
                  alt={enr.course.title}
                  className="w-20 h-14 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {enr.course.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Enrolled: {new Date(enr.enrolledDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${enr.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{enr.progress}%</span>
                <Link to="/admin/courses/$id" params={{ id: enr.course._id }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            All course purchases and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="border-b">
              <tr className="text-left text-gray-600">
                <th className="p-3">Date</th>
                <th className="p-3">Course</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {student.paymentHistory.map((p:any) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{p.course.title}</td>
                  <td className="p-3 font-semibold">
                    ₦{p.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-600">{p.paymentMethod}</td>
                  <td className="p-3">
                    <Badge
                      className={
                        p.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : p.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Suspend Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Student</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-3">
            Provide a reason for suspending this student's account.
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            rows={3}
            placeholder="Reason for suspension..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                updateStudent.mutate({
                  id,
                  status: StudentStatus.SUSPENDED,
                  reason,
                });
                setDialogOpen(false);
                setReason("");
              }}
            >
              Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
