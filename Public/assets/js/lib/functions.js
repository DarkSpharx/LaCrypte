// on stock ici les function qui ne sont utiles a l'animation du DOM mais des requettes

// la route API (ex: http://localhost:8000)
const apiUrl = "https://api.rawg.io/api";

// fonction asynchrone (pour avoir une réponse)
// si async mettre await dans le traitement
// ex: de route => /blog
// ex: options => {Accept: "application/json"}

/**
 *
 * @param {string} route
 * @param {object} options
 * @returns {Promise}
 */

export async function fetchData({ route, options = {} }) {
  // préparation de l'entrée "headers"avec les clés valeurs nécessaire pour l'appel [Authorization:"Bearer geg56eg416rge41"]
  const headers = { Accept: "application/json", ...options.headers };
  // appel méthode native fetch (requette d'API de type asynchrone)
  const result = await fetch(`${apiUrl}${route}`, { ...options, headers });

  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
