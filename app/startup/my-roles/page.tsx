"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

type Role = {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  expiry_date: string | null;
  created_at: string;
};

export default function MyRolesPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const created = searchParams.get("created");

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (created === "1") {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }, [created]);

  useEffect(() => {
    async function loadRoles() {
      const { data: { user }} = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data, error } = await supabase
        .from("startup_role")
        .select("*")
        .eq("startup_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setRoles(data as Role[]);
      setLoading(false);
    }

    loadRoles();
  }, []);

  if (loading)
    return <div className="text-blue-200 text-center p-10">Loading roles...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 p-10 text-white">

      {showMessage && (
        <div className="p-4 mb-5 bg-green-600/80 border border-green-400 rounded-xl text-center text-lg font-medium">
          🎉 Role created successfully!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">My Roles</h1>

      {roles.length === 0 ? (
        <p className="text-blue-200">You haven't created any roles yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role.id} className="bg-slate-800/60 p-6 rounded-xl border border-blue-700/40">
              <h2 className="text-xl font-bold mb-2">{role.title}</h2>
              <p className="text-blue-200 mb-3 line-clamp-3">{role.description}</p>

              <p className="text-sm text-blue-300">
                Required skills: {role.required_skills.join(", ")}
              </p>

              {role.expiry_date && (
                <p className="text-blue-400 text-sm mt-1">
                  Deadline: {new Date(role.expiry_date).toLocaleDateString()}
                </p>
              )}

              <button
                onClick={() => router.push(`/startup/roles/${role.id}`)}
                className="mt-4 w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                View Applicants
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
