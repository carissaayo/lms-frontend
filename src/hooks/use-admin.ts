import { createNewAdminApi, getAdminsApi } from "@/api/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdmins = (params: {
  search: string;
  status: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["admins", params],
    queryFn: () => getAdminsApi(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
  });
};
