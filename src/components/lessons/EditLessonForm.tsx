import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Clock,
  Film,
  FileText,
  Loader2,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type EditLessonFormProps = {
  formData: {
    title: string;
    description: string;
    courseId: string;
    duration: string | number;
  };
  courses: Array<{ _id: string; title: string }>;
  initialLesson: any;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNoteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateLessonMutation: any;
};

const EditLessonForm = ({
  formData,
  handleSubmit,
  handleChange,
  handleVideoChange,
  handleNoteChange,
  courses,
  initialLesson,
  updateLessonMutation,
}: EditLessonFormProps) => {
  return (
    <Card className="rounded-2xl shadow-2xl border-gray-100">
      <CardHeader className="p-6 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
          <BookOpen className="w-6 h-6" /> Lesson Details
        </CardTitle>
        <CardDescription>
          Modify the lesson's core information below.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="title" className="font-semibold text-gray-700">
                Lesson Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter lesson title"
                className="h-11 rounded-lg"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="font-semibold text-gray-700">
                <Clock className="w-4 h-4 inline mr-1 text-indigo-500" />{" "}
                Duration (min)
              </Label>
              <Input
                id="duration"
                type="number"
                name="duration"
                min={1}
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 30"
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-semibold text-gray-700"
            >
              Lesson Description
            </Label>

            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Provide a detailed overview of the lesson content."
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">
              <BookOpen className="w-4 h-4 inline mr-1 text-indigo-500" />{" "}
              Associate with Course *
            </Label>
            <Select
              value={formData.courseId}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "courseId", value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" disabled>
                  Select Course
                </SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Media Upload Section */}
          <div className="pt-4 border-t border-gray-100 space-y-6">
            <h3 className="text-xl font-bold pt-2 text-gray-900">
              Media Overrides
            </h3>

            {/* Video File - Current Preview */}
            <div className="space-y-4 p-4 border border-indigo-200 rounded-xl bg-indigo-50/50">
              <Label className="font-semibold text-gray-700 flex items-center gap-2">
                <Film className="w-5 h-5 text-indigo-600" /> Current Video
                Content
              </Label>
              {initialLesson.videoUrl && (
                <video
                  src={initialLesson.videoUrl}
                  className="w-full rounded-xl shadow-lg border border-indigo-300 aspect-video"
                  muted
                  controls
                  loop
                />
              )}
              <p className="text-sm text-gray-500">
                Choose a new file to replace the existing video.
              </p>
              <Input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleVideoChange}
                className="file:bg-indigo-600 file:text-white file:border-none file:hover:bg-indigo-700 file:transition file:rounded-full file:py-1 file:px-4 file:mr-4 file:cursor-pointer"
              />
            </div>

            {/* Note File */}
            <div className="space-y-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
              <Label className="font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" /> Document/Note
                File
              </Label>
              <p className="text-sm text-gray-500">
                {initialLesson.documentUrl
                  ? `Current file available (${initialLesson.documentUrl}). Choose new file to replace it.`
                  : `No document currently associated. Upload one now.`}
              </p>
              <Input
                type="file"
                name="note"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleNoteChange}
                className="file:bg-gray-400 file:text-white file:border-none file:hover:bg-gray-500 file:transition file:rounded-full file:py-1 file:px-4 file:mr-4 file:cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={updateLessonMutation.isPending}
            className="w-full h-12 rounded-xl text-white font-bold text-lgtransition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8 py-3 px-6"
          >
            {updateLessonMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Update Lesson
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditLessonForm;
