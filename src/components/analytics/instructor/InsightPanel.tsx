import { EngagementDataItem, TopSellingCourse } from '@/types/instructor.types';
import { Trophy } from 'lucide-react';

export function getTopCourseByEngagement(data?: EngagementDataItem[]): string {
  if (!data || data.length === 0) return "N/A";

  const top = data.reduce((max, course) =>
    course.engagementScore > max.engagementScore ? course : max
  );

  return top.courseName || "N/A";
}
const InsightPanel = ({
  topSellingCourses,
  engagementData,
}: {
  topSellingCourses: TopSellingCourse[];
  engagementData: EngagementDataItem[];
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <div className="flex items-start">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Trophy className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Performance Insights
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Best Performing Course
              </p>
              <p className="text-lg font-bold text-blue-600">
                {topSellingCourses[0].courseName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Highest Engagement
              </p>

              <p className="text-lg font-bold text-blue-600">
                {getTopCourseByEngagement(engagementData)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Growth
              </p>
              <p className="text-lg font-bold text-blue-600">+12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightPanel