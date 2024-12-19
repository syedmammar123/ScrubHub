import useQuesStore from "@/store/quesStore";
const types = {
  1: "quickDiagnosis",
  2: "matchTheMicrobe",
  3: "medicationUse",
  4: "shortFacts",
  5: "flowChart",
  6: "scrabble",
  7: "firstLineTreatment",
  8: "lab",
  9: "testToOrder",
};

// export const getQuestionType = () => {
// const { questions, currentIndex } = useQuesStore((state) => state);
// console.log(currentIndex);

// console.log("Question", questions[currentIndex]);
// console.log("=========");

// if (currentIndex >= 9) {
//   return "/";
// }

// if (
//   questions[currentIndex].questionStyle === types[1] ||
//   questions[currentIndex].questionStyle === types[2] ||
//   questions[currentIndex].questionStyle === types[4] ||
//   questions[currentIndex].questionStyle === types[7] ||
//   questions[currentIndex].questionStyle === types[8] ||
//   questions[currentIndex].questionStyle === types[9]
// ) {
//   return "fourOptQues";
// } else if (questions[currentIndex].questionStyle === types[2]) {
//   return "matching";
// } else if (questions[currentIndex].questionStyle === types[3]) {
//   return "matching";
// } else if (questions[currentIndex].questionStyle === types[6]) {
//   return "wordscrambled";
// } else if (questions[currentIndex].questionStyle === types[5]) {
//   return "incompleteProcess";
// }
//   return "matching";
// };

export const getQuestionType = (question) => {
  // if (currentIndex >= 9) {
  //   return "/";
  // }
  console.log(question);
  if (
    question.questionStyle === types[1] ||
    question.questionStyle === types[4] ||
    question.questionStyle === types[7] ||
    question.questionStyle === types[8] ||
    question.questionStyle === types[9]
  ) {
    return "fourOptQues";
  } else if (question.questionStyle === types[2]) {
    return "matching";
  } else if (question.questionStyle === types[3]) {
    return "matching";
  } else if (question.questionStyle === types[6]) {
    return "wordscrambled";
  } else if (question.questionStyle === types[5]) {
    return "incompleteProcess";
  }
};
