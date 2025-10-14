import { Card, CardContent } from "@/components/ui/card";

interface PaymentSummaryProps {
  summary: {
    totalSpent: number;
    totalCourses: number;
  };
}

export default function PaymentSummary({ summary }: PaymentSummaryProps) {
  if (!summary) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <Card className="border-indigo-100 shadow-sm">
        <CardContent className="p-4">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h3 className="text-2xl font-semibold text-indigo-600">
            ₦{summary.totalSpent?.toLocaleString()}
          </h3>
        </CardContent>
      </Card>
      <Card className="border-green-100 shadow-sm">
        <CardContent className="p-4">
          <p className="text-gray-500 text-sm">Courses Purchased</p>
          <h3 className="text-2xl font-semibold text-green-600">
            {summary.totalCourses}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}
