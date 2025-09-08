export enum Role {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
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
