// Fonction pour changer l'URL (sans recharger la page)
function changeURL(newURL) {
  if (!validURL()) language = "fr";
  else {
    url = window.location.href;
    parts = url.split("?");
    language = parts[parts.length - 2];
  }

  // URL avant le changement: https://URL/
  const nextURL = "?" + language + "?" + newURL;
  const nextState = { additionalInformation: "URL update" };

  // Remplacement de l'URL actuelle par la nouvelle URL sans recharger le site
  window.history.replaceState(nextState, " ", nextURL);
  window.scrollTo({ top: 0, behavior: "smooth" });
  refreshPage(language, newURL);
  if (newURL == "quizz") {
    startQuizz();
  }
}

// Fonction pour savoir si l'URL est valide
function validURL() {
  let url = window.location.href;
  let parts = url.split("?");
  let page = parts[parts.length - 1];
  let language = parts[parts.length - 2];

  if (
    !["fr"].includes(language) || // Si la langue n'est pas français
    parts.length != 3 || // Si il n'y a pas 3 parties dans l'URL
    ![
      "home",
      "eimsbuttel",
      "bergedorf",
      "hnord",
      "wandsbek",
      "harburg",
      "hcentre",
      "altona",
      "speicherstadt",
      "labskaus",
      "fruhlingsdom",
      "filmfest",
      "hanseboot",
      "christmas",
      "pride",
      "gallery",
      "quizz",
      "shop",
      "credits",
    ].includes(page) // Si la page n'existe pas
  ) {
    return false;
  } else {
    return true;
  }
}

// Initialise la validité de la page
function init() {
  if (validURL() == false) {
    changeURL("home");
  } else {
    let url = window.location.href;
    let parts = url.split("?");
    let page = parts[parts.length - 1];
    let language = parts[parts.length - 2];
    refresh(language, page);
  }
}

init();
