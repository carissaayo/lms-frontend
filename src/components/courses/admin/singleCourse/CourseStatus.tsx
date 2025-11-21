import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  PauseCircle,
} from "lucide-react";
import {  CourseDetail, CourseStatus } from "@/types/course.types";

const CourseStatusCon = ({course,isPending,handleAction}: {
  course: CourseDetail;
  handleAction: (type: CourseStatus) => void;
  isPending:boolean;
}) => {
  return (
    <div className="flex items-center gap-3">
      {course.status === CourseStatus.PENDING && (
        <>
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => handleAction(CourseStatus.REJECTED)}
            disabled={isPending}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject Course
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleAction(CourseStatus.APPROVED)}
            disabled={isPending}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Course
          </Button>
        </>
      )}
      {course.status === CourseStatus.APPROVED && (
        <Button
          variant="outline"
          onClick={() => handleAction(CourseStatus.SUSPENDED)}
          disabled={isPending}
        >
          <PauseCircle className="h-4 w-4 mr-2" />
          Suspend Course
        </Button>
      )}
      {course.status === CourseStatus.SUSPENDED && (
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => handleAction(CourseStatus.APPROVED)}
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Reactivate Course
        </Button>
      )}
      {course.status === CourseStatus.REJECTED && (
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => handleAction(CourseStatus.APPROVED)}
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve Course
        </Button>
      )}
    </div>
  );
};

export default CourseStatusCon;
