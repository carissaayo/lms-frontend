import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request Interceptor
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const store = useAuthStore.getState();

    if (error.response?.status === 401) {
      const role = store.user?.role;

      store.logoutUser();

      if (role === "admin") {
        window.location.href = "/admin/auth/login";
      } else {
        window.location.href = "/auth/login";
      }
    }

    if (error.response?.status === 403) {
      store.setErrorMessage(error.response?.data?.message);
      store.forbidden();
    }

    return Promise.reject(error);
  }
);
