import React, { useState, useEffect, useRef } from "react";
import EventCard from "./Events.jsx";
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
import java25 from "../Images/java24.jpg";
import avinya1 from "../Images/avinya1.jpg";
import avinya2 from "../Images/avinya2.jpg";
import avinya3 from "../Images/avinya3.jpg";
import crossroads1 from "../Images/crossroad1.jpg";
import crossroads2 from "../Images/crossroad2.jpg";
import crossroads3 from "../Images/crossroad3.jpg";
import cybersec_1 from "../Images/cybersecurity_1.jpg";
import cybersec_2 from "../Images/cybersecurity_2.jpg";
import cybersec_3 from "../Images/cybersecurity_3.jpg";
import java251 from "../Images/java_251.png";
import java252 from "../Images/java252.png";
import java253 from "../Images/java253.png";
import ui1 from "../Images/ui1.png";
import ui2 from "../Images/ui2.png";
import ui3 from "../Images/ui3.png";
import git1 from "../Images/git1.jpg";
import git2 from "../Images/git2.jpg";
import git3 from "../Images/git3.jpg";
import codingo1 from "../Images/codingo1.jpg";
import codingo2 from "../Images/codingo2.jpg";
import codingo3 from "../Images/codingo3.jpg";
// import Uipath1 from "../Images/Uipath1.jpg";
import Uipath2 from "../Images/Uipath2.jpg";
import UIpath1 from "../Images/UIpath1.jpg";
import UIpath3 from "../Images/UIpath3.jpg";
import eth_hack1 from "../Images/eth_hack1.jpg";
import eth_hack2 from "../Images/eth_hack2.jpg";
import eth_hack3 from "../Images/eth_hack3.jpg";
import java241 from "../Images/java241.jpg";
import java242 from "../Images/java242.jpg";
import java243 from "../Images/java243.jpg";

function Timeline() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    let scrollSpeed = 1;
    const scrollContainer = scrollRef.current;
    const scrollInterval = setInterval(() => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 50);
    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const events = [
    {
      Imgsrc: [codingo, codingo1, codingo2, codingo3],
      title: "Codingo 3.0",
      date: "October 25, 2023",
      description:
        "Test your coding skills in a thrilling competitive programming challenge!",
    },
    {
      Imgsrc: [web_dev, java25],
      title: "Web Development Session",
      date: "November 15, 2023",
      description:
        "Learn to build modern, responsive websites with the latest web technologies.",
    },
    {
      Imgsrc: [Uipath, UIpath1, UIpath3, Uipath2],
      title: "UI Path",
      date: "February 7, 2024",
      description:
        "Automate tasks efficiently with UI Path and revolutionize your workflow.",
    },
    {
      Imgsrc: [ethical_hack, eth_hack1, eth_hack2, eth_hack3],
      title: "Ethical Hacking Workshop",
      date: "February 9, 2024",
      description:
        "Dive into cybersecurity fundamentals and learn ethical hacking techniques.",
    },
    {
      Imgsrc: [avinya, avinya1, avinya2, avinya3],
      title: "AVINYA 2.0",
      date: "March 20, 2024",
      description:
        "A showcase of innovation, creativity, and groundbreaking tech solutions.",
    },
    {
      Imgsrc: [java24, java241, java242, java243],
      title: "Java Bootcamp '24",
      date: "April 19, 2024",
      description:
        "Master Java fundamentals and advanced concepts in this hands-on bootcamp.",
    },
    {
      Imgsrc: [crossroads, crossroads1, crossroads2, crossroads3],
      title: "The Crossroads",
      date: "August 8, 2024",
      description:
        "Where technology, business, and creativity intersect—insights from experts.",
    },
    {
      Imgsrc: [cybersec, cybersec_1, cybersec_2, cybersec_3],
      title: "Roadmap to Cyber Security",
      date: "August 10, 2024",
      description:
        "Step-by-step guidance on building a career in cybersecurity.",
    },
    {
      Imgsrc: [ux, ui1, ui2, ui3],
      title: "UI/UX",
      date: "August 23, 2024",
      description:
        "Discover the principles of great design and user experience.",
    },
    {
      Imgsrc: [cloud, java25],
      title: "Cloud Session",
      date: "September 1, 2024",
      description:
        "A deep dive into cloud computing and deployment strategies.",
    },
    {
      Imgsrc: [git, git1, git2, git3],
      title: "Git and GitHub",
      date: "October 1, 2024",
      description:
        "Learn version control with Git and collaborate using GitHub.",
    },
    {
      Imgsrc: [java24, java251, java252, java253],
      title: "Java Bootcamp '25",
      date: "January 16, 2025",
      description:
        "Advance your Java skills with expert-led sessions and projects.",
    },
  ];

  return (
    <div className="bg-[#040313] text-white flex flex-col h-[100vh] items-center gap-10 py-2">
      <h1 className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500" style={{ fontFamily: "Sora, sans-serif" }}>Our Events</h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto whitespace-nowrap px-20 w-4/5 h-full py-5 relative scroll-container"
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="relative mx-4 cursor-pointer h-fit"
           
            onMouseEnter={() => {
              setHoveredEvent(index);
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              // setHoveredEvent(null);
              setIsPaused(false);
            }}
            
          >
            {/* Event Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-lg">
              <img
                src={event.Imgsrc[0]}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Card on Hover or Click */}
            {(hoveredEvent === index || clickedEvent === index) && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 max-md:w-72 md:w-100 glassmorphism text-black p-4 rounded-lg shadow-lg overflow-x-auto display-flex scrollbar-hide break-words whitespace-normal mt-5"
               onMouseLeave={() => setHoveredEvent(null)}
              >
                <EventCard event={event} className="w-full z-10" />
              </div>
            )}
            <div>
              {/* <div
                className="w-8 h-2 bg-gradient-to-r from-white to-gray-300 absolute top-12 -left-6 transform -translate-x-1/4 -translate-y-1/2"
                style={{ zIndex: 1 }}
              ></div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default Timeline;
