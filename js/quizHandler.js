// Création des différentes questions du quizz
const questions = {
  fr: [
    {
      question: "Combien de quartiers sont décrits sur ce site ?",
      optionA: "6",
      optionB: "7",
      optionC: "8",
      optionD: "9",
      correctOption: "optionB",
    },

    {
      question: "En combien de quartiers se divise Harburg ?",
      optionA: "16 Quartiers",
      optionB: "17 Quartiers",
      optionC: "18 Quartiers",
      optionD: "19 Quartiers",
      correctOption: "optionB",
    },

    {
      question: "Quel événement a lieu du 29 septembre au 8 octobre 2022 ?",
      optionA: "FilmFest",
      optionB: "Pride",
      optionC: "Marché de Noël",
      optionD: "Hanseboot",
      correctOption: "optionA",
    },

    {
      question: "Quand a lieu la parade de la Pride à Hambourg ?",
      optionA: "7 Juillet",
      optionB: "23 Juillet",
      optionC: "6 Août",
      optionD: "13 Août",
      correctOption: "optionC",
    },

    {
      question:
        "Dans quel arrondissement trouve-t-on le parc Planten un Blomen ?",
      optionA: "Altona",
      optionB: "Wandsbek",
      optionC: "Eimsbüttel",
      optionD: "Hambourg-Centre",
      correctOption: "optionD",
    },

    {
      question: "Dans quel quartier se trouve la Speicherstadt ?",
      optionA: "HafenCity",
      optionB: "Alsterdorf",
      optionC: "Eppendorf",
      optionD: "Hoheluft-Ost",
      correctOption: "optionA",
    },

    {
      question: "De quelle ville le Labskaus n'est pas une spécialité ?",
      optionA: "Brême",
      optionB: "Hambourg",
      optionC: "Singen",
      optionD: "Lübeck",
      correctOption: "optionC",
    },

    {
      question:
        "En quelle année le premier festival du film à Hambourg a été ouvert ?",
      optionA: "1992",
      optionB: "1993",
      optionC: "1994",
      optionD: "1996",
      correctOption: "optionA",
    },

    {
      question: "Que retrouve-t-on généralement dans le Labskaus ?",
      optionA: "Du porc",
      optionB: "Du chou rouge",
      optionC: "Des courgettes",
      optionD: "De l'oeuf",
      correctOption: "optionD",
    },

    {
      question: "Dans quel arrondissement se trouve l'aéroport de Hambourg ?",
      optionA: "Harburg",
      optionB: "Bergedorf",
      optionC: "Wandsbek",
      optionD: "Eimsbüttel",
      correctOption: "optionD",
    },
  ],
};

// Fonction servant à démarrer le quizz
function startQuizz() {
  let t = setTimeout(() => {
    NextQuestion(0);
  }, 1000);
}

let shuffledQuestions = []; // Liste vide pour accueillir les questions

function handleQuestions() {
  url = window.location.href;
  parts = url.split("?");
  language = parts[parts.length - 2];
  // Fonction pour ajouter les questions à la liste
  shuffledQuestions = questions[language];
}

let questionNumber = 1; // Numéro de la question actuelle
let playerScore = 0; // Score du joueur
let wrongAttempt = 0; // Nombre de mauvaises réponses faits par le joueur
let indexNumber = 0; // Va être utilisé pour afficher la prochaine question

// FOnction pour afficher la question n°[index]
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; // Récupère la question actuelle
  const currentQuestionAnswer = currentQuestion.correctOption; // Recupère la bonne réponse à la question
  const options = document.getElementsByName("option"); // Récupère tous les input de type "option"
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      // Récupère la bonne réponse
      correctOption = option.labels[0].id;
    }
  });

  // Vérifie que la réponse choisie est bien un bouton de type radio
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  // Vérifie si le bouton coché a la même valeur que la bonne réponse
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++; // Ajoute un point au score du joueur
      indexNumber++; // Ajoute 1 à la question (pour passer à la question suivante)
      // Mettre un délai le temps que la question suivante charge
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++; // Ajoute 1 au nombre de mauvaises réponses
      indexNumber++;
      // Mettre un délai le temps que la question suivante charge
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

// Appelé quand le bouton suivant est appuyé
function handleNextQuestion() {
  checkForAnswer(); // Regarde si le jouer a pris la bonne ou la mauvaise réponse
  unCheckRadioButtons();
  // Ajoute un délai pour un confort (pour pas que le joueur se sente préssé)
  setTimeout(() => {
    if (indexNumber <= 9) {
      // Affiche la prochaine question tant que le nombre de question est inférieur à 9
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); // Fini la partie si le nombre de questions est supérieur à 10
    }
    resetOptionBackground();
  }, 1000);
}

// Retire la couleur de fond pour la bouton appuyé
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// Décoche les boutons radio
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// Fonction pour gérer la fin de la partie (quand toutes les questions sont passées)
function handleEndGame() {
  let remark = null;
  let remarkColor = null;
  const playerGrade = (playerScore / 10) * 100;

  // Données pour afficher le score à la fin de la partie
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

// Ferme la page des résultats et recommence la partie
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

// Fonction pour fermer le menu des résultats
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
