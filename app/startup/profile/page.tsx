"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function StartupProfilePage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Fetch profile
      const { data: profile } = await supabase
        .from("startup_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      // No row yet → They must create profile
      if (!profile) {
        setLoading(false);
        return;
      }

      // Check if profile is already complete
      const isComplete =
        profile.startup_name &&
        profile.industry &&
        profile.team_size &&
        profile.location &&
        profile.description;

      if (isComplete) {
        router.push("/Dashboard/Startup_dash");
        return;
      }

      // Prefill values if the row exists
setName(profile.startup_name ?? "");
setIndustry(profile.industry ?? "");
setLocation(profile.location ?? "");
setSize(profile.team_size ?? "");
setWebsite(profile.website ?? "");
setDescription(profile.description ?? "");
setLogoUrl(profile.logo_url ?? "");

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Not logged in");

    const { error } = await supabase
      .from("startup_profile")
      .update({
        startup_name: name,
        industry,
        location,
        team_size: size,
        website,
        description,
        logo_url: logoUrl, // logo is optional for now
      })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      return alert("Error saving profile.");
    }

    router.push("/Dashboard/Startup_dash");
  }

  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200 text-lg">Loading your profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-white via-blue-100 to-blue-50 bg-clip-text text-transparent">
          Create Your Startup Profile
        </h1>
        <p className="text-blue-200 mt-2 max-w-xl text-lg">
          Tell startups who you are — build trust with interns and partners.
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="group relative w-full max-w-3xl">
        {/* Animated Border */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>

        <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 shadow-lg">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Startup Information
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-6">
            {/* Startup Name */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Startup Name *
              </label>
              <input
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="Acme Innovations"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Industry *
              </label>
              <input
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="Technology, Finance, Healthcare..."
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Location *
              </label>
              <input
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="Lisbon, Portugal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Team Size *
              </label>
              <select
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option className="text-gray-900" value="">
                  Select your team size
                </option>
                <option className="text-gray-900" value="1-5">
                  1–5
                </option>
                <option className="text-gray-900" value="6-10">
                  6–10
                </option>
                <option className="text-gray-900" value="11-20">
                  11–20
                </option>
                <option className="text-gray-900" value="21+">
                  21+
                </option>
              </select>
            </div>

            {/* Website */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Website (optional)
              </label>
              <input
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="https://yourstartup.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Logo URL */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Logo URL (optional)
              </label>
              <input
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="https://storage.supabase.co/.../logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                About Your Startup *
              </label>
              <textarea
                className="w-full p-4 bg-white/5 border border-blue-600/30 rounded-xl text-white"
                placeholder="Tell us what your startup does and what makes it special..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Complete Profile & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
