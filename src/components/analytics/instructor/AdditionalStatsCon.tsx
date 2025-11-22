import { StatsCard } from './StatsCard';
import { CoursePerformanceItem, RevenueStats } from '@/types/instructor.types';
import { CheckCircle, Star, Target } from 'lucide-react';

const AdditionalStatsCon = ({
  revenueStats,
  coursePerformance,
}: {
  revenueStats: RevenueStats;
  coursePerformance: CoursePerformanceItem[];
}) => {
  const avgCompletionRate = coursePerformance?.length
    ? Math.round(
        coursePerformance.reduce(
          (sum, course) => sum + (course?.completionRate || 0),
          0
        ) / coursePerformance.length
      )
    : 0;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatsCard
        title="Average Revenue/Student"
        value={`₦${
          (
            revenueStats?.averageRevenuePerStudent as number | undefined
          )?.toFixed?.(2) || 0
        }`}
        change="Industry avg: $45"
        icon={Target}
        trend="up"
        color="green"
      />
      <StatsCard
        title="Course Completion Rate"
        value={`${avgCompletionRate}%`}
        change="Across all courses"
        icon={CheckCircle}
        trend="up"
        color="blue"
      />
      <StatsCard
        title="Student Satisfaction"
        value="4.7/5"
        change="Based on reviews"
        icon={Star}
        trend="up"
        color="yellow"
      />
    </div>
  );
};

export default AdditionalStatsCon