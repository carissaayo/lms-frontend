export enum CourseStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SUSPENDED = "suspended",
}

export enum CourseCategory {
  DEVELOPMENT = "Development",
  BUSINESS = "Business",
  FINANCE_ACCOUNTING = "Finance & Accounting",
  IT_SOFTWARE = "IT & Software",
  OFFICE_PRODUCTIVITY = "Office Productivity",
  PERSONAL_DEVELOPMENT = "Personal Development",
  DESIGN = "Design",
  MARKETING = "Marketing",
  LIFESTYLE = "Lifestyle",
  PHOTOGRAPHY_VIDEO = "Photography & Video",
  HEALTH_FITNESS = "Health & Fitness",
  MUSIC = "Music",
  TEACHING_ACADEMICS = "Teaching & Academics",
}

export const CourseCategories = Object.values(CourseCategory);

export type Course = {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  instructorName: string;
  coverImage?: string;
  category: CourseCategory;
  price: number;
  status: CourseStatus;
  enrollments: number;
  rating: number;
  lessons?: {
    number: number;
    name: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  duration: number;
};

export interface CourseDetail {
  _id: string;
  title: string;
  status: CourseStatus;
  description: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    avatar?: string;
    rating: number;
  };
  coverImage: string;
  price: number;
  enrollments: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  duration: string;
  level: string;
  language: string;
  lessons: Array<{
    _id: string;
    id: string;
    title: string;
    description?: string;
    duration?: string;
  }>;
  requirements: string[];
  learningOutcomes: string[];
  isEnrolled?: boolean;
  reviews?: Array<{
    _id: string;
    user: {
      name: string;
      avatar?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  rejectionReason?: string;
  suspensionReason?: string;
  totalCourses:number;
}