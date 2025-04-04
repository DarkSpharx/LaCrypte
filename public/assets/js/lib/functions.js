// on stock ici les function qui ne sont utiles a l'animation du DOM mais des requettes

// la route API (ex: http://localhost:3000)
const apiUrl = "https://api.rawg.io/api";

// fonction asynchrone (pour avoir une réponse)
// si async mettre await dans le traitement
// ex: de route => /blog
// ex: options => {Accept: "application/json"}

/**
 *
 * @param {string} route
 * @param {object} options - peut inclure une propriété "parmas" pour les query params
 * @returns {Promise}
 */

export async function fetchData({ route, api = apiUrl, options = {} }) {
  // préparation de l'entrée "headers"avec les clés valeurs nécessaire pour l'appel [Authorization:"Bearer geg56eg416rge41"]
  const headers = { Accept: "application/json", ...options.headers };
  console.log(headers);
  // appel méthode native fetch (requette d'API de type asynchrone)
  let queryString = "";
  if (options.params) {
    queryString = "?" + new URLSearchParams(options.params).toString();
    delete options.params;
  }
  const result = await fetch(`${api}${route}${queryString}`, { ...options, headers });

  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
