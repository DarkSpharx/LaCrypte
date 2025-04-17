const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/functions");

app.get("/config", (req, res) => {
  res.json({
    apiUrl: process.env.API_URL,
  });
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

// pour parser le JSON
app.use(express.json());

// Sécuriser les en-têtes HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com/",
          "https://media.rawg.io/",
        ],
        connectSrc: [
          "'self'",
          "https://api.unsplash.com/",
          "https://api.rawg.io/",
        ],
        frameSrc: [
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
        ],
      },
    },
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

const images = fetchData({
  api: "https://api.unsplash.com",
  route: "/photos",
  options: {
    headers: {
      Authorization: `Client-ID ${process.env.KeyApi}`,
    },
    params: { per_page: 50 },
  },
}).then((data) => {
  return data;
});

app.get("/gallerie", async (req, res) => {
  try {
    const imagesData = await images;
    console.log(imagesData);
    res.render("pages/gallerie", { images: imagesData });
  } catch (err) {
    console.log(err);
    res.render("pages/gallerie", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// envoie message
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const htmlContent = `
  <h1>Nouveau message du contact</h1>
  <p><strong>Nom : </strong> ${name}</p>
  <p><strong>Email : </strong> ${email}</p>
  <p><strong>Sujet : </strong> ${subject}</p>
  <p><strong>Message : </strong> ${message}</p>
  `;

  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // port 465
      auth: {
        user: testAccount.user, //contact@lacrypte.com
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false, // Autoriser les certificats non sécurisés a faire seulement en local sinon grosse faille de sécurité
      },
    });

    let mailOptions = {
      from: `"contact LaCrypte" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);

    // récupération de l'URL de prévisualisation du message pour le test en local
    console.log("message envoyé : %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(200).json({
      message: "Votre message a bien été envoyé.",
      previewURL: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi du message.",
    });
  }
});
