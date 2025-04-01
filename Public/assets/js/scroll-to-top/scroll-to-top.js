function scrollTop() {
  const scrollTopButton = document.querySelector("#scroll-top");
  const heroHeader = document.querySelector("#hero-header");
  window.addEventListener("scroll", () => {
    if (scrollY >= heroHeader.offsetHeight) {
      scrollTopButton.style.display = "block";
    } else if (scrollY === 0) {
      scrollTopButton.style.display = "none";
    }

    scrollTopButton.addEventListener("click", () => window.scrollTo(0, 0));
  });
}

window.addEventListener("DOMContentLoaded", scrollTop);
