import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

 

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/register">📝 Registration</Link>
      <Link to="/donors">👥 Donors</Link>
      <Link to="/location">📍 Location</Link>
      <Link to="/info">💉 Information</Link>
      <Link to="/login">🔑 Login</Link>
      <Link to="/about">ℹ️ About</Link>
    </div>
  );
}
