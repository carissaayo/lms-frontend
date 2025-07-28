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

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-primary-light">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-gray-900">
              Total Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-gray-700">
              All the courses you have created
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-gray-900">
              12
            </div>
          </CardContent>
        </Card>

        {/* Published Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-secondary-light">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-gray-900">
              Published Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-gray-700">
              Courses approved and published by you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-gray-900">
              16
            </div>
          </CardContent>
        </Card>

        {/* Approved Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-success">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-white">
              Approved Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-white/90">
              Approved by moderators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-white">
              16
            </div>
          </CardContent>
        </Card>

        {/* Pending Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-accent-light">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-gray-900">
              Pending Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-gray-700">
              Awaiting approval by moderators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-gray-900">
              12
            </div>
          </CardContent>
        </Card>

        {/* Drafted Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-background">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-gray-900">
              Drafted Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-gray-700">
              Not yet submitted for approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-gray-900">
              12
            </div>
          </CardContent>
        </Card>

        {/* Rejected Courses */}
        <Card className="transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-none bg-error-light">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading text-gray-900">
              Rejected Courses
            </CardTitle>
            <CardDescription className="font-secondary text-lg text-gray-700">
              Rejected by moderators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-heading text-center text-gray-900">
              12
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
