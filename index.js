// index.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Autoriser toutes les requêtes depuis Lovable
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Remplace par l'URL de ton Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/TON_ID/exec";

// Route test
app.get("/", (req, res) => {
  res.send("Proxy fonctionne !");
});

// Route pour envoyer un message ou un fichier
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
    console.error(err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
