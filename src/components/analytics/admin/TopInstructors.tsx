import { Card } from '@/components/ui/card';
import { TopInstructor } from '@/types/adminAnalytics.types';
import { Award } from 'lucide-react';
import { TopCourse } from '../../../types/adminAnalytics.types';
interface TopInstructorsProps {
  topInstructors: TopInstructor[];
  topCourses: TopCourse[];
}

const TopInstructorsAndTopCourses: React.FC<TopInstructorsProps> = ({topInstructors,topCourses}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Top Performing Instructors
        </h2>
        <div className="space-y-3">
          {topInstructors?.map((instructor: any, index: number) => (
            <div
              key={instructor.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center flex-1">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {instructor.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {instructor.courses} courses • {instructor.students}{" "}
                    students
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  ₦{instructor.revenue.toLocaleString()}
                </p>
                <div className="flex items-center justify-end">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {instructor.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Top Selling Courses
        </h2>
        <div className="space-y-3">
          {topCourses?.map((course: any, index: number) => (
            <div
              key={course.title}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center flex-1">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">
                    {course.students} students enrolled
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  ₦{course.revenue.toLocaleString()}
                </p>
                <div className="flex items-center justify-end">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TopInstructorsAndTopCourses;