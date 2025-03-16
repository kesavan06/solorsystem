const express = require("express");
const path = require("path");
const planetData = require("../utils/getPlanetData");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewPath = path.join(__dirname, "../views");
const pubDir = path.join(__dirname, "../public");

app.set("view engine", "ejs");
app.set("views", viewPath); 
app.use(express.static(pubDir));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/default", (req, res) => {
  let planetName = "MERCURY";
  planetData(planetName, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      res.send(data);
    }
  });
});

app.get("/additional", (req, res) => {
  if (!req.query.planetname) {
    return res.end({
      error: "planet name and detail is missing",
    });
  }
  let planetName = req.query.planetname;

  planetData(planetName, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      res.send(data);
    }
  });
});

app.get("/planets", (req, res) => {
  if (!req.query.planetname) {
    return res.send({
      error: "planetname is missing",
    });
  }
  let planetName = req.query.planetname;
  planetData(planetName, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      res.send(data);
    }
  });
});

app.listen(3006, () => {
  console.log("Connected");
});
