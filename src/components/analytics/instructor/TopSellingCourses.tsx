export const TopSellingCourseCard = ({
  course,
  rank,
}: {
  course: {
    courseName: string;
    enrollments: number;
    price: number;
    revenue: number;
  };
  rank: number;
}) => (
  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
      <span className="text-sm font-bold text-blue-600">#{rank}</span>
    </div>
    <div className="flex-1">
      <h4 className="font-medium text-gray-900 line-clamp-1">
        {course.courseName}
      </h4>
      <p className="text-sm text-gray-500">
        {course.enrollments} students • ₦{course.price}
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">
        ₦{course.revenue.toLocaleString()}
      </p>
    </div>
  </div>
);
