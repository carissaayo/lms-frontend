import { CheckCircle, PauseCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { InstructorDetail } from "@/types/instructor.types";
import { InstructorStatus } from "@/types/user.types";

const SingleInstructorStatus = ({
  instructor,
  handleAction,
  isPending,
}: {
  instructor: InstructorDetail;
  handleAction: (e: InstructorStatus) => void;
  isPending:boolean;
}) => {
  return (
    <div className="flex items-center gap-3">
      {instructor.status === InstructorStatus.PENDING && (
        <>
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => handleAction(InstructorStatus.SUSPENDED)}
            disabled={isPending}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleAction(InstructorStatus.APPROVED)}
            disabled={isPending}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </>
      )}
      {instructor.status === InstructorStatus.APPROVED && (
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={() => handleAction(InstructorStatus.SUSPENDED)}
          disabled={isPending}
        >
          <PauseCircle className="h-4 w-4 mr-2" />
          Suspend Account
        </Button>
      )}
      {instructor.status === InstructorStatus.SUSPENDED && (
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => handleAction(InstructorStatus.APPROVED)}
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Reactivate Account
        </Button>
      )}
    </div>
  );
};

export default SingleInstructorStatus;
