import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import RecentCourseTableRow from "./recentCourseTableRow";

const RecentCoursesTable = () => {
  return (
    <section className="w-1/2">
      <h1 className="font-primary text-2xl font-semibold pb-6">
        Recent Courses
      </h1>
      <Table className="border-1 border-text-muted  ">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow className="font-secondary text-lg">
            <TableHead className="w-[250px] font-secondary">Title</TableHead>
            <TableHead>Price(#)</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          <RecentCourseTableRow
            title=" Intro to JavaScript"
            price="49.99"
            status="Published"
          />

          <RecentCourseTableRow
            title="Advanced React"
            price="89.00"
            status="Pending"
          />

          <RecentCourseTableRow
            title="UI/UX Basics"
            price="0.00"
            status="Rejected"
          />
        </TableBody>
      </Table>
    </section>
  );
};

export default RecentCoursesTable;
