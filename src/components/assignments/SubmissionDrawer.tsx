"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import GradeStudentModal from "./GradeStudentModal";

const submissions = [
  { student: "John Doe", submittedAt: "Aug 6", grade: 85 },
  { student: "Jane Smith", submittedAt: "Aug 5", grade: null },
];

export default function SubmissionsDrawer({
  open,
  onClose,
  assignmentId,
}: {
  open: boolean;
  onClose: () => void;
  assignmentId: string;
}) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  return (
    <>
      <Drawer open={open} onClose={onClose}>
        <DrawerContent className="p-4 space-y-4">
          <DrawerHeader>
            <DrawerTitle>
              Submissions for Assignment #{assignmentId}
            </DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2">
            {submissions.map((s, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <div className="font-medium">{s.student}</div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: {s.submittedAt}
                  </div>
                  <div className="text-sm">
                    Grade:{" "}
                    {s.grade !== null ? (
                      <span className="font-semibold">{s.grade}</span>
                    ) : (
                      <span className="italic text-muted-foreground">
                        Not graded
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedStudent(s.student)}
                >
                  {s.grade !== null ? "Edit Grade" : "Grade Now"}
                </Button>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      {selectedStudent && (
        <GradeStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
