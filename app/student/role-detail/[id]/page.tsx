"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function ViewRolePage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const params = useParams();

  const [role, setRole] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push("/login");

    // fetch role info
    const { data: roleRow } = await supabase
      .from("startup_role")
      .select("*")
      .eq("id", params.id)
      .single();

    // fetch student profile
    const { data: profile } = await supabase
      .from("student_profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!roleRow || !profile) return;

    setRole(roleRow);
    setStudent(profile);

    // PREP Answers array based on question count
    setAnswers(new Array(roleRow.additional_questions.length).fill(""));

    // calculate match score
    calculateMatch(profile, roleRow);

    setLoading(false);
  }

  function calculateMatch(s: any, r: any) {
    let score = 0;

    const reqMatches = s.skills.filter((x: string) => r.required_skills.includes(x)).length;
    score += (reqMatches / r.required_skills.length) * 70; // required = 70%

    const optMatches = s.skills.filter((x: string) => r.optional_skills.includes(x)).length;
    if (optMatches > 0) score += 10; // optional = +10%

    if (s.location === r.location) score += 5;
    if (s.availability === r.availability) score += 5;
    if (s.experience_level === r.experience_level) score += 5;

    setMatchScore(Math.round(score));
  }

  async function submitApplication() {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("role_application").insert({
      role_id: role.id,
      student_id: user.id,
      answers,
      match_score: matchScore
    });

    if (error) return alert("❌ Failed to apply");
    alert("Application submitted! 🎉");
    router.push("/student/applications");
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white p-10 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-2">{role.title}</h1>
      <p className="text-blue-300 mb-6">{role.description}</p>

      <div className="p-4 mb-6 bg-slate-800/50 rounded-xl border border-blue-700/40">
        <p>Required Skills: {role.required_skills.join(", ")}</p>
        <p>Optional Skills: {role.optional_skills.join(", ")}</p>
        <p>Location: {role.location}</p>
        <p>Experience: {role.experience_level}</p>
        <p className="text-green-400 font-bold mt-3 text-lg">
          Match Score: {matchScore}%
        </p>
      </div>

      {/* Startup Additional Questions */}
      {role.additional_questions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Application Questions</h2>

          {role.additional_questions.map((q: string, i: number) => (
            <div key={i} className="mb-4">
              <p className="mb-2 text-blue-200">{q}</p>
              <textarea
                className="w-full p-3 bg-white/10 rounded-lg border border-blue-700/30"
                value={answers[i]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[i] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={submitApplication}
        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-lg font-semibold"
      >
        Apply Now 🚀
      </button>
    </div>
  );
}
