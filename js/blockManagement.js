function refresh(l, p) {
  // Récupération des div "navbar", "footer" et "main"
  var navdiv = document.querySelector(".nav");
  var footerdiv = document.querySelector(".footer");
  var content = document.querySelector(".main");

  // Lecture des fichiers navbar.html et footer.html pour injecter les lignes dans les div
  fetch(`html/${l}/navbar.html`)
    .then((response) => response.text()) // Transformation du contenu du fichier en texte
    .then((text) => (navdiv.innerHTML = text)); // Ajout du texte dans la div navbar

  fetch(`html/${l}/footer.html`)
    .then((response) => response.text())
    .then((text) => (footerdiv.innerHTML = text));

  fetch(`html/${l}/${p}.html`)
    .then((response) => response.text())
    .then((text) => (content.innerHTML = text));
}

// Fonction servant à actualiser la page (sans actualiser la barre de navigation et le pied de page)
function refreshPage(l, p) {
  var content = document.querySelector(".main");

  fetch(`html/${l}/${p}.html`)
    .then((response) => response.text())
    .then((text) => (content.innerHTML = text));
}
