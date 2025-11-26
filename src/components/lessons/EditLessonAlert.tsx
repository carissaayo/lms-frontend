import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";


interface DangerZoneProps {
  isDeleting: boolean;
  handleDelete: () => void;
  handleCancelDelete: () => void;
  deleteLessonMutation: {
    isPending: boolean;
  };
}
const EditLessonDangerZone = ({
  isDeleting,
  handleDelete,
  handleCancelDelete,
  deleteLessonMutation,
}: DangerZoneProps) => {
  return (
    <Card className="mt-12 rounded-2xl border-red-200 bg-red-50 shadow-md">
      <CardHeader className="p-6 border-b border-red-200">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-red-700">
          <Trash2 className="w-6 h-6" /> Danger Zone
        </CardTitle>
        <CardDescription className="text-red-500">
          Irreversible actions related to this lesson.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {!isDeleting ? (
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 py-3 px-6"
          >
            Delete Lesson
          </Button>
        ) : (
          <div className="space-y-4 p-2">
            <p className="font-semibold text-red-700">
              Are you absolutely sure you want to delete this lesson? This
              action cannot be undone.
            </p>

            <div className="flex gap-4">
              <Button
                onClick={handleDelete}
                disabled={deleteLessonMutation.isPending}
                variant="destructive"
                className="bg-red-700 hover:bg-red-800 py-3 px-6"
              >
                {deleteLessonMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  "Yes, Delete Lesson Permanently"
                )}
              </Button>

              <Button
                onClick={handleCancelDelete}
                variant="outline"
                className="bg-white hover:bg-red-100 text-gray-700 border-red-300 py-3 px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditLessonDangerZone;
