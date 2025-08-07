"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubmissionsDrawer from "./SubmissionDrawer";

export default function AssignmentRowActions({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        View Submissions
      </Button>
      <SubmissionsDrawer
        open={open}
        onClose={() => setOpen(false)}
        assignmentId={assignmentId}
      />
    </>
  );
}
