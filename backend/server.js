import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const CDN_BASE_URL = "https://dktwwce14odsr.cloudfront.net";

// Edit filenames here if poster names ever differ from Poster{N}.png.
const posterFileNames = {
  1: "Trailer1.png",
  2: "Trailer2.png",
  3: "Trailer3.png",
  4: "Trailer4.png",
  5: "Trailer5.png",
  6: "Trailer6.png",
  7: "Trailer7.png",
  8: "Trailer8.png",
  9: "Trailer9.png",
  10: "Trailer10.png",
  11: "Trailer11.png",
  12: "Trailer12.png"
};

app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catalogPath = path.resolve(__dirname, "..", "catalog.json");

const loadCatalog = () => {
  const raw = fs.readFileSync(catalogPath, "utf-8");
  const items = JSON.parse(raw);
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    videoUrl: item.videoUrl,
    posterUrl:
      posterFileNames[item.id] ? `${CDN_BASE_URL}/Posters/${posterFileNames[item.id]}` : item.posterUrl
  }));
};

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/catalog", (req, res) => {
  try {
    const catalog = loadCatalog();
    res.json(catalog);
  } catch (error) {
    console.error("Failed to load catalog:", error);
    res.status(500).json({ error: "Failed to load catalog" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
