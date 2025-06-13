import React, { useState } from "react";
import axios from "axios";

const Downloads = () => {
  const [mode, setMode] = useState("Link");
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("MP4");
  const [fileSize, setFileSize] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [videoCount, setVideoCount] = useState(3);
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    setShowResults(false);

    try {
      if (!query.trim()) {
        alert("Please enter a valid input");
        return;
      }

      if (mode === "Link") {
        const cleanedUrl = query.split("&")[0].split("?")[0]; // optional: frontend cleanup
        const res = await axios.get("https://fast-api-phi-nine.vercel.app/api/info", {
          params: { url: cleanedUrl },
        });
        const video = { ...res.data, url: cleanedUrl };
        setVideos([video]);
        setFileSize(res.data.size);
      } else {
        const res = await axios.get("https://fast-api-phi-nine.vercel.app/api/search", {
          params: { content: query, max_results: videoCount },
        });
        setVideos(res.data);
      }

      setShowResults(true);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to fetch video information.");
    }
  };

  const handleDownload = async (video) => {
    try {
      const res = await axios.get("https://fast-api-phi-nine.vercel.app/api/download", {
        params: { url: video.url, format },
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${video.title}.${format.toLowerCase()}`;
      a.click();
    } catch (err) {
      console.error("Download error:", err);
      alert("Download failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-pink-200 flex justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Downloader
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-40"
          >
            <option value="Link">Link</option>
            <option value="Content">Content</option>
          </select>

          <input
            type="text"
            placeholder={`Enter ${
              mode === "Link" ? "video URL" : "search text"
            }...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />

          {mode === "Content" && (
            <input
              type="number"
              min="1"
              max="10"
              value={videoCount}
              onChange={(e) => setVideoCount(Number(e.target.value))}
              className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="No. of Videos"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {mode === "Link" && (
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 text-sm">Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="MP3">MP3</option>
                <option value="MP4">MP4</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
          )}
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            🔍 Search
          </button>
        </div>

        {showResults && (
          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              {mode === "Link" ? "Video Preview" : "Search Results"}
            </h2>

            {mode === "Link" ? (
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:w-96 text-center">
                  <img
                    src={videos[0]?.thumbnail}
                    className="rounded mb-4 object-cover h-48 w-full"
                    alt="Video Thumbnail"
                  />
                  <h3 className="text-lg font-bold mb-2">{videos[0]?.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Size: {videos[0]?.size}
                  </p>
                  <button
                    onClick={() => handleDownload(videos[0])}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ⬇ Download ({format})
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
                  >
                    <img
                      src={video.thumbnail}
                      className="rounded mb-3 h-40 w-full object-cover"
                      alt="Thumbnail"
                    />
                    <h4 className="font-semibold text-md mb-1">
                      {video.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Size: {video.size}
                    </p>
                    <button
                      onClick={() => handleDownload(video)}
                      className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                    >
                      Download ({format})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
