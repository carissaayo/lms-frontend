export enum Role {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export enum InstructorStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED= 'suspended',
}

export enum StudentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SUSPENDED = "suspended",
}

export enum AdminStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SUSPENDED = "suspended",
}
export interface RegisterData {
  firstName: string;
  lastName: string;

  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export type UserProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  walletBalance: number;
  phoneNumber: string;
  role: "student" | "instructor" | "admin";
  state?: string;
  city?: string;
  country?: string;
  picture?: string;
  street?: string;
  bio?:string;
  zip?:string
};
