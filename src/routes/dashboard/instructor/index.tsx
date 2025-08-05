import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";

import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";
import { CourseCard } from "@/components/course-card";
import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
export const Route = createFileRoute("/dashboard/instructor/")({
  component: RouteComponent,
});

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  price: string;
  instructor: string; // user ID
  isApproved: boolean;
  isPublished: boolean;
  deleted: boolean;
  image: {
    url: string;
    imageName: string;
    caption: string;
  };
  lectures: string[];
  quizz: string;
  studentsEnrolled: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function RouteComponent() {
  const { user, token } = useAuthStore((state) => state);
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialPath = useRef(router.state.location.pathname);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace with your actual API endpoints
        const response = await api.get(`/courses/instructor/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response?.data;
        setCourses(data.courses);
        console.log(courses);
      } catch (error) {
        toast.error("Error", {
          description: "Failed to load your courses. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  useEffect(() => {
    if (!user) {
      const lastPath = initialPath.current;
      localStorage.setItem("lastRoute", lastPath);
      router.navigate({ to: "/auth/login" });
    }
  }, [user, router]);
  return (
    <DashboardShell>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="]">
            Manage your courses, assignments, and student progress
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>Students enrolled in your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? (
                <div className="h-9 bg-muted rounded w-16 animate-pulse" />
              ) : (
                courses.reduce(
                  (total, course) => total + course.studentsEnrolled.length,
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Completion</CardTitle>
            <CardDescription>Average completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? (
                <div className="h-9 bg-muted rounded w-16 animate-pulse" />
              ) : (
                "78%"
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total earnings this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              #
              {isLoading ? (
                <div className="h-9 bg-muted rounded w-24 animate-pulse" />
              ) : (
                courses.reduce((total, course) => {
                  const price = Number(course.price); // convert price from string to number
                  const studentCount = course.studentsEnrolled.length;
                  return total + price * studentCount;
                }, 0)
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
