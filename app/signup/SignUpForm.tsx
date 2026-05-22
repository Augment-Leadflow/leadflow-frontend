"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  //const phoneRegex = /^[0-9]{10}$/;
  const phoneRegex = /^\+\d{10,15}$/;

  if (!phoneRegex.test(phone)) {
    setError("Please enter a valid 10-digit phone number");
    return;
  }

  // Password length validation
  if (password.length < 8) {
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

  const res = await fetch("http://localhost:8080/api/auth/register", {
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

//localStorage.setItem("token", data.token); 
//router.push("/dashboard");
router.push("/login");

console.log("Signup Success", data);

} catch (err: any) {
  setError(err.message || "Something went wrong");
} finally {
  setLoading(false);
}
};
return (
  <div
    className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      px-6
      py-10
      bg-gradient-to-br
      from-violet-950
      via-purple-900
      to-fuchsia-800
      relative
      overflow-hidden
    "
  >
    {/* Background Blur Effects */}
    <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-pink-500/30 blur-3xl rounded-full"></div>

    <div className="absolute bottom-[-150px] right-[-120px] w-[28rem] h-[28rem] bg-violet-500/30 blur-3xl rounded-full"></div>

    <div className="absolute top-[40%] left-[45%] w-72 h-72 bg-fuchsia-500/20 blur-3xl rounded-full"></div>

    {/* Form Container */}
    <form
      onSubmit={handleSubmit}
      className="
        relative
        z-10
        w-full
        max-w-md
        p-5
        md:p-6
        rounded-[24px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
        Create Account
      </h2>

      <p className="text-center text-white/70 mb-6 text-sm">
        Sign up to continue
      </p>

      {/* Form Fields */}
      <div className="space-y-4">

        {/* Email */}
        <div>
          <label className="block mb-2 text-white font-medium text-sm">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              text-sm
              placeholder:text-white/50
              outline-none
              focus:border-pink-400
              focus:bg-white/15
              transition-all
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-white font-medium text-sm">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter your phone number"
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              text-sm
              placeholder:text-white/50
              outline-none
              focus:border-pink-400
              focus:bg-white/15
              transition-all
            "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-white font-medium text-sm">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                text-sm
                placeholder:text-white/50
                outline-none
                focus:border-pink-400
                focus:bg-white/15
                transition-all
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-white/70
                hover:text-white
                transition-all
              "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-white font-medium text-sm">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                text-sm
                placeholder:text-white/50
                outline-none
                focus:border-pink-400
                focus:bg-white/15
                transition-all
              "
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-white/70
                hover:text-white
                transition-all
              "
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-300 text-center text-sm mt-4">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          mt-6
          py-3
          rounded-xl
          text-white
          text-base
          font-semibold
          shadow-xl
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-pink-500/40
          active:scale-[0.98]
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              #7c3aed 0%,
              #9333ea 40%,
              #c026d3 100%
            )
          `,
        }}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>

      {/* Footer */}
      <p className="text-center mt-5 text-white/70 text-sm">
        Already have an account?{" "}

        <Link
          href="/login"
          className="
            text-pink-300
            hover:text-pink-200
            hover:underline
            transition-all
          "
        >
          Login
        </Link>
      </p>
    </form>
  </div>
);
}