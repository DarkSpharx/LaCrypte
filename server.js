const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const { fetchData } = require("./Public/assets/js/lib/functions");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/masonry", (req, res) => {
  res.render("pages/masonry", {images: imagesTab});
});

const images = fetchData({
  route:
    "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7",
}).then((data) => {
  return data.results;
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
