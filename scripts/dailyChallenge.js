// const admin = require('firebase-admin');
// const fs = require('fs');

// try {
//   // Read and parse the service account key JSON
//   const credentials = JSON.parse(fs.readFileSync('firebase_credentials.json'));
  
//   // Initialize Firebase Admin SDK with the credentials
//   admin.initializeApp({
//     credential: admin.credential.cert(credentials)
//   });

//   console.log("Firebase initialized successfully.");
  
//   // Your Firestore update logic goes here


//   async function updateCollection() {
//     try {
//         const collectionRef = db.collection("NewTestAutomation");
//         await collectionRef.add({
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         createdVia: "Created via github actions",
//         });
//         console.log("Document added to Firestore successfully.");
//     } catch (error) {
//         console.error("Error adding document to Firestore:", error);
//     }
//   }

//   updateCollection();

// } catch (error) {
//   console.error("Failed to parse Firebase credentials:", error);
//   process.exit(1); // Exit with failure code
// }
// 


// const admin = require('firebase-admin');

// const firebaseCredentials = {
//   type: "service_account",
//   project_id: "scrubhub-24321",
//   private_key_id: "3970bee8115542c2771fa797d3b86f7ed6bded82",
//   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7+K/UPZg1lK+C\nVr/3eSVB1VX33MX+I40xamRmNmfKLkzcGcyIXWzE/bBdH65sWrzGWFVudMpB/+ox\nWyXEbKad7t6cSKC7VDqZbRr0VFWtU+57gojPfuPwWoo7GqVbY9HIKR02foB9ZhQw\nAFH8TRj4G3wpIkSwLLdWxcsOvA6EWVS+GAD6ervtv3B6iPHMFXLJERp1UjbKZ3Mp\nZVZUtkthk62AUyUUFFeazdbe6qjuYZxS04Lq2vvNdc9qAJR4VMlrELlhslU20H6B\nhi9Ebp3dbjxs/VEG3qwqDVhnShkt1KEo178vmxXDfBPSsGog5qmrYxNRctLS+2mP\nBnQwdIUtAgMBAAECggEADGueNKboQzwX98O4gLHte2Lia2kYCmxPdKaGy/aILPoa\nY93ENSDVN9QFKWDB81DF51DoE48d2+FngwuL3JA1rJBffxH70Dz8d+2svwcWjTLT\nT9pxeffKDcmcbNOHKG7ZVQGbIkzBZpJ46YNlPMexthfc1aajxW9YTaBuroJ7GWq6\nWdbeXEh0yDvhh+oUj+uEkBpq5OdKUFRNg/EbarsbvKtaYeDQQjjm85nGPUarE4ks\neZgZms3Ctk4VtpyNGSOTabEsliau/YC6qiSDgsrbEkfXv7zphXCv8F6Z0B+zyZP1\nDPxSeYhR4AUiqNpBpFDZiv3XmW+p3tDt8SZmM4jCIQKBgQDfc9HhdzEX4tFjDGAr\nxVkSOi9JCIOVNP4PuAqWjFuJYCcXG5HOKBEqR5msYzim4P8YK5u+f+ICkxvVgiAv\n+R2Ye/Ze0J7VC0nQ73JCX72yNwvmKZCU3mceZMJDbvc5BOb//D5mmfJ6feso5ss+\niV8Xrsx8GSPKSZdpyiiu11mRDQKBgQDXWdaT55mQD1MOstnrDFKUOA99pcPaqyUb\npBRJE3S1ANAaPBxbPYFRIT8kPQwEWwogUZwlQbjTd9rOIg0rwh7Yxm9zWhOlIGx+\ngu2xQYqx3/+ZtzhNh6W55d/E9QCf+NybMSiUDMGnIRIcjjrPnyp9T2SWXbMEHS3w\n+av9FtZ8oQKBgQCToW7CGsCZumaCnTOQ17LwgvaotvJQixFsCzkbnCICEj/hWXqs\njPZCS8nxBiDwyGhhbLZaVx1YfB8Aohdn+pueGhB9NjIqKWocm4aO6bhn3UyERWPb\np1DT2NgsO00lI+MGr33+xalZWoYaoNkZOSNVf0xklSt7Q8HAyCq20VrApQKBgFmk\n0xb0lM8MIgX/W4llssZyY7hpFZNkJOlRrwQQbkeelAInvaIZg0hTb6ZVJzh08U0s\ny7QSnK6iuNmQAS2S/CY+zEwXVhAp5B/xvqJH50VOOmcxhuV3LvyofTLOzjjJboPH\nvd2LRd2dfZ2Xc1HULurE7tlNHeT7hJFITVjoddahAoGAVj0TOQ1bH554Mgvkyxnn\nb7UZpKFcRWmsO8dxHLewAaUdg6AmtXPVuxvvw+ogKPGyi4O+0U9C250E2X68nAVv\nsr/TGnyPuzWR9XdKgm9ZaFrc4c1NgDI/5JSpPUTyjKd5aOmLUt/BA7/kNGZD4V+h\npmF/kdimb36RxmioJJu7zA0=\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-plrs0@scrubhub-24321.iam.gserviceaccount.com",
//   client_id: "101983114319375105773",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-plrs0%40scrubhub-24321.iam.gserviceaccount.com",
//   universe_domain: "googleapis.com"
// };

// try {
//   // Initialize Firebase Admin SDK
//   admin.initializeApp({
//     credential: admin.credential.cert(firebaseCredentials)
//   });

//   console.log("Firebase initialized successfully.");
  
//   const db = admin.firestore();

//   // Function to update the collection
//   async function updateCollection(randomQues) {
//     try {
//       const collectionRef = db.collection("dailyChallenge");

//       // Delete any existing document in the collection
//       const snapshot = await collectionRef.get();
//       const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
//       await Promise.all(deletePromises);

//       // Add new document with randomQues
//       await collectionRef.add({
//         randomQues,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         createdVia: "Created via GitHub actions",
//       });

//       console.log("Document added to Firestore successfully.");
//     } catch (error) {
//       console.error("Error updating Firestore:", error);
//     }
//   }

//   // Example usage with randomQues
//   const { randomQues } = require('../hooks/useGetRandomQues')();
//   updateCollection(randomQues);

// } catch (error) {
//   console.error("Failed to initialize Firebase or update collection:", error);
//   process.exit(1);
// }


const admin = require("firebase-admin");

const types = [
    'firstLineTreatment',
    'flowChart',
    'lab',
    'matchTheMicrobe',
    'medicationUse',
    'quickDiagnosis',
    'scrabble',
    'shortFacts',
    'testToOrder',
  ];

const getRandomArray = (array) => {
    let arr = []
    for (let i = 0; i < types.length; i++) {
      arr.push({
        topic: array[Math.floor(Math.random() * array.length)],
        type: types[i],
        subTopic: null,
      });
    }
    return arr;
};

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://scrubhub-24321.firebaseio.com", 
});

const firestore = admin.firestore();

async function fetchRandomQues() {
  try {
    const randomQuestions = [];

    // Get all document IDs from the "Topics" collection
    const topicRef = firestore.collection("Topics");
    const querySnapshot = await topicRef.get();
    const documentNames = querySnapshot.docs.map((doc) => doc.id);

    if (documentNames.length === 0) {
      console.log("No documents found in the Topics collection.");
      return [];
    }

    const randomMainTopics = getRandomArray(documentNames);

    // Get random subtopics for each main topic
    for (const topic of randomMainTopics) {
      const subTopicDoc = await topicRef.doc(topic).get();
      const subTopicData = subTopicDoc.data();

      if (subTopicData && subTopicData.topics) {
        const randomTopic = getRandomItem(subTopicData.topics);
        randomMainTopics[randomMainTopics.indexOf(topic)] = {
          topic,
          subTopic: randomTopic,
        };
      }
    }

    // Get random questions for each subtopic
    for (const mainTopic of randomMainTopics) {
      if (mainTopic.subTopic) {
        const questionsRef = firestore
          .collection("Questions")
          .doc(mainTopic.topic)
          .collection(mainTopic.subTopic)
          .where("questionStyle", "==", mainTopic.type) // Ensure `type` is defined
          .limit(1);

        const questionSnapshot = await questionsRef.get();
        questionSnapshot.forEach((doc) => {
          randomQuestions.push(doc.data());
        });
      }
    }

    console.log("Random questions fetched:", randomQuestions);
    return randomQuestions;
  } catch (error) {
    console.error("Error fetching random questions:", error);
    return [];
  }
}

async function updateCollection() {
  try {
    const randomQues = await fetchRandomQues();

    const collectionRef = firestore.collection("dailyChallenge");
    const snapshot = await collectionRef.get();

    // Delete existing documents
    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    // Add new questions
    await collectionRef.add({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdVia: "GitHub Actions",
      questions: randomQues,
    });

    console.log("dailyChallenge collection updated successfully.");
  } catch (error) {
    console.error("Error updating dailyChallenge collection:", error);
  }
}

// Call the function
updateCollection();
