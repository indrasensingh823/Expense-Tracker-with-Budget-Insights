// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// ✅ Always keep these keys in .env file for security (already done)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
});

// ✅ Firebase Authentication setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// ✅ Export everything needed
export { db, auth, provider };
