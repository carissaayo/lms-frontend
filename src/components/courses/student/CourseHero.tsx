import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  CheckCircle,
  Clock,
  Users,
  Star,
  PlayCircle,
  Award,
  ShoppingCart,
  Sparkles,
  Globe,
} from "lucide-react";
import { CourseDetail } from "@/types/course.types";
const CourseHero = ({
  course,
  handleEnroll,
  isPending,
  totalLessons,
}: {
  course: CourseDetail;
  handleEnroll: () => void;
  isPending: boolean;
  totalLessons:number;
}) => {
  return (
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
                {course?.instructor?.firstName?.charAt(0)}
              </div>
              <div>
                <p className="font-medium">Created by</p>
                <p className="text-white/80">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
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
                  disabled={course?.isEnrolled || isPending}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
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
  );
};

export default CourseHero;
