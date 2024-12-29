import { getFirestore } from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8Gsqw6VwOnkv0Y25t45gyracwOIkroMA",
  authDomain: "scrubhub-24321.firebaseapp.com",
  projectId: "scrubhub-24321",
  storageBucket: "scrubhub-24321.firebasestorage.app",
  messagingSenderId: "22327794740",
  appId: "1:22327794740:web:af00121efcb75370e93e61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
