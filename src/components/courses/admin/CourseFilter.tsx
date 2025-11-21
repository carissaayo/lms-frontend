import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { Course, CourseCategories, CourseStatus } from "@/types/course.types";
const CourseFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  setStatus,
  filteredCourses,
  totalCourses,
  searchQuery,
  statusFilter,
  categoryFilter,
  setCategoryFilter,
  setSearchQuery,
  setStatusFilter
}: {
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (search: string) => void;
  setStatus: (search: string) => void;
  filteredCourses: Course[];
  totalCourses: number;
  searchQuery: string;
  statusFilter: string;
  categoryFilter: string;
  setSearchQuery: (search: string) => void;
  setStatusFilter: (search: string) => void;
  setCategoryFilter: (search: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by course title or instructor..."
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
            <SelectItem value={CourseStatus.APPROVED}>Approved</SelectItem>
            <SelectItem value={CourseStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={CourseStatus.REJECTED}>Rejected</SelectItem>
            <SelectItem value={CourseStatus.SUSPENDED}>Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CourseCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredCourses.length}</span> of{" "}
          <span className="font-semibold">{totalCourses}</span> courses
        </p>
        {(searchQuery ||
          statusFilter !== "all" ||
          categoryFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseFilter;
