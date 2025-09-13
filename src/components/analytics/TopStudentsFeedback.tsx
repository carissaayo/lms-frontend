import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Star } from "lucide-react";

const feedbacks = [
  {
    name: "Alice",
    comment: "Loved the real-world examples!",
    course: "React Basics",
    rating: 5,
  },
  {
    name: "James",
    comment: "Instructor explains concepts clearly.",
    course: "Node.js",
    rating: 4,
  },
  {
    name: "Fatima",
    comment: "Course structure is very intuitive.",
    course: "UI/UX",
    rating: 5,
  },
  {
    name: "David",
    comment: "Would love more hands-on projects.",
    course: "React Basics",
    rating: 3,
  },
  {
    name: "Chika",
    comment: "Too fast paced but informative.",
    course: "Node.js",
    rating: 3,
  },
];

const ITEMS_PER_PAGE = 3;

export function TopStudentFeedback() {
  const [selectedCourse, setSelectedCourse] = React.useState<string | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [selectedFeedback, setSelectedFeedback] = React.useState<any>(null);

  console.log();

  const filtered = feedbacks
    .filter((f) => selectedCourse === "all" || f.course === selectedCourse)
    .sort((a, b) => {
      if (sortAsc) return a.course.localeCompare(b.course);
      else return b.course.localeCompare(a.course);
    });

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <CardTitle className="text-lg">Top Student Feedback</CardTitle>
        <div className="flex items-center gap-3">
          <Select onValueChange={setSelectedCourse} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {[...new Set(feedbacks.map((f) => f.course))].map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortAsc(!sortAsc)}
          >
            Sort {sortAsc ? "↑" : "↓"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {paginated.map((f, i) => (
          <Dialog
            key={i}
            onOpenChange={(open) => !open && setSelectedFeedback(null)}
          >
            <DialogTrigger asChild>
              <div className="cursor-pointer rounded-md border bg-muted/50 px-4 py-3 hover:bg-muted transition">
                <p className="text-sm italic text-muted-foreground truncate">
                  "{f.comment}"
                </p>
                <div className="mt-1 flex items-center justify-between text-sm font-medium">
                  <span>
                    – {f.name} on{" "}
                    <span className="text-primary">{f.course}</span>
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${idx < f.rating ? "text-yellow-400" : "text-muted-foreground"}`}
                        fill={idx < f.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Full Feedback</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground italic">"{f.comment}"</p>
              <p className="mt-2 text-sm font-medium">
                – {f.name} on {f.course}
              </p>
            </DialogContent>
          </Dialog>
        ))}

        <div className="flex justify-between items-center pt-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
