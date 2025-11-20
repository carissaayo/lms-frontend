export interface CourseStats {
  draft: number;
  pending: number;
  published: number;
  archived: number;
}

export interface EngagementMetrics {
  avgCompletionRate: number;
  avgCourseRating: number;
  avgSessionDuration: number;
  studentRetentionRate: number;
}

export interface GrowthDataItem {
  label: string;
  students: number;
  instructors: number;
  courses: number;
  enrollments: number;
}

export interface RevenueDataItem {
  label: string;
  revenue: number;
  enrollments: number;
}

export interface OverviewData {
  activeCourses: number;
  activeStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalInstructors: number;
  totalRevenue: number;
  totalStudents: number;
  totalWithdrawals: number;
}

export interface RecentWithdrawal {
 counts:number;
 totalAmount:number
}

export interface TopCourse {
  _id: string;
  title: string;
  students: number;
  revenue: number;
}

export interface TopInstructor {
  _id: string;
  name: string;
  revenue: number;
  students: number;
}

export interface WithdrawalSummary {
  successful: number;
  total: number;
}

export interface CategoryDistribution{
value:number;
_id:string

}

export interface AnalyticsResponse {
  courseStats: CourseStats;
  engagementMetrics: EngagementMetrics;
  growthData: GrowthDataItem[];
  overview: OverviewData;
  recentWithdrawals: RecentWithdrawal[];
  revenueData: RevenueDataItem[];
  topCourses: TopCourse[];
  topInstructors: TopInstructor[];
  withdrawalSummary: WithdrawalSummary;
  categoryDistribution: CategoryDistribution[];
}
