import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  PlayCircle,
  CheckCircle,
  TrendingUp,
  Target,
  Sparkles,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { useSingleCourse } from "@/hooks/use-course";
import { Lesson } from "@/types/lesson.types";
import { useLessonsStudentApi } from "@/hooks/use-lesson";
import CourseModals from "@/components/modals/CourseModals";
import { useUserEnrollments } from "@/hooks/use-enrollment";
import { Course } from "@/types/course.types";

export const Route = createFileRoute("/student/courses/$id")({
  component: StudentCourseDetailPage,
});

function StudentCourseDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, error } = useSingleCourse(id);
  const course = data?.course;

  const { data: lessonsData } = useLessonsStudentApi(course?._id);
  const lessons: Lesson[] = lessonsData?.lessons ?? [];

  const { data: coursesData } = useUserEnrollments();
  const courses: Course[] = coursesData?.courses ?? [];

  const isEnrolled = courses.some((e) => e._id === course?._id);

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
            Course not found
          </h2>
          <p className="text-gray-600 mb-6">
            Please check if the course ID is correct.
          </p>
          <Button onClick={() => navigate({ to: "/student/courses" })}>
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const completionRate = isEnrolled ? Math.floor(Math.random() * 100) : 0;

  return (
    <DashboardShell>
      <Toaster />
      <main className="space-y-6 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full transition-all hover:scale-110"
          onClick={() => navigate({ to: "/student/courses" })}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Render Modal */}
        {showModal && (
          <CourseModals course={course} onClose={() => setShowModal(false)} />
        )}

        {/* Hero Section with Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {course.coverImage && (
            <>
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
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-500/90 hover:bg-blue-600 text-white backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
                      {course.category}
                    </Badge>
                    {isEnrolled && (
                      <Badge className="bg-green-500/90 hover:bg-green-600 text-white backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Enrolled
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {course.title}
                  </h1>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <p className="text-lg text-gray-200">
                      by{" "}
                      <span className="font-semibold text-white">
                        {course.instructorName}
                      </span>
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-white">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {course.enrollments ?? 0} students
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">
                        {lessons.length} lessons
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">4.8 Rating</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {!isEnrolled && (
                    <Button
                      size="lg"
                      onClick={() => setShowModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Enroll Now - ₦
                      {course.price.toLocaleString?.() ?? course.price}
                    </Button>
                  )}

                  {isEnrolled && (
                    <Button
                      size="lg"
                      onClick={() =>
                        navigate({ to: `/student/courses/${id}/learn` })
                      }
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Progress Card (for enrolled students) */}
        {isEnrolled && (
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Your Progress</h3>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {completionRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Keep going! You're doing great 🎉
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium cursor-pointer"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium cursor-pointer"
            >
              <Target className="w-4 h-4 mr-2" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium cursor-pointer"
            >
              <Award className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                      About This Course
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {course.description}
                    </p>
                  </CardContent>
                </Card>

                {/* What You'll Learn */}
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                      What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Master the fundamentals and advanced concepts",
                        "Build real-world projects from scratch",
                        "Learn industry best practices",
                        "Get hands-on practical experience",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <Card className="border-2 border-gray-200 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Course Info
                    </h2>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Price
                        </span>
                        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₦{course.price.toLocaleString?.() ?? course.price}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Students
                        </span>
                        <span className="font-semibold text-gray-900">
                          {course.enrollments ?? 0}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Lessons
                        </span>
                        <span className="font-semibold text-gray-900">
                          {lessons.length}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration
                        </span>
                        <span className="font-semibold text-gray-900">
                          {course.duration}+ mins
                        </span>
                      </div>
                    </div>

                    {!isEnrolled && (
                      <>
                        <Separator />
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl"
                          onClick={() => setShowModal(true)}
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Enroll Now
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">
                      Course Highlights
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <span>Expert instruction</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                  Course Curriculum
                </h2>
                {lessons?.length > 0 ? (
                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.position}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                          {lesson.position}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h3>
                        </div>
                        {isEnrolled && (
                          <PlayCircle className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    ))}
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
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Category
                    </h2>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-base">
                      {course.category}
                    </Badge>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      Instructor
                    </h2>
                    <p className="text-gray-700 text-lg">
                      {course.instructorName}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      What You'll Get
                    </h2>
                    <ul className="space-y-2">
                      {[
                        "Lifetime access to course materials",
                        "Certificate of completion",
                        "Direct instructor support",
                        "Access to community forum",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardShell>
  );
}
