"use strict";
let cardsToPlay = [];
console.log(cardsToPlay);
let selectedCards = [];
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
const gameBoard = document.getElementById('game-board');
const nbOfPairs = 5;
const cards = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];
function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
    return arrayDouble;
}
function shuffleArray(arrayToshuffle) {
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}
let shuffledCards = shuffleArray(cards);
cardsToPlay = selectCards(nbOfPairs, shuffledCards);
function selectCards(nb, array) {
    let array2 = array.splice(nb, array.length - nb);
    return array;
}
let allCards = duplicateArray(cardsToPlay);
allCards = shuffleArray(allCards);
allCards.forEach(card => {
    const cardHtml = createCard(card);
    if (gameBoard !== null) {
        gameBoard.appendChild(cardHtml);
    }
});
function onCardClick(e) {
    if (selectedCards.length < 2) {
        const card = e.target.parentElement;
        card.classList.add("flip");
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
                }
                selectedCards = [];
            }, 1000);
        }
    }
}
