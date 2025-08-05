import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import BestCourseTableRow from "./BestSellingCoursesRow";

const BestSellingCourse = () => {
  return (
    <section className="w-1/2">
      <h1 className="font-primary text-2xl font-semibold pb-6">
        Best Selling Courses
      </h1>
      <Table className="border-1 border-text-muted  ">
        <TableCaption>Your 5 best selling courses.</TableCaption>
        <TableHeader>
          <TableRow className="font-secondary text-lg">
            <TableHead className="w-[250px] font-secondary">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          <BestCourseTableRow
            title=" Intro to JavaScript"
            price={49.99}
            students={40}
          />

          <BestCourseTableRow
            title="Advanced React"
            price={89.0}
            students={40}
          />

          <BestCourseTableRow title="UI/UX Basics" price={20.0} students={40} />
        </TableBody>
      </Table>
    </section>
  );
};

export default BestSellingCourse;
