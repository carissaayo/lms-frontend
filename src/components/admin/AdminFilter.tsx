import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search,  } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AdminStatus } from "@/types/user.types";

export function AdminFilters({
  search,
  status,
  setSearch,
  setStatus,
  setPage,
  pages,
  page
}: {
  search: string;
  status: string;
  setSearch: (v: string) => void;
  setStatus: (v: string) => void;
  setPage: (v: number) => void;
  pages:number,
  page:number
}) {
  function clearFilters() {
    setSearch("");
    setStatus("all");
    setPage(1);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={AdminStatus.APPROVED}>Active</SelectItem>
              <SelectItem value={AdminStatus.PENDING}>Inactive</SelectItem>
              <SelectItem value={AdminStatus.SUSPENDED}>Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{pages || 1}</span>
          </p>
          {(search || status !== "all") && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
