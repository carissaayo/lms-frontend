import { InstructorDetail } from '@/types/instructor.types';
import {
  Users,
  Star,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import getInstructorStatusBadge from './InstructorBadge';

const SingleInstructorHeader = ({
  instructor,
}: {
  instructor: InstructorDetail;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={instructor.picture}
            alt={`${instructor.firstName} ${instructor.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {instructor.firstName} {instructor.lastName}
                </h1>
                <p className="text-lg text-primary font-semibold mb-2">
                  {instructor.specialization}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{instructor.email}</span>
                  </div>
                  {instructor.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{instructor.phone}</span>
                    </div>
                  )}
                  {instructor.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{instructor.location}</span>
                    </div>
                  )}
                </div>
              </div>
              {getInstructorStatusBadge(instructor.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <BookOpen className="h-5 w-5 text-primary mb-1" />
                <p className="text-2xl font-bold text-gray-900">
                  {instructor.stats.totalCourses}
                </p>
                <p className="text-xs text-gray-600">Courses</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Users className="h-5 w-5 text-primary mb-1" />
                <p className="text-2xl font-bold text-gray-900">
                  {instructor.stats.totalEnrollments}
                </p>
                <p className="text-xs text-gray-600">Students</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Star className="h-5 w-5 text-yellow-500 mb-1" />
                <p className="text-2xl font-bold text-gray-900">
                  {instructor.stats.averageRating}
                </p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <MessageSquare className="h-5 w-5 text-primary mb-1" />
                <p className="text-2xl font-bold text-gray-900">
                  {instructor.stats.totalReviews}
                </p>
                <p className="text-xs text-gray-600">Reviews</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <DollarSign className="h-5 w-5 text-green-600 mb-1" />
                <p className="text-2xl font-bold text-gray-900">
                  ₦{(instructor.stats.totalRevenue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-gray-600">Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInstructorHeader