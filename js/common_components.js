// Récupération des div "navbar" et "footer"
var navdiv = document.querySelector(".navbar");
var footerdiv = document.querySelector(".footer");

// Lecture des fichiers navbar.html et footer.html pour injecter les lignes dans les div
fetch("../html/navbar.html")
    .then(response => response.text())  // Transformation du contenu du fichier en texte
    .then(text => navdiv.innerHTML += text)  // Ajout du texte dans la div navbar

fetch("../html/footer.html")
    .then(response => response.text())
    .then(text => footerdiv.innerHTML += text)