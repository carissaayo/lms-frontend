import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminInstructors,
  getInstructorEarningsApi,
  getInstructorStudentsApi,
  getSingleInstructorAdmin,
  updateInstructorStatusAdmin,
} from "@/api/instructor";
import useAuthStore from "@/store/useAuthStore";

export function useInstructorStudents(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["instructor-students", params],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getInstructorStudentsApi(params);
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

export function useInstructorEarnings(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["instructor-earnings", params],
    queryFn: () =>{ 
      useAuthStore.getState().resetForbidden();
      return getInstructorEarningsApi(params);},
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export const useAdminInstructors = (filters: {
  search?: string;
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, status, category, page, limit } = filters;

  return useQuery({
    queryKey: ["admin-instructors", search, status, category, page, limit],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getAdminInstructors(filters);
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSingleInstructorAdmin = (id: string) =>
  useQuery({
    queryKey: ["admin-instructor", id],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getSingleInstructorAdmin(id);
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });

export const useUpdateInstructorStatusAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInstructorStatusAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-instructor"] });
    },
    onError: (error: any) => {
      console.log(
        error.response?.data?.message || "Failed to update instructor status"
      );
    },
    retry: false,
  });
};