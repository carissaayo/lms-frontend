import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminInstructors,
  getInstructorEarningsApi,
  getInstructorStudentsApi,
  getSingleInstructorAdmin,
  updateInstructorStatusAdmin,
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
    queryFn: () => getAdminInstructors(filters),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData, 
  });
};

export const useSingleInstructorAdmin = (id: string) =>
  useQuery({
    queryKey: ["admin-instructor", id],
    queryFn: () => getSingleInstructorAdmin(id),
    enabled: !!id,
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
  });
};