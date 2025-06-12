const AboutPage = () => {
  return (
    <div className="relative min-h-screen text-white font-sans flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute bg-[#090013] inset-0 w-full h-full">
        {/* <img
          src="bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />*/}
      </div>

      {/* Overlay Content */}
      <div className="relative text-white mt-[100px]">
        <div className="relative z-10 max-w-4xl mx-auto text-center p-10">
          <div className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500" style={{ fontFamily: "Sora, sans-serif" }}>
            Why Coding Club RSCOE?
          </div>
          <p className="text-lg mt-4 text-gray-300 tracking-wide">
            The Coding Club is a vibrant community of tech enthusiasts
            passionate about software development, design, and emerging
            technologies.
          </p>

          <div className="mt-8 space-y-6">
            <div className="bg-[#141327] p-6 rounded-lg shadow-lg backdrop-blur-lg font-sora">
              <h2 className="text-2xl font-semibold text-[#fff] inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
                Our Mission
              </h2>
              <p className="text-gray-300 mt-2 tracking-wide font-inter">
                To create an engaging environment for students to learn,
                innovate, and collaborate on real-world technology projects.
              </p>
            </div>

            <div className="bg-[#141327] p-6 rounded-lg shadow-lg backdrop-blur-lg tracking-wide font-sora">
              <h2 className="text-2xl font-semibold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
                Activities & Events
              </h2>
              <ul className="text-gray-300 mt-2 list-disc list-inside font-inter">
                <li>Workshops on Web Development, AI, and Cybersecurity</li>
                <li>
                  Hackathons to challenge creativity and problem-solving skills
                </li>
                <li>Tech Talks and Panel Discussions with industry experts</li>
                <li>Collaborative Projects to gain hands-on experience</li>
              </ul>
            </div>

            <div className="bg-[#141327] p-6 rounded-lg shadow-lg backdrop-blur-lg tracking-wide font-sora">
              <h2 className="text-2xl font-semibold text-[#fff] inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">Join Us</h2>
              <p className="text-gray-300 mt-2 font-inter">
                Whether you are a beginner or an expert, the Coding Club
                welcomes all students eager to explore the world of technology.
                Be part of a thriving community and enhance your coding journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
