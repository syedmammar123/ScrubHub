import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  getDocs,
  query,
  where,
  collection,
} from "@react-native-firebase/firestore";

let userNumber = "03404857461";
const useCurrentUserStore = create((set, get) => ({
  user: {},
  fetchUser: async () => {
    console.log("CALLED FOR USER");
    const userQuery = query(
      collection(db, "Usersdata"),
      where("name", "==", "Saim")
    );
    try {
      //   const docs = await getDocs(userQuery);
      const docs = await getDocs(collection(db, "Usersdata"));

      console.log(docs);

      docs.forEach((doc) => {
        console.log(`Document ID: ${doc.id}, Data:`, doc.data());
      });
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
