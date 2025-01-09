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

  // type (review/study), topic(any topic)
  fetchedQuestionTopic: { topic: null, type: null },
  questions: [],
  isLoading: false,
  currentIndex: 0,

  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),
  fetchQuestions: async (system, topic) => {
    set({ isLoading: true });
    // Setting Index 0 for Questions
    set({ currentIndex: 0 });

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
      let fetched = { topic: topic, type: "study" };
      set({ fetchedQuestionTopic: fetched });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchReviewQuestions: async (system, topic) => {
    set({ isLoading: true });

    // Setting Index 0 for Questions
    set({ currentIndex: 0 });
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

      if (docs.docs.length > 0) {
        let questionsPicked = docs.docs.map((doc) => {
          return doc.data();
        });
        set({ questions: questionsPicked });
        let fetched = { topic: topic, type: "review" };
        set({ fetchedQuestionTopic: fetched });
      }

      console.log(docs.docs.length);
      return docs.docs.length;
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
  submitReviews: async (system, topic) => {
    const batch = writeBatch(db); // Initialize batch
    try {
      get().questions.forEach((q) => {
        const docRef = doc(
          db, // Firestore database instance
          "Users", // Collection name
          useCurrentUserStore.getState().getUser().userId,
          "solved",
          "cardiovascular",
          get().fetchedQuestionTopic.topic,
          q.id
        );

        batch.update(docRef, {
          isReviewed: true,
          lastReviewed: new Date(), // Current timestamp
        });
      });

      // Commit batch update
      await batch.commit();
      console.log("Batch update successful!");
    } catch (error) {
      console.error("Batch update failed:", error.message);
    }
  },

  // Getting any current Question
  getCurrentQuestion: () => {
    const { questions, currentIndex } = get();
    return questions[currentIndex];
  },

  // Setting if user is reviwing/Studying
  setType: (type) => set({ type: type }),
  // Getting any current Question reviwing/Studying
  getCurrentType: () => {
    const { type } = get();
    return type;
  },

  // Getting Question Fetch Flag to not fetch/fetch require Questions again
  getfetchedQuestionTopic: () => {
    const { fetchedQuestionTopic } = get();
    return fetchedQuestionTopic;
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
