import { DashboardShell } from "@/components/dashboard-shell";
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

import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";
import { CourseCard } from "@/components/course-card";
import CourseStatCard from "@/components/courses/courseStatsCard";
import RecentCoursesTable from "@/components/courses/recentCoursesTable";
export const Route = createFileRoute("/dashboard/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardShell>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <div className="">
          <h1 className="text-3xl font-bold font-primary tracking-tightt">
            Manage your Courses
          </h1>
          <p className="text-lg">Create, update and delete courses</p>
        </div>
        <Link
          to="/"
          //  href="/dashboard/instructor/courses/new"
        >
          <Button className="border-white   text-white rounded-lg cursor-pointer font-secondary text-base">
            Create New Course
          </Button>
        </Link>
      </div>

      {/* Courses Stats */}
      <div className="my-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Courses */}
        <CourseStatCard
          title="Total Courses"
          description=" All the courses you have created"
          count={12}
          bgColor="bg-primary-light"
        />

        {/* Published Courses */}
        <CourseStatCard
          title="Published Courses"
          description="Courses approved and published by you"
          count={16}
          bgColor="bg-secondary-light"
        />

        {/* Approved Courses */}
        <CourseStatCard
          title="Approved Courses"
          description="Courses approved by moderators"
          count={26}
          bgColor="bg-success"
          textColor="text-white"
          descriptionTextColor="text-white/90"
        />

        {/* Pending Courses */}
        <CourseStatCard
          title="Pending Courses"
          description="Courses awaiting approval by moderators"
          count={9}
          bgColor="bg-accent-light"
        />

        {/* Drafted Courses */}
        <CourseStatCard
          title="Drafted Courses"
          description="Courses not yet submitted for approval"
          count={9}
          bgColor="bg-background"
        />

        {/* Rejected Courses */}
        <CourseStatCard
          title="Rejected Courses"
          description="Courses rejected by moderators"
          count={9}
          bgColor="bg-error-light"
        />
      </div>

      <div className="w-full flex items-center justify-between my-10 gap-24">
        <RecentCoursesTable />
        <RecentCoursesTable />
      </div>
    </DashboardShell>
  );
}
