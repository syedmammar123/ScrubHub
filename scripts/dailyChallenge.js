const admin = require("firebase-admin");

const firebaseCredentials = {
  type: "service_account",
  project_id: "scrubhub-24321",
  private_key_id: "3970bee8115542c2771fa797d3b86f7ed6bded82",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7+K/UPZg1lK+C\nVr/3eSVB1VX33MX+I40xamRmNmfKLkzcGcyIXWzE/bBdH65sWrzGWFVudMpB/+ox\nWyXEbKad7t6cSKC7VDqZbRr0VFWtU+57gojPfuPwWoo7GqVbY9HIKR02foB9ZhQw\nAFH8TRj4G3wpIkSwLLdWxcsOvA6EWVS+GAD6ervtv3B6iPHMFXLJERp1UjbKZ3Mp\nZVZUtkthk62AUyUUFFeazdbe6qjuYZxS04Lq2vvNdc9qAJR4VMlrELlhslU20H6B\nhi9Ebp3dbjxs/VEG3qwqDVhnShkt1KEo178vmxXDfBPSsGog5qmrYxNRctLS+2mP\nBnQwdIUtAgMBAAECggEADGueNKboQzwX98O4gLHte2Lia2kYCmxPdKaGy/aILPoa\nY93ENSDVN9QFKWDB81DF51DoE48d2+FngwuL3JA1rJBffxH70Dz8d+2svwcWjTLT\nT9pxeffKDcmcbNOHKG7ZVQGbIkzBZpJ46YNlPMexthfc1aajxW9YTaBuroJ7GWq6\nWdbeXEh0yDvhh+oUj+uEkBpq5OdKUFRNg/EbarsbvKtaYeDQQjjm85nGPUarE4ks\neZgZms3Ctk4VtpyNGSOTabEsliau/YC6qiSDgsrbEkfXv7zphXCv8F6Z0B+zyZP1\nDPxSeYhR4AUiqNpBpFDZiv3XmW+p3tDt8SZmM4jCIQKBgQDfc9HhdzEX4tFjDGAr\nxVkSOi9JCIOVNP4PuAqWjFuJYCcXG5HOKBEqR5msYzim4P8YK5u+f+ICkxvVgiAv\n+R2Ye/Ze0J7VC0nQ73JCX72yNwvmKZCU3mceZMJDbvc5BOb//D5mmfJ6feso5ss+\niV8Xrsx8GSPKSZdpyiiu11mRDQKBgQDXWdaT55mQD1MOstnrDFKUOA99pcPaqyUb\npBRJE3S1ANAaPBxbPYFRIT8kPQwEWwogUZwlQbjTd9rOIg0rwh7Yxm9zWhOlIGx+\ngu2xQYqx3/+ZtzhNh6W55d/E9QCf+NybMSiUDMGnIRIcjjrPnyp9T2SWXbMEHS3w\n+av9FtZ8oQKBgQCToW7CGsCZumaCnTOQ17LwgvaotvJQixFsCzkbnCICEj/hWXqs\njPZCS8nxBiDwyGhhbLZaVx1YfB8Aohdn+pueGhB9NjIqKWocm4aO6bhn3UyERWPb\np1DT2NgsO00lI+MGr33+xalZWoYaoNkZOSNVf0xklSt7Q8HAyCq20VrApQKBgFmk\n0xb0lM8MIgX/W4llssZyY7hpFZNkJOlRrwQQbkeelAInvaIZg0hTb6ZVJzh08U0s\ny7QSnK6iuNmQAS2S/CY+zEwXVhAp5B/xvqJH50VOOmcxhuV3LvyofTLOzjjJboPH\nvd2LRd2dfZ2Xc1HULurE7tlNHeT7hJFITVjoddahAoGAVj0TOQ1bH554Mgvkyxnn\nb7UZpKFcRWmsO8dxHLewAaUdg6AmtXPVuxvvw+ogKPGyi4O+0U9C250E2X68nAVv\nsr/TGnyPuzWR9XdKgm9ZaFrc4c1NgDI/5JSpPUTyjKd5aOmLUt/BA7/kNGZD4V+h\npmF/kdimb36RxmioJJu7zA0=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-plrs0@scrubhub-24321.iam.gserviceaccount.com",
  client_id: "101983114319375105773",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-plrs0%40scrubhub-24321.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

const firestore = admin.firestore();

const types = [
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

let cardioTopics = [
  "atrial fibrillation",
  "test topic2",
  "acute pericarditis",
  "av block (1st, 2nd, and 3rd degree blocks)",
  "left or right bundle branch block",
  "left right bundle branch block",
  "cardiac arrest",
  "sick sinus syndrome",
  "wolff-parkinson-white syndrome",
  "prolonged qt syndrome",
  "carotid sinus hypersensitivity",
  "chordae tendineae ruptur",
  "congestive heart failure",
  "cor pulmonale",
  "diastolic dysfunction",
  "viral cardiomyopathy",
  "systolic dysfunction",
  "mitral valve dysfunction",
  "heart failure secondary to myocardial infarction",
  "cardiogenic pulmonary edema",
  "alcoholic cardiomyopathy",
  "acute coronary syndrome",
  "ventricular free wall rupture post myocardial infarction",
  "acute myocardial infarction",
  "angina pectoris (stable and unstable)",
  "myocarditis",
  "coronary artery spasm",
  "cardiomyopathy, dilated",
  "pericardial effusion",
  "ventricular free wall rupture post-myocardial infarction",
  "chronic constrictive pericarditis",
  "pericardial tamponade",
];

let pulmonaryTopics = [
  "coronaviruses",
  "influenza virus",
  "parainfluenza virus",
  "rhinoviruses",
  "sinusitis",
  "nasopharyngitis",
  "epiglottitis",
  "bordetella pertussis pneumonia",
  "croup",
  "acute laryngitis",
  "acute laryngotracheitis",
  "tracheitis",
  "pharyngitis",
  "streptococcal throat infections",
  "tonsillitis",
  "peritonsillar abscess",
  "rhinitis, allergic",
  "rhinitis, chronic",
  "hospital-acquired pneumonia",
  "ventilator-associated pneumonia",
  "community-acquired pneumonia",
  "acute bronchiolitis",
  "bronchiolitis obliterans with organizing pneumonia (boop)",
  "anthrax, pulmonary (bacillus anthracis)",
  "aspiration pneumonia",
  "aspiration pneumonitis",
  "bronchitis, acute",
  "acute upper respiratory infection",
  "nontraumatic tamponade post-myocardial infarction",
  "coxsackievirus",
];

let gastroTopics = ["test topic3"];

let dataPool = [
  { cardiovascular: cardioTopics },
  { gastrointestinal: gastroTopics },
  { pulmonary: pulmonaryTopics },
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomQuesArrayForDailyChallenge = (array) => {
  let arr = [];
  for (let i = 0; i < 15; i++) {
    let index = Math.floor(Math.random() * array.length);
    arr.push({
      system: Object.keys(array[index])[0],
      type: getRandomItem(types),
      subTopic: getRandomItem(array[index][Object.keys(array[index])[0]]),
    });
  }
  return arr;
};

const fetchDailyChallenge = async () => {
  let questionsToFetch = getRandomQuesArrayForDailyChallenge(dataPool);
  const dailyChallengeQuestions = [];
  const topicRef = firestore.collection("Questions");

  for (let i = 0; i < questionsToFetch.length; i++) {
    if (questionsToFetch[i].subTopic !== null) {
      const questionsRef = topicRef
        .doc(questionsToFetch[i].system)
        .collection(questionsToFetch[i].subTopic)
        .where("questionStyle", "==", questionsToFetch[i].type)
        .limit(1);
      const querySnapshot = await questionsRef.get();
      const questionDocs = querySnapshot.docs;

      if (questionDocs.length > 0) {
        dailyChallengeQuestions.push(questionDocs[0].data());
      }else{
        console.log(questionsToFetch[i]);
        
      }
    }
  }


  return {dailyChallengeQuestions,questionsToFetch};
};

async function logErrorToFirestore(errorMessage) {
  const errorRef = firestore.collection("errorLogs");
  await errorRef.add({
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    error: errorMessage,
  });
}

async function updateDailyChallenge() {
  try {
    const { dailyChallengeQuestions, questionsToFetch } = await fetchDailyChallenge();
    const selectedQuestions = dailyChallengeQuestions   

    // If selectedQuestions are less than 15, log error & throw to fail GitHub Actions
    if (selectedQuestions?.length < 15) {
      const errorMessage = `🚨 Daily Challenge Update Failed: Only ${selectedQuestions.length} questions found, but at least 15 are required. 
      - Questions to fetch: ${JSON.stringify(questionsToFetch, null, 2)}
      - Action: Skipping database update & failing GitHub Action.`;

      await logErrorToFirestore(errorMessage);
      throw new Error(errorMessage); //  GitHub Actions will fail
    }

    const collectionRef = firestore.collection("dailyChallenge");
    const snapshot = await collectionRef.get();

    // Delete existing documents
    for (const doc of snapshot.docs) {
      await doc.ref.delete();
    }

    // Add new questions
    await collectionRef.add({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdVia: "GitHub Actions",
      questions: selectedQuestions,
    });

    console.log("dailyChallenge collection updated successfully.");
  } catch (error) {
    console.error("Error updating dailyChallenge collection:", error);
    await logErrorToFirestore(error.message);
    process.exit(1);
  }
}

// Call the function
updateDailyChallenge();
