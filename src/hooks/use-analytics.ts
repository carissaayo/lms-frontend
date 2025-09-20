import { getStudentAnalyticsApi } from "@/api/analytics";
import { useQuery } from "@tanstack/react-query";

export function useStudentAnalytics(timeRange: any) {
  return useQuery({
    queryKey: ["student-analytics", timeRange],
    queryFn: () => getStudentAnalyticsApi({ timeRange }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}
