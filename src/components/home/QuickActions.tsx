import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="flex flex-wrap gap-6">
        <Button className="cursor-pointer bg-white hover:bg-primary-light border-primary-dark border-1">
          Create New Course
        </Button>
        <Button className="cursor-pointer bg-white hover:bg-primary-light border-primary-dark border-1">
          Grade Assignments
        </Button>
        <Button className="cursor-pointer bg-white hover:bg-primary-light border-primary-dark border-1">
          Update Profile
        </Button>
        <Button className="cursor-pointer bg-white hover:bg-primary-light border-primary-dark border-1">
          View Feedback
        </Button>
      </div>
    </div>
  );
}
