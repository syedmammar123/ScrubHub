import { create } from "zustand";
import { q } from "./quesData";
import { db } from "@/config/firebase";
import { collection, getDocs } from "@react-native-firebase/firestore";

// const testDbFunction = async () => {
//   try {
//     const querySnapshot = await getDocs(
//       collection(db, "Questions/cardiovascular/atrial fibrillation")
//     );
//     const documents = [];
//     querySnapshot.forEach((doc) => {
//       documents.push({ id: doc.id, ...doc.data() });
//     });
//     return documents;
//   } catch (error) {
//     console.error("Error fetching documents: ", error);
//   }
// };

const pickQues = (docs) => {
  console.log("CALLED");

  let pickedQues = [];

  for (let i = 0; i < 9; i++) {
    pickedQues.push(docs[i * 10]);
  }
  console.log("=========");

  return pickedQues;
};
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

const useQuesStore = create((set, get) => ({
  questions: [],
  isLoading: false,
  currentIndex: 0,
  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),
  fetchQuestions: async () => {
    set({ isLoading: true });
    try {
      const querySnapshot = await getDocs(
        collection(db, "Questions/cardiovascular/atrial fibrillation")
      );
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      // Await the resolution of pickQues
      const pickedQuestions = pickQues(documents);
      console.log("PICKED QUESTIONS:", pickedQuestions);

      set({ questions: pickedQuestions });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getCurrentQuestion: () => {
    const { questions, currentIndex } = get();
    return questions[currentIndex];
  },
}));

export default useQuesStore;
// testQuestions: testDbFunction(),
