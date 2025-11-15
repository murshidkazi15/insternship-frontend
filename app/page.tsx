// ...existing code...
import Link from "next/link";

export default function Home() {
  return (
    <main role="main" className="min-h-screen flex flex-col items-center justify-center bg-[#1D1DBF] text-white p-8">
      
      <h1 className="text-5xl font-bold mb-4 text-center">
        Students meet Startups
      </h1>

      <p className="text-lg text-center mb-8 max-w-xl">
        Connecting students and startups through smart matching.
      </p>

      <div className="flex flex-col gap-4">
        <Link
          href="/signup/student"
          className="bg-white text-black font-semibold px-8 py-3 rounded-full text-center hover:opacity-80"
        >
          🎓 I'm a Student
        </Link>

        <Link
          href="/signup/startup"
          className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full text-center hover:bg-orange-600"
        >
          🚀 I'm a Startup
        </Link>
      </div>
    </main>
  );
}
// ...existing code...