import { Button } from "@/components/ui/button";

interface SubmitButtonsProps {
  isPending: boolean;
}

export default function SubmitButtons({ isPending }: SubmitButtonsProps) {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => window.history.back()}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[150px]"
      >
        {isPending ? "Creating..." : "Create Course"}
      </Button>
    </div>
  );
}
