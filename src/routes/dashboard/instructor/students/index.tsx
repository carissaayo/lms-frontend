import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { fetchStudents, Student } from "@/lib/mock-students";

import { Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

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

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardShell>
      <main className="">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="">
            <h1 className="text-3xl font-bold font-primary tracking-tightt">
              Manage your Students
            </h1>
            <p className="text-lg"></p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">My Students</h2>

          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-gray-500">Loading students...</div>
          ) : (
            <div className="overflow-auto border rounded-lg">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Progress</th>
                    <th className="px-4 py-3">Enrolled</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.course}</td>
                      <td className="px-4 py-2 w-48">
                        <Progress value={student.progress} />
                      </td>
                      <td className="px-4 py-2">{student.enrolledAt}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-primary hover:underline flex items-center gap-1"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {/* Student Details Modal */}
          {selectedStudent && (
            <Dialog open={true} onOpenChange={() => setSelectedStudent(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Student Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm">
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
        </div>
      </main>
    </DashboardShell>
  );
}
