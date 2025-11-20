"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email to confirm your account.");
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setSuccess("");

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
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center px-6 py-12">
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-2">
          Insternship
        </h1>
        <p className="text-blue-200 text-lg">Start your journey right now!</p>
      </div>

      {/* Sign Up Card */}
      <div className="group relative w-full max-w-md">
        {/* Animated Border */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>

        <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-blue-200">
              Sign up to get started with your journey
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
              Sign up with Google
            </button>
          </div>

          {/* Visual Separator */}
          <div className="relative flex items-center mb-6">
            <div className="grow border-t border-blue-600/30"></div>
            <span className="shrink mx-4 text-blue-300 text-sm">
              or continue with email
            </span>
            <div className="grow border-t border-blue-600/30"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* ROLE SELECTION */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                I am a
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student" className="text-gray-900">
                    🎓 Student
                  </option>
                  <option value="startup" className="text-gray-900">
                    🚀 Startup
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Email
              </label>
              <input
                type="email"
                placeholder="youremail@example.com"
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
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* REPEAT PASSWORD */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Repeat Password
              </label>
              <input
                type="password"
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Confirm your password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>

            {/* ERROR/SUCCESS MESSAGES */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-sm text-center">{success}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="
                w-full py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white 
                font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 
                hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-blue-400/30
              "
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="text-center mt-6 pt-6 border-t border-blue-600/30">
            <p className="text-blue-200">
              Already have an account?{" "}
              <a
                href="/student/login"
                className="text-blue-300 underline hover:text-white transition-colors duration-300"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
