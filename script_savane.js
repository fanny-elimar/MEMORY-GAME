"use strict";
/* récupération des éléments HTML */
const gameBoard = document.getElementById('game-board');
const bravo = document.getElementById('bravo');
/* import des images */
const cards = [
    'Images\\savane\\elephant.webp',
    'Images\\savane\\rhinoceros.webp',
    'Images\\savane\\impala.webp',
    'Images\\savane\\hippopotame.webp',
    'Images\\savane\\gnou.webp',
    'Images\\savane\\girafe.webp',
    'Images\\savane\\zebres.webp',
    'Images\\savane\\lion.webp',
    'Images\\savane\\guepard.webp',
    'Images\\savane\\elephants.webp',
    'Images\\savane\\hyenes.webp',
    'Images\\savane\\lionceau.webp',
    'Images\\savane\\zebres_girafes.webp',
    'Images\\savane\\gazelles.webp',
    'Images\\savane\\leopard.webp',
    'Images\\savane\\singe.webp',
    'Images\\savane\\buffle.webp'
];
/* Chargement de la page */
function load() {
    window.location.reload();
}
/* Choix du nombre de paires */
let nbOfPairs;
const boutons = [];
const bouton2 = document.getElementById('2paires');
const bouton3 = document.getElementById('3paires');
const bouton4 = document.getElementById('4paires');
const bouton5 = document.getElementById('5paires');
const bouton6 = document.getElementById('6paires');
const bouton8 = document.getElementById('8paires');
const bouton10 = document.getElementById('10paires');
const bouton12 = document.getElementById('12paires');
const bouton14 = document.getElementById('14paires');
const bouton16 = document.getElementById('16paires');
boutons.push(bouton2, bouton3, bouton4, bouton5, bouton6, bouton8, bouton10, bouton12, bouton14, bouton16);
for (let i = 0; i <= boutons.length; i++) {
    boutons[i].addEventListener('click', function () {
        let buttonValue;
        buttonValue = this.dataset.paires;
        nbOfPairs = Number(buttonValue);
        this.style.backgroundColor = 'orange';
        console.log(nbOfPairs);
        Start();
    });
}
/* Lancement du jeu - modification de l'affichage des boutons */
function Start() {
    const boutonRejouer = document.getElementById('rejouer');
    const choixNiveau = document.querySelector('.gestionJeu--choixNiveau');
    boutonRejouer.setAttribute('style', 'display:inline-block');
    choixNiveau.setAttribute('style', 'display:none');
    /* Gestion de l'affichage des cartes */
    function createCard(CardUrl) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('unfound');
        card.dataset.value = CardUrl;
        card.addEventListener('click', onCardClick);
        card.ondragstart = function () {
            return false;
        };
        const cardContent = document.createElement('img');
        cardContent.classList.add('card-content');
        cardContent.src = `${CardUrl}`;
        card.appendChild(cardContent);
        return card;
    }
    /* Sélection aléatoire du bon nombre de cartes */
    let cardsToPlay = [];
    let selectedCards = [];
    /* Fonction pour dupliquer les cartes pour avoir des paires identiques */
    function duplicateArray(arraySimple) {
        const arrayDouble = [];
        arrayDouble.push(...arraySimple);
        arrayDouble.push(...arraySimple);
        return arrayDouble;
    }
    /* Fonction pour mélanger les cartes */
    function shuffleArray(arrayToshuffle) {
        const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
        return arrayShuffled;
    }
    /* Selection aléatoire des cartes en fonction du nombre de paires */
    const shuffledCards = shuffleArray(cards);
    cardsToPlay = selectCards(nbOfPairs, shuffledCards);
    function selectCards(nb, array) {
        array.splice(nb, array.length - nb);
        return array;
    }
    /* Dupliquer les cartes sélectionnées pour former des paires */
    let allCards = duplicateArray(cardsToPlay);
    allCards = shuffleArray(allCards);
    /* Afficher les cartes */
    allCards.forEach(card => {
        const cardHtml = createCard(card);
        if (gameBoard !== null) {
            switch (true) {
                case (nbOfPairs <= 2):
                    cardHtml.classList.add('nbOfPairs2');
                    gameBoard.classList.add('grid2');
                    break;
                case (nbOfPairs <= 3):
                    cardHtml.classList.add('nbOfPairs2');
                    gameBoard.classList.add('grid3');
                    break;
                case (nbOfPairs <= 4):
                    cardHtml.classList.add('nbOfPairs2');
                    gameBoard.classList.add('grid4');
                    break;
                case (nbOfPairs <= 5):
                    cardHtml.classList.add('nbOfPairs2');
                    gameBoard.classList.add('grid5');
                    break;
                case (nbOfPairs <= 7):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid6');
                    break;
                case (nbOfPairs <= 8):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid8');
                    break;
                case (nbOfPairs <= 10):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid10');
                    break;
                case (nbOfPairs <= 12):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid12');
                    break;
                case (nbOfPairs <= 14):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid14');
                    break;
                case (nbOfPairs <= 16):
                    cardHtml.classList.add('nbOfPairs4a6');
                    gameBoard.classList.add('grid16');
                    break;
            }
            gameBoard.appendChild(cardHtml);
        }
    });
    /* Valider les paires */
    let nbEssais = 0;
    function onCardClick(e) {
        if (selectedCards.length < 2) {
            const card = e.target.parentElement;
            card.classList.add('flip');
            card.removeEventListener('click', onCardClick);
            selectedCards.push(card);
            if (selectedCards.length === 2) {
                /* Afficher le nombre d'essais */
                nbEssais += 1;
                const nbEssaisStr = nbEssais.toString();
                const nbEssaisHtml = document.getElementById('nbEssais');
                if (nbEssaisHtml !== null) {
                    nbEssaisHtml.setAttribute('style', 'display:block');
                    if (nbEssais === 1) {
                        nbEssaisHtml.innerHTML = `${nbEssaisStr} essai`;
                    }
                    else {
                        nbEssaisHtml.innerHTML = `${nbEssaisStr} essais`;
                    }
                }
                setTimeout(() => {
                    if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
                        // on a trouvé une paire
                        selectedCards[0].classList.add('matched');
                        selectedCards[1].classList.add('matched');
                        selectedCards[0].classList.remove('unfound');
                        selectedCards[1].classList.remove('unfound');
                        selectedCards[0].removeEventListener('click', onCardClick);
                        selectedCards[1].removeEventListener('click', onCardClick);
                        const allCardNotFound = document.querySelectorAll('.unfound');
                        console.log(allCardNotFound.length);
                        if (allCardNotFound.length === 0) {
                            // Le joueur a gagné
                            bravo === null || bravo === void 0 ? void 0 : bravo.classList.remove('hidden');
                            confetti({
                                particleCount: 200,
                                spread: 200,
                                origin: { y: 0.6 }
                            });
                            setTimeout(() => { bravo === null || bravo === void 0 ? void 0 : bravo.classList.add('hidden'); }, 10000);
                        }
                    }
                    else {
                        // on s'est trompé
                        selectedCards[0].classList.remove('flip');
                        selectedCards[1].classList.remove('flip');
                        selectedCards[0].addEventListener('click', onCardClick);
                        selectedCards[1].addEventListener('click', onCardClick);
                    }
                    selectedCards = [];
                }, 1000);
            }
        }
    }
}
