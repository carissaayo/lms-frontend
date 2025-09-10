import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as NewLessonRoute } from "./new";
import { Route as LessonRoute } from "./$id";

import { Button } from "@/components/ui/button";
import { useLessons } from "@/hooks/use-lesson";
import { Lesson } from "@/types/lesson.types";

export const Route = createFileRoute("/instructor/lessons/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useLessons();
  const lessons: Lesson[] = data?.lessons ?? [];

  return (
    <DashboardShell>
      <main className="space-y-10">
        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              Manage Your Lessons
            </h1>
            <p className="text-lg text-muted-foreground">
              Create and organize lessons across your courses
            </p>
          </div>
          <Link to={NewLessonRoute.to}>
            <Button className="border-white text-white rounded-lg cursor-pointer font-secondary text-base">
              Create New Lesson
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="w-full flex justify-center items-center my-6 h-full">
            <div className="h-8 w-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && lessons.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">You have no lessons yet</h2>
            <p className="text-muted-foreground mt-2">
              Start by creating your first lesson to see it listed here.
            </p>
          </div>
        )}

        {!isLoading && lessons.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 ">
            {lessons.map((lesson) => (
              <Link
                to={LessonRoute.to}
                params={{ id: lesson._id }}
                search={{ lesson: lesson }}
                key={lesson._id}
                className="bg-background-light rounded-2xl shadow p-6 flex flex-col gap-3 hover:shadow-lg transition  cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{lesson.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {lesson.description || "No description provided."}
                </p>

                <div className="mt-auto text-sm text-gray-500 space-y-1">
                  {lesson.course && (
                    <p>
                      <span className="font-medium text-text">Course:</span>{" "}
                      {typeof lesson.course === "object"
                        ? (lesson.course as any).title
                        : "Linked to a course"}
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-text">Updated:</span>{" "}
                    {new Date(lesson.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </DashboardShell>
  );
}
