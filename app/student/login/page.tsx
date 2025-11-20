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

<<<<<<< HEAD
  async function handleGoogleSignIn() {
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center px-6 py-12">
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-2">
          Insternship
        </h1>
        <p className="text-blue-200 text-lg">
          Connect with your perfect startup opportunity
        </p>
      </div>

      {/* Login Card */}
      <div className="group relative w-full max-w-md">
        {/* Animated Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>

        <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-200">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="
                w-full py-3.5 bg-white/10 backdrop-blur-sm border border-blue-600/30 
                text-blue-200 rounded-xl flex items-center justify-center font-semibold
                hover:bg-white/20 hover:border-blue-500/50 hover:text-white
                transition-all duration-300 hover:scale-105
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="mr-3"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Visual Separator */}
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-blue-600/30"></div>
            <span className="flex-shrink mx-4 text-blue-300 text-sm">
              or continue with email
            </span>
            <div className="flex-grow border-t border-blue-600/30"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Email
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-blue-300 text-sm hover:text-white transition-colors duration-300"
              >
                Forgot your password?
              </a>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="
                w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 
                hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-blue-400/30
              "
            >
              Sign In
            </button>
          </form>

          {/* SIGNUP LINK */}
          <div className="text-center mt-6 pt-6 border-t border-blue-600/30">
            <p className="text-blue-200">
              Don't have an account?{" "}
              <a
                href="/student/signup"
                className="text-blue-300 underline hover:text-white transition-colors duration-300"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
=======
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
>>>>>>> c7c67afa078228f7bde1ae0c2b800036c11a9d72
    </main>
  );
}
