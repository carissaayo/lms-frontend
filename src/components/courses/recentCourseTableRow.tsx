import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import { CourseStatus } from "@/types/course.types";
import { Link } from "@tanstack/react-router";

const RecentCourseTableRow = ({
  title,
  price,
  status,
  id,
}: {
  title: string;
  price: number;
  status: CourseStatus;
  id: string;
}) => {
  const color =
    status === CourseStatus.APPROVED
      ? "text-success"
      : status === CourseStatus.PENDING
        ? "text-accent-dark"
        : status === CourseStatus.REJECTED
          ? "text-red-500"
          : status === CourseStatus.SUSPENDED
            ? "text-gray-500"
            : "text-text";

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return (
    <TableRow>
      <TableCell className="font-medium text-base">
        <Link to="/instructor/courses/$id" params={{ id }}>
          {truncate(title, 25)}
        </Link>
      </TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>
      <TableCell className={` capitalize ${color}`}>{status}</TableCell>
    </TableRow>
  );
};

export default RecentCourseTableRow;
