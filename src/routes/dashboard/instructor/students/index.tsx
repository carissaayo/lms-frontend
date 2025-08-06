import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";
import { fetchStudents, Student } from "@/lib/mock-students";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { StudentsTable } from "@/components/students/StudentsTable";
import { studentsColumns } from "@/components/students/Column";

export const Route = createFileRoute("/dashboard/instructor/students/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data);
      setLoading(false);
    });
  }, []);
  const columns = studentsColumns({ setSelectedStudent });
  return (
    <DashboardShell>
      <main className="pb-12">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="w-full">
            <h1 className="text-3xl font-bold font-primary tracking-tight pb-4">
              Your Students
            </h1>
            <div className="flex justify-end items-center mb-4 w-full">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-lg">Loading students...</div>
        ) : (
          <StudentsTable columns={columns} data={students} />
        )}

        {selectedStudent && (
          <Dialog open={true} onOpenChange={() => setSelectedStudent(null)}>
            <DialogContent className="max-w-[90vw] md:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg">Student Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 ">
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <p>
                  <strong>Course:</strong> {selectedStudent.course}
                </p>
                <p>
                  <strong>Progress:</strong> {selectedStudent.progress}%
                </p>
                <p>
                  <strong>Enrolled At:</strong> {selectedStudent.enrolledAt}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </DashboardShell>
  );
}
