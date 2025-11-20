import {
  getInstructorAnalyticsApi,
  getStudentAnalyticsApi,
  getAdminAnalyticsApi,
} from "@/api/analytics";
import useAuthStore from "@/store/useAuthStore";
import { ApiErrorResponse } from "@/types/main.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

// --- Student Analytics ---
export function useStudentAnalytics(
  timeRange: string
): UseQueryResult<any, AxiosError<ApiErrorResponse>> {
  return useQuery({
    queryKey: ["student-analytics", timeRange],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getStudentAnalyticsApi({ timeRange });
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

// --- Instructor Analytics ---
export function useInstructorAnalytics(
  timeRange: string
): UseQueryResult<any, AxiosError<ApiErrorResponse>> {
  return useQuery({
    queryKey: ["instructor-analytics", timeRange],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getInstructorAnalyticsApi({ timeRange });
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

// --- Admin Analytics ---
export function useAdminAnalytics(timeRange: string) {
  return useQuery({
    queryKey: ["admin-analytics", timeRange],
    queryFn: async () => {
      useAuthStore.getState().resetForbidden();
      return getAdminAnalyticsApi({ timeRange });
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

