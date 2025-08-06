import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  enrolledAt: string;
};

export const studentsColumns = ({
  setSelectedStudent,
}: {
  setSelectedStudent: (student: Student) => void;
}): ColumnDef<Student>[] => [
  {
    accessorKey: "name",
    header: () => <h1 className="text-lg">Name</h1>,
  },
  {
    accessorKey: "email",
    header: () => <h1 className="text-lg">Email</h1>,
  },
  {
    accessorKey: "course",
    header: () => <h1 className="text-lg">Course</h1>,
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 text-lg"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Progress
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const progress = parseFloat(row.getValue("progress"));
      return <Progress value={progress} className="w-32" />;
    },
  },
  {
    accessorKey: "enrolledAt",
    header: () => <span className="text-lg">Enrolled</span>,
  },
  {
    id: "actions",
    header: () => <span className="text-lg">Actions</span>,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary-light cursor-pointer"
          onClick={() => setSelectedStudent(student)}
        >
          View
        </Button>
      );
    },
  },
];
