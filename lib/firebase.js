// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = {
  apiKey: "AIzaSyDw7pSD6G2lq9LmHEoRw8J2o_fqYTA_46o",
  authDomain: "energyvest.firebaseapp.com",
  projectId: "energyvest",
  storageBucket: "energyvest.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "945479759573",
  appId: "1:945479759573:web:8a02195ce82372a10e145c",
};

// Initialize Firebase
const app = initializeApp(firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);
