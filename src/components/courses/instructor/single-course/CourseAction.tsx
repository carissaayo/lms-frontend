import { Button } from "@/components/ui/button";
import { Course, CourseStatus } from "@/types/course.types";
import {  Trash2, Upload, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const CourseAction = ({
  course,
  isPendingSubmit,
  isPendingPublish,
  isPendingDelete,
  handleSubmitCourse,
  handlePublishCourse,
  handleDeleteCourse,
}: {
  course: Course;
  isPendingSubmit: boolean;
  isPendingPublish: boolean;
  isPendingDelete: boolean;
  handleSubmitCourse: () => void;
  handlePublishCourse: () => void;
  handleDeleteCourse: (c:string) => void;
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button>Edit Course</Button>

      <Button
        variant="outline"
        disabled={isPendingSubmit || course.isSubmitted}
        onClick={handleSubmitCourse}
      >
        <Upload className="w-4 h-4 mr-1" />
        Submit Course
      </Button>

      <Button
        variant="outline"
        disabled={
          isPendingPublish ||
          course.status !== CourseStatus.APPROVED ||
          course.isApproved === false ||
          course.isPublished === true
        }
        onClick={handlePublishCourse}
      >
        <CheckCircle className="w-4 h-4 mr-1" />
        Publish
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={isPendingDelete}
            className="bg-error"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="w-full text-center text-lg">
              Delete Course
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{course.title}</span>? This action
              cannot be undone and all related lessons will also be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className=" w-full flex flex-row items-center justify-center gap-10">
            <AlertDialogCancel className="flex-1 text-base">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteCourse(course._id)}
              className="bg-error hover:bg-error/90 flex-1 text-base"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseAction