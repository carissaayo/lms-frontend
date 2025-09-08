import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Payment = {
  id: string;
  price: number;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
  students: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: () => <h1 className="text-lg">Title</h1>,
  },
  {
    accessorKey: "price",

    header: ({ column }) => {
      return (
        <h1
          className="cursor-pointer flex text-lg  items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price);
      return <div className=" font-medium text-lg">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-lg">Status</div>,
  },
  {
    accessorKey: "enrollments",
    header: ({ column }) => {
      return (
        <h1
          className="cursor-pointer flex text-lg items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrollment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      const enrollment = parseInt(row.getValue("enrollments"));

      return <div className="font-medium pl-6">{enrollment}</div>;
    },
  },
];
