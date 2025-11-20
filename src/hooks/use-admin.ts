import { createNewAdminApi, getAdminsApi } from "@/api/admin";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdmins = (params: {
  search: string;
  status: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["admins", params],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      console.log(useAuthStore.getState().isForbidden,"slks");
     return getAdminsApi(params);
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};


export const useAddNewAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createNewAdminApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.message || "Failed to create admin");
    },
    retry: false,
  });
};
