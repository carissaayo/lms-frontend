import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;

  loginUser: (user: any) => any;
  isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      loginUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      //   logout: () => {
      //     set({ user: null, token: null, isAuthenticated: false });
      //   },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
