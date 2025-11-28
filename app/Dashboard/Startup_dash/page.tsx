"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

type StartupProfile = {
  id: string;
  startup_name: string | null;
  industry: string | null;
  location: string | null;
  team_size: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
};

export default function StartupDashboardPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: row, error } = await supabase
        .from("startup_profile")
        .select("*")
        .eq("id", user.id)
        .single<StartupProfile>();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading startup profile", error);
      }

      // If no row → force profile creation
      if (!row) {
        router.push("/startup/profile");
        return;
      }

      // Check required fields
      const missing =
        !row.startup_name ||
        !row.industry ||
        !row.location ||
        !row.team_size ||
        !row.description;

      if (missing) {
        router.push("/startup/profile");
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

<nav className="space-y-2">
  {/* View Profile Button */}
  <button
    onClick={() => router.push("/startup/profile")}
    className="w-full flex items-center space-x-3 p-3 rounded-xl text-left 
               bg-blue-500/20 text-white border border-blue-500/30 
               transition-all duration-300">
    <span className="text-lg">🏢</span>
    {sidebarOpen && <span className="font-medium">Startup Profile</span>}
  </button>

  {/* Create Role Button */}
  <button
    onClick={() => router.push("/startup/create-role")}
    className="w-full flex items-center space-x-3 p-3 rounded-xl text-left 
               bg-green-500/20 text-white border border-green-500/30 
               transition-all duration-300 hover:bg-green-500/30">
    <span className="text-lg">📝</span>
    {sidebarOpen && <span className="font-medium">Create Role</span>}
  </button>

  {/* View Roles Button (future use, optional) */}
  <button
    onClick={() => router.push("/startup/my-roles")}
    className="w-full flex items-center space-x-3 p-3 rounded-xl text-left 
               bg-purple-500/20 text-white border border-purple-500/30 
               transition-all duration-300 hover:bg-purple-500/30">
    <span className="text-lg">📄</span>
    {sidebarOpen && <span className="font-medium">My Roles</span>}
  </button>
</nav>


          <div className="mt-8 pt-6 border-t border-blue-700/30">
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {profile?.startup_name?.charAt(0).toUpperCase()}
              </div>

              {sidebarOpen && (
                <div>
                  <p className="text-white text-sm font-medium truncate">
                    {profile?.startup_name}
                  </p>
                  <p className="text-blue-300 text-xs">Startup</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, {profile?.startup_name}!
        </h1>
        <p className="text-blue-200 mb-8">
          Here is your startup overview.
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-700/30 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Startup Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <p className="text-blue-300 text-sm">Industry</p>
              <p className="text-white font-medium">{profile?.industry}</p>

              <p className="text-blue-300 text-sm">Location</p>
              <p className="text-white font-medium">{profile?.location}</p>

              <p className="text-blue-300 text-sm">Team Size</p>
              <p className="text-white font-medium">{profile?.team_size}</p>

              {profile?.website && (
                <>
                  <p className="text-blue-300 text-sm">Website</p>
                  <a
                    className="text-blue-400 underline"
                    href={profile.website}
                    target="_blank"
                  >
                    {profile.website}
                  </a>
                </>
              )}
            </div>

            <div>
              <p className="text-blue-300 text-sm mb-2">Description</p>
              <p className="text-blue-100 leading-relaxed">{profile?.description}</p>

              <button
                onClick={() => router.push("/startup/profile")}
                className="px-6 py-3 mt-6 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all"
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
