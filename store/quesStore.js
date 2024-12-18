import { create } from "zustand";
import { q } from "./quesData";

const pickQues = () => {
  let pickedQues = [];
  for (let i = 0; i < 9; i++) {
    pickedQues.push(q.questions[i * 10]);
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
