const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Update Firestore Collection
async function updateCollection() {
  try {
    const collectionRef = db.collection("NewTestAutomation");
    await collectionRef.add({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdVia: "Created via github actions",
    });
    console.log("Document added to Firestore successfully.");
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
  }
}

// Run the function
updateCollection();
