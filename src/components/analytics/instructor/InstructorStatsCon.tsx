import { StatsCard } from '@/components/analytics/instructor/StatsCard';
import { CourseStats, RevenueStats, StudentStats } from '@/types/instructor.types';
import { Activity, BookOpen, Target, Users } from 'lucide-react';

const InstructorStatsCon = ({
  revenueStats,
  studentStats,
  courseStats,
}: {
  revenueStats: RevenueStats;
  studentStats: StudentStats;
  courseStats: CourseStats;
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value={`₦${revenueStats?.totalRevenue?.toLocaleString() || 0}`}
        change="+12% from last month"
        icon={Target}
        trend="up"
        color="green"
      />
      <StatsCard
        title="Total Students"
        value={studentStats?.totalStudents || 0}
        change="+8% from last month"
        icon={Users}
        trend="up"
        color="blue"
      />
      <StatsCard
        title="Published Courses"
        value={courseStats?.published || 0}
        change={`${courseStats?.total || 0} total courses`}
        icon={BookOpen}
        trend="up"
        color="purple"
      />
      <StatsCard
        title="Active Students"
        value={studentStats?.activeStudents || 0}
        change={`${studentStats?.retentionRate || 0}% retention rate`}
        icon={Activity}
        trend="up"
        color="orange"
      />
    </div>
  );
};

export default InstructorStatsCon