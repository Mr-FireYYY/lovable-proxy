// index.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Autoriser toutes les requêtes depuis n'importe quelle origine (CORS)
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// ⚡ Remplace par l'URL complète de ton Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxf0rezqgwbFYsy08fevdPSfdIuw1kgKolX-3LbtEz_oTWcaMn8fZxSi2muO_VW95r9-A/exec";

// Route test pour vérifier que le proxy fonctionne
app.get("/", (req, res) => {
  res.send("Proxy fonctionne !");
});

// Route pour envoyer un message au Google Apps Script
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
    console.error("Erreur proxy:", err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
