"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Read saved role from user_metadata
    const role = data.user?.user_metadata?.role;

    if (role === "student") {
      window.location.href = "/Dashboard/Student_dash";
    } else if (role === "startup") {
      window.location.href = "/Dashboard/Startup_dash";
    } else {
      // fallback if something is wrong
      window.location.href = "/";
    }
  }

  return (
    <main className="min-h-screen bg-[#eef3ff] flex flex-col items-center pt-16 px-6">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-blue-600">
        Insternship
      </h1>
      <p className="text-gray-600 mb-10">
        Connect with your perfect startup opportunity
      </p>

      {/* LOGIN CARD */}
      <div
        className="
          bg-white p-10 rounded-2xl shadow-lg w-full max-w-md 
    
        "
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Login</h2>
        <p className="text-gray-600 mb-6">Enter your email below to login to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div className="">
            <label className="text-black block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="student@example.com"
              className="text-black w-full p-3 border rounded-lg focus:ring-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="">
            <label className="text-black block font-medium mb-1">Password</label>
            <input
              type="password"
              className="text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="">
              {error}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 mt-2 bg-[#1800ad] text-white rounded-lg 
              hover:bg-[#ff3131]
            "
          >
            Login
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <a href="/student/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
