
import { BookOpen, PauseCircle, UserCheck, Users, UserX } from "lucide-react";
import InstructorStatCard from "./InstructorStatCard";

const AdminInstructorStats = ({
  totalInstructors,
  activeInstructors,
  suspendedInstructors,
  pendingInstructors,
  totalCourses,
}: {
  totalInstructors: number;
  activeInstructors: number;
  suspendedInstructors: number;
  pendingInstructors: number;
  totalCourses: number;
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <InstructorStatCard
        title="Total Instructors"
        description="All platform instructors"
        count={totalInstructors}
        bgColor="bg-blue-500"
        textColor="text-white"
        descriptionTextColor="text-white/90"
        icon={Users}
      />
      <InstructorStatCard
        title="Active"
        description="Currently teaching"
        count={activeInstructors}
        bgColor="bg-green-600"
        textColor="text-white"
        descriptionTextColor="text-white/90"
        icon={UserCheck}
      />
      <InstructorStatCard
        title="Suspended"
        description="Account suspended"
        count={suspendedInstructors}
        bgColor="bg-red-200"
        icon={UserX}
      />
      <InstructorStatCard
        title="Pending"
        description="Awaiting approval"
        count={pendingInstructors}
        bgColor="bg-yellow-100"
        icon={PauseCircle}
      />
      <InstructorStatCard
        title="Total Courses"
        description="Across all instructors"
        count={totalCourses}
        bgColor="bg-purple-100"
        icon={BookOpen}
      />
    </div>
  );
};

export default AdminInstructorStats;
