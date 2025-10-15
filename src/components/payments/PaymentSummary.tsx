import { BookOpen, CreditCard, DollarSign } from "lucide-react";

export interface PaymentSummaryData {
  totalSpent: number;
  totalCourses: number;
}

interface PaymentSummaryProps {
  summary: PaymentSummaryData;
}

export function PaymentSummary({ summary }: PaymentSummaryProps) {
  if (!summary) return null;

  const avgPerCourse = summary.totalCourses
    ? Math.round(summary.totalSpent / summary.totalCourses)
    : 0;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Total Investment */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all hover:scale-[1.02]">
        <div className="relative h-full rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-2">Total Investment</p>
              <h3 className="text-3xl font-bold text-indigo-600">
                ₦{summary.totalSpent.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-indigo-600 rounded-xl text-white">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Enrolled */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[2px]">
        <div className="relative h-full rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-2">Courses Enrolled</p>
              <h3 className="text-3xl font-bold text-emerald-600">
                {summary.totalCourses}
              </h3>
            </div>
            <div className="p-3 bg-emerald-500 rounded-xl text-white">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Average per Course */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-[2px]">
        <div className="relative h-full rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-2">Avg. per Course</p>
              <h3 className="text-3xl font-bold text-amber-600">
                ₦{avgPerCourse.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-amber-500 rounded-xl text-white">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
