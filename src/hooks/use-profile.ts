import { useMutation, useQuery } from "@tanstack/react-query";
import { getuserProfileApi, updateProfileApi } from "@/api/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getuserProfileApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: FormData) => updateProfileApi(payload),
  });
}
