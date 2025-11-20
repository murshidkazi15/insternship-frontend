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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: row, error } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single<ProfileRow>();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile", error);
      }

      if (!row) {
        router.push("/student/profile");
        return;
      }

      const missingRequired =
        !row.full_name ||
        !row.location ||
        !row.experience_level ||
        !row.availability ||
        !row.skills ||
        row.skills.length === 0;

      if (missingRequired) {
        router.push("/student/profile");
        return;
      }

      setProfile(row);
      setLoading(false);
    }

    load();
  }, [router, supabase]);

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
      {/* Sidebar */}
      <div
        className={`bg-slate-800/50 backdrop-blur-sm border-r border-blue-700/30 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-linear-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Insternship
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          </div>

          {/* Navigation - Only Profile */}
          <nav className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-left bg-blue-500/20 text-white border border-blue-500/30 transition-all duration-300">
              <span className="text-lg">👤</span>
              {sidebarOpen && <span className="font-medium">Profile</span>}
            </button>
          </nav>

          {/* User Profile */}
          <div className="mt-8 pt-6 border-t border-blue-700/30">
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                {profile?.full_name?.charAt(0).toUpperCase()}
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {profile?.full_name}
                  </p>
                  <p className="text-blue-300 text-xs">Student</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-blue-200">
            Your profile is complete and ready for matching.
          </p>
        </div>

        {/* Profile Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Profile Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-blue-200 font-medium mb-3">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-300 text-sm">Full Name</p>
                    <p className="text-white font-medium">
                      {profile?.full_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm">Location</p>
                    <p className="text-white font-medium">
                      {profile?.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm">Experience Level</p>
                    <p className="text-white font-medium">
                      {profile?.experience_level}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm">Availability</p>
                    <p className="text-white font-medium">
                      {profile?.availability}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-blue-200 font-medium mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className="text-blue-200 font-medium mb-3">Bio</h3>
                  <p className="text-blue-100 leading-relaxed">{profile.bio}</p>
                </div>
              )}

              <button
                onClick={() => router.push("/student/profile")}
                className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-400/30 w-auto"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
