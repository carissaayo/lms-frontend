import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@/types/lesson.types";

export function ProgressOverview({
  progressPercentage,
  lessons,
  completedLessons,
}: {
  progressPercentage:number;
  lessons:Lesson[];
  completedLessons:number;
}) {
  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900">Your Progress</h3>
              <p className="text-sm text-gray-600">
                {completedLessons} of {lessons.length} lessons completed
              </p>
            </div>
          </div>

          <span className="text-3xl font-bold text-blue-600">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>

        <Progress value={progressPercentage} className="h-3" />

        {progressPercentage === 100 && (
          <div className="flex justify-end mt-4">
            <Badge className="bg-yellow-500 text-white">
              <Award className="w-4 h-4 mr-1" /> Completed
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
