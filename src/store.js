import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      userData: null,
      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),
      updateUser: (user) => set({ user }),
      updateUserData: (userData) => set({ userData }),
    }),
    {
      name: "digestitrak-user-store", // Name for the storage key
      getStorage: () => localStorage, // Choose where to persist: localStorage or sessionStorage
    }
  )
);

export { useStore };
