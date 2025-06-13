import React, { useState, useEffect } from "react";

export default function FlashCards() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch questions from Flask API
  useEffect(() => {
    fetch("https://hicore.pythonanywhere.com/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch questions", err));
  }, []);

  const handleClick = () => setFlipped(true);
  const handleDoubleClick = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % questions.length);
  };

  // Return early if questions not loaded yet
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading questions...
      </div>
    );
  }

  const current = questions[index];

  return (
    <div className="min-h-screen shadow-xl bg-purple-100 flex items-center gap-10 justify-center px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl space-y-6">
        {/* Search Row */}
        <div className="flex w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-l-lg outline-none"
          />
          <button className="bg-purple-500 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-purple-600">
            Search
          </button>
        </div>

        {/* Flashcard Container */}
        <div
          className="flex pt-10 relative w-full h-100"
          style={{ perspective: "1000px" }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          <div
            className="w-full h-full transition-transform duration-700 ease-in-out relative"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl shadow-2xl flex flex-col items-center justify-center px-6"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-xl mt-2 text-center">{current.question}</p>
            </div>

            {/* Back Side */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-orange-300 to-orange-600 text-white rounded-xl shadow-2xl flex flex-col items-center justify-center px-6"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-xl mt-2 text-center">{current.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
