import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InstructorStatus } from "@/types/user.types";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Dispatch, SetStateAction } from "react";
const SingleInstructorActionDialog = ({
  actionDialogOpen,
  setActionDialogOpen,
  actionType,
  actionReason,
  setActionReason,
  setActionType,
  confirmAction,
  isPending,
}: {
  actionDialogOpen: boolean;
  setActionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: InstructorStatus|null;
  actionReason: string;
  setActionReason: (e: string) => void;
  setActionType: Dispatch<SetStateAction<InstructorStatus | null>>;
  confirmAction: () => void;
  isPending:boolean;
}) => {
  return (
    <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === InstructorStatus.SUSPENDED
              ? "Suspend Instructor"
              : "Reject Application"}
          </DialogTitle>
          <DialogDescription>
            Please provide a reason for{" "}
            {actionType === InstructorStatus.SUSPENDED
              ? "suspending"
              : "rejecting"}{" "}
            this instructor. This will be visible to them.
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
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? "Processing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SingleInstructorActionDialog;
