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

// window.addEventListener("DOMContentLoaded", () => {
//   initMobileMenu();
//   window.addEventListener("resize", initMobileMenu);
//   window.addEventListener("scroll", closeMenu);
//   window.addEventListener("resize", closeMenu);
//   const links = document.querySelectorAll('#nav a');
//   const currentPage = window.location.pathname.split('/').pop();
//   links.forEach((link) => {
//     const href = link.getAttribute('href').replace(/^\/+/, '');
//     if (href === currentPage) {
//       link.classList.add('active'); // Ajouter la classe active
//     }
//   });
// });

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  const debouncedInitMenu = debounce(initMobileMenu, 200);
  const debouncedCloseMenu = debounce(closeMenu, 200);

  window.addEventListener("resize", debouncedInitMenu);
  window.addEventListener("scroll", () => {
    closeMenu();
    updateActiveSection();
  });
  window.addEventListener("resize", debouncedCloseMenu);

  const links = document.querySelectorAll('#nav a');
  const currentPage = window.location.pathname.split('/').pop();

  links.forEach((link) => {
    const href = link.getAttribute('href').replace(/^\/+/, '');
    if (href === currentPage) {
      link.classList.add('active'); // Ajouter la classe active
    }
  });

  function updateActiveSection() {
    const sections = document.querySelectorAll('#projet, #offre, #carrousel');
    let scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
  
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const id = section.getAttribute('id');
        links.forEach((link) => {
          link.classList.remove('active');
          // Retirer le '/' du href pour la comparaison
          const href = link.getAttribute('href').replace(/^\/+/, '');
          if (href === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
});