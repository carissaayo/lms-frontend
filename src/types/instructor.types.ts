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
