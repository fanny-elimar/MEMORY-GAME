/* récupération des éléments HTML */
const gameBoard: HTMLElement | null = document.getElementById('game-board')
const accueil: HTMLElement | null = document.getElementById('accueil')
const jeu: HTMLElement | null = document.getElementById('jeu')
const boutonRejouer = document.getElementById('rejouer')
let cards: string[]

/* import des images */

const cardsSavane: string [] = [
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
]

const cardsBanquise: string [] = [
  'Images\\banquise\\baleine.webp',
  'Images\\banquise\\loup.webp',
  'Images\\banquise\\macareux.webp',
  'Images\\banquise\\manchot.webp',
  'Images\\banquise\\morse.webp',
  'Images\\banquise\\morses.webp',
  'Images\\banquise\\otarie.webp',
  'Images\\banquise\\ours.webp',
  'Images\\banquise\\ours2.webp',
  'Images\\banquise\\petrel.webp',
  'Images\\banquise\\phoque.webp',
  'Images\\banquise\\pingouin.webp',
  'Images\\banquise\\renard.webp',
  'Images\\banquise\\renard2.webp',
  'Images\\banquise\\renne.webp',
  'Images\\banquise\\sterne.webp'
]

/* Chargement de la zone de jeu */
function load () {
  const choixNiveau = document.querySelector('.choix_niveau')!
  boutonRejouer.setAttribute('style', 'display:none')
  choixNiveau.setAttribute('style', 'display:flex')
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  gameBoard?.removeAttribute('class')
 
  allCards.length=0


}

let theme: string
const boutonThemes = []
const boutonSavane = document.getElementById('savane')
const boutonBanquise = document.getElementById('banquise')
const boutonForet = document.getElementById('foret')
const boutonMix = document.getElementById('mix')

boutonThemes.push(boutonSavane, boutonBanquise, boutonForet, boutonMix)

for (let i = 0; i <= boutonThemes.length; i++) {
  boutonThemes[i].addEventListener('click', function () {
    theme = this.dataset.themes

    accueil?.setAttribute('style', 'display:none')
    jeu?.classList.add('container')
    jeu?.classList.remove('hidden')
    choisirNiveau()
    console.log(theme)
    if (theme === 'savane') {
      cards = cardsSavane
    } else if (theme === 'banquise') {
      cards = cardsBanquise
    }
    console.log(cards)
  })
}

function choisirNiveau () {
  let nbOfPairs: number = 0
  const boutons = []
  const bouton2 = document.getElementById('2paires')
  const bouton3 = document.getElementById('3paires')
  const bouton4 = document.getElementById('4paires')
  const bouton5 = document.getElementById('5paires')
  const bouton6 = document.getElementById('6paires')
  const bouton8 = document.getElementById('8paires')
  const bouton10 = document.getElementById('10paires')
  const bouton12 = document.getElementById('12paires')
  const bouton14 = document.getElementById('14paires')
  const bouton16 = document.getElementById('16paires')

  boutons.push(bouton2, bouton3, bouton4, bouton5, bouton6, bouton8, bouton10, bouton12, bouton14, bouton16)

  for (let i = 0; i <= boutons.length; i++) {
    boutons[i]?.addEventListener('click', function () {
      let buttonValue: string | undefined
      buttonValue = this.dataset.paires
      nbOfPairs = Number(buttonValue)
      Start(nbOfPairs)
    })
  }
}

/* Récupération du nombre de paires */
function Start (nbOfPairs) {
  const choixNiveau = document.querySelector('.choix_niveau')!
  boutonRejouer.setAttribute('style', 'display:inline-block')
  choixNiveau.setAttribute('style', 'display:none')

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
  let allCards: string[] = []
 
  allCards = duplicateArray(cardsToPlay)
  allCards = shuffleArray(allCards)
  console.log(allCards)

  /* Afficher les cartes - responsive */
  allCards.forEach(card => {
    const cardHtml = createCard(card)
    if (gameBoard !== null) {
      switch (true) {
        case (nbOfPairs <= 2) :
          cardHtml.classList.add('nbOfPairs2')
          gameBoard.classList.add('grid2')
          break
        case (nbOfPairs <= 3) :
          cardHtml.classList.add('nbOfPairs2')
          gameBoard.classList.add('grid3')
          break
        case (nbOfPairs <= 4) :
          cardHtml.classList.add('nbOfPairs2')
          gameBoard.classList.add('grid4')
          break
        case (nbOfPairs <= 5) :
          cardHtml.classList.add('nbOfPairs2')
          gameBoard.classList.add('grid5')
          break
        case (nbOfPairs <= 7) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid6')
          break
        case (nbOfPairs <= 8) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid8')
          break
        case (nbOfPairs <= 10) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid10')
          break
        case (nbOfPairs <= 12) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid12')
          break
        case (nbOfPairs <= 14) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid14')
          break
        case (nbOfPairs <= 16) :
          cardHtml.classList.add('nbOfPairs4a6')
          gameBoard.classList.add('grid16')
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
          nbEssaisHtml.setAttribute('style', 'display:block')
          if (nbEssais === 1) {
            nbEssaisHtml.innerHTML = `${nbEssaisStr} essai`
          } else {
            nbEssaisHtml.innerHTML = `${nbEssaisStr} essais`
          }
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

