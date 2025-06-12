import React, { useEffect, useRef } from "react";

const Starfield = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const stars = starsRef.current;
      if (stars) {
        const moveX = (clientX / window.innerWidth) * 20;
        const moveY = (clientY / window.innerHeight) * 20;
        stars.style.transform = `translate(-${moveX}px, -${moveY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#040313]">
      <div ref={starsRef} className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `twinkle ${2 + Math.random() * 3}s infinite alternate ease-in-out`,
            }}
          />
        ))}
      </div>
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
};

export default Starfield;
