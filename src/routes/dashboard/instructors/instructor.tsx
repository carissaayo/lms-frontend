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
export const Route = createFileRoute("/dashboard/instructors/instructor")({
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
        console.log(response);

        const data = response?.data;
        setCourses(data.courses);
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
          <Button className="border-white bg-black text-white rounded-lg">
            Create New Course
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="mt-6 ">
        <TabsList className="flex flex-wrap justify-start mb-6">
          <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
          <TabsTrigger value="published">
            Published(
            {courses.filter((course) => course.isPublished).length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Drafts(
            {courses.filter((course) => !course.isPublished).length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({courses.filter((course) => course.isApproved).length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approval (
            {courses.filter((course) => !course.isApproved).length})
          </TabsTrigger>
        </TabsList>
        {/* All */}
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
                  key={course._id}
                  course={course}
                  href={`/dashboard/instructor/courses/${course._id}`}
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
        {/* Is Published */}
        <TabsContent value="published" className="mt-4">
          {!isLoading && courses.length === 0 ? (
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
                .filter((course) => course.isPublished)
                .map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    href={`/dashboard/instructor/courses/${course._id}`}
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
        {/* Is Draft */}
        <TabsContent value="draft" className="mt-4">
          {!isLoading && courses.length === 0 ? (
            <EmptyState
              title="No drafted courses"
              description="You don't have courses drafted."
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
                .filter((course) => !course.isPublished)
                .map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    href={`/dashboard/instructor/courses/${course._id}`}
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

        {/* Is Approved*/}
        <TabsContent value="approved" className="mt-4">
          {!isLoading && courses.length === 0 ? (
            <EmptyState
              title="No approved courses"
              description="You don't have approved courses yet."
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
                .filter((course) => course.isApproved)
                .map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    href={`/dashboard/instructor/courses/${course._id}`}
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

        {/* Is Pending*/}
        <TabsContent value="pending" className="mt-4">
          {!isLoading && courses.length === 0 ? (
            <EmptyState
              title="No pending courses"
              description="You don't have courses awaiting aprroval."
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
                .filter((course) => !course.isApproved)
                .map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    href={`/dashboard/instructor/courses/${course._id}`}
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
