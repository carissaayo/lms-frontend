import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { DashboardShell } from "@/components/dashboard-shell";
import { Toaster } from "@/components/ui/sonner";

import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  CheckCircle,
  Award,
  Zap,
} from "lucide-react";

import { useEnrollmentPage } from "@/hooks/enrollments/use-enrollment-page";
import { EnrollmentHero } from "@/components/enrollments/EnrollmentHero";
import { ProgressOverview } from "@/components/enrollments/EnrollmentProgressOverview";
import { CurriculumList } from "@/components/enrollments/CurriculumList";

export const Route = createFileRoute("/student/enrollments/$id")({
  component: RouteComponent,
});

function RouteComponent() {
 const { id } = Route.useParams();
 const {
   navigate,
   course,
   lessons,
   isLoading,
   error,
   progressPercentage,
   isStarting,
   handleStartCourse,
   completedLessons,
   hoveredLesson,
   setHoveredLesson,
 } = useEnrollmentPage(id);


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

  if (error || !course) {
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
        <EnrollmentHero
          course={course}
          lessons={lessons}
          progressPercentage={progressPercentage}
          isStarting={isStarting}
          handleStartCourse={handleStartCourse}
        />
        {/* Progress Overview Card */}

        <ProgressOverview
          progressPercentage={progressPercentage}
          lessons={lessons}
          completedLessons={completedLessons}
        />

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
        <CurriculumList
          lessons={lessons}
          navigate={navigate}
          hoveredLesson={hoveredLesson}
          setHoveredLesson={setHoveredLesson}
          completedLessons={completedLessons}
        />

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
