import CourseStatCard from "@/components/courses/courseStatsCard";
import { Award, CheckCircle, Clock, XCircle, Ban } from "lucide-react"; // Imported icons

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
        bgColor="bg-indigo-50"
        textColor="text-indigo-800"
        descriptionTextColor="text-indigo-600"
        icon={Award}
      />

      <CourseStatCard
        title="Approved"
        description="Approved by moderators"
        count={approvedCourses}
        bgColor="bg-green-600"
        textColor="text-white"
        descriptionTextColor="text-green-200"
        icon={CheckCircle}
      />

      <CourseStatCard
        title="Pending"
        description="Awaiting approval"
        count={pendingCourses}
        bgColor="bg-yellow-100"
        textColor="text-yellow-800"
        descriptionTextColor="text-yellow-600"
        icon={Clock}
      />

      <CourseStatCard
        title="Rejected"
        description="Not approved"
        count={rejectedCourses}
        bgColor="bg-red-100"
        textColor="text-red-800"
        descriptionTextColor="text-red-600"
        icon={XCircle}
      />

      <CourseStatCard
        title="Suspended"
        description="Temporarily inactive"
        count={suspendedCourses}
        bgColor="bg-gray-100"
        textColor="text-gray-700"
        descriptionTextColor="text-gray-500"
        icon={Ban}
      />
    </>
  );
};

export default InstructorCourseStatsCon;
