// server.js
const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors());

// 🔧 Utility: clean YouTube URL (remove extra query params)
const cleanYouTubeUrl = (url) => {
  return url.split("&")[0].split("?")[0];
};

// ✅ /api/info - Get video info from URL
app.get("/api/info", async (req, res) => {
  let { url } = req.query;
  url = cleanYouTubeUrl(url);

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const { videoDetails } = info;
    const thumbnail = videoDetails.thumbnails?.slice(-1)[0]?.url || "";
    const size = "Unknown"; // Optional: calculate from formats
    const format = "MP4";

    res.json({
      title: videoDetails.title,
      thumbnail,
      size,
      format,
    });
  } catch (err) {
    console.error("Error fetching video info:", err.message);
    res.status(500).json({ error: "Failed to fetch video info" });
  }
});

// ✅ /api/search - Search YouTube by content
app.get("/api/search", async (req, res) => {
  const { content, max_results = 5 } = req.query;

  if (!content) {
    return res.status(400).json({ error: "Missing content query" });
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: content,
          maxResults: max_results,
          key: YOUTUBE_API_KEY,
          type: "video",
        },
      }
    );

    const results = response.data.items.map((item) => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      size: "Unknown",
      format: "MP4",
    }));

    res.json(results);
  } catch (err) {
    console.error("YouTube Search Error:", err.message);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// ✅ /api/download - Download video or audio
app.get("/api/download", async (req, res) => {
  let { url, format = "MP4" } = req.query;
  url = cleanYouTubeUrl(url);

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "_");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${title}.${format.toLowerCase()}"`
    );

    if (format.toUpperCase() === "MP3") {
      return ytdl(url, { filter: "audioonly", quality: "highestaudio" }).pipe(
        res
      );
    }

    if (["720P", "1080P"].includes(format.toUpperCase())) {
      const qualityLabel = format.toLowerCase();
      const stream = ytdl
        .filterFormats(info.formats, "videoandaudio")
        .find((f) => f.qualityLabel === qualityLabel);

      if (stream) {
        return ytdl.downloadFromInfo(info, { format: stream }).pipe(res);
      } else {
        console.warn("Requested quality not found, falling back to default.");
      }
    }

    ytdl(url, { filter: "audioandvideo", quality: "highestvideo" }).pipe(res);
  } catch (err) {
    console.error("Download Error:", err.message);
    res.status(500).json({ error: "Failed to download video" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
