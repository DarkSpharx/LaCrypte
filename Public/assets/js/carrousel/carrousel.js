// v3
import { fetchData } from "../lib/functions.js";

window.addEventListener("DOMContentLoaded", () => {
  fetchData({
    route:
      "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7",
  })
    .then((data) => data.results)
    .then((games) => {
      if (games && games.length > 0) {
        createCarrousel(games);
      } else {
        console.error("Aucun carrousel trouvé...");
      }
    });
});

function createCarrousel(games) {
  const carrousel = document.querySelector(".carrousel");

  // Créer un slide par jeu
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const imgGame = document.createElement("img");
    imgGame.src = game.background_image;
    imgGame.alt = game.name;
    imgGame.addEventListener("click", () =>
      openLightBox(imgGame.src, game.name)
    );
    slide.appendChild(imgGame);
    const caption = document.createElement("div");
    caption.className = "carrousel-caption";
    caption.textContent = game.name;
    slide.appendChild(caption);
    carrousel?.appendChild(slide);
  });

  // Cloner la dernière slide et l'insérer au début
  const slides = carrousel.children; // HTMLCollection dynamique
  const lastSlideClone = slides[games.length - 1].cloneNode(true);
  carrousel.insertBefore(lastSlideClone, slides[0]);

  // Cloner la première slide et l'ajouter à la fin
  const firstSlideClone = slides[1].cloneNode(true);
  carrousel.appendChild(firstSlideClone);

  // On démarre à l'index 1, qui correspond à la première slide réelle
  let currentIndex = 1;
  const totalSlides = games.length; // nombre de slides réelles

  // Position initiale (sans transition pour le réglage)
  carrousel.style.transition = "none";
  showSlide(currentIndex);
  setTimeout(() => {
    carrousel.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  function showSlide(index) {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
  }

  const prevButton = document.querySelector(".prev");
  prevButton.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone du dernier, on repositionne instantanément sur la vraie dernière slide
    if (currentIndex === 0) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = totalSlides;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  const nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone de la première, repositionnement sur la vraie première slide
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  // Mise à jour du setInterval avec la même logique que pour le bouton next
  function calcSlide() {
    currentIndex++;
    showSlide(currentIndex);
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  }

  const closeLightBox = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
    lightboxIsOpen = false;
    startInterval();
  };

  let inter;
  let lightboxIsOpen = false;

  function startInterval() {
    inter = setInterval(calcSlide, 3000);
  }

  setTimeout(() => {
    startInterval();
    const carrouselContainer = document.querySelector("#carrousel-content");
    carrouselContainer.addEventListener("mouseenter", () =>
      clearInterval(inter)
    );
    carrouselContainer.addEventListener("mouseleave", () => {
      clearInterval(inter);
      if (!lightboxIsOpen) startInterval();
    });
  }, 2000);

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeLightBox();
    }
  });

  window.addEventListener("keydown", (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
      clearInterval(inter);
      startInterval();
      prevButton.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      clearInterval(inter);
      startInterval();
      nextButton.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      closeLightBox();
    }
  }
  // Lightbox et gestion des évènements clavier restent inchangés
  function openLightBox(src, alt) {
    lightboxIsOpen = true;
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    clearInterval(inter);
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    closeLightBox();
  });
}

// // v2
// import { fetchData } from "../lib/functions.js";

// window.addEventListener("DOMContentLoaded", () => {
//   fetchData({
//     route:
//       "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7",
//   })
//     .then((data) => data.results)
//     .then((games) => {
//       if (games && games.length > 0) {
//         createCarrousel(games);
//       } else {
//         console.error("Aucun carrousel trouvé...");
//       }
//     });
// });

// function createCarrousel(games) {
//   const carrousel = document.querySelector(".carrousel");

//   // Créer un slide par jeu
//   games.forEach((game) => {
//     const slide = document.createElement("div");
//     slide.className = "carrousel-slide";
//     const imgGame = document.createElement("img");
//     imgGame.src = game.background_image;
//     imgGame.alt = game.name;
//     imgGame.addEventListener("click", () =>
//       openLightBox(imgGame.src, game.name)
//     );
//     slide.appendChild(imgGame);
//     const caption = document.createElement("div");
//     caption.className = "carrousel-caption";
//     caption.textContent = game.name;
//     slide.appendChild(caption);
//     carrousel?.appendChild(slide);
//   });

//   // Cloner la dernière slide et l'insérer au début
//   const slides = carrousel.children; // HTMLCollection dynamique
//   const lastSlideClone = slides[games.length - 1].cloneNode(true);
//   carrousel.insertBefore(lastSlideClone, slides[0]);

//   // Cloner la première slide et l'ajouter à la fin
//   const firstSlideClone = slides[1].cloneNode(true);
//   carrousel.appendChild(firstSlideClone);

//   // On démarre à l'index 1, qui correspond à la première slide réelle
//   let currentIndex = 1;
//   const totalSlides = games.length; // nombre de slides réelles

//   // Position initiale (sans transition pour le réglage)
//   carrousel.style.transition = "none";
//   showSlide(currentIndex);
//   setTimeout(() => {
//     carrousel.style.transition = "transform 0.5s ease-in-out";
//   }, 50);

//   function showSlide(index) {
//     carrousel.style.transform = `translateX(-${index * 100}%)`;
//   }

//   const prevButton = document.querySelector(".prev");
//   prevButton.addEventListener("click", () => {
//     currentIndex--;
//     showSlide(currentIndex);
//     // Si on arrive sur la slide clone du dernier, on repositionne instantanément sur la vraie dernière slide
//     if (currentIndex === 0) {
//       carrousel.addEventListener("transitionend", function handler() {
//         carrousel.style.transition = "none";
//         currentIndex = totalSlides;
//         showSlide(currentIndex);
//         setTimeout(() => {
//           carrousel.style.transition = "transform 0.5s ease-in-out";
//         }, 50);
//         carrousel.removeEventListener("transitionend", handler);
//       });
//     }
//   });

//   const nextButton = document.querySelector(".next");
//   nextButton.addEventListener("click", () => {
//     currentIndex++;
//     showSlide(currentIndex);
//     // Si on arrive sur la slide clone de la première, repositionnement sur la vraie première slide
//     if (currentIndex === totalSlides + 1) {
//       carrousel.addEventListener("transitionend", function handler() {
//         carrousel.style.transition = "none";
//         currentIndex = 1;
//         showSlide(currentIndex);
//         setTimeout(() => {
//           carrousel.style.transition = "transform 0.5s ease-in-out";
//         }, 50);
//         carrousel.removeEventListener("transitionend", handler);
//       });
//     }
//   });

//   // Mise à jour du setInterval avec la même logique que pour le bouton next
//   function calcSlide() {
//     currentIndex++;
//     showSlide(currentIndex);
//     if (currentIndex === totalSlides + 1) {
//       carrousel.addEventListener("transitionend", function handler() {
//         carrousel.style.transition = "none";
//         currentIndex = 1;
//         showSlide(currentIndex);
//         setTimeout(() => {
//           carrousel.style.transition = "transform 0.5s ease-in-out";
//         }, 50);
//         carrousel.removeEventListener("transitionend", handler);
//       });
//     }
//   }

//   let inter;
//   let lightboxIsOpen = false;
//   setTimeout(() => {
//     inter = setInterval(calcSlide, 3000);
//     const carrouselContent = document.querySelector("#carrousel-content");
//     carrouselContent.addEventListener("mouseenter", () => clearInterval(inter));
//     carrouselContent.addEventListener("mouseleave", () => {
//       clearInterval(inter);
//       if (!lightboxIsOpen) inter = setInterval(calcSlide, 3000);
//     });
//   }, 2000);

//   // Lightbox et gestion des évènements clavier restent inchangés
//   function openLightBox(src, alt) {
//     const lightbox = document.querySelector("#lightbox");
//     const lightboxImg = document.querySelector("#lightbox-img");
//     lightboxIsOpen = true;
//     lightbox.style.display = "flex";
//     lightboxImg.src = src;
//     lightboxImg.alt = alt;
//   }

//   // cliquer sur la croix pour fermer
//   const closeButton = document.querySelector(".close");
//   closeButton.addEventListener("click", () => {
//     const lightbox = document.querySelector("#lightbox");
//     lightbox.style.display = "none";
//     lightboxIsOpen = false;
//     inter = setInterval(calcSlide, 3000);
//   });

//   // cliquer en dehors de l'image pour quitter la lightbox
//   const lightbox = document.querySelector("#lightbox");
//   lightbox.addEventListener("click", (e) => {
//     if (e.target === e.currentTarget) {
//       lightbox.style.display = "none";
//       lightboxIsOpen = false;
//       inter = setInterval(calcSlide, 3000);
//     }
//   });

//   // touche echap pour quitter le plein écan de la lightbox du carrousel
//   // fleche gauche et droite pour naviguer dans le carrousel
//   window.addEventListener("keydown", (e) => prevOrNext(e));
//   function prevOrNext(e) {
//     if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
//       clearInterval(inter);
//       inter = setInterval(calcSlide, 3000);
//       prevButton.click();
//     } else if (
//       e.key === "ArrowRight" ||
//       e.code === "ArrowRight" ||
//       e.keyCode === 39
//     ) {
//       clearInterval(inter);
//       inter = setInterval(calcSlide, 3000);
//       nextButton.click();
//     } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
//       clearInterval(inter);
//       inter = setInterval(calcSlide, 3000);
//       lightbox.style.display = "none";
//       lightboxIsOpen = false;
//       inter = setInterval(calcSlide, 3000);
//     }
//   }
// }

// v1
// function createCarrousel(games) {
//   const carrousel = document.querySelector(".carrousel");
//   // créer un slid par objet
//   games.forEach((games) => {
//     const slide = document.createElement("div");
//     slide.className = "carrousel-slide";
//     const imgGame = document.createElement("img");
//     imgGame.src = games.background_image; // équivalent à : imgGame.setAttribute("src", game.image_url)
//     imgGame.alt = games.name;
//     imgGame.addEventListener("click", () =>
//       openLightBox(imgGame.src, games.name)
//     );
//     slide.appendChild(imgGame);
//     carrousel.appendChild(slide);
//     const caption = document.createElement("div");
//     caption.className = "carrousel-caption";
//     caption.textContent = games.name;
//     slide.appendChild(caption);
//     carrousel.appendChild(slide);
//   });

//   let currentIndex = 0;
//   const totalSlides = games.length;

//   function showSlide(index) {
//     carrousel.style.transform = `translateX(-${index * 100}%)`;
//   }

//   const prevButton = document.querySelector(".prev");
//   prevButton.addEventListener("click", () => {
//     currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
//     showSlide(currentIndex);
//   });

//   const nextButton = document.querySelector(".next");
//   nextButton.addEventListener("click", () => {
//     currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
//     showSlide(currentIndex);
//   });

//   function calcSlide() {
//     currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
//     showSlide(currentIndex);
//   }

//   let inter;
//   setTimeout(() => {
//     inter = setInterval(calcSlide, 3000);
//     carrousel.addEventListener("mouseenter", () => clearInterval(inter));
//     carrousel.addEventListener("mouseleave", () => {
//       clearInterval(inter);
//       inter = setInterval(calcSlide, 3000);
//     });
//   });

//   function openLightBox(src, alt) {
//     const lightBox = document.querySelector("#lightbox");
//     const lightBoxImg = document.querySelector("#lightbox-img");
//     lightBox.style.display = "flex";
//     lightBoxImg.src = src;
//     lightBoxImg.alt = alt;
//   }

//   const closeButton = document.querySelector(".close");
//   closeButton.addEventListener("click", () => {
//     const lightBox = document.querySelector("#lightbox");
//     lightBox.style.display = "none";
//   });

//   // cliquer en dehors de l'image pour quitter la lightbox
//   const lightBox = document.querySelector("#lightbox");
//   lightBox.addEventListener("click", (closeOff) => {
//     if (closeOff.target === closeOff.currentTarget) {
//       lightBox.style.display = "none";
//     }
//   });

//   // touche echap pour quitter le plein écan de la lightbox du carrousel
//   window.addEventListener("keydown", echapLightBox);
//   function echapLightBox(touche) {
//     console.log(`${touche.keyCode}`);
//     console.log(`${touche.key}`);
//     if (
//       touche.key === "Escape" ||
//       touche.keyCode === 27 ||
//       touche.code === "Escape"
//     )
//       lightBox.style.display = "none";
//   }

//   // fleche gauche et droite pour naviguer dans le carrousel
//   window.addEventListener("keydown", leftOrRight);
//   function leftOrRight(touche) {
//     if (
//       touche.key === "ArrowLeft" ||
//       touche.keyCode === 37 ||
//       touche.code === "ArrowLeft"
//     ) {
//       prevButton.click();
//     } else if (
//       touche.key === "ArrowRight" ||
//       touche.keyCode === 39 ||
//       touche.code === "ArrowRight"
//     ) {
//       nextButton.click();
//     }
//   }
// }
