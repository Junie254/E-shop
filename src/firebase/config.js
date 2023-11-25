import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBeJs86nAD5xPjdQvtk61b4eRbuQflRotY",
  authDomain: "junie254-db4f3.firebaseapp.com",
  projectId: "junie254-db4f3",
  storageBucket: "junie254-db4f3.appspot.com",
  messagingSenderId: "1024006194684",
  appId: "1:1024006194684:web:23872e0598604c8f4ade79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
