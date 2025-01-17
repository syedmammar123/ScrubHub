import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  writeBatch,
  updateDoc,
} from "@react-native-firebase/firestore";
import useCurrentUserStore from "./currentUserStore";

import { q } from "./quesData";
// Skipping Helper Functions
const prevQuesLength = async (system, topic) => {
  let prevQues;
  console.log("USER=>", useCurrentUserStore.getState().getUser());
  const curUser = useCurrentUserStore.getState().getUser();
  try {
    const getPrevQuesRef = collection(
      db, // The Firestore database instance
      "Users", // Collection name
      curUser.id,
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

// Pick 9 Questions from 90
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

  // type (study)
  fetchedQuestionTopic: "",
  fetchedQuestionSystem: "",
  questions: [],
  score: 0,
  currentIndex: 0,

  // type (review)
  fetchedReviewQuestionSystem: "",
  fetchedReviewQuestionTopic: "",
  reviewQuestions: [],
  isLoading: false,
  currentIndexReview: 0,

  // type (dailyChallenge)
  challengeQuestions: [],
  currentChallengeId: "",
  currentChallengeIndex: 0,
  scoreChallenge: 0,

  increaseScore: () => set((state) => ({ score: state.score + 1 })),
  increaseChallengeScore: () =>
    set((state) => ({ scoreChallenge: state.scoreChallenge + 1 })),
  getScore: () => {
    const { score } = get();
    return score;
  },

  getChallengeScore: () => {
    const { scoreChallenge } = get();
    return scoreChallenge;
  },
  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  increaseCurrentReviewIndex: () =>
    set((state) => ({ currentIndexReview: state.currentIndexReview + 1 })),

  increaseCurrentChallengeIndex: () =>
    set((state) => ({
      currentChallengeIndex: state.currentChallengeIndex + 1,
    })),

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
      set({ fetchedQuestionSystem: system });
      set({ fetchedQuestionTopic: topic });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchReviewQuestions: async (system, topic) => {
    set({ isLoading: true });

    // Setting Index 0 for Questions
    set({ currentIndexReview: 0 });
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
        set({ reviewQuestions: questionsPicked });

        set({ fetchedReviewQuestionSystem: system });

        set({ fetchedReviewQuestionTopic: topic });
      }

      console.log(docs.docs.length);
      return docs.docs.length;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  submitQuestions: async () => {
    set({ currentIndex: 0 });
    const batch = writeBatch(db);
    let system = get().fetchedQuestionSystem;
    let topic = get().fetchedQuestionTopic;
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
      set({ fetchedQuestionSystem: "" });
      set({ fetchedQuestionTopic: "" });
      console.log("SAVED");
    } catch (error) {
      console.log(error.message);
    }
  },
  submitReviews: async () => {
    const batch = writeBatch(db); // Initialize batch
    set({ currentIndexReview: 0 });
    let system = get().fetchedReviewQuestionSystem;
    let topic = get().fetchedReviewQuestionTopic;
    try {
      get().reviewQuestions.forEach((q) => {
        const docRef = doc(
          db, // Firestore database instance
          "Users", // Collection name
          useCurrentUserStore.getState().getUser().userId,
          system,
          topic,
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
      set({ fetchedReviewQuestionSystem: "" });

      set({ fetchedReviewQuestionTopic: "" });
      console.log("Batch update successful!");
    } catch (error) {
      console.error("Batch update failed:", error.message);
    }
  },
  //
  fetchChallengeQuestions: async () => {
    set({ isLoading: true });
    // Setting Index 0 for Questions

    try {
      // Getting dailyChallenge ID First Here
      const querySnapshot = await getDocs(collection(db, `dailyChallenge`));
      const challengeID = querySnapshot.docs[0].id;
      console.log("ID OF Challenge", querySnapshot.docs[0].id);

      // Last Daily Challenge ID Now from User here

      const curUser = useCurrentUserStore.getState().getUser();

      const userChallengeId = curUser.lastDailyChallengeID;
      console.log(curUser);

      console.log(
        "Current User Challenge ID Current",
        curUser.lastDailyChallengeID
      );

      if (challengeID === userChallengeId) {
        return 0; // Length 0 which after checking navigates user to Leaderboard
      }
      let documents = querySnapshot.docs[0].data().questions;

      set({ currentChallengeIndex: 0 });
      set({ challengeQuestions: documents });
      set({ currentChallengeId: challengeID });
      return documents.length;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  submitChallengeQuestions: async () => {
    try {
      const userId = useCurrentUserStore.getState().getUser().id;

      const userDocRef = doc(db, "Users", userId);

      await updateDoc(userDocRef, {
        lastDailyChallengeID: get().currentChallengeId,
        lastChallengeScore: get().scoreChallenge,
      });

      // Update User in Store
      const updatedUser = {
        ...useCurrentUserStore.getState().getUser(),
        lastDailyChallengeID: get().currentChallengeId,
      };
      useCurrentUserStore.getState().updateUser(updatedUser);
      console.log("UPDTAED USER", updatedUser);

      set({ currentChallengeIndex: 0 });
      set({ challengeQuestions: [] });
      set({ currentChallengeId: "" });
      console.log("Challenge updated successfully!");
    } catch (error) {
      console.error("Error updating challenge:", error.message);
    }
  },

  // Getting any current Question(study)
  getCurrentQuestion: () => {
    const { questions, currentIndex } = get();
    return questions[currentIndex];
  },

  // Getting any current Question(study)
  getReviewQuestion: () => {
    const { reviewQuestions, currentIndexReview } = get();
    return reviewQuestions[currentIndexReview];
  },

  // Getting any current Question(Challenge)
  getChallengeQuestion: () => {
    const { challengeQuestions, currentChallengeIndex } = get();
    return challengeQuestions[currentChallengeIndex];
  },

  // Getting any current Question(Challenge)
  getFetchedChallengeID: () => {
    const { currentChallengeId } = get();
    return currentChallengeId;
  },

  // Setting if user is reviwing/Studying/taking challenge
  setType: (type) => set({ type: type }),

  // Getting any current Question reviwing/Studying
  getCurrentType: () => {
    const { type } = get();
    return type;
  },

  // Getting Question Fetch Flag to not fetch/fetch require Questions again(study)
  getfetchedQuestionTopic: () => {
    const { fetchedQuestionTopic } = get();
    return fetchedQuestionTopic;
  },

  // Getting Question Fetch Flag to not fetch/fetch require Questions again(review)
  getfetchedReviewTopic: () => {
    const { fetchedReviewQuestionTopic } = get();
    return fetchedReviewQuestionTopic;
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
