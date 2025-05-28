// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJTLujaOfVZK0ty2H0e-9ILv_ujm88fKQ",
  authDomain: "expense-tracker-53caa.firebaseapp.com",
  projectId: "expense-tracker-53caa",
  storageBucket: "expense-tracker-53caa.firebasestorage.app",
  messagingSenderId: "1067053947799",
  appId: "1:1067053947799:web:b6d9995271f45dbeeec2d2",
  measurementId: "G-H5QEQ1JW00"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
