// App.js
import React, { useEffect, useState } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);

      const userDocRef = doc(db, "users", user.uid);

      try {
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        // ⚠️ Handle Firebase offline or other errors silently
        if (error.code === "unavailable" || error.message.includes("offline")) {
          console.warn("Firebase is offline. Skipping getDoc.");
        } else {
          console.error("Unexpected Firebase error:", error);
        }
      }
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);


  const login = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Login Success");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-heading">
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px #00bcd4",
                fontSize: "2.5rem",
              }}
            >
              💸
            </span>
            PrecisionSpend
          </h1>
          <button className="google-button" onClick={login}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="google-logo"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar user={user} logout={logout} />
      <Header user={user} />
      <main className="main-content">
        <Dashboard user={user} logout={logout} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
