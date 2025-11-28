"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function CreateRolePage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(true);

  // Role fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [optionalSkills, setOptionalSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newOptionalSkill, setNewOptionalSkill] = useState("");

  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const [availability, setAvailability] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const [remoteSupported, setRemoteSupported] = useState(false);

  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  const suggestedSkills = [
    "JavaScript", "React", "Python", "SQL", "UI/UX",
    "Figma", "Node.js", "Data Analysis"
  ];

  // Ensure user is a startup
  useEffect(() => {
    async function verifyStartup() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("startup_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        router.push("/startup/profile");
        return;
      }

      setLoading(false);
    }

    verifyStartup();
  }, []);


  // Add required skills
  function addRequiredSkill(skill: string) {
    const clean = skill.trim();
    if (!clean || requiredSkills.includes(clean)) return;
    setRequiredSkills([...requiredSkills, clean]);
  }

  // Add optional skills
  function addOptionalSkill(skill: string) {
    const clean = skill.trim();
    if (!clean || optionalSkills.includes(clean)) return;
    setOptionalSkills([...optionalSkills, clean]);
  }

  function removeRequired(skill: string) {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  }

  function removeOptional(skill: string) {
    setOptionalSkills(optionalSkills.filter((s) => s !== skill));
  }

  function addQuestion() {
    const clean = newQuestion.trim();
    if (!clean) return;
    setQuestions([...questions, clean]);
    setNewQuestion("");
  }


  // SUBMIT HANDLER
  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Not logged in");

    const { error } = await supabase.from("startup_role").insert({
      startup_id: user.id,
      title,
      description,
      required_skills: requiredSkills,
      optional_skills: optionalSkills,
      experience_level: experience,
      location,
      availability,
      salary_min: salaryMin ? Number(salaryMin) : null,
      salary_max: salaryMax ? Number(salaryMax) : null,
      expiry_date: expiryDate || null,
      remote_supported: remoteSupported,
      additional_questions: questions,
    });

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return alert("Error creating role");
    }

router.push("/startup/my-roles?created=1");

  }


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 p-10 flex justify-center">
      <div className="w-full max-w-3xl bg-slate-800/50 p-8 rounded-2xl border border-blue-700/30 backdrop-blur">

        <h1 className="text-3xl font-bold text-white mb-6">Create a New Role</h1>

        <div className="space-y-6">

          {/* Title */}
          <div>
            <label className="text-blue-200 mb-2 block">Role Title *</label>
            <input
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
              placeholder="Frontend Intern"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-blue-200 mb-2 block">Description *</label>
            <textarea
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
              placeholder="Describe the responsibilities, expectations..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="text-blue-200 mb-2 block">Required Skills *</label>

            <div className="flex flex-wrap gap-2 mb-3">
              {requiredSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-2 bg-blue-500/20 border border-blue-500/40 rounded-lg text-blue-200 cursor-pointer"
                  onClick={() => removeRequired(s)}
                >
                  {s} ✕
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full p-3 bg-white/5 border border-blue-700/40 rounded-xl text-white"
                placeholder="Add a required skill"
              />
              <button
                onClick={() => { addRequiredSkill(newSkill); setNewSkill(""); }}
                className="px-4 bg-blue-600 rounded-xl text-white"
              >
                Add
              </button>
            </div>

            <p className="text-blue-300 mt-3 text-sm">Suggested:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedSkills.map((s) => (
                <button
                  key={s}
                  onClick={() => addRequiredSkill(s)}
                  className="px-3 py-2 bg-white/10 border border-blue-700/40 rounded-xl text-blue-200"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Skills */}
          <div>
            <label className="text-blue-200 mb-2 block">Optional Skills</label>

            <div className="flex flex-wrap gap-2 mb-3">
              {optionalSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200 cursor-pointer"
                  onClick={() => removeOptional(s)}
                >
                  {s} ✕
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={newOptionalSkill}
                onChange={(e) => setNewOptionalSkill(e.target.value)}
                className="w-full p-3 bg-white/5 border border-blue-700/40 rounded-xl text-white"
                placeholder="Add an optional skill"
              />
              <button
                onClick={() => { addOptionalSkill(newOptionalSkill); setNewOptionalSkill(""); }}
                className="px-4 bg-blue-600 rounded-xl text-white"
              >
                Add
              </button>
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="text-blue-200 mb-2 block">Experience Level *</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
            >
              <option value="">Select...</option>
              <option className="text-black" value="Beginner">Beginner</option>
              <option className="text-black" value="Intermediate">Intermediate</option>
              <option className="text-black" value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="text-blue-200 mb-2 block">Availability *</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
            >
              <option value="">Select...</option>
              <option className="text-black" value="part-time">Part-time</option>
              <option className="text-black" value="full-time">Full-time</option>
              <option className="text-black" value="flexible">Flexible</option>
            </select>
          </div>


          {/* Location */}
          <div>
            <label className="text-blue-200 mb-2 block">Location *</label>
            <input
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
              placeholder="Lisbon, Remote, Hybrid..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Remote Supported */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={remoteSupported}
              onChange={(e) => setRemoteSupported(e.target.checked)}
            />
            <label className="text-blue-200">Remote work resources provided</label>
          </div>

          {/* Salary */}
          <div>
            <label className="text-blue-200 mb-2 block">Salary Range (Optional)</label>
            <div className="flex gap-4">
              <input
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full p-3 bg-white/5 border border-blue-700/40 rounded-xl text-white"
                placeholder="Min (€)"
              />
              <input
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full p-3 bg-white/5 border border-blue-700/40 rounded-xl text-white"
                placeholder="Max (€)"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-blue-200 mb-2 block">Application Deadline *</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-4 bg-white/5 border border-blue-700/40 rounded-xl text-white"
            />
          </div>

          {/* Additional Questions */}
          <div>
            <label className="text-blue-200 mb-2 block">
              Additional Questions for Candidates (Optional)
            </label>

            <div className="space-y-2 mb-3">
              {questions.map((q, i) => (
                <div key={i} className="text-blue-200 bg-white/5 p-3 rounded-lg border border-blue-700/40">
                  {q}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-3 bg-white/5 border border-blue-700/40 rounded-xl text-white"
                placeholder="Add a question (e.g., Why should we pick you?)"
              />
              <button
                onClick={addQuestion}
                className="px-4 bg-blue-600 rounded-xl text-white"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all mt-6"
          >
            Create Role
          </button>

        </div>
      </div>
    </div>
  );
}
