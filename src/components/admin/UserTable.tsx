import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Mail,
  BookOpen,
  CheckCircle,
  DollarSign,
  Calendar,
  Eye,
  Ban,
  Users,
} from "lucide-react";
import { StudentStatus } from "@/types/user.types";
import { Badge } from "../ui/badge";
import { Student } from "@/routes/admin/students";
import { NairaIcon } from "../analytics/admin/NairaIcon";


const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    active: {
      label: "Active",
      className: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    suspended: {
      label: "Suspended",
      className: "bg-red-100 text-red-700 hover:bg-red-100",
    },
    inactive: {
      label: "Inactive",
      className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    },
  };

  const key = status?.toLowerCase() as keyof typeof statusConfig;
  const config = statusConfig[key] || statusConfig.active;

  return <Badge className={config.className}>{config.label}</Badge>;
};



interface StudentsTableProps {
  students: Student[];
  search?: string;
  status?: string;
  handleViewStudent: (id: string) => void;
  handleStudentAction: (id: string, action: "suspend" | "activate") => void;
}

/**
 * Admin Students Table - Reusable ShadCN Table Component
 */
export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  search,
  status,
  handleViewStudent,
  handleStudentAction,
}) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">
          No students found
        </h2>
        <p className="text-gray-600 mt-2">
          {search || status !== "all"
            ? "Try adjusting your filters to see more results."
            : "No students have been registered yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Student Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        student.avatar ||
                        `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`
                      }
                      alt={`${student.firstName} ${student.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>{getStatusBadge(student.status)}</TableCell>

                {/* Enrollments */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {student.totalEnrollments}
                    </span>
                  </div>
                </TableCell>

                {/* Completed */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-gray-900">
                      {student.completedCoursesCount}
                    </span>
                  </div>
                </TableCell>

                {/* Total Spent */}
                <TableCell>
                  <div className="flex items-center  ">
                    <NairaIcon className="h-4 w-4 " />
                    <span className="font-semibold text-gray-900 pt-2 -pl-4">
                      {student.totalPayments?.toLocaleString()}
                    </span>
                  </div>
                </TableCell>

                {/* Progress */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${student.averageProgress || 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {student.averageProgress || 0}%
                    </span>
                  </div>
                </TableCell>

                {/* Joined Date */}
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(student.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewStudent(student._id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>

                      {student.status !== StudentStatus.SUSPENDED && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStudentAction(student._id, "suspend")
                          }
                          className="text-red-600"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                      )}

                      {student.status === StudentStatus.SUSPENDED && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStudentAction(student._id, "activate")
                          }
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Activate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
