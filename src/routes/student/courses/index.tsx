import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DashboardShell } from "@/components/dashboard-shell";
import { FiltersBar } from "@/components/course-catalog/FiltersBar";
import { CourseCard } from "@/components/course-catalog/CourseCard";
import { useStudentsCourses } from "@/hooks/use-course";
import { Course, CourseCategories } from "@/types/course.types";
import { useDebounce } from "@/hooks/use-debounce";
export const Route = createFileRoute("/student/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filters = useMemo(
    () => ({
      category,
      search: debouncedSearch,
      sort,
      minPrice,
      maxPrice,
      page: 1,
      limit: 9,
    }),
    [category, debouncedSearch, sort, minPrice, maxPrice]
  );

  const { data, isLoading, error } = useStudentsCourses(filters);

  const courses: Course[] = data?.courses ?? [];

  function handleResetFilters() {
    setSearch("");
    setCategory("all");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
  }
  return (
    <DashboardShell>
      <div className="pb-12">
        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold font-primary tracking-normal pb-4 flex-1">
              Course Catalog
            </h1>

            {/* 🔍 Search + View Mode + Category Filter */}
            <div className="w-full flex justify-end gap-8 mb-4 flex-1">
              <Input
                placeholder="Search courses..."
                className="w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* View Mode Switch */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(val) => val && setViewMode(val)}
              >
                <ToggleGroupItem
                  value="grid"
                  aria-label="Grid View"
                  className={`${viewMode === "grid" && "bg-primary-dark"}`}
                >
                  Grid
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="list"
                  aria-label="List View"
                  className={`${viewMode === "list" && "bg-primary-dark"}`}
                >
                  List
                </ToggleGroupItem>
              </ToggleGroup>

              {/* Dynamic Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {CourseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <FiltersBar
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSortChange={setSort}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={handleResetFilters}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-red-600">
              Failed to load courses
            </h2>
            <p className="text-muted-foreground mt-2">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Course List */}
        {!isLoading && !error && (
          <>
            {courses.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold">No courses found</h2>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* Pagination / Load More (future-ready) */}
            {courses.length > 0 && (
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="hover:bg-primary-dark">
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}
