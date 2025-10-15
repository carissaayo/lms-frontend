import { createFileRoute } from "@tanstack/react-router";
import { useStudentPayments } from "@/hooks/use-student";
import { PaymentSummary } from "@/components/payments/PaymentSummary";
import { PaymentHistoryTable } from "@/components/payments/PaymentHistoryTable";
import { BookOpen } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/student/payments/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const { data, isLoading, error } = useStudentPayments();

  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Failed to load earnings data.</p>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  const { summary, paymentHistory } = data || {};

  return (
    <DashboardShell>
      <main className="mb-20">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Payment Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage your course investments
              </p>
            </div>
          </div>
        </div>

        <PaymentSummary summary={summary} />
        <PaymentHistoryTable payments={paymentHistory} />
      </main>
    </DashboardShell>
  );
}
