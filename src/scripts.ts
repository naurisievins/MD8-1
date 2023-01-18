let cardArray:string[]= [],
    moveCount = 0,
    selectedCard: number,
    cardPairs = 3,
    clicked = 0,
    clickable = true,
    htmlCards:NodeListOf<HTMLDivElement>,
    wins = 0,
    min = 0,
    sec = 1,
    timerInterval:NodeJS.Timeout;

const fullWidthDiv = document.createElement("div"),
      movesCounter = document.querySelector(".moves_number_container--js"),
      timeCounter = document.querySelector(".timer_number_container--js"),
      winCounter = document.querySelector(".win_number_container--js"),
      resetButton = document.querySelector(".reset_button--js"),
      startButton = document.querySelector(".start-game--js"),
      cardContainer = document.querySelector(".memory_game");

for (let i = 1; i <= cardPairs; i++) { // Push in card values
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

const timer = () => {
    let timeGo = ():void => {
        timeCounter.innerHTML = `${min<10?'0'+min:min} : ${sec<10?'0'+sec:sec}`
        if (sec < 60) {
            sec += 1;
        } else if (sec === 60) {
            min += 1;
            sec = 0;
        }
        if (min === 59 && sec === 59) {
            clearInterval(timerInterval)
        }
    }
    timerInterval = setInterval(timeGo, 1000);
}

const startGame = () => {
    startButton.classList.add("hidden");
    shuffle(cardArray);
    timer();
    moveCount = 0;
    movesCounter.innerHTML = "0";
    min = 0;
    sec = 1;
    timeCounter.innerHTML = "00 : 00";
     for (let i = 0; i < cardPairs*2; i++) {
        const cardDiv = document.createElement("div");
        cardContainer.appendChild(cardDiv).classList.add("card", "card--back");
        if (i === 2) {
            //const fullLineDiv = document.createElement("div");
            cardContainer.appendChild(fullWidthDiv).classList.add("full_width_line");
        }
     }
     htmlCards = document.querySelectorAll(".card");
     htmlCards.forEach((card, index) => handleCardClicks(card, index))
}

const reset = () => { // Reset game when reset button clicked
    htmlCards.forEach(card => {
        card.classList.remove("card--front");
        card.classList.add("card--back");
        card.innerHTML = '';
    })
    min = 0;
    sec = 1;
    timeCounter.innerHTML = "00 : 00";
    movesCounter.innerHTML = "0";
    moveCount = 0;
    clicked = 0;
    clickable = true;
    shuffle(cardArray);
}

startButton.addEventListener("click", startGame); // call startGame() when start game button clicked
resetButton.addEventListener("click", reset); // call reset() when reset button clicked

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
                movesCounter.innerHTML = moveCount.toString();
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
        wins += 1;
        clearInterval(timerInterval)
        winCounter.innerHTML = wins.toString();
        cardContainer.removeChild(fullWidthDiv)
        startButton.classList.remove("hidden");
    }
}