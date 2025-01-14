import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const useCurrentUserStore = create(
  persist(
    (set, get) => ({
      user: null, // Initial state
      setUser: (user, id) => {
        set({ user: { ...user, id } }); // Properly set the `user` object
      },
      getUser: () => {
        return get().user; // Safely access the `user` state
      },
      clearUser: () => {
        set({ user: null }); // Reset the `user` state
      },
    }),
    {
      name: "currentUserStore", // Key for localStorage or AsyncStorage
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useCurrentUserStore;
