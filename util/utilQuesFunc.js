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

export const getQuestionType = (question) => {
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
    return "multipleOptSelect";
  } else if (question.questionStyle === types[6]) {
    return "wordscrambled";
  } else if (question.questionStyle === types[5]) {
    return "incompleteProcess";
  }
};
