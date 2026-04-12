import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC7AQYHWlh8WuA3LHzhMzOKemw7Mrk-CXY",
  authDomain: "lost-and-found-new-de739.firebaseapp.com",
  projectId: "lost-and-found-new-de739",
  storageBucket: "lost-and-found-new-de739.firebasestorage.app",
  messagingSenderId: "551555933070",
  appId: "1:551555933070:web:098168ba1bfe6ac6573adf",
  measurementId: "G-K2KQJ7METM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);