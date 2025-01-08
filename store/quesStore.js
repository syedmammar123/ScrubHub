import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  writeBatch,
} from "@react-native-firebase/firestore";
import useCurrentUserStore from "./currentUserStore";

const prevQuesLength = async (system, topic) => {
  let prevQues;
  console.log("USER=>", useCurrentUserStore.getState().getUser());
  const curUser = useCurrentUserStore.getState().getUser();
  try {
    const getPrevQuesRef = collection(
      db, // The Firestore database instance
      "Users", // Collection name
      curUser.userId,
      "solved",
      system,
      topic
    );
    prevQues = await getDocs(getPrevQuesRef);
    return prevQues.docs.length;
  } catch (error) {
    console.log(error.message);
  }
};

const pickQues = async (system, topic, docs) => {
  // const { getUser } = useCurrentUserStore.getState().getUser;
  console.log("CALLED");

  // const getPrevQuesRef = doc(
  //   db, // The Firestore database instance
  //   "Users", // Collection name
  //   curUser.userId,
  //   "solved",
  //   system,
  //   topic
  // )
  const lengthtoSkip = await prevQuesLength(system, topic);
  console.log("Length to skip", lengthtoSkip);

  let index = lengthtoSkip / 9;
  let pickedQues = [];

  for (let i = 0; i < 9; i++) {
    let pickIndex = i * 10;
    pickIndex += index;
    pickedQues.push(docs[pickIndex]);
  }
  console.log("=========");

  return pickedQues;
};

const useQuesStore = create((set, get) => ({
  type: "",
  questions: [],
  isLoading: false,
  currentIndex: 0,
  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),
  fetchQuestions: async (system, topic) => {
    set({ isLoading: true });
    try {
      const querySnapshot = await getDocs(
        collection(db, `Questions/${system}/${topic}`)
      );
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      const pickedQuestions = await pickQues(system, topic, documents);
      console.log("PICKED QUESTIONS:", pickedQuestions.length);

      set({ questions: pickedQuestions });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchReviewQuestions: async (system, topic) => {
    set({ isLoading: true });
    try {
      const curUser = useCurrentUserStore.getState().getUser();
      const getPrevQuesRef = collection(
        db,
        "Users",
        curUser.userId,
        "solved",
        system,
        topic
      );
      const docs = await getDocs(getPrevQuesRef);

      console.log(docs.docs.length);
      return docs.docs.length;

      // set({ questions: pickedQuestions });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  submitQuestions: async (system, topic) => {
    const batch = writeBatch(db);
    try {
      get().questions.forEach((q) => {
        const docRef = doc(
          db, // The Firestore database instance
          "Users", // Collection name
          useCurrentUserStore.getState().getUser().userId,
          "solved",
          system,
          topic,
          q.id
        );
        batch.set(docRef, q); // Add to batch
      });
      // Commit the batch operation
      await batch.commit();
      console.log("SAVED");
    } catch (error) {
      console.log(error.message);
    }
  },
  setType: (type) => set({ type: type }),
  getCurrentQuestion: () => {
    const { questions, currentIndex } = get();
    return questions[currentIndex];
  },
  getCurrentType: () => {
    const { type } = get();
    return type;
  },
}));

export default useQuesStore;

// const useQuesStore = create((set,get) => ({
//   questions: [],
//   isLoading: false,
//   currentIndex: 0,
//   increaseCurrentIndex: () =>
//     set((state) => ({ currentIndex: state.currentIndex + 1 })),
//     fetchQuestions: async () => {
//     set({ isLoading: true });
//     try {
//       const querySnapshot = await getDocs(
//         collection(db, "Questions/cardiovascular/atrial fibrillation")
//       );
//       const documents = [];
//       querySnapshot.forEach((doc) => {
//         documents.push({ id: doc.id, ...doc.data() });
//       });
//       set({ questions: pickQues(documents) });
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));
