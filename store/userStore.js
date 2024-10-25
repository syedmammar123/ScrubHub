import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        });
      },
    }),
    {
      name: "scrubhub-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
