import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardShell } from "@/components/dashboard-shell";

import { toast } from "sonner";

import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
import OverviewCards from "@/components/home/OverviewCards";
import QuickActions from "@/components/home/QuickActions";
import UpcomingTasks from "@/components/home/UpcomingTasks";
import RecentActivity from "@/components/home/RecentActivities";
import NotificationsPanel from "@/components/home/Notifications";
export const Route = createFileRoute("/instructor/")({
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
      <main className="mb-8">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 ">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              {" "}
              👋 Welcome back, {`${user.name}!`}
            </h1>
            <p className="">
              Manage your courses, assignments, and student progress
            </p>
          </div>
        </div>

        <OverviewCards />
        <QuickActions />
        <div className="w-full flex my-8 items-center ">
          <UpcomingTasks />
        </div>

        <RecentActivity />

        <NotificationsPanel />
      </main>
    </DashboardShell>
  );
}
