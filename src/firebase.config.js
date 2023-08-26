// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIqAAw-MHrHB75QK6Owq1JtrV_R4psts0",
  authDomain: "house-market-47f5d.firebaseapp.com",
  projectId: "house-market-47f5d",
  storageBucket: "house-market-47f5d.appspot.com",
  messagingSenderId: "341974701677",
  appId: "1:341974701677:web:2081b47f54570fe8441164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();