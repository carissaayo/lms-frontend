import { BookOpen, GraduationCap, Users } from "lucide-react";
import React from "react";
import { StatsCard } from "./StatCard";
import { NairaIcon } from "./NairaIcon";
import { OverviewData } from "@/types/adminAnalytics.types";


interface OverviewProps {
  overview: OverviewData;
}

const AnalyticStatsCon: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Students"
        value={overview.totalStudents?.toLocaleString() ?? "0"}
        change="+15.3% from last period"
        icon={Users}
        trend="up"
        color="blue"
      />

      <StatsCard
        title="Total Courses"
        value={overview.totalCourses ?? 0}
        change={`${overview.activeCourses ?? 0} active`}
        icon={BookOpen}
        trend="up"
        color="green"
      />

      <StatsCard
        title="Total Instructors"
        value={overview.totalInstructors ?? 0}
        change="+8.2% from last period"
        icon={GraduationCap}
        trend="up"
        color="purple"
      />

      <StatsCard
        title="Total Revenue"
        value={`₦${overview.totalRevenue?.toLocaleString() ?? "0"}`}
        change="+18.5% from last period"
        icon={NairaIcon}
        trend="up"
        color="green"
      />
    </div>
  );
};

export default AnalyticStatsCon;
