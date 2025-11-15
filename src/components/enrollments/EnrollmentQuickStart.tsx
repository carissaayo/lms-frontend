import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle, Zap } from "lucide-react";

export function EnrollmentQuickStats({ lessons, completedLessons }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
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
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
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
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
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
  );
}
