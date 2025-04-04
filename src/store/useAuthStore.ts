import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  token: any;
  loginUser: (user: any, token: any) => any;
  isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      loginUser: (userData, token) => {
        set({
          user: userData,
          token,
          //   isAuthenticated: true
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
