import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import GradingProgressChart from "../charts/GradingProgressChart";
import AssignmentRowActions from "./AssingmentRowAction";
import EmptyState from "./EmptyState";

const mockAssignments = [
  {
    id: "1",
    title: "React Final Project",
    course: "React 101",
    dueDate: "2025-08-20",
    submissions: 25,
    graded: 20,
    status: "Open",
  },
  {
    id: "2",
    title: "JS Mini App",
    course: "JS Basics",
    dueDate: "2025-08-10",
    submissions: 15,
    graded: 15,
    status: "Closed",
  },
];

export default function AssignmentTable() {
  const [search, setSearch] = useState("");

  const filtered = mockAssignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search assignments"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Button>Create Assignment</Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Grading Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>{assignment.submissions}</TableCell>
                  <TableCell>
                    <GradingProgressChart
                      graded={assignment.graded}
                      total={assignment.submissions}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded bg-muted">
                      {assignment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AssignmentRowActions assignmentId={assignment.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
