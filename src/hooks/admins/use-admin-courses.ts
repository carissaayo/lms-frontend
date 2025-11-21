import { useState } from "react";
import {  useNavigate } from "@tanstack/react-router";

import { Course, CourseStatus } from "@/types/course.types";
import { useAdminCourses } from "@/hooks/use-course";
import { useDebounce } from "@/hooks/use-debounce";

export const useAdminCoursesManagement = () => {
      

      const navigate = useNavigate();
      const [searchQuery, setSearchQuery] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");
      const [categoryFilter, setCategoryFilter] = useState("all");
      const [search, setSearch] = useState("");
      const [category, setCategory] = useState("all");
      const [status, setStatus] = useState("all");
      const [page, setPage] = useState(1);
      const [limit, setLimit] = useState(10);
      const [debouncedSearch] = useDebounce(search, 500);

      const { data, isLoading, error } = useAdminCourses({
        search: debouncedSearch,
        category,
        status,
        page,
        limit,
      });

      const courses: Course[] = data?.courses ?? [];
      const total = data?.total ?? 0;

      const filteredCourses = courses.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructorName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || course.status === statusFilter;
        const matchesCategory =
          categoryFilter === "all" || course.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      });

      // Calculate stats
      const totalCourses = courses.length;
      const approvedCourses = courses.filter(
        (c) => c.status === CourseStatus.APPROVED
      ).length;
      const pendingCourses = courses.filter(
        (c) => c.status === CourseStatus.PENDING
      ).length;
      const rejectedCourses = courses.filter(
        (c) => c.status === CourseStatus.REJECTED
      ).length;
      const suspendedCourses = courses.filter(
        (c) => c.status === CourseStatus.SUSPENDED
      ).length;

      const handleViewCourse = (courseId: string) => {
        navigate({ to: `/admin/courses/${courseId}` });
      };

      return {
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        search,
        setSearch,
        category,
        setCategory,
        status,
        setStatus,
        page,
        setPage,
        limit,
        setLimit,
        debouncedSearch,
        data,
        isLoading,
        error,
        courses,
        total,
        filteredCourses,
        totalCourses,
        approvedCourses,
        pendingCourses,
        rejectedCourses,
        suspendedCourses,
        handleViewCourse,
      };
};

