import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Payment {
  id: string;
  course: string;
  amount: number;
  date: string;
  status: "successful" | "failed" | "refunded";
  method: string;
}

interface PaymentHistoryTableProps {
  payments: Payment[];
}

export default function PaymentHistoryTable({ payments = [] }: PaymentHistoryTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Payments</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-3 font-medium">Course</th>
              <th className="p-3 font-medium">Amount</th>
              <th className="p-3 font-medium">Method</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 p-6">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.course}</td>
                  <td className="p-3">₦{p.amount.toLocaleString()}</td>
                  <td className="p-3">{p.provider}</td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        p.status === "success"
                          ? "success"
                          : p.status === "refunded"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
