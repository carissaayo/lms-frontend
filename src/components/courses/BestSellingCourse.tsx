import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import BestCourseTableRow from "./BestSellingCoursesRow";
interface BestSellingCourseProps {
  courses?: Array<{
    title: string;
    price: number;
    enrollments: number; // optional if not present yet
  }>;
}

const BestSellingCourse = ({ courses = [] }: BestSellingCourseProps) => {
  const topCourses = [...courses]
    .sort((a, b) => (b.enrollments ?? 0) - (a.enrollments ?? 0))
    .slice(0, 5);

  return (
    <section className="w-1/2">
      <h1 className="font-primary text-2xl font-semibold pb-6">
        Best Selling Courses
      </h1>
      <Table className="border border-muted">
        <TableCaption>Your 5 best selling courses.</TableCaption>
        <TableHeader>
          <TableRow className="font-secondary text-lg">
            <TableHead className="w-[250px] font-secondary">Title</TableHead>
            <TableHead>Price (₦)</TableHead>
            <TableHead className="text-right">Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          {topCourses.length > 0 ? (
            topCourses.map((course, index) => (
              <BestCourseTableRow
                key={index}
                title={course.title}
                price={course.price ?? 0}
                students={course.enrollments ?? 0}
                id={course._id}
              />
            ))
          ) : (
            <TableRow>
              <TableHead
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No courses available
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};
export default BestSellingCourse;
