"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function GradeStudentModal({
  student,
  onClose,
}: {
  student: string;
  onClose: () => void;
}) {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Save grade/feedback here
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grade {student}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter grade (e.g. 85)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <Textarea
            placeholder="Enter feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
