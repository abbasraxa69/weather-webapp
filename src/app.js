const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining paths for express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//to serve static pages through path
app.use(express.static(publicPathDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Abbas Raza" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Abbas Raza" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "For any queries contact me",
    name: "Abbas Raza",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address to view weather.",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData = "") => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecastData,
        label,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "Help article not found.",
    title: "Error 404",
    name: "Abbas Raza",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    error: "Page not found",
    title: "Error 404",
    name: "Abbas Raza",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 300");
});
