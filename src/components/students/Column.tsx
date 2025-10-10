import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Student } from "@/routes/instructor/students";

export const studentsColumns = (): ColumnDef<Student>[] => [
  {
    accessorKey: "name",
    header: () => <h1 className="text-lg">Name</h1>,
  },
  {
    accessorKey: "email",
    header: () => <h1 className="text-lg">Email</h1>,
  },
  {
    accessorKey: "totalCourses",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 text-lg"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Courses
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "progress",
    header: () => <h2>Progress</h2>,
    cell: ({ row }) => {
      const progress = parseFloat(row.getValue("progress"));
      return <Progress value={progress} className="w-32" />;
    },
  },

  {
    id: "actions",
    header: () => <span className="text-lg">Actions</span>,
    cell: () => (
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-primary-light cursor-pointer"
      >
        View
      </Button>
    ),
  },
];
