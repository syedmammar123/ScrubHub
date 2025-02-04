import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Get the country code from a stored phone number
 * @param {string} phoneNumber - The E.164 formatted phone number (e.g., "+923333262411")
 * @returns {string|null} - The country code (e.g., "PK" for Pakistan) or null if invalid
 */

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

export const formatPhoneNumber = (UserPhoneNumber, country) => {
  const phoneNumber = parsePhoneNumberFromString(UserPhoneNumber, country);
  return phoneNumber ? phoneNumber.format("E.164") : null;
};

export const getCountryFromPhoneNumber = (phoneNumber) => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
  return phoneNumberObj ? phoneNumberObj.country : null;
};
