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

  useEffect(() => {
    async function load() {
      // 1. check auth
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 2. load profile for this user
      const { data: row, error } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single<ProfileRow>();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile", error);
      }

      // no profile row → go to profile page
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

      // profile is complete → show dashboard
      setProfile(row);
      setLoading(false);
    }

    load();
  }, [router, supabase]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p className="mt-2">Welcome, {profile?.full_name}</p>
      
    </div>
  );
}
