import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button"; // Assuming this handles primary styling
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    // Updated container: more padding, soft border top
    <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200 bg-white rounded-b-xl shadow-inner">
      {/* Students per page selector (left side) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-600 hidden sm:block">
            Items per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            {/* Trigger styling update: rounded, clean border */}
            <SelectTrigger className="h-9 w-[70px] rounded-lg border-gray-300 focus:ring-primary focus:border-primary">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="rounded-lg shadow-xl">
              {[5, 10, 15, 20].map((pageSize) => (
                <SelectItem
                  // Using a clean hover effect
                  className="cursor-pointer hover:bg-gray-100 text-gray-700 focus:bg-gray-100"
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Page count (center) */}
      <div className="flex w-auto items-center justify-center text-sm font-semibold text-gray-700">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        <span className="font-bold ml-1 text-primary-600">
          {table.getPageCount()}
        </span>
      </div>

      {/* Navigation buttons (right side) */}
      <div className="flex items-center space-x-1.5">
        {/* First Page Button */}
        <Button
          variant="outline"
          size="icon"
          // Modern button size and shape
          className="size-8 rounded-lg text-gray-600 hover:bg-gray-100 border-gray-300"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        {/* Previous Page Button */}
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg text-gray-600 hover:bg-gray-100 border-gray-300"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {/* Next Page Button */}
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg text-gray-600 hover:bg-gray-100 border-gray-300"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        {/* Last Page Button */}
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg text-gray-600 hover:bg-gray-100 border-gray-300"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
