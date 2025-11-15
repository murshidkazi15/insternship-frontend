export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Insternship
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Connecting talented students with fast-growing startups.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/student/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            I’m a Student
          </a>

          <a
            href="/startup/signup"
            className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            I’m a Startup
          </a>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Find internships. Discover talent. Grow together.
        </p>
      </div>
    </main>
  );
}
