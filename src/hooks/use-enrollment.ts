import { useQuery } from "@tanstack/react-query";
import {
  getStudentEnrollmentsApi,
  getUserEnrollmentsApi,
} from "@/api/enrollments";

export function useUserEnrollments() {
  return useQuery({
    queryKey: [],
    queryFn: () => getUserEnrollmentsApi(),
    refetchOnWindowFocus: false,
  });
}
export function useStudentEnrollments(filters: any) {
  return useQuery({
    queryKey: [
      "courses",
      filters.category,
      filters.search,
      filters.sort,
      filters.minPrice,
      filters.maxPrice,
      filters.page,
      filters.limit,
    ],
    queryFn: () => getStudentEnrollmentsApi(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
