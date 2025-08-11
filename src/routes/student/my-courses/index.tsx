import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { CoursesChart } from "@/components/charts/Course-Chart";
import { CourseCard } from "@/components/my-courses/CourseCard";
import StatsCard from "@/components/my-courses/StatsCard";
export const Route = createFileRoute("/student/my-courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("active");

  // Dummy data
  const courses = [
    { id: 1, title: "React Fundamentals", progress: 70, status: "active" },
    { id: 2, title: "Advanced CSS", progress: 100, status: "completed" },
    { id: 3, title: "NestJS API Development", progress: 40, status: "active" },
  ];

  const filteredCourses = courses.filter((c) => c.status === activeTab);

  return (
    <DashboardShell>
      <main className="pb-12">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 mb-12">
          <h1 className="text-3xl font-bold font-primary tracking-tightt">
            Manage your Courses
          </h1>
          <div className="flex gap-3">
            <Input
              placeholder="Search courses..."
              className="w-64   focus-visible:border-primary-dark "
            />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="active" className="cursor-pointer">
                  Active
                </TabsTrigger>
                <TabsTrigger value="completed" className="cursor-pointer">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="all" className="cursor-pointer">
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Stats + Chart */}
        <div className="my-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard title="Active Courses" count={3} />
          <StatsCard title="Completed" count={5} />
          <StatsCard title="Certificates" count={2} />
        </div>
        <CoursesChart />

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More</Button>
        </div>
      </main>
    </DashboardShell>
  );
}
