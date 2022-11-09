import create from "zustand";

export type AuthState = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (status: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (status) => set(() => ({ isUserLoggedIn: status })),
}));
