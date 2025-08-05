import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import { CourseStatus } from "@/types/courseTypes";

const RecentCourseTableRow = ({
  title,
  price,
  status,
}: {
  title: string;
  price: number;
  status: string;
}) => {
  const color =
    status === CourseStatus.Published
      ? "text-secondary-dark"
      : status === CourseStatus.Pending
        ? "text-accent-dark"
        : status === CourseStatus.Approved
          ? "text-success"
          : status === CourseStatus.Drafted
            ? "text-primary-dark"
            : status === CourseStatus.Rejected
              ? "text-red-500"
              : "text-text";

  return (
    <TableRow>
      <TableCell className="font-medium text-base ">{title}</TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>

      <TableCell className={`text-right ${color}`}>{status}</TableCell>
    </TableRow>
  );
};

export default RecentCourseTableRow;
