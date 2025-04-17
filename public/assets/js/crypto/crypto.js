// https://rawg.io/apidocs
// https://rawg.io/@spharx/apikey

// const fetchGames = () =>
//   fetch(
//     "https://api.rawg.io/api/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       return data.results;
//     })
//     .catch((e) => console.log(e));

import { fetchData } from "../lib/functions.js";

// "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7"

window.addEventListener("DOMContentLoaded", () => {
  let loading = true;
  let tabGames = [];
  fetchData({
    route: "/games",
    options: {
      params: {
        key: "de462d1e145d44e084148f017bf5976d",
        dates: "2019-09-01,2019-09-30",
        platforms: "18,1,7",
      },
    },
  })
    .then((data) => {
      return data.results;
    })
    .then((data) => {
      loading = !loading;
      tabGames = [...tabGames, data];
      create(loading, tabGames[0]);
    });
});

function create(loading, tabGames) {
  if (!loading) {
    // console.log(tabGames);
    const crypto = document.querySelector("#crypto");
    const container = document.createElement("div");
    container.setAttribute("id", "content-games");
    crypto.appendChild(container);
    tabGames.map((game) => {
      const divArea = document.createElement("div");
      // style de départ de l'animation
      divArea.style.opacity = "0.7";
      divArea.style.transform = "scale(0.8)";
      container.appendChild(divArea);
      // animation | keyframe
      const anim = [
        {
          opacity: "0.7",
          transform: "scale(0.8)",
        },
        {
          opacity: "1",
          transform: "scale(1)",
        },
      ];
      // options possibles pour l'animation
      const options = {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards",
      };
      // création de l'observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.animate(anim, options);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );
      // élément à observer
      observer.observe(divArea);
      // for (let i = 0; i < tabGames.length; i += 2) {
      // let pair = tabGames.slice(i, i + 2);
      container.appendChild(divArea);
      // pair.map((game) => {
      const card = document.createElement("div");
      card.setAttribute("class", "game-card");
      const imgGame = document.createElement("img");
      imgGame.setAttribute("src", game.background_image);
      imgGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const avatarGame = document.createElement("img");
      avatarGame.setAttribute("src", game.short_screenshots[1].image);
      avatarGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const headerCard = document.createElement("div");
      const nameGame = document.createElement("h3");
      nameGame.textContent = `${
        game.name.length > 10 ? game.name.substring(0, 10) + "..." : game.name
      }`;
      const dateGame = document.createElement("span");
      dateGame.textContent = `${game.released}`;
      headerCard.append(nameGame, dateGame);
      card.append(headerCard, imgGame, avatarGame);
      divArea.append(card);
      // });
      // console.log(pair);
    });
  } else {
    console.log("loading ...");
  }
}
