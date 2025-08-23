export type AssignmentStatus = "pending" | "submitted" | "graded";

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: number;
}
