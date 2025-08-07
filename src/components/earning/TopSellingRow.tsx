import { formattedPrice } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";

const TopSellingRow = ({
  title,
  enrolled,
  earnings,
}: {
  title: string;
  earnings: number;
  enrolled: number;
}) => {
  return (
    <TableRow className="font-medium">
      <TableCell className=" ">{title}</TableCell>

      <TableCell className={`pl-4`}>{enrolled}</TableCell>
      <TableCell>{formattedPrice(earnings)}</TableCell>
    </TableRow>
  );
};

export default TopSellingRow;
