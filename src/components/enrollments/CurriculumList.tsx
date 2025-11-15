import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/lesson.types";


export interface CurriculumListProps {
  lessons: Lesson[];
  hoveredLesson: string | null;
  setHoveredLesson: (lessonId: string | null) => void;
  navigate: (options: { to: string }) => void;
  completedLessons: number;
}

export function CurriculumList({
  lessons,
  hoveredLesson,
  setHoveredLesson,
  navigate,
  completedLessons,
}: CurriculumListProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Course
            Curriculum
          </h2>

          <Badge variant="outline">{lessons.length} Lessons</Badge>
        </div>

        {lessons.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No lessons yet.</div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson: Lesson, index: number) => {
              const isCompleted = index < completedLessons;
              const isLocked = false;
              const isHovered = hoveredLesson === lesson._id;

              return (
                <div
                  key={lesson._id}
                  onMouseEnter={() => setHoveredLesson(lesson._id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  } ${isHovered ? "scale-[1.02]" : ""}`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                        isCompleted
                          ? "bg-green-600"
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                    >
                      {isCompleted ? <CheckCircle /> : lesson.position}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {lesson.title}
                        </h3>

                        {isCompleted && (
                          <Badge className="bg-green-600 text-white">
                            Completed
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-600">{lesson.description}</p>

                      <Button
                        size="sm"
                        className="mt-3"
                        variant={isCompleted ? "outline" : "default"}
                        onClick={() =>
                          navigate({
                            to: `/student/enrollments/lessons/${lesson._id}`,
                          })
                        }
                      >
                        {isCompleted ? "Review Lesson" : "Start Lesson"}
                      </Button>
                    </div>
                  </div>

                  {isHovered && !isLocked && (
                    <Sparkles className="absolute right-4 top-4 text-blue-600" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
