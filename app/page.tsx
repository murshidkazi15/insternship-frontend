export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation Bar */}
      <header className="w-full flex justify-between items-center p-6 bg-blue-900/30 backdrop-blur-md border-b border-blue-700/30 shadow-sm">
        <h1 className="text-white font-bold text-2xl bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
          Insternship
        </h1>
        <nav className="flex gap-4">
          <a
            href="/student/login"
            className="px-6 py-2.5 text-blue-200 font-medium rounded-lg hover:bg-blue-800/50 transition-all duration-300 border border-blue-600/30 hover:border-blue-500/50 hover:text-white"
          >
            Login
          </a>
          <a
            href="/student/signup"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-blue-500/25"
          >
            Sign up
          </a>
        </nav>
      </header>

      {/* Hero Section - Portfolio Style */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-blue-800/30 backdrop-blur-sm border border-blue-600/30 rounded-2xl text-sm font-medium text-blue-200 shadow-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Connecting students and startups through smart matching
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-50 bg-clip-text text-transparent">
              Students Meet
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
              Startups
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Launch your career with Lisbon's most innovative startups through
            our intelligent matching platform
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="/student/signup"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center gap-3 border border-blue-400/30"
            >
              <span>Create Your Profile</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>

            <a
              href="/student/login"
              className="px-8 py-4 bg-blue-800/30 backdrop-blur-sm border border-blue-600/30 rounded-xl font-semibold text-blue-200 hover:bg-blue-700/50 hover:text-white hover:border-blue-500/50 transition-all duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Animated Shining Borders */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Smart Matching Card */}
          <div className="group relative">
            {/* Animated Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse group-hover:animate-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>

            <div className="relative bg-white p-8 rounded-2xl border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/90 rounded-lg"></div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Smart Matching
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithm analyzes your skills and preferences to
                calculate precise match percentages.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">
                  AI Powered
                </span>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-blue-600 text-lg">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Career Growth Card */}
          <div className="group relative">
            {/* Animated Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse group-hover:animate-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>

            <div className="relative bg-white p-8 rounded-2xl border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/90 rounded-lg"></div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Career Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access exclusive opportunities at Lisbon's most innovative
                startups and kickstart your tech career.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">
                  Career Path
                </span>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-blue-600 text-lg">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback System Card */}
          <div className="group relative">
            {/* Animated Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-pulse group-hover:animate-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>

            <div className="relative bg-white p-8 rounded-2xl border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/90 rounded-lg"></div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Feedback System
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed insights and actionable tips to improve your
                profile and increase match chances.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">
                  Insights
                </span>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-blue-600 text-lg">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 text-center px-6 bg-gradient-to-r from-blue-900/50 to-slate-800/50 border-y border-blue-700/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your Career?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Join thousands of students who found their perfect startup match
            through our platform.
          </p>
          <a
            href="/student/signup"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg border border-blue-400/30"
          >
            Get Started Today
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
