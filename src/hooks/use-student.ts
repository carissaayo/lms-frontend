import { useQuery } from "@tanstack/react-query";
import { getStudentPaymentsApi } from "@/api/student";

export function useStudentPayments(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["student-payments", params],
    queryFn: () => getStudentPaymentsApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
