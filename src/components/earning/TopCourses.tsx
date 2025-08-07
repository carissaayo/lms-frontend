import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import TopSellingRow from "./TopSellingRow";

const courses = [
  { title: "React for Beginners", enrolled: 120, earnings: 360000 },
  { title: "Advanced Node.js", enrolled: 80, earnings: 240000 },
  { title: "TypeScript Bootcamp", enrolled: 60, earnings: 180000 },
  { title: "React for Beginners", enrolled: 120, earnings: 360000 },
  { title: "Advanced Node.js", enrolled: 80, earnings: 240000 },
];

export function TopCourses() {
  return (
    <div className="bg-white p-4 rounded-xl border mb-12">
      <h1 className="font-primary text-2xl font-semibold pb-6">
        Top Selling Courses
      </h1>
      <div className="overflow-x-auto">
        <Table className="border-1 border-text-muted  ">
          <TableCaption>Your 5 top selling courses.</TableCaption>
          <TableHeader>
            <TableRow className="font-secondary text-lg">
              <TableHead className="font-secondary">Course</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead className="">Students</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-base">
            {courses.map(({ title, earnings, enrolled }) => (
              <TopSellingRow
                title={title}
                earnings={earnings}
                enrolled={enrolled}
                key={enrolled}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
