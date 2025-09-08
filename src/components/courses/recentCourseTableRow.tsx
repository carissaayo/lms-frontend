import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import { CourseStatus } from "@/types/course.types";

const RecentCourseTableRow = ({
  title,
  price,
  status,
}: {
  title: string;
  price: number;
  status: CourseStatus;
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

  return (
    <TableRow>
      <TableCell className="font-medium text-base">{title}</TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>
      <TableCell className={`text-right capitalize ${color}`}>
        {status}
      </TableCell>
    </TableRow>
  );
};

export default RecentCourseTableRow;
