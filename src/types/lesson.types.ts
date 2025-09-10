import { Assignment } from "./assigmentTypes";

export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  position: number;
  course: string;
  assignments: string[] | Assignment[];
  courseId: string;
  videoUrl: string;
  noteUrl?: string;
  progress: string[]; // or could be populated with LessonProgress[]
  createdAt: string; // ISO string from Mongo
  updatedAt: string; // ISO string from Mongo
}
