import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-lg font-semibold mb-2">No assignments found</p>
      <p className="text-muted-foreground mb-4">
        Start by creating your first assignment.
      </p>
      <Button>Create Assignment</Button>
    </div>
  );
}
