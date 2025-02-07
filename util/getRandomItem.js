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

export const formatDateOnly = (dateString) => {
  console.log("Original Date String:", dateString);

  // Extracting date, time, and timezone parts manually
  const match = dateString.match(/(\d{1,2}) (\w+) (\d{4}) at (\d{2}:\d{2}:\d{2}) UTC([+-]\d+)/);

  if (!match) return "Invalid Date"; // Handle incorrect formats

  const [, day, month, year, time, utcOffset] = match;

  // Convert month name to number
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };

  if (!(month in months)) return "Invalid Date"; // Invalid month name

  // Construct a valid ISO string
  const isoString = `${year}-${String(months[month] + 1).padStart(2, "0")}-${day.padStart(2, "0")}T${time}${utcOffset.padStart(3, "0")}:00`;

  // Parse the date
  const dateObj = new Date(isoString);
  console.log("Parsed Date Object:", dateObj);

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


export const formatTimeOnly = (dateString) => {
  console.log("Original Date String:", dateString);

  // Extracting date, time, and timezone parts manually
  const match = dateString.match(/(\d{1,2}) (\w+) (\d{4}) at (\d{2}:\d{2}:\d{2}) UTC([+-]\d+)/);

  if (!match) return "Invalid Time"; // Handle incorrect formats

  const [, day, month, year, time, utcOffset] = match;

  // Convert month name to number
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };

  if (!(month in months)) return "Invalid Time"; // Invalid month name

  // Construct a valid ISO string
  const isoString = `${year}-${String(months[month] + 1).padStart(2, "0")}-${day.padStart(2, "0")}T${time}${utcOffset.padStart(3, "0")}:00`;

  // Parse the date
  const dateObj = new Date(isoString);
  console.log("Parsed Date Object:", dateObj);

  if (isNaN(dateObj.getTime())) return "Invalid Time"; // Handle invalid dates

  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};


