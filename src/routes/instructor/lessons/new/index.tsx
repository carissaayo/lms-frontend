import {
  Film,
  FileText,
  Clock,
  BookOpen,
  Send,
  Loader2,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreateLessonForm } from "@/hooks/lessons/use-create-lesson";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/instructor/lessons/new/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const {
    formData,
    courses,
    isPending,
    handleChange,
    handleVideoChange,
    handleNoteChange,
    handleSubmit,
    videoPreview,
    setFormData,
  } = useCreateLessonForm();

  return (
    <DashboardShell>
      <Toaster />

      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            New Lesson 
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            Upload your video and supplementary materials to create a new
            lesson.
          </p>
        </header>

        <Card className="rounded-2xl shadow-2xl border-gray-100">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
              <BookOpen className="w-6 h-6" /> Lesson Details
            </CardTitle>
            <CardDescription>
              Fill out the required information to structure your lesson.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title + Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="title"
                    className="font-semibold text-gray-700"
                  >
                    Lesson Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling lesson title"
                    required
                    className="h-11 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="font-semibold text-gray-700"
                  >
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
                    placeholder="e.g. 15"
                    required
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
                  placeholder="Provide a brief overview."
                  rows={5}
                  className="rounded-lg"
                />
              </div>

              {/* Course Select */}
              <div className="space-y-2">
                <Label className="font-semibold text-gray-700">
                  <BookOpen className="w-4 h-4 inline mr-1 text-indigo-500" />{" "}
                  Associate with Course *
                </Label>

                <Select
                  value={formData.courseId}
                  onValueChange={(value) =>
                    setFormData((prev: any) => ({ ...prev, courseId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.length > 0 ? (
                      courses.map((c: any) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-courses" disabled>
                        No courses available.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Media Uploads */}
              <div className="pt-4 border-t border-gray-100 space-y-6">
                <h3 className="text-xl font-bold pt-2 text-gray-900">
                  Media Uploads
                </h3>

                {/* Video */}
                <div className="space-y-2 p-4 border border-indigo-200 rounded-xl bg-indigo-50/50">
                  <Label className="font-semibold text-gray-700 flex items-center gap-2">
                    <Film className="w-5 h-5 text-indigo-600" /> Video File{" "}
                    <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                    required
                    className="file:bg-indigo-600 file:text-white file:border-none file:hover:bg-indigo-700 file:rounded-full file:py-1 file:px-4 file:mr-4 file:cursor-pointer"
                  />

                  {videoPreview && (
                    <div className="mt-3 relative">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full rounded-xl shadow-lg border border-indigo-200 aspect-video"
                      />
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Note file */}
                <div className="space-y-2 p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <Label className="font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" /> Note File
                    (Optional)
                  </Label>

                  <Input
                    type="file"
                    name="note"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleNoteChange}
                    className="file:bg-gray-400 file:text-white file:border-none file:hover:bg-gray-500 file:rounded-full file:py-1 file:px-4 file:mr-4 file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl text-white font-bold text-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Uploading &
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Create Lesson
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </DashboardShell>
  );
}
