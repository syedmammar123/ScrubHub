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

export const getRandomSolvedQuesArray = (array) => {
  let arr = [];
  for (let i = 0; i < types.length; i++) {
    let index = Math.floor(Math.random() * array.length);
    arr.push({
      topic: Object.keys(array[index])[0],
      type: types[i],
      subTopic: getRandomItem(array[index][Object.keys(array[index])[0]]),
    });
  }
  return arr;
}
