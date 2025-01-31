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
};

export const formatPhoneNumber = (phoneNumber) => {
  // Remove any spaces or non-numeric characters
  const formattedNumber = phoneNumber.replace(/\D/g, "");

  // Check if the number starts with "03" and convert it to "+92"
  if (formattedNumber.startsWith("03")) {
    return `+92${formattedNumber.slice(2)}`;
  }

  // If the number starts with "92", return in international format
  if (formattedNumber.startsWith("92")) {
    return `+${formattedNumber}`;
  }

  // If the number is not in the correct format, return as it is
  return phoneNumber;
};
