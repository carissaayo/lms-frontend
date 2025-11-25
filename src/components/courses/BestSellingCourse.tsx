import { TrendingUp, DollarSign, Users } from "lucide-react"; // Added icons
import { Course } from "@/types/course.types";
import { Link } from "@tanstack/react-router";
import { Route as CourseRoute } from "@/routes/instructor/courses/$id";
interface BestSellingCourseProps {
  courses?: Course[];
}

const BestSellingCourse = ({ courses = [] }: BestSellingCourseProps) => {
  const topCourses = [...courses]
    .sort((a, b) => (b.enrollments ?? 0) - (a.enrollments ?? 0))
    .slice(0, 5);

  return (
    <section className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 h-full">
      <h1 className="flex items-center font-primary text-2xl font-semibold pb-4 border-b border-gray-100 text-gray-800">
        <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
        Top Selling Courses
      </h1>

      <div className="mt-4 space-y-3">
        {topCourses.length > 0 ? (
          topCourses.map((course, index) => (
            <Link
              key={index}
              to="/instructor/courses/$id" // Hardcoded path, replace with correct route if available
              params={{ id: course._id }}
              className="flex items-center p-3 rounded-lg transition duration-200 hover:bg-gray-50 group border border-transparent hover:border-indigo-100"
            >
              <div className="text-xl font-extrabold text-indigo-600 mr-4 w-6 text-center">
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold truncate text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {course.enrollments ?? 0} Students
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ₦{course.price?.toLocaleString() ?? 0}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No best-selling courses yet.
          </div>
        )}
      </div>
    </section>
  );
};
export default BestSellingCourse;