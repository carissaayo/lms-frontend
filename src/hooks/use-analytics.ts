import {
  getInstructorAnalyticsApi,
  getStudentAnalyticsApi,
  getAdminAnalyticsApi,
} from "@/api/analytics";
import { ApiErrorResponse } from "@/types/main.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

// --- Student Analytics ---
export function useStudentAnalytics(
  timeRange: string
): UseQueryResult<any, AxiosError<ApiErrorResponse>> {
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
export function useInstructorAnalytics(
  timeRange: string
): UseQueryResult<any, AxiosError<ApiErrorResponse>> {
  return useQuery({
    queryKey: ["instructor-analytics", timeRange],
    queryFn: () => getInstructorAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// --- Admin Analytics ---
export function useAdminAnalytics(
  timeRange: string
): UseQueryResult<any, AxiosError<ApiErrorResponse>> {
  return useQuery({
    queryKey: ["admin-analytics", timeRange],
    queryFn: () => getAdminAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
