import CourseStatCard from './CourseStatCard';

const AdminCourseStatsCon = ({
  totalCourses,
  approvedCourses,
  pendingCourses,
  rejectedCourses,
  suspendedCourses
}: {
  totalCourses: number;
  approvedCourses: number;
  pendingCourses: number;
  rejectedCourses: number;
  suspendedCourses: number;
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <CourseStatCard
        title="Total Courses"
        description="All platform courses"
        count={totalCourses}
        bgColor="bg-blue-500"
        textColor="text-white"
        descriptionTextColor="text-white/90"
      />
      <CourseStatCard
        title="Approved"
        description="Live on platform"
        count={approvedCourses}
        bgColor="bg-green-600"
        textColor="text-white"
        descriptionTextColor="text-white/90"
      />
      <CourseStatCard
        title="Pending"
        description="Awaiting review"
        count={pendingCourses}
        bgColor="bg-yellow-100"
      />
      <CourseStatCard
        title="Rejected"
        description="Not approved"
        count={rejectedCourses}
        bgColor="bg-red-200"
      />
      <CourseStatCard
        title="Suspended"
        description="Temporarily inactive"
        count={suspendedCourses}
        bgColor="bg-gray-100"
      />
    </div>
  );
};

export default AdminCourseStatsCon