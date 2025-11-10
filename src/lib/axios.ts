// src/lib/api.ts
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const store = useAuthStore.getState();
      const role = store.user?.role; // read role from store
      store.logoutUser();

      if (role === "admin") {
        window.location.href = "/admin/auth/login";
      } else {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
