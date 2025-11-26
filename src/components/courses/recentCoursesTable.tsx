import { Calendar,  } from "lucide-react";
import { Course, CourseStatus } from "@/types/course.types";
import { Link } from "@tanstack/react-router";

interface RecentCoursesTableProps {
  courses?: Course[];
}

// Helper to get status color
const getStatusClasses = (status: CourseStatus) => {
  switch (status) {
    case CourseStatus.APPROVED:
      return "bg-green-100 text-green-800";
    case CourseStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case CourseStatus.REJECTED:
      return "bg-red-100 text-red-800";
    case CourseStatus.SUSPENDED:
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentCoursesTable = ({ courses = [] }: RecentCoursesTableProps) => {
  const recentCourses = [...courses]
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    )
    .slice(0, 5);

  return (
    <section className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 h-full">
      <h1 className="flex items-center font-primary text-2xl font-semibold pb-4 border-b border-gray-100 text-gray-800">
        <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
        Recently Updated
      </h1>

      <div className="mt-4 space-y-3">
        {recentCourses.length > 0 ? (
          recentCourses.map((course, index) => (
            <Link
              key={index}
              to="/instructor/courses/$id" // Hardcoded path, replace with correct route if available
              params={{ id: course._id }}
              className="flex items-center justify-between p-3 rounded-lg transition duration-200 hover:bg-gray-50 group border border-transparent hover:border-indigo-100"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-base font-semibold truncate text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last Updated:{" "}
                  {new Date(course.updatedAt ?? 0).toLocaleDateString()}
                </p>
              </div>

              <div
                className={`px-3 py-1 text-xs font-medium rounded-full truncate ${getStatusClasses(course.status)}`}
              >
                {course.status}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No recent course updates.
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentCoursesTable;
