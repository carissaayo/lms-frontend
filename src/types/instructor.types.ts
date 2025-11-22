import { InstructorStatus } from "./user.types";

export interface Instructor {
  _id: string;
  name: string;
  email: string;
  picture: string;
  bio: string;
  status: InstructorStatus;
  coursesCount: number;
  enrollmentsCount: number;
  totalRevenue: number;
  rating: number;
  createdAt: string;
  specialization: string;
}

export interface InstructorDetail {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  picture: string;
  bio: string;
  status: InstructorStatus;
  specialization: string;
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  courses: Array<{
    _id: string;
    title: string;
    coverImage: string;
    price: number;
    enrollments: number;
    rating: number;
    status: string;
  }>;
  stats: {
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
    approvedCourses: number;
    pendingCourses: number;
  };
  joinedDate: string;
  lastActive?: string;
  suspendReason?: string;
  rejecctReason?: string;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

export interface CourseStats {
  total: number;
  drafted: number;
  submitted: number;
  published: number;
  rejected: number;
  suspended: number;
}

export interface MonthlyRevenueItem {
  month: string; // "Jan", "Feb", etc.
  revenue: number; // 0
  enrollments: number; // 0
}

export interface RevenueStats {
  totalRevenue: number;
  averageRevenuePerStudent: number;
  monthlyRevenue: MonthlyRevenueItem[]; // 12 items
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  retentionRate: number;
}

export interface TopSellingCourse {
  // Add fields when backend returns actual data
  // For now, keeping it flexible since your array is empty
  _id?: string;
  title?: string;
  enrollments?: number;
  revenue?: number;
  courseName:string;
}

export interface RecentCourse {
  _id?: string;
  title?: string;
  createdAt?: string;
  coverImage?: string;
}

export interface CoursePerformanceItem {
  // Add fields when data becomes available
  // Keeping placeholder type:
  [key: string]: any;
}

export interface EngagementDataItem {
  // Placeholder until backend populates structure
  [key: string]: any;
}

export interface InstructorAnalytics {
  timeRange: string; // "6months" | "12months" | etc.

  studentStats: StudentStats;

  courseStats: CourseStats;

  revenueStats: RevenueStats;

  topSellingCourses: TopSellingCourse[];

  recentCourses: RecentCourse[];

  engagementData: EngagementDataItem[];

  coursePerformance: CoursePerformanceItem[];
}
