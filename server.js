const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.send("Server is Working ✅");
});

/* ---------------- CLASSIFICATION API ---------------- */

app.post("/api/classify", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      console.log("❌ No image received");
      return res.status(400).json({ error: "No image provided" });
    }

    console.log("🔥 Image received successfully");

    // 🔥 Dummy AI Prediction (Matches Frontend Structure)
    const result = {
      detectedLabel: "Apple",
      qualityLabel: "Fresh",
      confidence: 96,

      classification: {
        apple: 96,
        banana: 2,
        orange: 2,
      },

      quality: {
        fresh: 90,
        ripe: 7,
        rotten: 3,
      },

      metadata: {
        connectionMode: "REAL BACKEND SERVER",
        timestamp: new Date().toISOString()
      }
    };

    res.json(result);

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
