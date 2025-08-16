// server.js
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, Images)
app.use(express.static("public"));
app.use(express.static("src"));

// Middleware to parse JSON
app.use(express.json());

// Homepage route
app.get("/", (req, res) => {
  const userAgent = req.headers["user-agent"]?.toLowerCase() || "";

  // Detect common bots
  const isBot = /(bot|crawler|spider|crawling)/.test(userAgent);

  if (isBot) {
    // Serve pre-rendered HTML for bots
    try {
      const html = fs.readFileSync(
        path.join(__dirname, "bot-homepage.html"),
        "utf-8"
      );
      res.send(html);
    } catch (error) {
      // Fallback to main index.html if bot version doesn't exist
      res.sendFile(path.join(__dirname, "homepage-preview.html"));
    }
  } else {
    // Serve the premium dashboard version as main homepage
    res.sendFile(path.join(__dirname, "homepage-preview.html"));
  }
});

// Homepage variations routes
app.get("/homepage-preview", (req, res) => {
  res.sendFile(path.join(__dirname, "homepage-preview.html"));
});

app.get("/homepage-view", (req, res) => {
  res.sendFile(path.join(__dirname, "homepage-view.html"));
});

app.get("/view-homepage", (req, res) => {
  res.sendFile(path.join(__dirname, "view-homepage.html"));
});

app.get("/ultra-cutting-edge", (req, res) => {
  res.sendFile(path.join(__dirname, "ultra-cutting-edge.html"));
});

// Pages routes
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard.html"));
});

app.get("/live-data", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "live-data.html"));
});

app.get("/ai-models", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "ai-models.html"));
});

app.get("/quantum-status", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "quantum-status.html"));
});

app.get("/clients", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "clients.html"));
});

// API routes for dynamic functionality
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    platform: "SUGGESTLY ELITE",
    version: "2.0.0",
    features: [
      "Ultra Premium Luxury Platform",
      "Web3 Integration",
      "AI Concierge",
      "AR Experiences",
      "Live Data Feeds",
      "NFT Membership",
    ],
  });
});

// WebSocket endpoint for live data (placeholder)
app.get("/api/live-feed", (req, res) => {
  res.json({
    connected: true,
    events: [
      {
        id: 1,
        type: "luxury_metric",
        data: { satisfaction: 89, performance: 94, luxury_index: 67 },
      },
    ],
  });
});

// Serve React components as static files
app.get("/components/:component", (req, res) => {
  const component = req.params.component;
  const componentPath = path.join(
    __dirname,
    "src",
    "components",
    `${component}.jsx`
  );

  if (fs.existsSync(componentPath)) {
    res.sendFile(componentPath);
  } else {
    res.status(404).json({ error: "Component not found" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 SUGGESTLY ELITE Server running on http://localhost:${PORT}`);
  console.log(`💎 Ultra Premium Luxury Platform`);
  console.log(`🌐 Web3 Integration: Ready`);
  console.log(`🤖 AI Concierge: Active`);
  console.log(`🎯 AR Experiences: Available`);
  console.log(`📊 Live Data Feeds: Connected`);
  console.log(`✨ NFT Membership: Enabled`);
  console.log(`📄 Available Homepages:`);
  console.log(`   - Main: http://localhost:${PORT}/`);
  console.log(`   - Preview: http://localhost:${PORT}/homepage-preview`);
  console.log(`   - Extended: http://localhost:${PORT}/homepage-view`);
  console.log(`   - Simple: http://localhost:${PORT}/view-homepage`);
  console.log(`   - Ultra: http://localhost:${PORT}/ultra-cutting-edge`);
});
