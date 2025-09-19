/* eslint-disable react-hooks/exhaustive-deps */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { getSingleLessonApi, updateLessonProgress } from "@/api/lessons";

export const Route = createFileRoute("/student/enrollments/lessons/$id")({
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const lessonId: string = id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getSingleLessonApi(lessonId),
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (payload: any) => updateLessonProgress(lessonId, payload),
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [watchedDuration, setWatchedDuration] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const lesson = data?.lesson;
  const nextLesson = data?.nextLesson;
  const previousLesson = data?.previousLesson;

  useEffect(() => {
    if (!videoRef.current) return;

    const handleTimeUpdate = () => {
      setWatchedDuration(videoRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(videoRef.current?.duration || 0);
    };

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      videoRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, [lessonId]);

  // Throttle lesson progress update to every 3 seconds
  useEffect(() => {
    if (!videoDuration || watchedDuration <= 0) return;

    const timeout = setTimeout(() => {
      mutation.mutate({
        videoDuration,
        watchedDuration,
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [watchedDuration, videoDuration]);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-96">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (isError || !lesson) {
    return (
      <DashboardShell>
        <div className="max-w-4xl mx-auto py-10 text-center text-red-500">
          Failed to load lesson. Please try again.
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>

        {/* Video Player */}
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          controls
          className="w-full rounded-xl shadow-md mb-6 max-h-140"
        />

        {/* Notes Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <p className="text-gray-700 mb-2">
            Here is the note which you can download:
          </p>
          <Button asChild variant="outline">
            <a href={lesson.noteUrl} download>
              Download Note
            </a>
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {/* Previous Lesson Button */}
          <Button
            onClick={() =>
              navigate({
                to: `/student/enrollments/lessons/${previousLesson._id}`,
              })
            }
            disabled={!previousLesson}
            variant="outline"
          >
            {previousLesson
              ? `Previous: ${previousLesson.title}`
              : "No Previous Lesson"}
          </Button>

          {/* Next Lesson Button */}
          <Button
            onClick={() =>
              navigate({ to: `/student/enrollments/lessons/${nextLesson._id}` })
            }
            disabled={!nextLesson}
            className="px-6 py-3 text-lg"
          >
            {nextLesson ? `Next: ${nextLesson.title}` : "No More Lessons"}
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
