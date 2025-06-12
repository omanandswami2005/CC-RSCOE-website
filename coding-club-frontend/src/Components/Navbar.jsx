// filepath: c:\Users\ypadw\Desktop\CC\Web\Website\CC Wwbsite Updated\CC Website\src\Components\Navbar.jsx
import { Link as ScrollLink } from "react-scroll";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-20 py-4 bg-[#040313] h-[80px] text-white relative z-50">
      <div className="flex items-center space-x-8 md:space-x-16">
        <a
          href="#"
          className="text-white font-bold text-lg leading-none flex flex-col items-center"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          <span className="block text-[15px] text-center">CODING</span>
          <span className="block text-[15px] text-center">CLUB</span>
          <span className="block text-[10px] text-center text-blue-400">RSCOE</span>
        </a>

        <div
          className="hidden md:flex space-x-8 text-sm opacity-95"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
           <Link to="/" className="hover:text-gray-300 cursor-pointer">Home</Link>
        <ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">Pricing</ScrollLink>
        <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">About Us</ScrollLink>
        <Link to="/team" className="hover:text-gray-300">Team</Link>
        <Link to="/events" className="hover:text-gray-300">Events</Link>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-10 text-sm opacity-95">
    <Link to="/login" className="hover:text-gray-300">Login</Link>
    <a
      href="#"
      className="px-4 py-2 rounded-lg border border-purple-600 text-white 
                 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700 
                 hover:text-white transition-all duration-500 ease-in-out shadow-md"
    >
      Join Now
    </a>
</div>



      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`absolute md:hidden top-[80px] left-0 w-full bg-[#040313] transition-all duration-300 ${
          isOpen ? "flex flex-col py-6 space-y-4 shadow-md items-center" : "hidden"
        }`}
      >
        <Link to="/" className="hover:text-gray-300 cursor-pointer">Home</Link>
        <ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">Pricing</ScrollLink>
        <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">About Us</ScrollLink>
        <Link to="/team" className="hover:text-gray-300">Team</Link>
        <Link to="/events" className="hover:text-gray-300">events</Link>


        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <a
            href="#"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md"
          >
            Join Now
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[2px] opacity-35 bg-white"></div>
    </nav>
  );
}

export default Navbar;