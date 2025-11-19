import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

// Domaine front Lovable
const ALLOWED_ORIGIN = "https://preview--1068e326-07d5-46d9-b54a-e7ac726a4e50.lovable.app";

// Middleware CORS manuel (obligatoire pour Vercel)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(bodyParser.json({ limit: "50mb" }));

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxf0rezqgwbFYsy08fevdPSfdIuw1kgKolX-3LbtEz_oTWcaMn8fZxSi2muO_VW95r9-A/exec";

// Test
app.get("/", (req, res) => {
  res.send("Proxy fonctionne Vercel 🚀");
});

// Route proxy
app.post("/api/sendMessage", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erreur Proxy:", err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

app.listen(PORT, () => console.log("Proxy running on port " + PORT));