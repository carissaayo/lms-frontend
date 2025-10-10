import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import { Link } from "@tanstack/react-router";

const BestCourseTableRow = ({
  title,
  price,
  students,
  id,
}: {
  title: string;
  price: number;
  students: number;
  id: string;
}) => {
  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return (
    <TableRow>
      <TableCell className="font-medium text-base ">
        <Link to="/instructor/courses/$id" params={{ id }}>
          {truncate(title, 25)}
        </Link>
      </TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>

      <TableCell className={` pl-10`}>{students}</TableCell>
    </TableRow>
  );
};

export default BestCourseTableRow;
