"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

type Role = {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  optional_skills: string[];
  experience_level: string;
  location: string;
  availability: string;
  salary_min: number | null;
  salary_max: number | null;
  expiry_date: string | null;
};

export default function OpportunitiesPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("startup_role").select("*");
      if (!error && data) setRoles(data);
      setLoading(false);
    }
    load();
  }, []);

  const cardBg = "bg-slate-800/50 backdrop-blur border border-blue-700/30 shadow-xl rounded-2xl";
  const badge = (score: number) =>
    score >= 70 ? "bg-green-500" :
    score >= 50 ? "bg-yellow-500" : "bg-red-500";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-200">
        Loading opportunities...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-10">
      <h1 className="text-4xl font-bold text-white mb-6">Discover Opportunities</h1>
      <p className="text-blue-200 mb-10 text-lg">
        Find internships aligned with your skills & goals 🚀
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {roles.map((role) => {
          const match = Math.floor(Math.random() * 40) + 60; // temp until matching algo built

          return (
            <div key={role.id} className={`${cardBg} p-6`}>
              
              {/* Title + Match */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-white">{role.title}</h2>
                <span className={`text-white px-3 py-1 rounded-full text-sm ${badge(match)}`}>
                  {match}% Match
                </span>
              </div>

              <p className="text-blue-200 mb-4 line-clamp-2">{role.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {role.required_skills.slice(0,4).map(s => (
                  <span key={s} className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-lg text-sm">
                    {s}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="text-blue-300 space-y-1 mb-5 text-sm">
                <p>📍 Location: {role.location}</p>
                <p>💼 Experience: {role.experience_level}</p>
                <p>⏳ Type: {role.availability}</p>
                {role.salary_min && <p>💰 Salary: €{role.salary_min} - €{role.salary_max}</p>}
                {role.expiry_date && <p>📅 Apply before {role.expiry_date}</p>}
              </div>

              <button
                onClick={() => router.push(`/student/role-detail/${role.id}`)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 font-semibold rounded-xl hover:scale-[1.03] transition-all"
              >
                Apply Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
