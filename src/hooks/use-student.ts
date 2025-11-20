import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminStudentsApi, getSingleStudentAdmin, getStudentPaymentsApi, updateStudentStatus } from "@/api/student";
import { AdminStudentsFilters } from "@/types/student.types";
import useAuthStore from "@/store/useAuthStore";

export function useStudentPayments(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["student-payments", params],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getStudentPaymentsApi(params);
    },
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
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
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getAdminStudentsApi(filters);
    },
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSingleStudentAdmin = (id: string) =>
  useQuery({
    queryKey: ["admin-student", id],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getSingleStudentAdmin(id);
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
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
      retry: false,
    });
  };
