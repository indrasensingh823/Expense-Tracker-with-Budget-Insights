import React from "react";
import '../App.css';

const Header = ({ user }) => {
  return (
    <header className="header">
     <h2>
       Welcome, {user.displayName} <span className="wave">👋</span>
    </h2>

      <p>Track and manage your expenses smartly.</p>
    </header>
  );
};

export default Header;
