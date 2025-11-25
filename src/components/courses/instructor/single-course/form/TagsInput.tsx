import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  addTag: () => void;
  removeTag: (index: number) => void;
  updateTag: (index: number, value: string) => void;
}

export default function TagsInput({
  tags,
  addTag,
  removeTag,
  updateTag,
}: TagsInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add tags for the course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Add relevant tags for the course
        </p>
        {tags.map((tag, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={tag}
              onChange={(e) => updateTag(index, e.target.value)}
              placeholder={`Tag ${index + 1}`}
              className="flex-1"
            />
            {tags.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeTag(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addTag}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Tags
        </Button>
      </CardContent>
    </Card>
  );
}
