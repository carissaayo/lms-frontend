import { Button } from "@/components/ui/button";

import {
  Users,
  Eye,
  BookOpen,
  Mail,
  Calendar,
  TrendingUp,
} from "lucide-react";
import getInstructorStatusBadge from "./InstructorBadge";
import { Instructor } from "@/types/instructor.types";

const InstructorsCon = ({
  instructors,
  handleViewInstructor,
}: {
  instructors: Instructor[];
  handleViewInstructor:(id:string)=>void;
}) => {
  return (
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
                  src={instructor.picture}
                  alt={instructor.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h3
                    className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleViewInstructor(instructor._id)}
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
              {getInstructorStatusBadge(instructor.status)}
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
                  {instructor.enrollmentsCount}
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
                  {new Date(instructor?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
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
  );
};

export default InstructorsCon;
