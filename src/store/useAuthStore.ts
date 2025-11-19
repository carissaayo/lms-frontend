import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  isForbidden: boolean;
  errorMessage:string;
  loginUser: (data: {
    user: any;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logoutUser: () => void;
  forbidden: () => void;
  resetForbidden:()=>void;
  setErrorMessage:(errMessage:string)=>void;
  
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: undefined,
      refreshToken: undefined,
      isAuthenticated: false,
      isForbidden: false,
      errorMessage: "",
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
      resetForbidden: () => set({ isForbidden: false }),
      setErrorMessage: (errMessage:string) => set({ errorMessage: errMessage }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
