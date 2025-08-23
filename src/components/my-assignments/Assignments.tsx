import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Assignment } from "@/types/assigmentTypes";

interface AssignmentProps {
  assignments: Assignment[];
  handleOpenSubmitModal: (assignment: Assignment) => void;
}
const Assignments = ({
  assignments,
  handleOpenSubmitModal,
}: AssignmentProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader>
            <CardTitle>{assignment.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
            <p className="text-sm">
              Status: <strong>{assignment.status}</strong>
            </p>
            <Button
              onClick={() => handleOpenSubmitModal(assignment)}
              disabled={assignment.status !== "pending"}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Assignments;
