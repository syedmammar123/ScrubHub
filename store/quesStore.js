import { create } from "zustand";
import { db } from "@/config/firebase";
import { collection, getDocs } from "@react-native-firebase/firestore";

const pickQues = async (docs) => {
  console.log("CALLED");

  let pickedQues = [];

  for (let i = 0; i < 9; i++) {
    pickedQues.push(docs[i * 10]);
  }
  console.log("=========");

  return pickedQues;
};

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
        collection(db, "Questions/cardiovascular/atrial fibrillation"),
      );
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      const pickedQuestions = await pickQues(documents);
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
