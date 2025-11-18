import { getAdminsApi } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

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