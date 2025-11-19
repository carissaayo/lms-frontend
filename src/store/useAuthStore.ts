import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  isForbidden: boolean;

  loginUser: (data: {
    user: any;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logoutUser: () => void;
  forbidden: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: undefined,
      refreshToken: undefined,
      isAuthenticated: false,
      isForbidden: false,
      loginUser: ({ user, accessToken, refreshToken }) => {
        // Persist both in Zustand & localStorage (for axios)
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logoutUser: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        set({
          user: null,
          accessToken: undefined,
          refreshToken: undefined,
          isAuthenticated: false,
        });
      },
      forbidden: () => set({ isForbidden: true }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
