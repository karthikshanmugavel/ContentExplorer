import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Extract Content", path: "/extract-content" },
  { title: "Summarizer", path: "/summarizer" },
  { title: "Flashcards", path: "/flashcards" },
  { title: "Downloads", path: "/downloads" },
  { title: "AI Study Coach", path: "/ai-study-coach" },
  { title: "Resume & Projects", path: "/resume-projects" },
  { title: "Profile", path: "/profile" },
];

const Home = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = scrollRef.current;

    const scrollInterval = setInterval(() => {
      if (container) {
        container.scrollLeft += 1;

        // When halfway through, reset to start smoothly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center drop-shadow-md">
        Smart Content Explorer
      </h1>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-8 py-6 px-4 w-full max-w-7xl scrollbar-hide"
        style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
      >
        {[...menuItems, ...menuItems].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer flex-shrink-0 bg-white rounded-3xl shadow-2xl p-10 w-80 h-52 flex items-center justify-center text-center text-2xl font-bold text-purple-800 hover:scale-105 transition-transform duration-300"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
