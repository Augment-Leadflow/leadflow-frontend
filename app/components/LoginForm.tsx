"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./LoginForm.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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

  <div className="password-wrapper">

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className="login-input"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      className="eye-button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

  </div>
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

     <p className="text-center mt-5 text-gray-500 text-sm">
  Don’t have an account?{" "}

  <Link
    href="/signup"
    className="text-blue-600 hover:underline"
  >
    Sign Up
  </Link>
</p>

    </form>
  </div>
);
}