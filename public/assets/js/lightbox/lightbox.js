// Sélectionne tous les éléments d'image dans la galerie
const galleryItems = document.querySelectorAll(".image-grid img");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const closeBtn = document.querySelector(".close");
const closeLightBox = () => {
  const lightbox = document.querySelector("#lightbox");
  lightbox.style.display = "none";
};

// Ouvre la lightbox avec l'image cliquée
galleryItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const imageSrc = event.target.src; // Récupère l'URL de l'image cliquée
    const imageAlt = event.target.alt; // Récupère la description de l'image

    lightboxImg.src = imageSrc; // Affiche l'image dans la lightbox
    lightboxImg.alt = imageAlt; // Affiche la description dans la lightbox

    lightbox.style.display = "flex"; // Affiche la lightbox
  });
});

// Ferme la lightbox lorsqu'on clique sur la croix
closeBtn.addEventListener("click", () => {
  closeLightBox(); // Cache la lightbox
});

// Ferme la lightbox lorsqu'on clique en dehors de l'image
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightBox(); // Cache la lightbox
  }
});

// Ferme la lightbox lorsqu'on appuie sur Echap
window.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" ||
    event.code === "Escape" ||
    event.keyCode === 27
  ) {
    closeLightBox(); // Cache la lightbox;
  }
});