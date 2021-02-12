require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const app = express();
const axios = require("axios");
app.use(formidableMiddleware());
const cors = require("cors");
app.use(cors());

//ROUTES PERSONNAGES(CHARACTERS)
app.get("/", (req, res) => {
  const getCharacters = async () => {
    try {
      console.log(req.query);
      const skip = Number(req.query.skip);
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${Number(
          req.query.skip
        )}&name=${req.query.characterName}`
      
      );
      const characters = response.data;
      res.json(characters);
      // res.send("Manakory e");
      //ENVOI AU FRON
    } catch (error) {
      console.error(error.message);
    }
  };
  getCharacters();
});



app.get("/AllCharacters", (req, res) => {
  const getCharacters = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
      );
      const characters = response.data;
      res.json(characters);
    } catch (error) {
      console.error(error.message);
    }
  };
  getCharacters();
});

//ROUTES COMICS
app.get("/comics", (req, res) => {
  const getMovie = async () => {
    try {
      // console.log(req.query);
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${Number(
          req.query.skip
        )}&title=${req.query.title}`
      );
      // console.log(response.data);

      res.json(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  getMovie();
});

app.get("/comics/:characterId", (req, res) => {
  const getMovie = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      console.log(response.data);

      res.json(response.data);
      // res.json(req.params);
    } catch (error) {
      console.error(error.message);
    }
  };
  getMovie();
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

//DEMARRAGE SERVEUR


app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
