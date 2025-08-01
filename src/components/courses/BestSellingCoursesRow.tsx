import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";

const BestCourseTableRow = ({
  title,
  price,
  students,
}: {
  title: string;
  price: number;
  students: number;
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium text-base ">{title}</TableCell>
      <TableCell className="font-medium">{formattedPrice(price)}</TableCell>

      <TableCell className={`text-right pr-8`}>{students}</TableCell>
    </TableRow>
  );
};

export default BestCourseTableRow;
