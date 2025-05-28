import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your Firebase config here:
const firebaseConfig = {
  apiKey: "AIzaSyBJTLujaOfVZK0ty2H0e-9ILv_ujm88fKQ",
  authDomain: "expense-tracker-53caa.firebaseapp.com",
  projectId: "expense-tracker-53caa",
  storageBucket: "expense-tracker-53caa.appspot.com",
  messagingSenderId: "1067053947799",
  appId: "1:1067053947799:web:b6d9995271f45dbeeec2d2"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User Info:", user);
        alert(`Welcome ${user.displayName}`);
        // Navigate to home or dashboard here
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Sign in to Expense Tracker</h2>
      <button
        onClick={signInWithGoogle}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
