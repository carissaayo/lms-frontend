import { TopSellingCourseCard } from "./TopSellingCourses";
import { RecentCourseCard } from "./RecentCourseCard";
import { RecentCourse, TopSellingCourse } from "@/types/instructor.types";

const TopSellingCourseCon = ({
  topSellingCourses,
  recentCourses,
}: {
  topSellingCourses: TopSellingCourse[];
  recentCourses: RecentCourse[];
}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Top Selling Courses
        </h2>
        <div className="space-y-3">
          {topSellingCourses?.length > 0 ? (
            topSellingCourses.map((course: any, index: number) => (
              <TopSellingCourseCard
                key={course.courseId}
                course={course}
                rank={index + 1}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No recent courses available
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Courses
        </h2>
        <div className="space-y-3">
          {recentCourses?.length > 0 ? (
            recentCourses.map((course: any) => (
              <RecentCourseCard key={course.courseId} course={course} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No recent courses available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSellingCourseCon;
