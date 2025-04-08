import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/axios";

export const Route = createFileRoute("/dashboard/students/student")({
  component: RouteComponent,
});
interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  image: {
    caption: string;
    imageName: string;
    url: string;
  };
  instructor: string;
  isApproved: boolean;
  isPublished: boolean;
  lectures: string[];
  price: string;
  quizz: string;
  studentsEnrolled: string[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  __v: number;
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: number;
  file: string;
  instructor: string;
  interestedStudents: Array<{ studentId: string; status: string }>;
  lecture: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  __v: number;
}

function RouteComponent() {
  const { user, token } = useAuthStore((state) => state);
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialPath = useRef(router.state.location.pathname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Replace with your actual API endpoints
        const response = await api.get(`/users/user-details/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response?.data?.student;
        console.log(data.assignments);

        setCourses(data.enrolledCourses);
        setAssignments(data.assignments);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error", {
          description: "Failed to load your data. Please try again.",
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    if (!user) {
      const lastPath = initialPath.current;
      localStorage.setItem("lastRoute", lastPath);
      router.navigate({ to: "/auth/login" });
    }
  }, [user]);

  return (
    <DashboardShell>
      <main className="h-full ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress, manage assignments, and continue learning
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
              {courses.map((course) => (
                <Card
                  key={course._id}
                  className="overflow-hidden cursor-pointer border-gray-500 min-h-[450px] w-[90%] sm:w-[70%] md:w-full mx-auto md:mx-auto mb-4 md:mb-0"
                >
                  <img
                    src={course.image.url || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      Instructor: {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      {/* <span>{course.progress}%</span> */}
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        // style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      // href={`/dashboard/student/courses/${course.id}`}

                      to="/"
                      className="w-full"
                    >
                      <Button className="w-full bg-black text-white cursor-pointer hover:scale-105 h-12 text-base">
                        Continue Learning
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No enrolled courses"
              description="You haven't enrolled in any courses yet. Browse our catalog to find courses."
              action={
                <Link
                  //   href="/courses"
                  to="/"
                >
                  <Button>Browse Courses</Button>
                </Link>
              }
            />
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Assignments</h2>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="graded">Graded</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                      </CardHeader>
                      <CardFooter>
                        <div className="h-9 bg-muted rounded w-32" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : assignments.length > 0 ? (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment._id}>
                      <CardHeader>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription>
                          Course: {assignment.title} | Due: {assignment.dueDate}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Link
                          to="/"

                          //   href={`/dashboard/student/assignments/${assignment.id}`}
                        >
                          <Button>Submit Assignment</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No pending assignments"
                  description="You don't have any pending assignments at the moment."
                />
              )}
            </TabsContent>
            {/* <TabsContent value="submitted" className="mt-4">
              {!isLoading &&
              assignments.filter((a) => a.status === "submitted").length ===
                0 ? (
                <EmptyState
                  title="No submitted assignments"
                  description="You haven't submitted any assignments yet."
                />
              ) : (
                <div className="space-y-4">
                  {assignments
                    .filter((assignment) => assignment.status === "submitted")
                    .map((assignment) => (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            Course: {assignment.courseTitle} | Submitted
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link
                            to="/"

                            //   href={`/dashboard/student/assignments/${assignment.id}`}
                          >
                            <Button variant="outline">View Submission</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="graded" className="mt-4">
              {!isLoading &&
              assignments.filter((a) => a.status === "graded").length === 0 ? (
                <EmptyState
                  title="No graded assignments"
                  description="You don't have any graded assignments yet."
                />
              ) : (
                <div className="space-y-4">
                  {assignments
                    .filter((assignment) => assignment.status === "graded")
                    .map((assignment) => (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            Course: {assignment.courseTitle} | Grade:{" "}
                            {assignment.grade}/100
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link
                            to="/"

                            //   href={`/dashboard/student/assignments/${assignment.id}`}
                          >
                            <Button variant="outline">View Feedback</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent> */}
          </Tabs>
        </div>
      </main>
    </DashboardShell>
  );
}
