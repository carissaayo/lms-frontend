import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
export const Route = createFileRoute("/dashboard/instructors/instructor")({
  component: RouteComponent,
});

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "draft" | "published" | "pending" | "rejected";
  studentsEnrolled: number;
  createdAt: string;
}

function RouteComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/instructor/courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        toast.error("Error", {
          description: "Failed to load your courses. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Mock data for preview
    setTimeout(() => {
      setCourses([
        {
          id: "1",
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS, and JavaScript",
          thumbnail: "/placeholder.svg?height=150&width=250&text=Web+Dev",
          status: "published",
          studentsEnrolled: 125,
          createdAt: "2023-01-15",
        },
        {
          id: "2",
          title: "Advanced React Patterns",
          description: "Master advanced React concepts and patterns",
          thumbnail: "/placeholder.svg?height=150&width=250&text=React",
          status: "draft",
          studentsEnrolled: 0,
          createdAt: "2023-03-10",
        },
        {
          id: "3",
          title: "Node.js for Beginners",
          description: "Build server-side applications with Node.js",
          thumbnail: "/placeholder.svg?height=150&width=250&text=Node.js",
          status: "pending",
          studentsEnrolled: 0,
          createdAt: "2023-04-22",
        },
      ]);
      setIsLoading(false);
    }, 1000);

    // Uncomment to use real API
    // fetchCourses()
  }, [toast]);

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Instructor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your courses, assignments, and student progress
          </p>
        </div>
        <Link
          to="/"
          //  href="/dashboard/instructor/courses/new"
        >
          <Button>Create New Course</Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded" />
                  </CardContent>
                  <CardFooter>
                    <div className="h-9 bg-muted rounded w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  href={`/dashboard/instructor/courses/${course.id}`}
                  actions={
                    <>
                      <Link
                        to="/"
                        //  href={`/dashboard/instructor/courses/${course.id}/edit`}
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          Edit
                        </Button>
                      </Link>
                      <Link
                        to="/"
                        //  href={`/dashboard/instructor/courses/${course.id}/content`}
                      >
                        <Button size="sm" className="w-full">
                          Manage Content
                        </Button>
                      </Link>
                    </>
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No courses yet"
              description="You haven't created any courses yet. Start creating your first course."
              action={
                <Link
                  to="/"
                  //  href="/dashboard/instructor/courses/new"
                >
                  <Button>Create Course</Button>
                </Link>
              }
            />
          )}
        </TabsContent>
        <TabsContent value="published" className="mt-4">
          {!isLoading &&
          courses.filter((c) => c.status === "published").length === 0 ? (
            <EmptyState
              title="No published courses"
              description="You don't have any published courses yet."
              action={
                <Link
                  //  href="/dashboard/instructor/courses/new"
                  to="/"
                >
                  <Button>Create Course</Button>
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "published")
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    href={`/dashboard/instructor/courses/${course.id}`}
                    actions={
                      <>
                        <Link
                          to="/"
                          //  href={`/dashboard/instructor/courses/${course.id}/edit`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Link
                          to="/"
                          //  href={`/dashboard/instructor/courses/${course.id}/content`}
                        >
                          <Button size="sm" className="w-full">
                            Manage Content
                          </Button>
                        </Link>
                      </>
                    }
                  />
                ))}
            </div>
          )}
        </TabsContent>
        {/* Similar TabsContent for draft and pending tabs */}
      </Tabs>

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
                  (total, course) => total + course.studentsEnrolled,
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
              {isLoading ? (
                <div className="h-9 bg-muted rounded w-24 animate-pulse" />
              ) : (
                "$1,245.00"
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
