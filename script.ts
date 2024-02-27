/* récupération des éléments HTML */
const gameBoard: HTMLElement | null = document.getElementById('game-board')
const input = document.getElementById('choixNombre') as HTMLInputElement

/* import des images */
const cards: string[] = [
  'Images\\elephant.jpg',
  'Images\\rhinoceros.jpg',
  'Images\\impala.jpg',
  'Images\\hippopotame.jpg',
  'Images\\gnou.jpg',
  'Images\\girafe.jpg',
  'Images\\zebres.jpg',
  'Images\\lion.jpg'
]

/* Touche entrée pour valider le choix du nombre de paires (simulation de clic) */
input.addEventListener('keyup', function (e) {
  if (e.code === 'Enter') {
    const boutonValider = document.getElementById('valider') as HTMLButtonElement
    boutonValider.click()
  }
})

/* Chargement de la zone de jeu */
function load () {
  window.location.reload()
}

/* Récupération du nombre de paires */
function getValue () {
  const input = document.getElementById('choixNombre') as HTMLInputElement
  const inputValue = input.value as unknown
  const nbOfPairs = inputValue as number
  input.value = ''
  const boutonValider = document.getElementById('valider') as HTMLButtonElement
  const boutonRejouer = document.getElementById('rejouer') as HTMLButtonElement
  boutonRejouer.setAttribute('style', 'display:inline-block')
  input.setAttribute('style', 'display:none')

  /* Gestion de l'affichage des cartes */
  function createCard (CardUrl: string): any {
    const card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('unfound')
    card.dataset.value = CardUrl
    card.addEventListener('click', onCardClick)

    const cardContent = document.createElement('img')
    cardContent.classList.add('card-content')
    cardContent.src = `${CardUrl}`
    card.appendChild(cardContent)
    return card
  }

  /* Sélection aléatoire du bon nombre de cartes */
  let cardsToPlay: string[] = []

  let selectedCards: HTMLElement[] = []

  /* Fonction pour dupliquer les cartes pour avoir des paires identiques */
  function duplicateArray (arraySimple: string[]) {
    const arrayDouble: string[] = []
    arrayDouble.push(...arraySimple)
    arrayDouble.push(...arraySimple)
    return arrayDouble
  }

  /* Fonction pour mélanger les cartes */
  function shuffleArray (arrayToshuffle: string[]): string[] {
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random())
    return arrayShuffled
  }

  /* Selection aléatoire des cartes en fonction du nombre de paires */
  const shuffledCards: string[] = shuffleArray(cards)
  cardsToPlay = selectCards(nbOfPairs, shuffledCards)

  function selectCards (nb: number, array: string []): string[] {
    const array2: string[] = array.splice(nb, array.length - nb)
    return array
  }

  /* Dupliquer les cartes sélectionnées pour former des paires */
  let allCards: string[] = duplicateArray(cardsToPlay)
  allCards = shuffleArray(allCards)

  /* Afficher les cartes - responsive */
  allCards.forEach(card => {
    const cardHtml = createCard(card)
    if (gameBoard !== null) {
      switch (true) {
        case (nbOfPairs <= 2) :
          cardHtml.classList.add('nbOfPairs2')
          break
        case (nbOfPairs === 3) :
          cardHtml.classList.add('nbOfPairs3')
          break
        case (nbOfPairs >= 3) :
          if (nbOfPairs <= 6) {
            cardHtml.classList.add('nbOfPairs4a6')
          } else {
            cardHtml.classList.add('nbOfPairs6plus')
          }

          break
      }
      gameBoard.appendChild(cardHtml)
    }
  })
  /* Valider les paires */
  let nbEssais: number = 0
  function onCardClick (e: any) {
    if (selectedCards.length < 2) {
      const card = e.target.parentElement
      card.classList.add('flip')
      card.removeEventListener('click', onCardClick)
      selectedCards.push(card)

      if (selectedCards.length == 2) {
        /* Afficher le nombre d'essais */
        nbEssais += 1
        const nbEssaisStr: string = nbEssais.toString()
        const nbEssaisHtml: HTMLElement | null = document.getElementById('nbEssais')
        if (nbEssaisHtml !== null) {
          nbEssaisHtml.innerHTML = `Nombre d'essais - ${nbEssaisStr}`
        }

        setTimeout(() => {
          if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
            // on a trouvé une paire
            selectedCards[0].classList.add('matched')
            selectedCards[1].classList.add('matched')
            selectedCards[0].classList.remove('unfound')
            selectedCards[1].classList.remove('unfound')
            selectedCards[0].removeEventListener('click', onCardClick)
            selectedCards[1].removeEventListener('click', onCardClick)
            const allCardNotFound = document.querySelectorAll('.unfound')
            console.log(allCardNotFound.length)
            if (allCardNotFound.length == 0) {
              // Le joueur a gagné
              alert('Bravo, vous avez gagné')
            }
          } else {
            // on s'est trompé
            selectedCards[0].classList.remove('flip')
            selectedCards[1].classList.remove('flip')
            selectedCards[0].addEventListener('click', onCardClick)
            selectedCards[1].addEventListener('click', onCardClick)
          }
          selectedCards = []
        }, 1000)
      }
    }
  }
}
