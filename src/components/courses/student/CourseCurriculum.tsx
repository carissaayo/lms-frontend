import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseDetail } from "@/types/course.types";
import { Clock } from "lucide-react";
const CourseCurriculum = ({
  course,
  totalLessons,
}: {
  course: CourseDetail;
  totalLessons: number;
}) => {
  return (
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
  );
};

export default CourseCurriculum;
