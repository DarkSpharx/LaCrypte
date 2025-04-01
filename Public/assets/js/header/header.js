const toggleNavMobile = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconeMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.toggle("mobile");
  iconeMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile")
      ? "fa-solid fa-circle-xmark"
      : "fas fa-burger"
  );
};

const closeMenu = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconeMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.remove("mobile");
  iconeMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile")
      ? "fa-solid fa-circle-xmark"
      : "fas fa-burger"
  );
};

function initMobileMenu() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    let toggleNav = document.querySelector("#toggle-nav");
    toggleNav.style.cursor = "pointer";
    toggleNav.addEventListener("click", toggleNavMobile);
    let main = document.querySelector("main");
    main.addEventListener("click", closeMenu);
    let navLinks = document.querySelectorAll("nav > #nav > ul > li > a");
    navLinks.forEach((navLinks) => {
      navLinks.addEventListener("click", closeMenu);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  window.addEventListener("resize", initMobileMenu);
  window.addEventListener("scroll", closeMenu);
  window.addEventListener("resize", closeMenu);
});
