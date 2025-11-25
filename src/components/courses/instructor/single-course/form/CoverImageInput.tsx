import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface CoverImageProps {
  previewUrl: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CoverImage({
  previewUrl,
  handleFileChange,
}: CoverImageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Cover Image *</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Cover Preview"
                className="mx-auto rounded-lg max-h-64 object-cover"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cover-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a course cover image
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("cover-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Recommended: 1280x720px, JPG or PNG
              </p>
            </div>
          )}
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required={!previewUrl}
          />
        </div>
      </CardContent>
    </Card>
  );
}
