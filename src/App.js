// App.js
import React, { useEffect, useState } from "react";
import {
  auth,
  provider,
  db
} from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import "./theme.css";

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // name for signup
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              name: firebaseUser.displayName || name || "Anonymous",
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL || "",
              uid: firebaseUser.uid,
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          if (error.code === "unavailable" || error.message.includes("offline")) {
            console.warn("Firebase offline. Skipping getDoc.");
          } else {
            console.error("Unexpected Firebase error:", error);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [name]);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
  };

  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.error("Logout Error:", error);
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

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              className="auth-input"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" onClick={handleEmailAuth}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p
            onClick={() => setIsSignup(!isSignup)}
            style={{ cursor: "pointer", color: "#00bcd4", marginTop: "10px" }}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </p>

          <div style={{ margin: "20px 0", textAlign: "center" }}>— or —</div>

          <button className="google-button" onClick={loginWithGoogle}>
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
      <Navbar
        user={user}
        logout={logout}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <Header user={user} />
      <main className="main-content">
        <Dashboard user={user} logout={logout} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
