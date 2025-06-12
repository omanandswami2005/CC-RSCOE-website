/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from "react";
import bgvideo from '../Videos/reflectbg.mp4'
import { Link } from "react-router-dom";

function LandingSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="w-full overflow-hidden transition-all duration-500 ease-in-out">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        src={bgvideo}
        type="video/mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      <div className="relative z-10 flex mt-10 justify-center max-md:h-full md:min-h-[80vh]">
        <div className="text-center align-bottom text-white px-4 sm:px-6 lg:px-8">
          <Link
            to="/events"
            className="font-italic bg-transparent ring-1 ring-purple-600 text-semibold text-gradient-to-r from-purple-300 via-purple-200 to-purple-100 px-8 py-2 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition-all duration-300 mb-10 text-xs font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            LET'S DIVE INTO THE WORLD OF CODING
          </Link>
          <div className="flex flex-col md:gap-20 max-md:gap-48 w-full h-[90vh] relative max-md:top-12 md:top-40 sm:top-60 lg:top-80">
            <div className="mt-9 h-18 text-3xl sm:text-5xl lg:text-7xl shadow-2xl font-semibold font-sora animate-fadeIn text-width transition-all duration-500 ease-in-out text-transparent inline-block bg-clip-text bg-gradient-to-r from-purple-100 to-purple-600" style={{ fontFamily: "Sora, sans-serif" }}>
              Learn Inspire Grow with Us
            </div>
            <div className="flex flex-col gap-16">
            <p
              className="text-base sm:text-lg md:text-lg justify-center text-center tracking-wide animate-fadeIn delay-1s mb-0 mx-auto max-w-4xl transition-all duration-500 ease-in-out"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Dive into the world of innovation, creativity, and collaboration!
              Our club is a hub for tech enthusiasts, developers, and learners who
              aim to explore the vast field of coding. Whether you are a beginner
              or an expert, there's a place for you here.
            </p>
            <div className="flex justify-center relative top-[-10px] sm:top-[-20px] lg:top-[-40px]">
              <a href="#">
                <button
                  className="rounded-full ring-1 ring-purple-600 px-8 py-3 text-sm font-bold outline-offset-4 outline-1 outline-violet-600 transition duration-300 ease-in-out hover:bg-violet-600 focus:outline-none focus:ring-2 shadow-lg shadow-indigo-500/50"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Let's Get Started
                </button>
              </a>
            </div>

            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-15 transition-opacity duration-1000 ease-in-out"></div>
    </section>
  );
}

export default LandingSection;
