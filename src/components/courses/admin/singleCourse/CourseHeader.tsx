import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  XCircle,
  PauseCircle,
} from "lucide-react";

import { NairaIcon } from "@/components/analytics/admin/NairaIcon";
import { CourseDetail, CourseStatus } from "@/types/course.types";

export const getStatusBadge = (status: CourseStatus) => {
  const statuses: Record<
    CourseStatus,
    { label: string; className: string; icon: any }
  > = {
    [CourseStatus.APPROVED]: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    [CourseStatus.PENDING]: {
      label: "Pending Review",
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    [CourseStatus.REJECTED]: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
      icon: XCircle,
    },
    [CourseStatus.SUSPENDED]: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700",
      icon: PauseCircle,
    },
  };

  const cfg = statuses[status];
  if (!cfg) return null;

  const Icon = cfg.icon;

  return (
    <Badge className={`flex items-center gap-1 ${cfg.className}`}>
      <Icon className="h-4 w-4" />
      {cfg.label}
    </Badge>
  );
};



const CourseHeader = ({ course }: { course: CourseDetail }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={course.coverImage}
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
                  {course.instructor.firstName +
                    " " +
                    course.instructor.lastName}
                </span>
              </p>
            </div>

            {getStatusBadge(course.status)}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900">
                  {course.enrollments}
                </p>
                <p className="text-gray-600">Students</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-semibold text-gray-900">{course.rating}</p>
                <p className="text-gray-600">
                  {course.totalReviews || 0} reviews
                </p>
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
              <NairaIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900">
                  {course.price.toLocaleString()}
                </p>
                <p className="text-gray-600">Price</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{course.category}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};




export default CourseHeader
