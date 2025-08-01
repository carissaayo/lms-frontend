import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    header: () => <h1 className="text-lg">title</h1>,
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
    accessorKey: "students",
    header: ({ column }) => {
      return (
        <h1
          className="cursor-pointer flex text-lg items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Students
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      const students = parseFloat(row.getValue("students"));

      return <div className="font-medium pl-6">{students}</div>;
    },
  },
];
