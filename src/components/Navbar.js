import React from "react";
import '../App.css';

const Navbar = ({ user, logout, toggleDarkMode, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
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
      </div>

      <div className="navbar-right">
        <span className="navbar-user">👤 {user.displayName}</span>

        <button className="mode-toggle-button" onClick={toggleDarkMode}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="avatar"
            className="user-avatar"
            style={{ marginLeft: "10px", borderRadius: "50%", width: "35px", height: "35px" }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
