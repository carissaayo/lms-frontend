import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../courses/CoursesTable";

type Payout = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "Pending" | "Completed";
};

const data: Payout[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i + 1}`,
  date: `2025-07-${10 - i}`,
  amount: 100000 + i * 5000,
  method: i % 2 === 0 ? "Bank Transfer" : "Flutterwave",
  status: i % 3 === 0 ? "Pending" : "Completed",
}));

const columns: ColumnDef<Payout>[] = [
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(row.getValue("amount")),
  },
  { accessorKey: "method", header: "Method" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.getValue("status") === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
];

export function PayoutTable() {
  return (
    <div className="bg-white p-4 rounded-xl border mb-6">
      <h2 className="text-lg font-semibold mb-4">Payout History</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
