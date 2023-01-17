let cardArray:string[]= [], moveCount = 0, selectedCard: number, cardPairs = 3, clicked = 0, clickable = true, htmlCards:NodeListOf<HTMLDivElement>;

for (let i = 1; i <= cardPairs; i++) {
    cardArray.push(i.toString());
    cardArray.push(i.toString());
}

/* ---------- Shuffle array ---------- */
// frank mitchell array shuffling method
function shuffle (array: string[]) {
    var i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
}
/* ------ End of shuffle array ------ */

const startButton = document.querySelector<HTMLButtonElement>(".btn");
const cardContainer = document.querySelector<HTMLDivElement>(".memory_game");
const footerDiv = document.createElement("div");

const startGame = () => {
    startButton.classList.add("hidden");
    shuffle(cardArray);
    moveCount = 0;
     for (let i = 0; i < cardPairs*2; i++) {
        const newDiv = document.createElement("div");
        cardContainer.appendChild(newDiv).classList.add("card", "card--back");
        if (i === 2) {
            const newDiv = document.createElement("div");
            cardContainer.appendChild(newDiv).classList.add("full_width_line");
        }
     }
     cardContainer.appendChild(footerDiv).classList.add("full_width_line", "footer");
     footerDiv.innerHTML = "Move count: " + moveCount
     htmlCards = document.querySelectorAll(".card");
     htmlCards.forEach((card, index) => handleCardClicks(card, index))
}

startButton.addEventListener("click", startGame)

const handleCardClicks = (card:Element, index:number) => {
    let cardClicked = () => {
        let frontShown = card.classList.contains("card--front");
        if (clickable && !frontShown) {
            if (clicked === 0) {
                selectedCard = index;
                card.classList.remove("card--back");
                card.classList.add("card--front");
                card.innerHTML = cardArray[index];
                clicked += 1;
            } else {
                moveCount +=1
                footerDiv.innerHTML = "Move count: " + moveCount
                let wait:number
                clickable = false;
                clicked = 0;
                card.classList.remove("card--back");
                card.classList.add("card--front");
                card.innerHTML = cardArray[index];
                checkIfWin();
                if (cardArray[index] !== cardArray[selectedCard]) {
                    wait = 1
                    setTimeout (function interval () {
                        wait = 0;
                        clickable = true;
                        htmlCards[selectedCard].classList.remove("card--front");
                        htmlCards[selectedCard].classList.add("card--back");
                        htmlCards[selectedCard].innerHTML = '';
                        htmlCards[index].classList.remove("card--front");
                        htmlCards[index].classList.add("card--back");
                        htmlCards[index].innerHTML = '';
                        }, 1000)
                }
                wait === 1 ? clickable=false : clickable=true;
            }
        }
    }
        card.addEventListener("click", cardClicked);
}

let checkIfWin = () => {
    let cardFrontCounter = 0
    htmlCards.forEach(card => {
        if (card.classList.contains("card--front")) {
            cardFrontCounter += 1
        }
    })
    if (cardFrontCounter === cardPairs*2) {
        htmlCards.forEach(card => {
            cardContainer.removeChild(card);
        })
        footerDiv.innerHTML = "YOU WIN!"
        startButton.classList.remove("hidden");
    }
}