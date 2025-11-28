"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function ApplyPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const { roleId } = useParams() as { roleId: string };

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<any>(null);
  const [startup, setStartup] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user }} = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      // Load student profile
      const { data: studentRow } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!studentRow) return router.push("/student/profile");
      setStudent(studentRow);

      // Load role data
      const { data: roleRow } = await supabase
        .from("startup_role")
        .select("*")
        .eq("id", roleId)
        .single();

      if (!roleRow) return;

      setRole(roleRow);
      setAnswers(new Array(roleRow.additional_questions?.length || 0).fill(""));

      // Load startup info
      const { data: startupRow } = await supabase
        .from("startup_profile")
        .select("startup_name, industry, location")
        .eq("id", roleRow.startup_id)
        .single();

      setStartup(startupRow);
      setLoading(false);
    }

    load();
  }, []);

  // -------- APPLY FUNCTION (FIXED) -------- //
  async function apply() {
    const { data: { user }} = await supabase.auth.getUser();

    // TypeScript-safe user guard ✔
    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("role_application").insert({
      role_id: roleId,
      student_id: user.id, // Now safe
      answers
    });

    if (error) {
      console.error(error);
      return alert("Something went wrong");
    }

    router.push("/student/applications?applied=1");
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen p-10 text-white bg-linear-to-br from-slate-900 via-blue-900 to-slate-800">
      
      {/* Role Header */}
      <h1 className="text-4xl font-bold">{role.title}</h1>
      <p className="text-blue-300">{startup?.startup_name} • {role.location}</p>
      <p className="mt-3 max-w-2xl">{role.description}</p>

      {/* Required Skills */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Required Skills</h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {role.required_skills.map((s: string) => (
            <span key={s} className="px-2 py-1 bg-blue-600/20 border border-blue-400 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Questions */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Application Questions</h2>
        {role.additional_questions?.length === 0 && <p>No questions, just submit.</p>}

        {role.additional_questions?.map((q: string, i: number) => (
          <div key={i} className="mb-6">
            <p className="mb-2 text-blue-200">{q}</p>
            <textarea
              className="p-3 w-full bg-slate-800 border border-blue-600 rounded-lg"
              placeholder="Write your answer..."
              value={answers[i]}
              onChange={(e) => {
                const copy = [...answers];
                copy[i] = e.target.value;
                setAnswers(copy);
              }}
            />
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={apply}
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Application
      </button>
    </div>
  );
}
