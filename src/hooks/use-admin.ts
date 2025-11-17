import { getAdminsApi } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export const useAdmins = (params: {
  search: string;
  status: string;
  role: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["admins", params],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: getAdminsApi,
  });
};