import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CourseStatus } from "@/types/course.types";

const ActionDialogCon = ({
  actionDialogOpen,
  setActionDialogOpen,
  actionType,
  actionReason,
  setActionReason,
  setActionType,
  confirmAction,
  isPending,
}: {
  actionDialogOpen: boolean | undefined;
  setActionDialogOpen: (a: boolean | undefined) => void;
  actionType: CourseStatus;
  actionReason: string;
  setActionReason: (e: string) => void;
  setActionType: (e: CourseStatus | null) => void;
  confirmAction: () => void;
  isPending: boolean;
}) => {
  return (
    <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === CourseStatus.REJECTED
              ? "Reject Course"
              : "Suspend Course"}
          </DialogTitle>
          <DialogDescription>
            Please provide a reason for{" "}
            {actionType === CourseStatus.REJECTED ? "rejecting" : "suspending"}{" "}
            this course. This will be visible to the instructor.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter reason..."
          value={actionReason}
          onChange={(e) => setActionReason(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setActionDialogOpen(false);
              setActionReason("");
              setActionType(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            disabled={!actionReason.trim() || isPending}
            className={
              actionType === CourseStatus.REJECTED
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }
          >
            {isPending ? "Processing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialogCon;
