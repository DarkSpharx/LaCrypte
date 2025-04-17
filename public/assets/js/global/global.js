// window.addEventListener("DOMContentLoaded", () => {
//   // We execute the same script as before
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });

// window.addEventListener("resize", () => {
//   // We execute the same script as before
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });

function calcViewportHeight() {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function calcBodyPadding() {
  const reseauxMobile = document.querySelector("#reseaux-mobile");
  const header = document.querySelector("header");
  const main = document.querySelector("main:not(#accueil)");
  if (main) main.style.paddingTop = `${header.offsetHeight + 10}px`;
  if (window.matchMedia("(max-width: 576px)").matches) {
    document.body.style.paddingBottom = `${reseauxMobile.offsetHeight + 0}px`;
  } else {
    document.body.style.paddingBottom = "10px";
  }
  setTimeout(() => {
    if (window.location.hash && window.location.hash.startsWith("#")) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // Si vous avez une en-tête fixe, ajustez yOffset (exemple : -100px)
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset +
          header.offsetHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  calcViewportHeight();
  calcBodyPadding();
});
window.addEventListener("resize", () => {
  calcViewportHeight();
  calcBodyPadding();
});

function checkYouTubeBlocked(iframeSelector, callback) {
  const iframe = document.querySelector(iframeSelector);

  if (!iframe) {
    console.warn("Iframe non trouvé");
    return;
  }

  const timeout = setTimeout(() => {
    callback(true); // Considéré comme bloqué après 3 secondes
  }, 3000);

  iframe.addEventListener("load", () => {
    clearTimeout(timeout);
    callback(false); // Chargé correctement
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Utilisation avec une classe CSS
  checkYouTubeBlocked(".video-iframe", (isBlocked) => {
    if (isBlocked) {
      const warning = document.createElement("p");
      warning.textContent =
        "⚠️ La vidéo YouTube semble bloquée par une extension de navigateur.";
      warning.style.color = "red";
      warning.style.textAlign = "center";
      warning.style.marginTop = "1rem";

      const iframe = document.querySelector(".video-iframe");
      iframe.parentNode.insertBefore(warning, iframe);
    }
  });
});
