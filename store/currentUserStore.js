import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";


const useCurrentUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      userNotifications: [],
      userChallenges: [],
      setUser: (user, id) => {
        set({ user: { ...user, id } });
      },
      updateUser: (user) => {
        set({ user: user });
      },
      getUser: () => {
        return get().user; // Safely access the `user` state
      },
      clearUser: () => {
        set({ user: null }); // Reset the `user` state
        set({ userNotifications: [] });
        set({ userChallenges: [] });
      },
      setUserNotifications: (notifications) => {
        set({ userNotifications: notifications });
      },
      setUserChallenges: (challenges) => {
        set({ userChallenges: challenges });
      },
    }),
    {
      name: "currentUserStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCurrentUserStore;


//remove code below if white screen issue is resolved!

// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persist, createJSONStorage } from "zustand/middleware";


// const useCurrentUserStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       isHydrated: false, // Add this
//       userNotifications: [],
//       userChallenges: [],
//       setHydrated: () => set({ isHydrated: true }), // Add this
//       setUser: (user, id) => {
//         set({ user: { ...user, id } });
//       },
//       updateUser: (user) => {
//         set({ user: user });
//       },
//       getUser: () => {
//         return get().user; // Safely access the `user` state
//       },
//       clearUser: () => {
//         set({ user: null }); // Reset the `user` state
//         set({ userNotifications: [] });
//         set({ userChallenges: [] });
//       },
//       setUserNotifications: (notifications) => {
//         set({ userNotifications: notifications });
//       },
//       setUserChallenges: (challenges) => {
//         set({ userChallenges: challenges });
//       },
//     }),
//     {
//       name: "currentUserStore",
//       storage: createJSONStorage(() => AsyncStorage),
//       onRehydrateStorage: () => (state) => {
//         // When storage is rehydrated, set hydrated state
//         state?.setHydrated();
//       },
//     }
//   )
// );

// export default useCurrentUserStore;
