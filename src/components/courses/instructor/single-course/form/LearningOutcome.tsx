import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface LearningOutcomesProps {
  learningOutcomes: string[];
  addLearningOutcome: () => void;
  removeLearningOutcome: (index: number) => void;
  updateLearningOutcome: (index: number, value: string) => void;
}

export default function LearningOutcomes({
  learningOutcomes,
  addLearningOutcome,
  removeLearningOutcome,
  updateLearningOutcome,
}: LearningOutcomesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What Students Will Learn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Add key learning outcomes that students will achieve
        </p>
        {learningOutcomes.map((outcome, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={outcome}
              onChange={(e) => updateLearningOutcome(index, e.target.value)}
              placeholder={`Learning outcome ${index + 1}`}
              className="flex-1"
            />
            {learningOutcomes.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeLearningOutcome(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addLearningOutcome}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Learning Outcome
        </Button>
      </CardContent>
    </Card>
  );
}
