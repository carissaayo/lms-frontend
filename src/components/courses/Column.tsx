import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Route } from "@/routes/instructor/courses/$id";
import { CourseStatus } from "@/types/course.types";
export type Course = {
  _id: string;
  price: number;
  status: CourseStatus;
  title: string;
  students: number;
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: () => <h1 className="text-lg">Title</h1>,
    cell: ({ row }) => {
      console.log("id", row.original._id);
      return (
        <div className="font-medium text-base">
          <Link to={`/instructor/courses/${row.original._id}`}>
            {row.getValue("title")}
          </Link>
        </div>
      );
    },
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
    cell: ({ row }) => {
      return (
        <div className="font-medium text-base">{row.getValue("status")}</div>
      );
    },
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
