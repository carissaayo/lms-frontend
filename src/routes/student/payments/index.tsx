import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";
import { useStudentPayments } from "@/hooks/use-student";
import PaymentSummary from "@/components/payments/PaymentSummary";
import PaymentHistoryTable from "@/components/payments/PaymentHistoryTable";
import { BookOpen, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/student/payments/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useStudentPayments();

  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64 text-red-600 gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load payment data.</p>
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
        <div className="w-full mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              Payment History
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            View all your course enrollment payments
          </p>
        </div>

        <PaymentSummary summary={summary} />
        <PaymentHistoryTable payments={paymentHistory} />
      </main>
    </DashboardShell>
  );
}
