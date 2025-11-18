import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export function AdminFilters({
  search,
  status,
  setSearch,
  setStatus,
  setPage,
}: {
  search: string;
  status: string;
  setSearch: (v: string) => void;
  setStatus: (v: string) => void;
  setPage: (v: number) => void;
}) {
  function clearFilters() {
    setSearch("");
    setStatus("all");
    setPage(1);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <Input
        placeholder="Search admin..."
        className="w-full md:w-72"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="flex items-center gap-3">
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
