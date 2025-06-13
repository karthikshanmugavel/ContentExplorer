import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

const summaryTypes = ["Detailed Notes", "Executive Summary"];
const exportFormats = ["PDF", "DOCX", "MP3"];

export default function Summarizer() {
  const [summaryType, setSummaryType] = useState(summaryTypes[0]);
  const [length, setLength] = useState(3);
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [savedSummaries, setSavedSummaries] = useState([]);

  const generateSummary = () => {
    const generated = `${summaryType}: This is a sample summary based on input: "${inputText.slice(
      0,
      50
    )}..."`;
    const extractedKeywords = ["sample", "summary", "input"];
    setSummary(generated);
    setKeywords(extractedKeywords);
    setSavedSummaries([
      ...savedSummaries,
      { type: summaryType, text: generated },
    ]);
  };

  const exportSummary = (format) => {
    alert(`Exporting summary as ${format}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 py-10 px-4 flex flex-col items-center gap-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          AI Summarizer
        </h1>

        {/* Input Box */}
        <textarea
          className="w-full h-40 p-4 border rounded shadow-sm resize-none mb-6"
          placeholder="Paste or type text to summarize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between gap-4">
          {/* Summary Type */}
          <div className="flex items-center gap-2">
            <label className="font-medium">Summary Type:</label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              {summaryTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Length Slider */}
          <div className="flex items-center gap-2">
            <label className="font-medium">Length:</label>
            <input
              type="range"
              min="1"
              max="5"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="w-6 text-center">{length}</span>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateSummary}
            className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Summary Output */}
      {summary && (
        <div className="w-full max-w-4xl bg-white px-6 py-6 rounded-lg shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-indigo-700">
              Summary Output
            </h2>
            <p className="mt-2">{summary}</p>
          </div>

          {/* Keywords */}
          <div>
            <strong>Keywords:</strong>{" "}
            {keywords.map((k, i) => (
              <span
                key={i}
                className="inline-block bg-yellow-200 px-2 py-1 text-sm rounded mr-2 mt-2"
              >
                {k}
              </span>
            ))}
          </div>

          {/* Export Options */}
          <div className="flex flex-wrap gap-3 pt-2">
            {exportFormats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => exportSummary(fmt)}
                className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
              >
                <FaDownload /> {fmt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Section */}
      {savedSummaries.length > 1 && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-indigo-700">
            Compare Summaries
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {savedSummaries.map((s, idx) => (
              <div key={idx} className="border p-3 rounded bg-gray-50">
                <h3 className="font-semibold">{s.type}</h3>
                <p className="text-sm mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
