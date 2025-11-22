import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { InstructorStatus } from "@/types/user.types";
import { useAdminInstructors } from "@/hooks/use-instructor";
import { Instructor } from "@/types/instructor.types";

export function useAdminInstructorsPage() {
  const navigate = useNavigate();

  // Filters & pagination
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [debouncedSearch] = useDebounce(search, 500);

  // Data fetching
  const { data, isLoading, error } = useAdminInstructors({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  const instructors: Instructor[] = data?.instructors ?? [];
  const total = data?.total ?? 0;

  // Derived values

    const totalInstructors = instructors.length;
    const activeInstructors = instructors.filter(
      (i) => i.status === InstructorStatus.APPROVED
    ).length;
    const suspendedInstructors = instructors.filter(
      (i) => i.status === InstructorStatus.SUSPENDED
    ).length;
    const pendingInstructors = instructors.filter(
      (i) => i.status === InstructorStatus.PENDING
    ).length;
    const totalCourses = instructors.reduce(
      (acc, i) => acc + i.coursesCount,
      0
    );

    



  const handleViewInstructor = (id: string) => {
    navigate({ to: `/admin/instructors/${id}` });
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    search,
    setSearch,
    status,
    setStatus,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    error,
    instructors,
    total,
    totalPages,
    totalInstructors,
    activeInstructors,
    suspendedInstructors,
    pendingInstructors,
    totalCourses,
    handleViewInstructor,
  };
}
