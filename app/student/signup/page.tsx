"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }
  return (
    <main className="min-h-screen bg-[#eef3ff] flex flex-col items-center pt-16 px-6">

      {/*Insternship at the top  */}
      <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
        Insternship
      </h1>
      <p className="text-gray-600 mb-10">
        Start your journey right now!
      </p>

      {/* CARD to put the whole sign up page */}
      <div
        className="
          bg-white p-10 rounded-2xl shadow-lg w-full max-w-md 
        "
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Create Account</h2>
        <p className="text-gray-600 mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
{/*Google Sign-In Button (outside the form) */}
        <div className="mb-6">
            <button
                type="button" 
                onClick={handleGoogleSignIn}
                className="
                    w-full py-3 bg-white border border-gray-300 text-gray-700 
                    rounded-lg flex items-center justify-center font-semibold
                    hover:bg-gray-50
                "
            >
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                Sign up with Google
            </button>
        </div>
        
        {/* Visual separator for UX */}
        <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
          {/* ROLE SELECTION */}
          <div>
            <label className="text-black block font-medium mb-1">I am a</label>
            <select
              className="w-full p-3 border rounded-lg text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">🎓Student</option>
              <option value="startup">🚀Startup</option>
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-black block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder= "youremail@example.com"
              className="text-black w-full p-3 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-black block font-medium mb-1">Password</label>
            <input
              type="password"
              className="text-black w-full p-3 border rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* REPEAT PASSWORD */}
          <div>
            <label className="text-black block font-medium mb-1">
              Repeat Password
            </label>
            <input
              type="password"
              className="text-black w-full p-3 border rounded-lg"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR/SUCCESS */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">
              {success}
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
            Sign up
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <a href="/student/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
