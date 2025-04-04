const scrollTopButton = document.querySelector("#scroll-top");

function scrollTop() {
  const heroHeader = document.querySelector("#hero-header");
  window.addEventListener("scroll", () => {
    const height = heroHeader ? heroHeader.offsetHeight: 200;
    if (scrollY >= height) {
      scrollTopButton.style.display = "block";
    } else if (scrollY === 0) {
      scrollTopButton.style.display = "none";
    }
    scrollTopButton.addEventListener("click", () => window.scrollTo(0, 0));
  });
}

function posX() {
  if (window.matchMedia('(max-width: 576px)').matches) {
    const reseauMobile = document.querySelector('#reseaux-mobile');
    scrollTopButton.classList.add('mobile');
    reseauMobile.appendChild(scrollTopButton);
  } else {
    // const pos = (root.clientWidth - main.clientWidth) / 2;
    // scrollTopButton.style.right = `${pos}px`;
    scrollTopButton.classList.remove('mobile');
    document.body.appendChild(scrollTopButton);
  }
}

window.addEventListener("DOMContentLoaded",  () => {
  scrollTop();
  window.addEventListener("resize", posX);
});
posX();