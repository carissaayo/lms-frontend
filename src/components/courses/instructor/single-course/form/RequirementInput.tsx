import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface RequirementsProps {
  requirements: string[];
  addRequirement: () => void;
  removeRequirement: (index: number) => void;
  updateRequirement: (index: number, value: string) => void;
}

export default function Requirements({
  requirements,
  addRequirement,
  removeRequirement,
  updateRequirement,
}: RequirementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          List any prerequisites or requirements for taking this course
        </p>
        {requirements.map((requirement, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={requirement}
              onChange={(e) => updateRequirement(index, e.target.value)}
              placeholder={`Requirement ${index + 1}`}
              className="flex-1"
            />
            {requirements.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeRequirement(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addRequirement}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Requirement
        </Button>
      </CardContent>
    </Card>
  );
}
