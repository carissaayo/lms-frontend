import { TableCell, TableRow } from "../ui/table";

export enum CourseStatus {
  Drafted = "drafted",
  Pending = "Pending",
  Approved = "Approved",
  Published = "Published",
  Rejected = "Rejected",
}

const RecentCourseTableRow = ({
  title,
  price,
  status,
}: {
  title: string;
  price: string;
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
      <TableCell className="font-medium">{price}</TableCell>

      <TableCell className={`text-right ${color}`}>{status}</TableCell>
    </TableRow>
  );
};

export default RecentCourseTableRow;
