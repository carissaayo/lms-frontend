import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseDetail } from "@/types/course.types";
import { MessageSquare, Star } from "lucide-react";

const CourseReview = ({course}:{course:CourseDetail}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Student Reviews
        </CardTitle>
        <CardDescription>
          {course.totalReviews} reviews • Average rating: {course.rating}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {course.reviews && course.reviews.length > 0 ? (
          <div className="space-y-6">
            {course.reviews.map((review) => (
              <div
                key={review?._id}
                className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {review?.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {review.user.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
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
  );
};

export default CourseReview;
