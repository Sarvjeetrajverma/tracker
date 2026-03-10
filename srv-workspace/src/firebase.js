
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REPLACE THIS OBJECT WITH THE ONE FIREBASE GAVE YOU IN STEP 1
const firebaseConfig = {
  apiKey: "AIzaSyCKFNfuk7nP4R04xWSWNbuZ8D6ga26ahR4",
  authDomain: "tracker-232b5.firebaseapp.com",
  projectId: "tracker-232b5",
  storageBucket: "tracker-232b5.firebasestorage.app",
  messagingSenderId: "103546882464",
  appId: "1:103546882464:web:920df93bce1340fa8bbcc5",
  measurementId: "G-40XTJJ2407"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);