export default function Home() {
  return(
    <main className="min-h-screen bg-[#eef3ff]">
      {/*navigation bar */}
      <header className="w-full flex justify-between items center p-6 bg-white">
        <h1 className="text-black font-bold text-xl">Insternship</h1>
        <nav>
          <a href="/student/login" className="bg - #1800ad text-black rounded-lg hover:text - #1800ad">
          Login
          </a>
          <a
            href="/student/signup"
            className="px-3 py-3 bg-[#1800ad] text-white rounded-lg hover:bg- white text:black transition"
          >
            Sign up
          </a>
        </nav>
      </header>
      {/*HERO seciton*/}
      <section className="text-center mt-20">
        <div className="inline-block mb-6 px-4 py-1 bg-gray border border - black rounded-full text-sm text-blue-600 font-medium">
          🚀Connecting students and startups through smart matching
        </div>

        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Students Meet <span className="text-[#ff3131]">Startups</span>
        </h2>

                {/*create profile and login Buttocns*/}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/student/signup"
            className="px-6 py-3 bg-[#1800ad] text-white rounded-lg font-medium hover:bg-[#ff3131] transition flex items-center gap-2"
          >
            Create Your Profile →
          </a>

          <a
            href="/student/login"
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Sign In
          </a>
        </div>
      </section>
        {/* Feature Cards */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-6">
        {/*CArd for smart matching*/}
        <div className="bg-white p-6 rounded-x1 shadow-sm border border-gray-200">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg mb-4">
            <img src="/Website Images/Auto_Matching.png" className="w-10 h-10"/> 
          </div>
          <h3 className="font-semibold text-lg mb-2">Smart Matching</h3>
          <p className="text-gray-600 text-sm">
            Our algorithm analyzes your skills and preferences to calculate match percentages for each opportunity.
          </p>          
        </div>
         {/*Card for Grow Your Career*/}
        <div className="bg-white p-6 rounded-x1 shadow-sm border border-gray-200">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg mb-4">
            📈
          </div>
          <h3 className="font-semibold text-lg mb-2">Grow Your Career</h3>
          <p className="text-gray-600 text-sm">
            Access opportunities at Lisbon’s most innovative startups and kickstart your career in tech.
          </p>          
        </div>
                 {/*Card for Febback*/}
        <div className="bg-white p-6 rounded-x1 shadow-sm border border-gray-200">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg mb-4">
            📃
          </div>
          <h3 className="font-semibold text-lg mb-2">Feedback System</h3>
          <p className="text-gray-600 text-sm">
            See exactly why you match with each opportunity and what you can improve to increase your chances.
          </p>          
        </div>
      </section>
        


    </main>
  )
}

