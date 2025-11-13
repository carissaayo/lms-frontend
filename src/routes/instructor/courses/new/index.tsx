
import {  Toaster } from "sonner";
import { createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { CourseCategory } from "@/types/course.types";
import { useCreateCourseForm } from "@/hooks/course/instructor/use-create-course-form";

export const Route = createFileRoute("/instructor/courses/new/")({
  component: RouteComponent,
});

function RouteComponent() {

  const {
    formData,
    previewUrl,
    isPending,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateCourseForm();
  return (
    <DashboardShell>
      <Toaster />
      <main className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            required
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select Category</option>
            {Object.values(CourseCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Duration */}
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration in minutes"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="₦ Price"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
          />

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Course Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40"
            />
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Cover Preview"
                  className="rounded-lg border border-gray-200 w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg text-white font-medium py-3"
          >
            {isPending ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </main>
    </DashboardShell>
  );
}
