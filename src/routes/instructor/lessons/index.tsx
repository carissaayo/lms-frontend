import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Calendar, PlusCircle } from "lucide-react"; // Added icons for design

import { DashboardShell } from "@/components/dashboard-shell";
import { Route as NewLessonRoute } from "./new";
import { Route as LessonRoute } from "./$id";

import { Button } from "@/components/ui/button";
import { useLessons } from "@/hooks/use-lesson";
import { Lesson } from "@/types/lesson.types";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import useAuthStore from "@/store/useAuthStore";
import NoLesson from "@/components/lessons/NoLesson";

export const Route = createFileRoute("/instructor/lessons/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isForbidden } = useAuthStore.getState();

  const { data, isLoading, error } = useLessons();

  const lessons: Lesson[] = data?.lessons ?? [];

  return (
    <DashboardShell>
      <main className="space-y-10 mb-10">
        {/* Header - Cleaner layout with prominent button */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Manage Your Lessons
            </h1>
            <p className="text-base text-gray-500 mt-1">
              Create and organize dynamic lessons across your courses
            </p>
          </div>
          <Link to={NewLessonRoute.to}>
            {/* Styled Button: Primary color, strong shadow, and clear icon */}
            <Button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create New Lesson
            </Button>
          </Link>
        </div>
        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="Lessons"
        />

        {!isLoading && !isForbidden && !error && (
          <>
            {lessons.length === 0 && <NoLesson />}

            {lessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} // Changed x to y for a smoother entrance
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }} // Changed once to true for better performance
              >
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                  {" "}
                  {/* Increased grid columns for desktop */}
                  {lessons.map((lesson) => (
                    <Link
                      to={LessonRoute.to}
                      params={{ id: lesson._id }}
                      search={{ lesson: lesson }}
                      key={lesson._id}
                      // New Card Style: Clean white background, prominent shadow, better hover effect
                      className="bg-white rounded-xl shadow-xl p-5 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 group border border-gray-100"
                    >
                      {/* Video/Thumbnail Wrapper */}
                      <div className="relative overflow-hidden rounded-lg">
                        <video
                          src={lesson.videoUrl}
                          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]" // Subtle zoom on hover
                          muted
                          loop
                          playsInline
                          controls={false}
                          style={{ pointerEvents: "none" }} // disables click/interaction
                        />
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {lesson.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
                        {lesson.description ||
                          "No description provided for this lesson."}
                      </p>

                      {/* Metadata with Icons */}
                      <div className="mt-auto pt-2 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                        {lesson.course && (
                          <p className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
                            <span className="font-medium text-gray-700">
                              Course:
                            </span>{" "}
                            <span className="truncate">
                              {" "}
                              {/* Added truncate class here */}
                              {typeof lesson.course === "object"
                                ? (lesson.course as any).title
                                : "Linked to a course"}
                            </span>
                          </p>
                        )}
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                          <span className="font-medium text-gray-700">
                            Updated:
                          </span>{" "}
                          {new Date(lesson.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>
    </DashboardShell>
  );
}
