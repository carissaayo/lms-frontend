import { NairaIcon } from '@/components/analytics/admin/NairaIcon';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/course.types';
import { Clock, Users } from 'lucide-react';

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    approved: {
      label: "Approved",
      className: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-700 hover:bg-red-100",
    },
    suspended: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    },
  };

  const key = status?.toLowerCase() as keyof typeof statusConfig;
  const config = statusConfig[key] || statusConfig.pending;

  return <Badge className={config.className}>{config.label}</Badge>;
};

const FilteredCourses = ({
  filteredCourses,
  handleViewCourse,
}: {
  filteredCourses: Course[];
  handleViewCourse: (id: string) => void;
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div
            className="relative"
            onClick={() => handleViewCourse(course._id)}
          >
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              {getStatusBadge(course.status)}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3
                className="font-semibold text-lg text-gray-900 line-clamp-2  cursor-pointer flex-1 h-16"
                onClick={() => handleViewCourse(course._id)}
              >
                {course.title}
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              by <span className="font-medium">{course.instructorName}</span>
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.enrollments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-gray-900 font-semibold ">
                <NairaIcon className="h-4 w-4  " />
                <span className="pt-2">{course.price.toLocaleString()}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {course.category}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilteredCourses