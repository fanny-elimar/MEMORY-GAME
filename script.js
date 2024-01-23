"use strict";
/*récupération des éléments HTML*/
const gameBoard = document.getElementById('game-board');
let input = document.getElementById("choixNombre");
/*import des images*/
const cards = [
    'Images\\elephant.jpg',
    'Images\\rhinoceros.jpg',
    'Images\\impala.jpg',
    'Images\\hippopotame.jpg',
    'Images\\gnou.jpg',
    'Images\\girafe.jpg',
    'Images\\zebres.jpg',
    'Images\\lion.jpg'
];
/*Touche entrée pour valider le choix du nombre de paires (simulation de clic)*/
input.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
        let boutonValider = document.getElementById("valider");
        boutonValider.click();
    }
});
/*Chargement de la zone de jeu*/
function load() {
    window.location.reload();
}
/*Récupération du nombre de paires*/
function getValue() {
    let input = document.getElementById("choixNombre");
    let inputValue = input.value;
    let nbOfPairs = inputValue;
    input.value = '';
    let boutonValider = document.getElementById("valider");
    let boutonRejouer = document.getElementById("rejouer");
    boutonRejouer.setAttribute("style", "display:inline-block");
    /*Gestion de l'affichage des cartes*/
    function createCard(CardUrl) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('unfound');
        card.dataset.value = CardUrl;
        card.addEventListener('click', onCardClick);
        const cardContent = document.createElement('img');
        cardContent.classList.add('card-content');
        cardContent.src = `${CardUrl}`;
        card.appendChild(cardContent);
        return card;
    }
    /*Sélection aléatoire du bon nombre de cartes*/
    let cardsToPlay = [];
    let selectedCards = [];
    /*Fonction pour dupliquer les cartes pour avoir des paires identiques*/
    function duplicateArray(arraySimple) {
        let arrayDouble = [];
        arrayDouble.push(...arraySimple);
        arrayDouble.push(...arraySimple);
        return arrayDouble;
    }
    /*Fonction pour mélanger les cartes*/
    function shuffleArray(arrayToshuffle) {
        const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
        return arrayShuffled;
    }
    /*Selection aléatoire des cartes en fonction du nombre de paires*/
    let shuffledCards = shuffleArray(cards);
    cardsToPlay = selectCards(nbOfPairs, shuffledCards);
    function selectCards(nb, array) {
        let array2 = array.splice(nb, array.length - nb);
        return array;
    }
    /*Dupliquer les cartes sélectionnées pour former des paires*/
    let allCards = duplicateArray(cardsToPlay);
    allCards = shuffleArray(allCards);
    /*Afficher les cartes - responsive*/
    allCards.forEach(card => {
        const cardHtml = createCard(card);
        if (gameBoard !== null) {
            switch (true) {
                case (nbOfPairs <= 2):
                    cardHtml.classList.add("nbOfPairs2");
                    break;
                case (nbOfPairs == 3):
                    cardHtml.classList.add("nbOfPairs3");
                    break;
                case (nbOfPairs >= 3):
                    if (nbOfPairs <= 6) {
                        cardHtml.classList.add("nbOfPairs4a6");
                    }
                    else {
                        cardHtml.classList.add("nbOfPairs6plus");
                    }
                    break;
            }
            gameBoard.appendChild(cardHtml);
        }
    });
    /*Valider les paires*/
    function onCardClick(e) {
        if (selectedCards.length < 2) {
            const card = e.target.parentElement;
            card.classList.add("flip");
            card.removeEventListener('click', onCardClick);
            selectedCards.push(card);
            if (selectedCards.length == 2) {
                setTimeout(() => {
                    if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
                        //on a trouvé une paire
                        selectedCards[0].classList.add("matched");
                        selectedCards[1].classList.add("matched");
                        selectedCards[0].classList.remove("unfound");
                        selectedCards[1].classList.remove("unfound");
                        selectedCards[0].removeEventListener('click', onCardClick);
                        selectedCards[1].removeEventListener('click', onCardClick);
                        let allCardNotFound = document.querySelectorAll('.unfound');
                        console.log(allCardNotFound.length);
                        if (allCardNotFound.length == 0) {
                            //Le joueur a gagné
                            alert('Bravo, vous avez gagné');
                        }
                    }
                    else {
                        //on s'est trompé
                        selectedCards[0].classList.remove("flip");
                        selectedCards[1].classList.remove("flip");
                        selectedCards[0].addEventListener('click', onCardClick);
                        selectedCards[1].addEventListener('click', onCardClick);
                    }
                    selectedCards = [];
                }, 1000);
            }
        }
    }
}
