import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminStudentsApi, getSingleStudentAdmin, getStudentPaymentsApi, updateStudentStatus } from "@/api/student";
import { AdminStudentsFilters } from "@/types/student.types";

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
export const useAdminStudents = (filters: AdminStudentsFilters) => {
  return useQuery({
    queryKey: [
      "admin-students",
      filters.search ?? "",
      filters.status ?? "all",
      filters.page ?? 1,
      filters.limit ?? 10,
    ],
    queryFn: () => getAdminStudentsApi(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useSingleStudentAdmin = (id: string) =>
  useQuery({
    queryKey: ["admin-student", id],
    queryFn: () => getSingleStudentAdmin(id),
    enabled: !!id,
  });

  export const useUpdateStudentStatusAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: { id: string; status: string; reason?: string }) =>
        updateStudentStatus(data.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-student"] });
        queryClient.invalidateQueries({ queryKey: ["admin-students"] });
      },
    });
  };
