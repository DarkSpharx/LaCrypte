const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
