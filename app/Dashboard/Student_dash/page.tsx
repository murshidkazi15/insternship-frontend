"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

type ProfileRow = {
  id: string;
  full_name: string | null;
  location: string | null;
  experience_level: string | null;
  availability: string | null;
  skills: string[] | null;
  bio: string | null;
  cv_url: string | null;
};

export default function StudentDashboardPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return router.push("/login");

      const { data: row, error } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single<ProfileRow>();

      if (!row) return router.push("/student/profile");

      const missing =
        !row.full_name || !row.location || !row.experience_level ||
        !row.availability || !row.skills?.length;

      if (missing) return router.push("/student/profile");

      setProfile(row);
      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200">Loading your dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex">

      {/* ────────────────── Sidebar ────────────────── */}
      <div className={`bg-slate-800/50 border-r border-blue-700/30 transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-20"}`}>
        
        <div className="p-6">
          
          {/* Logo + collapse button */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-linear-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Insternship
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">

            {/* Profile button */}
            <button
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-white"
              onClick={() => router.push("/student/profile")}
            >
              👤 {sidebarOpen && "Profile"}
            </button>

            {/* NEW — Opportunities */}
            <button
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-500/20 border border-blue-500/30 text-white"
              onClick={() => router.push("/student/opportunities")}
            >
              💼 {sidebarOpen && "Internship Opportunities"}
            </button>

            {/* NEW — Applied roles */}
            <button
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-500/20 border border-blue-500/30 text-white"
              onClick={() => router.push("/student/applications")}
            >
              📄 {sidebarOpen && "My Applications"}
            </button>

            {/* NEW — Saved roles (future use) */}
            <button
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-500/20 border border-blue-500/30 text-white"
              onClick={() => alert("Coming soon!")}
            >
              ⭐ {sidebarOpen && "Saved Internships"}
            </button>

          </nav>

          {/* Mini profile footer */}
          <div className="mt-8 pt-6 border-t border-blue-700/30">
            <div className={`flex items-center ${sidebarOpen ? "gap-3" : "justify-center"}`}>
              
              <div className="w-10 h-10 bg-blue-500/80 rounded-full flex justify-center items-center font-bold text-white">
                {profile?.full_name?.charAt(0).toUpperCase()}
              </div>

              {sidebarOpen && (
                <div>
                  <p className="text-white font-medium">{profile?.full_name}</p>
                  <p className="text-blue-300 text-xs">Student</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ────────────────── Main Dashboard content ────────────────── */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, {profile?.full_name} 👋
        </h1>
        <p className="text-blue-200 mb-8">
          Explore internships recommended for you.
        </p>

        <div className="bg-slate-800/60 p-8 rounded-2xl border border-blue-700/40 backdrop-blur">
          <h2 className="text-blue-100 text-xl font-bold mb-4">Your Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
            <p><b className="text-blue-300">Location:</b> {profile?.location}</p>
            <p><b className="text-blue-300">Experience:</b> {profile?.experience_level}</p>
            <p><b className="text-blue-300">Availability:</b> {profile?.availability}</p>
            <p><b className="text-blue-300">Skills:</b> {profile?.skills?.join(", ")}</p>
          </div>

          <button
            onClick={() => router.push("/student/opportunities")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold"
          >
            Browse Opportunities →
          </button>
        </div>
      </div>
    </div>
  );
}
