export const PerformanceBar = ({
  course,
}: {
  course: {
    courseName: string;
    completionRate: number;
    enrollments: number;
    revenue: number;
  };
}) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700 line-clamp-1">
        {course.courseName}
      </span>
      <span className="text-sm text-gray-500">{course.completionRate}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${course.completionRate}%` }}
      />
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{course.enrollments} students</span>
      <span>${course.revenue.toLocaleString()}</span>
    </div>
  </div>
);
