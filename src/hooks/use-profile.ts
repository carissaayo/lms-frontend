import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminProfileApi, getuserProfileApi, updateAdminProfileApi, updateProfileApi } from "@/api/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getuserProfileApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: FormData) => updateProfileApi(payload),
    retry: false,
  });
}

export function useAdminProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getAdminProfileApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
}

export function useAdminUpdateProfile() {
  return useMutation({
    mutationFn: (payload: FormData) => updateAdminProfileApi(payload),
    retry: false,
  });
}