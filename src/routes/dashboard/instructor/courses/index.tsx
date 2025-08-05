import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import CourseStatCard from "@/components/courses/courseStatsCard";
import RecentCoursesTable from "@/components/courses/recentCoursesTable";
import BestSellingCourse from "@/components/courses/BestSellingCourse";
import { columns, Payment } from "@/components/courses/Column";
import { DataTable } from "@/components/courses/CoursesTable";

export const Route = createFileRoute("/dashboard/instructor/courses/")({
  component: RouteComponent,
});

async function RouteComponent() {
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        price: 100,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728zx52f",
        price: 90,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728eas2f",
        price: 80,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728exs2f",
        price: 120,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "72dcd52f",
        price: 10,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728edwsf",
        price: 200,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ddd52f",
        price: 34,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "d28ed52f",
        price: 20,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "72ve35vf",
        price: 60,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ev52f",
        price: 34,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ed52v",
        price: 10,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ed52s",
        price: 110,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ed52a",
        price: 11,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ed52q",
        price: 23,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
      {
        id: "728ed52w",
        price: 220,
        status: "pending",
        title: "m@example.com",
        students: 30,
      },
    ];
  }

  const data = await getData();
  return (
    <DashboardShell>
      <main className="">
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
          <BestSellingCourse />
          <RecentCoursesTable />
        </div>

        <section className="">
          <h1 className="font-primary text-2xl font-semibold ">Courses</h1>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </section>
      </main>
    </DashboardShell>
  );
}
