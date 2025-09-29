export const RecentCourseCard = ({
  course,
}: {
  course: {
    title: string;
    status: string;
    category: string;
    price: number;
    enrollments: number;
    revenue: number;
  };
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 line-clamp-1">
          {course.title}
        </h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            course.status
          )}`}
        >
          {course.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-2">{course.category}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">${course.price}</span>
        <div className="text-right">
          <p className="font-medium">{course.enrollments} students</p>
          <p className="text-gray-500">${course.revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
