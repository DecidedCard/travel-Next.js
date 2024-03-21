import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  authLogin: (user: User) => void;
  authLogout: () => void;
}

const getUserFromStorage = (): User | null => {
  let userString = null;
  if (typeof window !== "undefined") {
    userString = JSON.parse(localStorage.getItem("user")!);
  }
  return userString;
};

const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromStorage(),
  isLoggedIn: !!getUserFromStorage(),
  authLogin: (user) =>
    set((state) => ({
      user,
      isLoggedIn: true,
    })),
  authLogout: () =>
    set((state) => ({
      user: null,
      isLoggedIn: false,
    })),
}));

export default useAuthStore;
