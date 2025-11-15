import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Sparkles } from "lucide-react";
import { Lesson } from "@/types/lesson.types";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  lesson: Lesson;
  index: number;
  completedLessons: number;
  hoveredLesson: string | null;
  setHoveredLesson: (id: string | null) => void;
}

export function LessonCard({
  lesson,
  index,
  completedLessons,
  hoveredLesson,
  setHoveredLesson,
}: Props) {
  const navigate = useNavigate();
  const isCompleted = index < completedLessons;
  const isHovered = hoveredLesson === lesson._id;

  return (
    <div
      onMouseEnter={() => setHoveredLesson(lesson._id)}
      onMouseLeave={() => setHoveredLesson(null)}
      className={`relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer 
        ${isCompleted ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"} 
        ${isHovered ? "scale-[1.02]" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold 
          ${isCompleted ? "bg-green-600" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}
        >
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.position}
        </div>

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h3
              className={`text-lg font-semibold ${isCompleted ? "text-green-900" : "text-gray-900"}`}
            >
              {lesson.title}
            </h3>

            {isCompleted && (
              <Badge className="bg-green-600 text-white">Completed</Badge>
            )}
          </div>

          <p
            className={`text-sm ${isCompleted ? "text-green-700" : "text-gray-600"}`}
          >
            {lesson.description}
          </p>

          <div className="mt-3">
            <Button
              variant={isCompleted ? "outline" : "default"}
              size="sm"
              className={
                isCompleted
                  ? "border-green-600 text-green-600"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }
              onClick={() =>
                navigate({ to: `/student/enrollments/lessons/${lesson._id}` })
              }
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <PlayCircle className="w-4 h-4 mr-1" />
              )}
              {isCompleted ? "Review Lesson" : "Start Lesson"}
            </Button>
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="absolute top-0 right-0 m-4">
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
        </div>
      )}
    </div>
  );
}
