import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiltersBar } from "@/components/course-catalog/FiltersBar";
import { CourseCard } from "@/components/course-catalog/CourseCard";
import { useStudentsCourses } from "@/hooks/use-course";
import { Course, CourseCategories } from "@/types/course.types";
import { useDebounce } from "@/hooks/use-debounce";
import { Grid, List, Filter, TrendingUp } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);

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
      <div className="mb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Course Catalog
            </h1>
            <p className="text-gray-600">
              Discover your next learning adventure
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Filter className="w-5 h-5" />
            </span>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-6 py-3.5 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setCategory("all")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
              category === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All
          </button>
          {CourseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                category === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Bar  */}
        <div className={` ${showFilters ? "block" : "hidden md:block mb-8"}`}>
          <FiltersBar
            sort={sort}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onSortChange={setSort}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onReset={handleResetFilters}
          />
        </div>
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
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

            {/* Load More */}
            {courses.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Load More Courses
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}
