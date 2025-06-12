import codingo from "../Images/codingo.png";
import web_dev from "../Images/web_dev.avif";
import Uipath from "../Images/Uipath.png";
import ethical_hack from "../Images/ethical_hack.jpg";
import avinya from "../Images/avinya.png";
import java24 from "../Images/java24.jpg";
import crossroads from "../Images/crossroads.jpg";
import cybersec from "../Images/cybersec.jpg";
import ux from "../Images/ux.png";
import cloud from "../Images/cloud.png";
import git from "../Images/git.png";
import PropTypes from "prop-types";
//import { useState } from "react";
//import { FaTrash } from "react-icons/fa";

const eventData = [
  {
    title: "Codingo 3.0",
    date: "October 25, 2023",
    description:
      "Test your coding skills in a thrilling competitive programming challenge!",
    Imgsrc: codingo,
  },
  {
    title: "Event 2: Web Development Session",
    date: "November 15, 2023",
    description:
      "Learn to build modern, responsive websites with the latest web technologies.",
    Imgsrc: web_dev,
  },

  {
    title: "UI Path",
    date: "February 7, 2024",
    description:
      "Automate tasks efficiently with UI Path and revolutionize your workflow.",
    Imgsrc: Uipath,
  },
  {
    title: "Ethical Hacking Workshop",
    date: "February 9, 2024",
    description:
      "Dive into cybersecurity fundamentals and learn ethical hacking techniques.",
    Imgsrc: ethical_hack,
  },
  {
    title: "AVINYA 2.0",
    date: "March 20, 2024",
    description:
      "A showcase of innovation, creativity, and groundbreaking tech solutions.",
    Imgsrc: avinya,
  },
  {
    title: "Java Bootcamp '24",
    date: "April 19, 2024",
    description:
      "Master Java fundamentals and advanced concepts in this hands-on bootcamp.",
    Imgsrc: java24,
  },
  {
    title: "The Crossroads",
    date: "August 8, 2024",
    description:
      "Where technology, business, and creativity intersect—insights from experts.",
    Imgsrc: crossroads,
  },
  {
    title: "Roadmap to Cyber Security",
    date: "August 10, 2024",
    description: "Step-by-step guidance on building a career in cybersecurity.",
    Imgsrc: cybersec,
  },
  {
    title: "UI/UX",
    date: "August 23, 2024",
    description: "Discover the principles of great design and user experience.",
    Imgsrc: ux,
  },
  {
    title: "Cloud Session",
    date: "September 1, 2024",
    description: "A deep dive into cloud computing and deployment strategies.",
    Imgsrc: cloud,
  },
  {
    title: "Git and GitHub",
    date: "October 1, 2024",
    description: "Learn version control with Git and collaborate using GitHub.",
    Imgsrc: git,
  },
  {
    title: "Java Bootcamp '25",
    date: "January 16, 2025",
    description:
      "Advance your Java skills with expert-led sessions and projects.",
    Imgsrc: java24,
  },
];
eventData.reverse();
const EventCard = ({ title, date, description, Imgsrc }) => {
  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer border">
      <img
        src={Imgsrc}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{date}</p>
      <p className="text-sm text-gray-200 mt-1">{description}</p>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Imgsrc: PropTypes.string.isRequired,
};

const Events = () => {
  return (
    <div className="bg-[#040313] min-h-screen">
      <div className="bg-[#040313] bg-opacity-70 py-10">
        <h1 className="text-center text-3xl font-bold text-white mb-6">
          Our Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {eventData.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
