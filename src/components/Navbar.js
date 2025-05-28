import React from "react";
import '../App.css';

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
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
        <span className="navbar-user">👤 {user.displayName}</span>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
