export const types = [
  "firstLineTreatment",
  "flowChart",
  "lab",
  "matchTheMicrobe",
  "medicationUse",
  "quickDiagnosis",
  "scrabble",
  "shortFacts",
  "testToOrder",
];

export const getRandomArray = (array) => {
  let arr = [];
  for (let i = 0; i < types.length; i++) {
    arr.push({
      topic: array[Math.floor(Math.random() * array.length)],
      type: types[i],
      subTopic: null,
    });
  }
  return arr;
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
