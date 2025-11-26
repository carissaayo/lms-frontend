import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminProfileApi, getuserProfileApi, updateAdminProfileApi, updateProfileApi } from "@/api/profile";
import useAuthStore from "@/store/useAuthStore";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getuserProfileApi();
    },
    staleTime: 5000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
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
    queryFn: () => {
      useAuthStore.getState().resetForbidden();
      return getAdminProfileApi();
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 10 * 60 * 1000,
  });
}

export function useAdminUpdateProfile() {
  return useMutation({
    mutationFn: (payload: FormData) => updateAdminProfileApi(payload),
    retry: false,
  });
}