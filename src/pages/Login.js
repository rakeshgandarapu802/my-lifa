import React, { useState } from "react";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(""); // feedback message

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("❌ Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg("✅ " + data.message);

        // Save token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect after 1 second
        setTimeout(() => {
          window.location.href = "/donors";
        }, 1000);
      } else {
        setMsg("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">Login</h2>

        {msg && <p className="login-msg">{msg}</p>}

        <form onSubmit={loginUser}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="submit-btn">
            Login
          </button>

          <div className="extra-links">
            <a href="/forget">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
