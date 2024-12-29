import { create } from "zustand";
import { q } from "./quesData";
import { db } from "@/config/firebase";
import { collection, getDocs } from "@react-native-firebase/firestore";

const testDbFunction = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "Questions/cardiovascular/atrial fibrillation")
    );
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

const pickQues = async () => {
  console.log("CALLED");

  let pickedQues = [];
  let dbQues = await testDbFunction();
  console.log(dbQues);

  for (let i = 0; i < 9; i++) {
    pickedQues.push(dbQues[i * 10]);
  }
  console.log("=========");
  console.log(q.questions.length);

  return pickedQues;
};
const useQuesStore = create((set) => ({
  questions: pickQues(),
  currentIndex: 0,
  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),
}));

export default useQuesStore;
// testQuestions: testDbFunction(),
