import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
const store = useAuthStore.getState();


console.log(store.isForbidden,"isForbidden");

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
    console.log("I dey here");
    const statusCode = response.data?.statusCode;
    if (statusCode === 403) {
      store.forbidden();
      console.log("forbidden");
    }
    if (statusCode === 401) {
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
     console.log("I dey here");
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

      if (error.response?.status === 403) {
          const store = useAuthStore.getState();
             store.forbidden();

      }
    return Promise.reject(error);
  }
);
