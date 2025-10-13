import { useQuery } from "@tanstack/react-query";
import {
  getInstructorEarningsApi,
  getInstructorStudentsApi,
} from "@/api/instructor";

export function useInstructorStudents(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["instructor-students", params],
    queryFn: () => getInstructorStudentsApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useInstructorEarnings(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["instructor-earnings", params],
    queryFn: () => getInstructorEarningsApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
