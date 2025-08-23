import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { Assignment } from "@/types/assigmentTypes";
import Assignments from "@/components/my-assignments/Assignments";
import AssignmentsModal from "@/components/my-assignments/AssignmentsModal";

export const Route = createFileRoute("/student/assigments/")({
  component: RouteComponent,
});

const assignmentsData: Assignment[] = [
  {
    id: "1",
    title: "React Basics",
    course: "Frontend Dev 101",
    dueDate: "2025-08-15",
    status: "pending",
  },
  {
    id: "2",
    title: "Database Design",
    course: "Backend Dev 201",
    dueDate: "2025-08-10",
    status: "submitted",
  },
  {
    id: "3",
    title: "UX Case Study",
    course: "UI/UX Design",
    dueDate: "2025-08-05",
    status: "graded",
    grade: 92,
  },
];

const progressData = [
  {
    name: "Pending",
    value: assignmentsData.filter((a) => a.status === "pending").length,
  },
  {
    name: "Submitted",
    value: assignmentsData.filter((a) => a.status === "submitted").length,
  },
  {
    name: "Graded",
    value: assignmentsData.filter((a) => a.status === "graded").length,
  },
];
function RouteComponent() {
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsData);
  const submissionRate = (
    (assignments.filter((a) => a.status !== "pending").length /
      assignments.length) *
    100
  ).toFixed(2);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const handleOpenSubmitModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };
  const COLORS = ["#4CAF50", "#E0E0E0"];
  return (
    <DashboardShell>
      <main className="pb-12">
        <div className=" mb-4">
          <h1 className="text-3xl font-bold font-primary tracking-normal pb-4 flex-1">
            Assignment
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={progressData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Submission Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <PieChart width={120} height={120}>
                <Pie
                  data={[
                    { name: "Submitted", value: submissionRate },
                    { name: "Remaining", value: 100 - submissionRate },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell key="submitted" fill={COLORS[0]} />
                  <Cell key="remaining" fill={COLORS[1]} />
                </Pie>
              </PieChart>
              <span className="relative right-24 text-lg font-semibold">
                {submissionRate}%
              </span>
            </CardContent>
          </Card>
        </div>

        <Assignments
          assignments={assignments}
          handleOpenSubmitModal={handleOpenSubmitModal}
        />
        <AssignmentsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedAssignment={selectedAssignment}
        />
      </main>
    </DashboardShell>
  );
}
