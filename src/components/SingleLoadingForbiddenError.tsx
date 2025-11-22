import useAuthStore from "@/store/useAuthStore";
import { DashboardShell } from "./dashboard-shell";
import Forbidden from "./forbidden";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, BookOpen } from "lucide-react";

const SingleLoadingForbiddenError = ({
  error,
  isLoading,
  route,
  item,
  itemName,
}: {
  error: Error | null;
  isLoading: boolean;
  route: string;
  item: any;
  itemName: string;
}) => {
  const { isForbidden } = useAuthStore.getState();

  const navigate = useNavigate();
  if (error && isForbidden) {
    return (
      <DashboardShell>
        <Forbidden />
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/admin/students" })}
          className="mt-4"
        >
          Back to Students
        </Button>
      </DashboardShell>
    );
  }
  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-red-600 text-center">
            Failed to load course details.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate({ to: route })}
          >
            Back to Courses
          </Button>
        </div>
      </DashboardShell>
    );
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!item) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-64">
          <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">{`${itemName} not found`}</p>
        </div>
      </DashboardShell>
    );
  }
  return null;
};

export default SingleLoadingForbiddenError;
