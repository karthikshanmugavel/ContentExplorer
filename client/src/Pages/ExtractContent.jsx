import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const contentTypes = [
  "YouTube URL",
  "PDF",
  "Web Page",
  "Audio",
  "Video",
  "Raw Text",
];

const privacyOptions = ["Public", "Private", "Team"];

export default function ExtractContentExplorer({ onSearch }) {
  const [type, setType] = useState(contentTypes[0]);
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [privacy, setPrivacy] = useState(privacyOptions[0]);
  const [detectedLanguage, setDetectedLanguage] = useState("Unknown");

  const pickerRef = useRef();

  const handleFolderSelect = async (evt) => {
    const selectedFiles = Array.from(evt.target.files);
    setFiles(selectedFiles);
  };

  const handleModernFolderPick = async () => {
    if ("showDirectoryPicker" in window) {
      try {
        const dirHandle = await window.showDirectoryPicker();
        const allFiles = [];

        async function traverse(handle, path = "") {
          for await (const entry of handle.values()) {
            const entryPath = path ? `${path}/${entry.name}` : entry.name;
            if (entry.kind === "file") {
              const file = await entry.getFile();
              Object.defineProperty(file, "webkitRelativePath", {
                get: () => entryPath,
              });
              allFiles.push(file);
            } else if (entry.kind === "directory") {
              await traverse(entry, entryPath);
            }
          }
        }

        await traverse(dirHandle);
        setFiles(allFiles);
      } catch (err) {
        console.error("Directory selection cancelled", err);
      }
    } else {
      pickerRef.current.click();
    }
  };

  const detectLanguage = (text) => {
    if (!text.trim()) return "Unknown";
    if (text.includes("வணக்கம்") || text.includes("தமிழ்")) return "Tamil";
    if (text.includes("नमस्ते") || text.includes("हिंदी")) return "Hindi";
    return "English";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lang = detectLanguage(query);
    setDetectedLanguage(lang);

    const searchData = {
      type,
      query,
      files,
      privacy,
      detectedLanguage: lang,
    };

    onSearch(searchData);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-2 sm:px-4 bg-gradient-to-tr from-purple-400 via-indigo-400 to-blue-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded-lg shadow-2xl bg-white mt-10 mx-auto max-w-5xl w-full"
      >
        {/* ─── Top Row ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          {/* Content Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded p-2 w-full sm:w-[160px]"
          >
            {contentTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${type}...`}
              className="w-full border rounded pl-4 pr-10 py-2 focus:outline-indigo-500"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FaSearch size={18} />
            </button>
          </div>

          {/* Folder Picker */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleModernFolderPick}
              className="border rounded px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold whitespace-nowrap"
            >
              ...
            </button>
            <input
              type="file"
              ref={pickerRef}
              webkitdirectory=""
              directory=""
              multiple
              onChange={handleFolderSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* ─── Bottom Row ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
          {/* Privacy Setting */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">
              Privacy:
            </label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="border rounded p-2"
            >
              {privacyOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Language Detection */}
          <div className="text-sm text-gray-500 italic">
            Detected Language:{" "}
            <span className="text-black font-medium">{detectedLanguage}</span>
          </div>
        </div>

        {/* Hidden Submit Button for Enter key */}
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}
