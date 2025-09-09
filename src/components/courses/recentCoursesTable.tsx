import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import RecentCourseTableRow from "./recentCourseTableRow";
import { CourseStatus } from "@/types/course.types";

interface RecentCoursesTableProps {
  courses?: Array<{
    title: string;
    price?: number;
    status: CourseStatus;
    updatedAt?: string | Date;
  }>;
}

const RecentCoursesTable = ({ courses = [] }: RecentCoursesTableProps) => {
  const recentCourses = [...courses]
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    )
    .slice(0, 5);

  return (
    <section className="w-1/2">
      <h1 className="font-primary text-2xl font-semibold pb-6">
        Recent Courses
      </h1>
      <Table className="border border-muted">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow className="font-secondary text-lg">
            <TableHead className="w-[250px] font-secondary">Title</TableHead>
            <TableHead>Price (₦)</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          {recentCourses.length > 0 ? (
            recentCourses.map((course, index) => (
              <RecentCourseTableRow
                key={index}
                title={course.title}
                price={course.price ?? 0}
                status={course.status}
                id={course._id}
              />
            ))
          ) : (
            <TableRow>
              <TableHead
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No recent courses
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default RecentCoursesTable;
