import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
const store = useAuthStore.getState();



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
             store.resetForbidden();

  return config;
});

api.interceptors.response.use(
  (response) => {
  


    return response;
  },
  (error) => {
    // Handle actual HTTP 401 errors (just in case)
    if (error.response?.status === 401) {
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
             console.log(error.response?.data?.message, "erro");
             store.setErrorMessage(error.response?.data?.message)

      }
    return Promise.reject(error);
  }
);
