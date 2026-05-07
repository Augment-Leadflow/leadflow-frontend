"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./LoginForm.css";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Login failed
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Redirect
      router.push("/dashboard");

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">

      <h2 className="login-title">Welcome Back</h2>

      <p className="login-subtitle">
        Login to your account
      </p>

      <div className="input-group">
        <label className="input-label">Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label">Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="login-button"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <p className="footer-text">
        Don’t have an account?{" "}
        <span className="signup-link">
          Sign Up
        </span>
      </p>

    </form>
  </div>
);
}