const admin = require('firebase-admin');
const fs = require('fs');

try {
  // Read and parse the service account key JSON
  const credentials = JSON.parse(fs.readFileSync('firebase_credentials.json'));
  
  // Initialize Firebase Admin SDK with the credentials
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });

  console.log("Firebase initialized successfully.");
  
  // Your Firestore update logic goes here


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

  updateCollection();

} catch (error) {
  console.error("Failed to parse Firebase credentials:", error);
  process.exit(1); // Exit with failure code
}
