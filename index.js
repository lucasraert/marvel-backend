const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Marvel" });
});

app.get("/characters", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const name = req.query.name || "";

    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          limit,
          skip,
          name,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const title = req.query.title || "";

    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          limit,
          skip,
          title,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
