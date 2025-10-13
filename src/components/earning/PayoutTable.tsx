import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payout {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "Completed" | "Pending";
}

const PayoutTable = ({ payouts = [] }: { payouts: Payout[] }) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredPayouts = payouts.filter((p) =>
    filter === "all" ? true : p.status.toLowerCase() === filter
  );

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm mb-8">
      {/* Header */}
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Payout History
        </CardTitle>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["all", "completed", "pending"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              className={`capitalize rounded-lg ${
                filter === status
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "text-gray-700 border-gray-300"
              }`}
              onClick={() => setFilter(status as any)}
            >
              {status}
            </Button>
          ))}
        </div>
      </CardHeader>

      {/* Table */}
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPayouts.map((payout) => (
              <TableRow
                key={payout.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>{payout.date}</TableCell>
                <TableCell className="font-semibold text-gray-900">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(payout.amount)}
                </TableCell>
                <TableCell>{payout.method}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      payout.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {payout.status === "Completed" && (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    {payout.status === "Pending" && (
                      <Clock className="w-4 h-4 mr-1" />
                    )}
                    {payout.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {filteredPayouts.length === 0 && (
          <TableCaption className="py-6 text-gray-500">
            No payouts found for this filter.
          </TableCaption>
        )}
      </CardContent>
    </Card>
  );
};

export default PayoutTable;
