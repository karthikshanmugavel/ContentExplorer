import React, { useState } from "react";

const dummySummary = [
  "1. Artificial Intelligence is the simulation of human intelligence in machines.",
  "2. It involves learning, reasoning, and self-correction.",
  "3. AI applications include speech recognition, decision-making, and visual perception.",
  "4. Machine Learning is a subset of AI focused on training models using data.",
  "5. Deep Learning uses neural networks to process data in complex ways.",
  "6. AI is widely used in healthcare, finance, education, and more.",
  "7. Ethical concerns include job displacement and bias in algorithms.",
  "8. AI systems need large amounts of quality data to perform accurately.",
  "9. AI continues to evolve with breakthroughs in computing power and algorithms.",
  "10. The future of AI holds immense potential but also challenges to address.",
];

const AIStudyCoach = () => {
  const [query, setQuery] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setShowSummary(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-200 via-cyan-300 to-blue-400 p-4 
    flex justify-center items-start"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          AI Study Coach
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter a topic to study..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {showSummary && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 mb-6 max-h-[300px] overflow-y-auto">
            {dummySummary.map((line, index) => (
              <p key={index} className="text-gray-700 text-sm sm:text-base">
                {line}
              </p>
            ))}
          </div>
        )}

        {showSummary && (
          <button
            className="w-70 bg-green-500 text-white font-semibold py-2 rounded-lg 
          hover:bg-green-600 transition"
          >
            Download Summary
          </button>
        )}
      </div>
    </div>
  );
};

export default AIStudyCoach;
