import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InstructorDetail } from "@/types/instructor.types";


const InstructorAnalyticTab = ({
  instructor,
}: {
  instructor: InstructorDetail;
}) => {
  return (
    <>
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
            <p className="text-sm text-gray-600 mt-1">Across all courses</p>
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
                  {((instructor.stats.averageRating / 5) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${(instructor.stats.averageRating / 5) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default InstructorAnalyticTab;
