import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/lesson.types";
import {
  CheckCircle,
  BookOpen,
  Clock,
  TrendingUp,
  PlayCircle,
} from "lucide-react";

export interface EnrollmentHeroProps {
  course: {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    duration?: number;
  };
  lessons: Lesson[];
  progressPercentage: number;
  isStarting: boolean;
  handleStartCourse: () => void;
}

export function EnrollmentHero({
  course,
  lessons,
  progressPercentage,
  isStarting,
  handleStartCourse,
}: EnrollmentHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <img
        src={course.coverImage}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 max-w-3xl">
        <Badge className="bg-green-500 text-white px-4 py-1.5 text-sm mb-4">
          <CheckCircle className="w-4 h-4 mr-1" /> Enrolled
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {course.title}
        </h1>

        <p className="text-lg text-gray-200 mb-6">{course.description}</p>

        <div className="flex flex-wrap gap-6 mb-8 text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>{lessons.length} Lessons</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>{course.duration || "Self-paced"}</span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>{progressPercentage.toFixed(0)}% Complete</span>
          </div>
        </div>

        <Button
          onClick={handleStartCourse}
          disabled={isStarting}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
        >
          {isStarting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Starting...
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5 mr-2" /> Start Course
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
