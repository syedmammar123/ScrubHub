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

export const getRandomArray = (array, length) => {
  return Array.from({ length }, () => ({
    topic: array[Math.floor(Math.random() * array.length)],
    type: types[Math.floor(Math.random() * types.length)],
    subTopic: null,
  }));
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

export const formatDateOnly = (timestamp) => {
  if (!timestamp || typeof timestamp.seconds !== "number")
    return "Invalid Date";

  // Convert Firestore timestamp (seconds + nanoseconds) into a JavaScript Date object
  const dateObj = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

  if (isNaN(dateObj.getTime())) return "Invalid Date"; // Handle invalid dates

  // Check if the date is within the last 7 days
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7); // Get date a week ago

  if (dateObj >= oneWeekAgo) {
    return dateObj.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue", etc.
  } else {
    return dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
};

export const formatTimeOnly = (timestamp) => {
  if (!timestamp || typeof timestamp.seconds !== "number")
    return "Invalid Time";

  // Convert Firestore timestamp (seconds + nanoseconds) into a JavaScript Date object
  const dateObj = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

  if (isNaN(dateObj.getTime())) return "Invalid Time"; // Handle invalid dates

  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
