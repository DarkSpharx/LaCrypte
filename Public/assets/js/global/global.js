window.addEventListener("DOMContentLoaded", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// formulaire de contact
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Ici, vous pouvez ajouter la logique d'envoi de données (ex. via AJAX)

    // Affichage d'un message de confirmation
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.innerText = `Merci ${name}, votre message a été envoyé !`;

    // Réinitialiser le formulaire
    this.reset();
  });
