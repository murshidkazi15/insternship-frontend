"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function RoleDetailPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [role, setRole] = useState<any>(null);
  const [startup, setStartup] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: studentRow } = await supabase
        .from("student_profile").select("*").eq("id", user.id).single();
      setStudent(studentRow);

      const { data: roleRow } = await supabase
        .from("startup_role").select("*").eq("id", id).single();
      setRole(roleRow);

      setAnswers(new Array(roleRow?.additional_questions?.length || 0).fill(""));

      const { data: startupRow } = await supabase
        .from("startup_profile").select("*").eq("id", roleRow?.startup_id).single();
      setStartup(startupRow);

      setLoading(false);
    }

    load();
  }, []);

  async function apply() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const userId = user.id;

    const { error } = await supabase.from("role_application").insert({
      role_id: id,
      student_id: userId,  
      answers,
      match_score: 0
    });

    if (error) {
      console.error(error);
      return alert("Something went wrong");
    }

    router.push("/student/applications?applied=1");
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen p-10 text-white bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">

      <h1 className="text-4xl font-bold">{role.title}</h1>
      <p className="text-blue-300">{startup?.startup_name} • {role.location}</p>
      <p className="mt-3 max-w-2xl">{role.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Required Skills</h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {role.required_skills?.map((s: string) => (
            <span key={s} className="px-2 py-1 bg-blue-600/20 border border-blue-400 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Application Questions</h2>

        {role.additional_questions?.map((q: string, i: number) => (
          <div key={i} className="mb-6">
            <p className="mb-2 text-blue-200">{q}</p>
            <textarea
              className="p-3 w-full bg-slate-800 border border-blue-600 rounded-lg"
              placeholder="Write your answer..."
              value={answers[i]}
              onChange={(e) => {
                const updated = [...answers];
                updated[i] = e.target.value;
                setAnswers(updated);
              }}
            />
          </div>
        ))}
      </div>

      <button
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={apply}
      >
        Submit Application
      </button>
    </div>
  );
}
