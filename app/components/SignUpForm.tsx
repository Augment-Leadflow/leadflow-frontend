"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignUpForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  setError("");

  // Empty fields validation
  if (!email || !phone || !password || !confirmPassword) {
    setError("Please fill all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email");
    return;
  }

  // Phone validation (10 digits)
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    setError("Please enter a valid 10-digit phone number");
    return;
  }

  // Password length validation
  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  // Password match validation
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
  setLoading(true);

  const res = await fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      phone,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {

  // Duplicate Email
  if (data.message?.includes("email")) {
    throw new Error("Email already exists");

  }

  // Duplicate Phone
  if (data.message?.includes("phone")) {
    throw new Error("Phone number already exists");
  }

  // Validation Errors
  if (data.message) {
    throw new Error(data.message);
  }

  // Default Error
  throw new Error("Signup failed");
}

localStorage.setItem("token", data.token);
router.push("/dashboard");

console.log("Signup Success", data);

} catch (err: any) {
  setError(err.message || "Something went wrong");
} finally {
  setLoading(false);
}
};

  return (
   <form
  onSubmit={handleSubmit}
  className="bg-white p-8 w-full max-w-md rounded-2xl shadow-lg"
>
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
        Create Account
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Sign up to continue
      </p>

      {/* Email */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Phone Number
        </label>

        <input
          type="text"
          placeholder="Enter your phone number"
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && (
  <p className="text-red-500 text-sm text-center mb-4">
    {error}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-400"
>
  {loading ? "Creating Account..." : "Sign Up"}
</button>

  <p className="text-center mt-5 text-gray-500 text-sm">
  Already have an account?{" "}

  <Link
    href="/login"
    className="text-blue-600 hover:underline"
  >
    Login
  </Link>
</p>
    </form>
  );
}