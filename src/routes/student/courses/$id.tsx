import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  PlayCircle,
  Award,
  AlertCircle,
  ShoppingCart,
  Sparkles,
  MessageSquare,
  Globe,
  BarChart,
} from "lucide-react";

import { toast } from "sonner";
import { useSingleCourse } from "@/hooks/use-course";
import { useEnrollCourse } from "@/hooks/use-enrollment";

import { PaymentDialog } from "@/components/enrollments/PaymentDialog";
import { CourseDetail } from "@/types/course.types";



export const Route = createFileRoute("/student/courses/$id")({
  component: StudentCourseDetailPage,
});

function StudentCourseDetailPage() {
  const navigate = useNavigate();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  const { id } = useParams({ from: "/student/courses/$id" });

  const { data, isLoading, error } = useSingleCourse(id);
  console.log(data,"data");
  
  const course: CourseDetail | undefined = data?.course;

const enrollMutation = useEnrollCourse();

const handleEnroll = () => {
  enrollMutation.mutate(id, {
    onSuccess: (res: any) => {
      if (res?.message === "Payment required" && res?.paymentLink) {
        setPaymentLink(res.paymentLink);
        setPaymentDialogOpen(true);
        return;
      }

      toast.success("Successfully enrolled in course!");
    },

    onError: (err) => {
      toast.error(err.message || "Failed to enroll in course");
    },
  });
};

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600 text-center mb-2">
            Failed to load course details.
          </p>
          <p className="text-gray-600 text-sm mb-4">Please try again later.</p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/student/courses" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!course) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-4">Course not found</p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/student/courses" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const totalLessons = course.lessons?.length

  return (
    <DashboardShell>
      {/* <Toaster/> */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentLink={paymentLink}
      />
      <main className="space-y-6 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/student/courses" })}
            className="gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </div>

        {/* Course Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div className="text-white space-y-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {course?.category}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {course?.level}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {course?.language}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {course?.title}
              </h1>

              <p className="text-lg text-white/90">
                {course?.description.substring(0, 150)}...
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                    {course?.instructor?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">Created by</p>
                    <p className="text-white/80">{course?.instructor?.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-semibold">{course?.rating}</span>
                  <span className="text-white/80">
                    ({course?.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course?.enrollments?.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course?.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md bg-white shadow-2xl">
                <CardContent className="p-8">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                    <img
                      src={course?.coverImage}
                      alt={course?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₦{course?.price?.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      onClick={handleEnroll}
                      disabled={course?.isEnrolled || enrollMutation.isPending}
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enrollMutation.isPending ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Enrolling...
                        </>
                      ) : course.isEnrolled ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Already Enrolled
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </Button>

                    <div className="pt-4 border-t space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4 text-primary" />
                        <span>{totalLessons} video lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  About This Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {course?.description}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course?.learningOutcomes?.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-blue-600" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course?.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>{totalLessons} lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course?.lessons &&
                    course?.lessons?.map((lesson, index) => (
                      <div
                        key={lesson?._id}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-white text-lg">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                                {lesson?.title}
                              </h3>
                              {lesson?.description && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {lesson?.description}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {lesson?.duration && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {lesson.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {course?.instructor?.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {course.instructor.name}
                      </h3>
                      <p className="text-gray-600">{course.instructor.email}</p>
                    </div>
                    {course.instructor.bio && (
                      <p className="text-gray-700 leading-relaxed">
                        {course.instructor.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-6 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Students Taught
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {course.enrollments.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Course Rating
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-2xl font-bold text-gray-900">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Student Reviews
                </CardTitle>
                <CardDescription>
                  {course.totalReviews} reviews • Average rating:{" "}
                  {course.rating}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {course.reviews && course.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {course.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {review.user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {review.user.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No reviews yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Be the first to review this course!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardShell>
  );
}
