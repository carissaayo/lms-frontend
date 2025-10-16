/* eslint-disable react-hooks/exhaustive-deps */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import { getSingleLessonApi, updateLessonProgress } from "@/api/lessons";
import {
  ArrowLeft,
  Download,
  FileText,
  PlayCircle,
  CheckCircle,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(false);

  const lesson = data?.lesson;
  const nextLesson = data?.nextLesson;
  const previousLesson = data?.previousLesson;

  const progressPercentage =
    videoDuration > 0 ? (watchedDuration / videoDuration) * 100 : 0;
  const isCompleted = progressPercentage >= 90; // Consider completed if watched 90%+

  useEffect(() => {
    if (!videoRef.current) return;

    const handleTimeUpdate = () => {
      setWatchedDuration(videoRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(videoRef.current?.duration || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoRef.current.addEventListener("play", handlePlay);
    videoRef.current.addEventListener("pause", handlePause);

    return () => {
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      videoRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      videoRef.current?.removeEventListener("play", handlePlay);
      videoRef.current?.removeEventListener("pause", handlePause);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-blue-100 rounded-full"></div>
            <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (isError || !lesson) {
    return (
      <DashboardShell>
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <PlayCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load lesson
          </h2>
          <p className="text-gray-600 mb-6">
            Please try again or contact support if the problem persists.
          </p>
          <Button onClick={() => navigate({ to: "/student/enrollments" })}>
            Back to Enrollments
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6 pb-12">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full transition-all hover:scale-110"
            onClick={() => navigate({ to: "/student/enrollments" })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {lesson.title}
              </h1>
              {isCompleted && (
                <Badge className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-gray-600">{lesson.description}</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {formatTime(watchedDuration)} / {formatTime(videoDuration)}
                </span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="flex flex-col items-center space-y-8">
          {/* Video Section */}

          <div className="relative bg-black rounded-lg overflow-hidden w-full max-w-6xl h-[500px]">
            <video
              ref={videoRef}
              src={lesson.videoUrl}
              controls
              className="w-full h-full"
              controlsList="nodownload"
            />
            {!isPlaying && videoDuration > 0 && watchedDuration === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <PlayCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-white text-lg font-medium">
                    Click to start learning
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[80%] max-w-6xl space-y-6">
            {/* Quick Stats */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Lesson Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatTime(videoDuration)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Watched
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatTime(watchedDuration)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Progress
                    </span>
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes Section */}
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Lesson Resources
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Download the course notes and materials to enhance your
                    learning experience.
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <a href={lesson.noteUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Notes
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Navigation */}
          <Card className="w-full">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Lesson Navigation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Lesson */}
                <Button
                  onClick={() =>
                    navigate({
                      to: `/student/enrollments/lessons/${previousLesson._id}`,
                    })
                  }
                  disabled={!previousLesson}
                  variant="outline"
                  className="h-auto py-4 px-4 flex flex-col items-start gap-2 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <ChevronLeft className="w-4 h-4" />
                    PREVIOUS LESSON
                  </div>
                  <span className="text-left text-sm font-semibold text-gray-900 line-clamp-2">
                    {previousLesson?.title || "No Previous Lesson"}
                  </span>
                </Button>

                {/* Next Lesson */}
                <Button
                  onClick={() =>
                    navigate({
                      to: `/student/enrollments/lessons/${nextLesson._id}`,
                    })
                  }
                  disabled={!nextLesson}
                  className="h-auto py-4 px-4 flex flex-col items-end gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                    NEXT LESSON
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <span className="text-right text-sm font-semibold text-white line-clamp-2">
                    {nextLesson?.title || "Course Complete!"}
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
