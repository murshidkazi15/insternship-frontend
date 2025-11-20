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
<<<<<<< HEAD
      const {
        data: { user },
      } = await supabase.auth.getUser();
=======
      const { data: { user } } = await supabase.auth.getUser();
>>>>>>> c7c67afa078228f7bde1ae0c2b800036c11a9d72
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

<<<<<<< HEAD
  // SUBMIT → save into Supabase
  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
=======
  //  SUBMIT → save into Supabase
  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser();
>>>>>>> c7c67afa078228f7bde1ae0c2b800036c11a9d72
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

<<<<<<< HEAD
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200 text-lg">Loading your profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-50 bg-clip-text text-transparent">
          Create Your Profile
        </h1>
        <p className="text-blue-200 mt-2 max-w-xl text-lg">
          Tell us about yourself to find your perfect internship match
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="group relative w-full max-w-3xl">
        {/* Animated Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>

        <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 shadow-lg">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Student Profile
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Full Name *
              </label>
              <input
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Location *
              </label>
              <input
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Lisbon, Portugal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Experience Level *
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="" className="text-gray-900">
                    Select your experience level
                  </option>
                  <option value="Beginner" className="text-gray-900">
                    Beginner
                  </option>
                  <option value="Intermediate" className="text-gray-900">
                    Intermediate
                  </option>
                  <option value="Advanced" className="text-gray-900">
                    Advanced
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Availability *
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="" className="text-gray-900">
                    Select your availability
                  </option>
                  <option value="Part-time" className="text-gray-900">
                    Part-time
                  </option>
                  <option value="Full-time" className="text-gray-900">
                    Full-time
                  </option>
                  <option value="Flexible" className="text-gray-900">
                    Flexible
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Skills *{" "}
                <span className="text-blue-300/70 text-sm">(Click to add)</span>
              </label>

              {/* Selected Skills */}
              <div className="min-h-[60px] p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl mb-4 flex flex-wrap gap-2">
                {skills.length === 0 && (
                  <p className="text-blue-300/50 italic">
                    No skills added yet. Click suggestions below or add custom
                    skills.
                  </p>
                )}

                {skills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-blue-500/30"
                  >
                    {skill} ✕
                  </span>
                ))}
              </div>

              {/* Suggested Skills */}
              <div className="mb-4">
                <p className="text-blue-200 text-sm mb-3">Suggested Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-600/30 text-blue-200 rounded-xl text-sm hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Skill Input */}
              <div className="flex gap-3">
                <input
                  className="flex-grow p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Add custom skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (addSkill(customSkill), setCustomSkill(""))
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    addSkill(customSkill);
                    setCustomSkill("");
                  }}
                  className="px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-400/30"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                Bio
              </label>
              <textarea
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Tell us about yourself, your interests, and what you're looking for in an internship..."
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            {/* CV URL */}
            <div>
              <label className="text-blue-200 block font-medium mb-3">
                CV URL (Optional)
              </label>
              <input
                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="https://drive.google.com/your-cv"
                value={cvUrl}
                onChange={(e) => setCvUrl(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-blue-400/30 mt-6"
            >
              Complete Profile & Continue
            </button>
          </div>
        </div>
=======
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
>>>>>>> c7c67afa078228f7bde1ae0c2b800036c11a9d72
      </div>
    </div>
  );
}
