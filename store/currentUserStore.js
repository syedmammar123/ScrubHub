import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  getDocs,
  query,
  where,
  collection,
} from "@react-native-firebase/firestore";

let userNumber = "+923404857461";
const useCurrentUserStore = create((set, get) => ({
  user: {},
  fetchUser: async () => {
    console.log("CALLED FOR USER");
    const userQuery = query(
      collection(db, "Users"),
      where("phonenumber", "==", `${userNumber}`),
    );
    try {
      //   const docs = await getDocs(userQuery);
      const docs = await getDocs(userQuery);

      const userObj = { ...docs.docs[0].data(), userId: docs.docs[0].id };
      console.log(userObj);
      set({ user: userObj });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUser: () => {
    const { user } = get();
    return user;
  },
}));

export default useCurrentUserStore;
