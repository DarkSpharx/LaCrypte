import { fetchData } from "../lib/functions.js";

// les champs du formulaire
const form = document.querySelector("#form-contact");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

// les div erreurs
const errorName = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorSubject = document.querySelector("#error-subject");
const errorMessage = document.querySelector("#error-message");

// validation du message
const responseMessage = document.querySelector("#response-message");

// validation de données
const nameRegex = new RegExp("^[A-Za-zÀ-ÿ-]+(?: [A-Za-zÀ-ÿ-]+)*$"); // Cette expression régulière vérifie si une chaîne est composée d'un ou plusieurs mots (lettres et tirets), où les mots peuvent être séparés par des espaces. Cela pourrait correspondre à des noms, des prénoms, ou des titres avec des caractères spéciaux et des tirets, comme "Jean-Pierre" ou "Émilie Dupont".
const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"); // Cette expression régulière vérifie qu'une chaîne est une adresse e-mail valide, conforme au format général d'une adresse, avec une partie locale, un symbole @, un domaine, et une extension d'au moins deux lettres. Par exemple, elle correspondrait à des adresses comme example@example.com ou user.name+tag@domain.com.

// validation via regex
function validateField(input, regex, errorEl, errorMsg) {
    const value = input.value.trim();
    if (!regex.test(value)) {
      errorEl.textContent = errorMsg;
      input.classList.remove('valid');
      input.classList.add('invalid');
      setValidationIcon(input, false);
      return false;
    } else {
      errorEl.textContent = '';
      input.classList.remove('invalid');
      input.classList.add('valid');
      setValidationIcon(input, true);
      return true;
    }
  };

// ajout d'écoucte d'évenement pour valider chaque champs
// nameInput.addEventListener("blur", () => {
//     validateField(nameInput, nameRegex, errorName, "Veuillez saisir un nom valide (2 caractéres minimums avec seulement des lettres et des espaces)");
// });
// emailInput.addEventListener("blur", () => {
//     validateField(emailInput, emailRegex, errorEmail, "Veuillez saisir une adresse email valide (exemple@exemple.fr)");
// });

// Fonction de validation par longueur minimale pour les champs sujet et message
function validateLength(input, minLength, errorEl, errorMsg) {
    const value = input.value.trim();
    if (value.length < minLength) {
      errorEl.textContent = errorMsg;
      input.classList.remove('valid');
      input.classList.add('invalid');
      setValidationIcon(input, false);
      return false;
    } else {
      errorEl.textContent = '';
      input.classList.remove('invalid');
      input.classList.add('valid');
      setValidationIcon(input, true);
      return true;
    }
  };

// Affiche ou cache l'icône de validation dans le wrapper de l'input
function setValidationIcon(input, isValid) {
    const wrapper = input.parentElement;
    const icon = wrapper.querySelector('.validation-icon');
    if (isValid) {
      icon.className = 'validation-icon fas fa-check valid-icon'; // Icône check verte
    } else {
      icon.className = 'validation-icon'; // Réinitialisation (aucune icône)
    }
  };
  
  // Ajout d'événements 'blur' pour la validation de chaque champ
  nameInput.addEventListener('blur', () => {
    validateField(nameInput, nameRegex, errorName, 'Veuillez entrer un nom valide (minimum 2 caractères, lettres et s uniquement).');
  });
  emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailRegex, errorEmail, 'Veuillez entrer une adresse email valide.');
  });
  subjectInput.addEventListener('blur', () => {
    validateLength(subjectInput, 3, errorSubject, 'Le sujet doit comporter au moins 3 caractères.');
  });
  messageInput.addEventListener('blur', () => {
    validateLength(messageInput, 10, errorMessage, 'Le message doit comporter au moins 10 caractères.');
  });

  // nameInput.addEventListener("focus", () => {
  //   nameInput.placeholder = "Veuillez entrer un nom valide (minimum 2 caractères, lettres et tiret uniquement)";
  // });
  // nameInput.addEventListener("blur", () => {
  //   nameInput.placeholder = "Votre NOM";
  // });

  // emailInput.addEventListener("focus", () => {
  //   emailInput.placeholder = "Veuillez entrer une adresse email valide.";
  // });
  // emailInput.addEventListener("blur", () => {
  //   emailInput.placeholder = "Votre adresse email";
  // });

  // subjectInput.addEventListener("focus", () => {
  //   subjectInput.placeholder = "Le sujet doit comporter au moins 3 caractères.";
  // });
  // subjectInput.addEventListener("blur", () => {
  //   subjectInput.placeholder = "Le sujet de votre message";
  // });
  
  // messageInput.addEventListener("focus", () => {
  //   messageInput.placeholder = "Le message doit comporter au moins 10 caractères.";
  // });
  // messageInput.addEventListener("blur", () => {
  //   messageInput.placeholder = "Votre message";
  // });

  // Désactiver le button d'envoi si les champs ne sont pas valides
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Validation finale avant envoi
  const isNameValid = validateField(nameInput, nameRegex, errorName, 'Veuillez entrer un nom valide (minimum 2 caractères, lettres et espaces uniquement).');
  const isEmailValid = validateField(emailInput, emailRegex, errorEmail, 'Veuillez entrer une adresse email valide.');
  const isSubjectValid = validateLength(subjectInput, 3, errorSubject, 'Le sujet doit comporter au moins 3 caractères.');
  const isMessageValid = validateLength(messageInput, 10, errorMessage, 'Le message doit comporter au moins 10 caractères.');
  // const isNameValid = validateField(nameInput, nameRegex);
  // const isEmailValid = validateField(emailInput, emailRegex);
  // const isSubjectValid = validateLength(subjectInput);
  // const isMessageValid = validateLength(messageInput);
  if (!isNameValid|| !isEmailValid || !isSubjectValid || !isMessageValid) return;
  
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
  };
  console.log("formData : ", formData);

  // envoi du message
  try {
    const result = await fetchData({
      route: '/contact',
      api: '',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    });

    responseMessage.innerHTML = `<div class="alert success">${result.message}</div>`; // Afficher le message de succès
    form.reset(); // Réinitialiser le formulaire après l'envoi
    document
      .querySelectorAll(".validation-icon")
      .forEach((icon) => (icon.className = "validation-icon")); // Réinitialiser les icônes de validation
  } catch (error) {
    responseMessage.innerHTML = `<div class="alert error">Une erreur est survenue lors de l'envoie du formulaire</div>`; // Afficher le message d'erreur
    console.log(error);
  }
  console.log(event);
  });