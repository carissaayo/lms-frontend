import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseDetail } from "@/types/course.types";
import { BarChart, BookOpen, CheckCircle } from "lucide-react";
const CourseDescription = ({course}:{course:CourseDetail}) => {
  return (
    <>
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
    </>
  );
};

export default CourseDescription;
