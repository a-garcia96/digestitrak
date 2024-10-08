import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  userData: null,
  updateUser: (user) => set(() => ({ user: user })),
  updateUserData: (userData) => set(() => ({ userData: userData })),
}));

export { useStore };
