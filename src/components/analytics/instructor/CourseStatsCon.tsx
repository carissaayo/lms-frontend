import CourseStatCard from "@/components/courses/courseStatsCard";


const InstructorCourseStatsCon = ({
  totalCourses,
  approvedCourses,
  pendingCourses,
  rejectedCourses,
  suspendedCourses,
}: {
  totalCourses: number;
  approvedCourses: number;
  pendingCourses: number;
  rejectedCourses: number;
  suspendedCourses: number;
}) => {
  return (
    <>
      <CourseStatCard
        title="Total Courses"
        description="All created courses"
        count={totalCourses}
        bgColor="bg-primary-light"
      />

      <CourseStatCard
        title="Approved"
        description="Approved by moderators"
        count={approvedCourses}
        bgColor="bg-green-600"
        textColor="text-white"
        descriptionTextColor="text-white/90"
      />

      <CourseStatCard
        title="Pending"
        description="Awaiting approval"
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
    </>
  );
};

export default InstructorCourseStatsCon;
