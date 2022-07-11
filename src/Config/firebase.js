// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoDgnq30oYTuw5PR481Ql_uloh3S-95kM",
  authDomain: "fir-d6917.firebaseapp.com",
  projectId: "fir-d6917",
  storageBucket: "fir-d6917.appspot.com",
  messagingSenderId: "659076839671",
  appId: "1:659076839671:web:7282f807f284d99d6b3bf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
