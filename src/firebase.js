// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV8J6c4-sYqlV7i07_CDxfE8IOHygXh_0",
  authDomain: "arma-64ebb.firebaseapp.com",
  databaseURL:
    "https://arma-64ebb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arma-64ebb",
  storageBucket: "arma-64ebb.appspot.com",
  messagingSenderId: "1005280350349",
  appId: "1:1005280350349:web:f6814bd951f6aa0b9152c4",
  measurementId: "G-WVC4915L93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getDatabase(app);
export default app;
