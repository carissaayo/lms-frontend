import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DashboardShell } from "@/components/dashboard-shell";
import { FiltersBar } from "@/components/course-catalog/FiltersBar";
import { CourseCard } from "@/components/course-catalog/CourseCard";
export const Route = createFileRoute("/student/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  // Dummy data for now
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      category: "frontend",
      price: "Free",
      description: "Learn the basics of React.",
      image: "https://source.unsplash.com/400x250/?react,code",
      tags: ["React", "JavaScript", "Frontend"],
    },
    {
      id: 2,
      title: "Advanced CSS",
      category: "frontend",
      price: "$15",
      description: "Master modern CSS techniques.",
      image: "https://source.unsplash.com/400x250/?css,web",
      tags: ["CSS", "Styling", "Responsive"],
    },
    {
      id: 3,
      title: "NestJS API Development",
      category: "backend",
      price: "$20",
      description: "Build powerful APIs.",
      image: "https://source.unsplash.com/400x250/?api,backend",
      tags: ["NestJS", "API", "Backend"],
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (category === "all" || course.category === category) &&
      course.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardShell>
      <div className="pb-12">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold font-primary tracking-normal pb-4 flex-1">
              Course Catalog
            </h1>
            <div className="w-full flex  justify-end gap-8 mb-4 flex-1">
              <Input
                placeholder="Search courses..."
                className="w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* View Mode Switch */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(val) => val && setViewMode(val)}
              >
                <ToggleGroupItem
                  value="grid"
                  aria-label="Grid View"
                  className={`${viewMode === "grid" && "bg-primary-dark"}`}
                >
                  Grid
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="list"
                  aria-label="List View"
                  className={`${viewMode === "list" && "bg-primary-dark"}`}
                >
                  List
                </ToggleGroupItem>
              </ToggleGroup>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <FiltersBar />

        {/* Courses Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-6"
          }
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="hover:bg-primary-dark">
            Load More
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
