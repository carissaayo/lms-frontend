import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardShell } from "@/components/dashboard-shell";
import { useQueryClient } from "@tanstack/react-query";
import { useSingleEnrollment } from "@/hooks/use-enrollment";
import { Lesson } from "@/types/lesson.types";
import { Course } from "@/types/course.types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useStartLesson } from "@/hooks/use-lessons";
import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  Sparkles,
  TrendingUp,
  Award,
  GraduationCap,
  Zap,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/student/enrollments/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

  const { data, isLoading, error } = useSingleEnrollment(id);
  const { mutate: startCourse, isPending: isStarting } = useStartLesson();

  const course: Course = data?.course;
  const lessons: Lesson[] = data?.lessons ?? [];

  const lessonId = lessons[0]?._id;
  const completedLessons = 0; // You can track this from your backend
  const progressPercentage =
    lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  const handleStartCourse = () => {
    startCourse(lessonId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [lessonId] });
        toast.success("Course started successfully", {
          description: "You will be redirected to lesson 1 page",
          position: "top-center",
        });
        setTimeout(() => {
          navigate({ to: `/student/enrollments/lessons/${lessonId}` });
        }, 2500);
      },
      onError: (error: any) => {
        console.error("Failed to start course:", error);
        const messages =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        const errorText = Array.isArray(messages)
          ? messages.join("\n")
          : messages;

        toast.error("Unable to start course", {
          description: errorText,
          position: "top-center",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-blue-100 rounded-full"></div>
            <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !data?.course) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enrollment not found
          </h2>
          <p className="text-gray-600 mb-6">
            Please check if the enrollment ID is correct.
          </p>
          <Button onClick={() => navigate({ to: "/student/enrollments" })}>
            Back to Enrollments
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Toaster />
      <div className="space-y-6 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full transition-all hover:scale-110"
          onClick={() => navigate({ to: "/student/enrollments" })}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Hero Section with Course Cover */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
            <div className="max-w-3xl">
              {/* Enrolled Badge */}
              <Badge className="bg-green-500/90 hover:bg-green-600 text-white backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4 mr-1" />
                Enrolled
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{lessons.length} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">
                    {course.duration || "Self-paced"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="font-medium">
                    {progressPercentage.toFixed(0)}% Complete
                  </span>
                </div>
              </div>

              {/* Start/Continue Button */}
              <Button
                onClick={handleStartCourse}
                disabled={isStarting}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStarting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Course
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Overview Card */}
        <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Your Learning Journey
                  </h3>
                  <p className="text-sm text-gray-600">
                    {completedLessons} of {lessons.length} lessons completed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="mt-4 flex items-center justify-between text-sm">
              <p className="text-gray-600">
                Keep going! You're making great progress 🎉
              </p>
              {progressPercentage === 100 && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Award className="w-4 h-4 mr-1" />
                  Complete
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Total Lessons</p>
                  <p className="text-2xl font-bold">{lessons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold">{completedLessons}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Remaining</p>
                  <p className="text-2xl font-bold">
                    {lessons.length - completedLessons}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Curriculum */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Course Curriculum
              </h2>
              <Badge variant="outline" className="text-sm">
                {lessons.length} Lessons
              </Badge>
            </div>

            {lessons.length > 0 ? (
              <div className="space-y-3">
                {lessons.map((lesson, index) => {
                  const isCompleted = index < completedLessons;
                  const isLocked = false; // You can add logic for locked lessons
                  const isHovered = hoveredLesson === lesson._id;

                  return (
                    <div
                      key={lesson._id}
                      onMouseEnter={() => setHoveredLesson(lesson._id)}
                      onMouseLeave={() => setHoveredLesson(null)}
                      className={`relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isCompleted
                          ? "bg-green-50 border-green-200 hover:border-green-300"
                          : isLocked
                            ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                      } ${isHovered && !isLocked ? "transform scale-[1.02]" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Lesson Number/Status */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            isCompleted
                              ? "bg-green-600 text-white"
                              : isLocked
                                ? "bg-gray-300 text-gray-600"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : isLocked ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            lesson.position
                          )}
                        </div>

                        {/* Lesson Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3
                              className={`text-lg font-semibold ${
                                isCompleted
                                  ? "text-green-900"
                                  : isLocked
                                    ? "text-gray-600"
                                    : "text-gray-900"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            {isCompleted && (
                              <Badge className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0">
                                Completed
                              </Badge>
                            )}
                            {isLocked && (
                              <Badge
                                variant="outline"
                                className="flex-shrink-0"
                              >
                                Locked
                              </Badge>
                            )}
                          </div>

                          <p
                            className={`text-sm leading-relaxed ${
                              isCompleted
                                ? "text-green-700"
                                : isLocked
                                  ? "text-gray-500"
                                  : "text-gray-600"
                            }`}
                          >
                            {lesson.description}
                          </p>

                          {/* Action Button */}
                          {!isLocked && (
                            <div className="mt-3">
                              <Button
                                variant={isCompleted ? "outline" : "default"}
                                size="sm"
                                className={
                                  isCompleted
                                    ? "border-green-600 text-green-600 hover:bg-green-50"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                }
                                onClick={() =>
                                  navigate({
                                    to: `/student/enrollments/lessons/${lesson._id}`,
                                  })
                                }
                              >
                                {isCompleted ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Review Lesson
                                  </>
                                ) : (
                                  <>
                                    <PlayCircle className="w-4 h-4 mr-1" />
                                    Start Lesson
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Effect Indicator */}
                      {isHovered && !isLocked && (
                        <div className="absolute top-0 right-0 m-4">
                          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No lessons available yet. Check back soon!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Motivational Card */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Continue Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You're making excellent progress! Keep up the momentum and
              complete your learning journey.
            </p>
            <Button
              onClick={handleStartCourse}
              disabled={isStarting}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isStarting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Starting...
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Continue Learning
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
