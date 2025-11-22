import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Calendar, TrendingUp } from "lucide-react";
import { InstructorDetail } from "@/types/instructor.types";

const OverviewTab = ({instructor}:{instructor:InstructorDetail}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Biography</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">{instructor.bio}</p>
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
                  {new Date(instructor.joinedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
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
    </>
  );
};

export default OverviewTab;
