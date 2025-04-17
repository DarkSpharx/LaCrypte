let apiUrl = "https://api.rawg.io/api";

(async function fetchConfig() {
  try {
    const response = await fetch("/config");
    const config = await response.json();
    apiUrl = config.apiUrl || "https://api.rawg.io/api";
  } catch (error) {
    console.error("Erreur lors de la récupération de la configuration :", error);
  }
})();

/**
 * Fonction pour effectuer des requêtes API
 * @param {string} route
 * @param {object} options - peut inclure une propriété "params" pour les query params
 * @returns {Promise}
 */
export async function fetchData({ route, api = apiUrl, options = {} }) {
  const headers = { Accept: "application/json", ...options.headers };

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