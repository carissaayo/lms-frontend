import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  token?: string;
  isAuthenticated: boolean;

  loginUser: (user: any) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: undefined,
      isAuthenticated: false,

      loginUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      logoutUser: () => {
        set({ user: null, token: undefined, isAuthenticated: false });
 
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
