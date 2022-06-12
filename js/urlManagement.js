function changeURL(newURL) {
  if (!validURL()) language = "en";
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
  refresh(language, newURL);
}

function changeLanguage() {
  let l = document.getElementById("language").value;
  let url = window.location.href;
  let parts = url.split("?");
  let page = parts[parts.length - 1];

  window.history.replaceState(
    { additionalInformation: "URL update" },
    " ",
    "?" + l + "?" + page
  );
  refresh(l, page);
}

window.addEventListener("hashchange", function () {
  if (!validURL) changeURL("home");
});

function validURL() {
  let url = window.location.href;
  let parts = url.split("?");
  let page = parts[parts.length - 1];
  let language = parts[parts.length - 2];

  if (
    !["en", "de", "fr"].includes(language) ||
    parts.length != 3 ||
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
      "labkaus",
      "fruhlingsdom",
      "filmfest",
      "hanseboot",
      "christmas",
      "pride",
      "gallery",
      "quizz",
      "shop",
      "credits",
    ].includes(page)
  ) {
    return false;
  } else {
    return true;
  }
}

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
