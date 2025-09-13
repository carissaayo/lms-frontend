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
  return (
    <TableRow>
      <TableCell className="font-medium text-base ">
        <Link to="/instructor/courses/$id" params={{ id }}>
          {title}
        </Link>
      </TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>

      <TableCell className={`text-right pr-8`}>{students}</TableCell>
    </TableRow>
  );
};

export default BestCourseTableRow;
