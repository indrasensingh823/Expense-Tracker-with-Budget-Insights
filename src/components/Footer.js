// Footer.js
import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About</h3>
          <p>PrecisionSpend is a smart personal expense tracker that helps you control and optimize your spending efficiently.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: indrasensingh770.com</p>
          <p>Phone: +91-9696817305</p>
          <p>Location: Gorakhpur, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PrecisionSpend. All rights reserved.</p>
        <p>Made with 💖 by <strong>Indrasen Singh</strong></p>
      </div>
    </footer>
  );
}

export default Footer;

