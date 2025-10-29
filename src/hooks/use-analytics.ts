import {
  getInstructorAnalyticsApi,
  getStudentAnalyticsApi,
  getAdminAnalyticsApi,
} from "@/api/analytics";
import { useQuery } from "@tanstack/react-query";

// --- Student Analytics ---
export function useStudentAnalytics(timeRange: string) {
  return useQuery({
    queryKey: ["student-analytics", timeRange],
    queryFn: () => getStudentAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}

// --- Instructor Analytics ---
export function useInstructorAnalytics(timeRange: string) {
  return useQuery({
    queryKey: ["instructor-analytics", timeRange],
    queryFn: () => getInstructorAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// --- Admin Analytics ---
export function useAdminAnalytics(timeRange: string) {
  return useQuery({
    queryKey: ["admin-analytics", timeRange],
    queryFn: () => getAdminAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
