import { getStudentAnalyticsApi } from "@/api/analytics";
import { useQuery } from "@tanstack/react-query";

export function useStudentAnalytics() {
  return useQuery({
    queryKey: ["student-analytics"],
    queryFn: () => getStudentAnalyticsApi(),
    refetchOnWindowFocus: false,
  });
}
