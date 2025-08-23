import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Assignment } from "@/types/assigmentTypes";

interface AssignmentModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  selectedAssignment: Assignment | null;
}
const AssignmentsModal = ({
  setIsModalOpen,
  isModalOpen,
  selectedAssignment,
}: AssignmentModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Submit Assignment: {selectedAssignment?.title}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <Input id="file" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Write your answer..." />
          </div>
          <Button type="submit" className="w-full">
            Submit Assignment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentsModal;
