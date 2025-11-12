import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers.refreshtoken = refreshToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {


    const statusCode = response.data?.statusCode;

    if (statusCode === 401) {
      const store = useAuthStore.getState();
      const role = store.user?.role;
      store.logoutUser();

      // Use setTimeout to avoid navigation during render
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin/auth/login";
        } else {
          window.location.href = "/auth/login";
        }
      }, 0);

      return Promise.reject(new Error(response.data.message || "Unauthorized"));
    }

    return response;
  },
  (error) => {
    // Handle actual HTTP 401 errors (just in case)
    if (error.response?.status === 401) {
      const store = useAuthStore.getState();
      const role = store.user?.role;
      store.logoutUser();

      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin/auth/login";
        } else {
          window.location.href = "/auth/login";
        }
      }, 0);
    }
    return Promise.reject(error);
  }
);
