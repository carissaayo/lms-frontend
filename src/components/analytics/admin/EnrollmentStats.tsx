import { Activity, Banknote, Target, UserCheck } from "lucide-react";
import { StatsCard } from "./StatCard";


interface Overview {
  activeCourses: number;
  activeStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalInstructors: number;
  totalRevenue: number;
  totalStudents: number;
  totalWithdrawals:number
}
interface EngagementMetrics {
  studentRetentionRate: number;
  avgCompletionRate: number;
  avgCourseRating: number;
  avgSessionDuration: number;
  
}

interface OverviewProps {
  overview: Overview;
  engagementMetrics: EngagementMetrics;
}

const EnrollmentStats: React.FC<OverviewProps> = ({
  overview,
  engagementMetrics,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Enrollments"
        value={overview?.totalEnrollments?.toLocaleString() || 0}
        change="+12.8% from last period"
        icon={UserCheck}
        trend="up"
        color="blue"
      />
      <StatsCard
        title="Active Students"
        value={overview?.activeStudents?.toLocaleString() || 0}
        change={`${((overview?.activeStudents / overview?.totalStudents) * 100).toFixed(1)}% of total`}
        icon={Activity}
        trend="up"
        color="orange"
      />
      <StatsCard
        title="Total Withdrawals"
        value={overview?.totalWithdrawals?.toLocaleString() || 0}
        change="-2.4% from last period"
        icon={Banknote}
        trend="down"
        color="yellow"
      />
      <StatsCard
        title="Retention Rate"
        value={`${engagementMetrics?.studentRetentionRate || 0}%`}
        change="+3.2% from last period"
        icon={Target}
        trend="up"
        color="green"
      />
    </div>
  );
};

export default EnrollmentStats