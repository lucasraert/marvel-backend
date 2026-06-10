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
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`,
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
