"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function StudentProfilePage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [bio, setBio] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  const suggestedSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "Node.js",
    "SQL",
    "Git",
    "Docker",
  ];

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Fetch profile
      const { data: profile } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) return setLoading(false);

      const alreadyComplete =
        profile.full_name &&
        profile.location &&
        profile.experience_level &&
        profile.availability &&
        profile.skills?.length > 0;

      if (alreadyComplete) {
        router.push("/Dashboard/Student_dash");
        return;
      }

      // Pre-fill fields if they exist
      setName(profile.full_name || "");
      setLocation(profile.location || "");
      setExperience(profile.experience_level || "");
      setAvailability(profile.availability || "");
      setSkills(profile.skills || []);
      setBio(profile.bio || "");
      setCvUrl(profile.cv_url || "");

      setLoading(false);
    }

    loadProfile();
  }, []);

  function addSkill(skill: string) {
    const cleanSkill = skill.trim().toLowerCase();
    if (!cleanSkill || skills.includes(cleanSkill)) return;
    setSkills([...skills, cleanSkill]);
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  //  SUBMIT → save into Supabase
  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Not logged in");

    const { error } = await supabase
      .from("student_profile")
      .update({
        full_name: name,
        location: location,
        experience_level: experience,
        availability: availability,
        skills: skills,
        bio: bio,
        cv_url: cvUrl,
      })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      return alert("Error saving profile.");
    }

    router.push("/Dashboard/Student_dash");
  }

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#eff4ff] flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700">Create Your Profile</h1>
      <p className="text-gray-600 mt-2 mb-10 text-center max-w-xl">
        Tell us about yourself to find your perfect internship match
      </p>

      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-black text-xl font-semibold mb-6">Student Profile</h2>

        {/* Full Name */}
        <label className="text-black block font-medium mb-1">Full Name *</label>
        <input
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Location */}
        <label className="text-black block font-medium mb-1">Location *</label>
        <input
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Lisbon, Portugal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Experience Level */}
        <label className="text-black block font-medium mb-1">Experience Level *</label>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select your experience level</option>
          <option className="text-black">Beginner</option>
          <option className="text-black">Intermediate</option>
          <option className="text-black">Advanced</option>
        </select>

        {/* Availability */}
        <label className="text-black block font-medium mb-1">Availability *</label>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select your availability</option>
          <option>Part-time</option>
          <option>Full-time</option>
          <option>Flexible</option>
        </select>

        {/* Skills */}
        <label className=" text-black block font-medium mb-2">
          Skills * <span className="text-gray-500">(Click to add)</span>
        </label>

        <div className="min-h-[50px] p-3 border rounded-lg mb-4 flex flex-wrap gap-2">
          {skills.length === 0 && (
            <p className="text-gray-400">No skills added yet</p>
          )}

          {skills.map((skill) => (
            <span
              key={skill}
              onClick={() => removeSkill(skill)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200"
            >
              {skill} ✕
            </span>
          ))}
        </div>

        {/* Suggested Skills */}
        <div className="text-black flex flex-wrap gap-2 mb-4">
          {suggestedSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => addSkill(skill)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
            >
              + {skill}
            </button>
          ))}
        </div>

        {/* Custom Skill */}
        <div className="flex gap-2 mb-6">
          <input
            className="text-black flex-grow p-3 border rounded-lg"
            placeholder="Add custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              addSkill(customSkill);
              setCustomSkill("");
            }}
            className="px-4 bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Bio */}
        <label className="text-black block font-medium mb-1">Bio</label>
        <textarea
          className=" text-black w-full p-3 border rounded-lg mb-4"
          placeholder="Tell us about yourself..."
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {/* CV URL */}
        <label className=" text-black block font-medium mb-1">CV URL (Optional)</label>
        <input
          className=" text-black w-full p-3 border rounded-lg mb-6"
          placeholder="https://drive.google.com/your-cv"
          value={cvUrl}
          onChange={(e) => setCvUrl(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}
