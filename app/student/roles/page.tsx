"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
onClick={() => router.push(`/student/role-detail/${role.id}`)}


type Role = {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  optional_skills: string[];
  location: string;
  experience_level: string;
  availability: string;
  expiry_date: string;
  startup_id: string;
};

export default function StudentRolesPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: profile } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      setStudent(profile);

      const { data } = await supabase
        .from("startup_role")
        .select("*")
        .order("created_at", { ascending: false });

      setRoles(data || []);
    }
    load();
  }, []);

  function score(role: Role) {
    if (!student) return 0;

    let total = 0;

    // Required skills match (70% weight)
    const reqMatch = role.required_skills.filter(s => student.skills?.includes(s)).length;
    const reqScore = (reqMatch / role.required_skills.length) * 70;
    total += reqScore;

    // Optional skills match (+10%)
    const optMatch = role.optional_skills.filter(s => student.skills?.includes(s)).length;
    const optScore = Math.min(optMatch * 5, 10);
    total += optScore;

    // Location (+5)
    if (student.location === role.location) total += 5;

    // Availability (+5)
    if (student.availability === role.availability) total += 5;

    // Experience (+5)
    if (student.experience_level === role.experience_level) total += 5;

    return Math.round(total);
  }

  return (
    <div className="min-h-screen px-8 py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Available Roles</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {roles.map(role => (
          <div key={role.id} className="bg-slate-800/50 p-6 rounded-xl border border-blue-700/30 backdrop-blur">
            
            <h2 className="text-2xl font-bold">{role.title}</h2>
            <p className="text-blue-300 mt-2 line-clamp-2">{role.description}</p>

            <p className="mt-3 text-blue-200">
              <b>Match Score:</b> 
              <span className="text-blue-400 text-xl ml-2">{score(role)}%</span>
            </p>

            <p className="text-sm text-blue-300 mt-1">
              Deadline: {role.expiry_date ?? "N/A"}
            </p>

            <button
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-medium"
              onClick={() => router.push(`/student/roles/${role.id}`)}
            >
              View & Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
