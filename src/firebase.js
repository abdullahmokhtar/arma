import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
export default app;
