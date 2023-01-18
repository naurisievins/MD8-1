let cardArray:string[]= [],
    moveCount = 0,
    selectedCard: number,
    cardPairs = 3,
    clicked = 0,
    clickable = true,
    htmlCards:NodeListOf<HTMLDivElement>,
    wins = Number(sessionStorage.getItem("wins")),
    min = 0,
    sec = 1,
    timerInterval:NodeJS.Timeout;

const fullWidthDiv = document.createElement("div"),
      movesCounter = document.querySelector(".moves_number_container--js"),
      timeCounter = document.querySelector(".timer_number_container--js"),
      winCounter = document.querySelector(".win_number_container--js"),
      resetButton = document.querySelector(".reset_button--js"),
      startButton = document.querySelector(".start-game--js"),
      cardContainer = document.querySelector(".memory_game"),
      winMessage = document.querySelector(".completed");

for (let i = 1; i <= cardPairs; i++) { // Push in card values (numbers)
    cardArray.push(i.toString());
    cardArray.push(i.toString());
}

winCounter.innerHTML = sessionStorage.getItem("wins")? sessionStorage.getItem("wins") : "0"; // Display win count from session storage

/* ---------- Shuffle array ---------- */
// frank mitchell array shuffling method
function shuffle (array: string[]) {
    var i = 0
      , j = 0
      , temp = null;
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}
/* ------ End of shuffle array ------ */

const timer = () => { // Timer function (counts up to 59:59 and then stops)
    let timeGo = () => {
        timeCounter.innerHTML = `${ min < 10 ? '0' + min : min } : ${ sec < 10 ? '0' + sec : sec }`;
        if (sec < 60) {
            sec += 1;
        } else if (sec === 60) {
            min += 1;
            sec = 0;
        }
        if (min === 59 && sec === 60) {
            clearInterval(timerInterval);
        }
    }
    timerInterval = setInterval(timeGo, 1000); // Execute timeGo function once every second
}

const startGame = () => { // Execute when start game button is pressed
    winMessage.classList.add("hidden"); // hide win message
    startButton.classList.add("hidden"); // hide start button
    shuffle(cardArray); // shuffle "cards"
    timer(); // start timer
    moveCount = 0; // set move count variable to 0
    movesCounter.innerHTML = "0"; // set move count to 0 in html
    min = 0; // starting value for minutes
    sec = 1; // starting value for seconds (starts with 1 because timeGo function starts with 1s delay)
    timeCounter.innerHTML = "00 : 00"; // set html counter to 00 : 00
     for (let i = 0; i < cardPairs*2; i++) { // create cards
        const cardDiv = document.createElement("div");
        cardContainer.appendChild(cardDiv).classList.add("card", "card--back");
         if (i === 2) { // split card line after first 3 cards
             cardContainer.appendChild(fullWidthDiv).classList.add("full_width_line");
         }
     }
     htmlCards = document.querySelectorAll(".card"); // array of all cards
     htmlCards.forEach((card, index) => handleCardClicks(card, index)); // handleCardClick() gets each card and card index
}

const reset = () => { // Reset game when reset button clicked
    htmlCards.forEach(card => {
        card.classList.remove("card--front");
        card.classList.add("card--back");
        card.innerHTML = '';
    })
    /* Next 8 rows resets values and shuffle cards*/
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

const handleCardClicks = (card:Element, index:number) => { // As it says - handle card clicks
    let cardClicked = () => {
        let frontShown = card.classList.contains("card--front"); // Sets to true if card contains class or false if not
        if (clickable && !frontShown) { // If card is clickable
            if (clicked === 0) { // If first card from two
                selectedCard = index; // Saves card to variable
                card.classList.remove("card--back");
                card.classList.add("card--front"); // show card
                card.innerHTML = cardArray[index]; // add card value
                clicked += 1; // Counter = 1 for next clicked card
            } else {
                moveCount += 1;
                movesCounter.innerHTML = moveCount.toString();
                let wait:number;
                clickable = false; // Can't click any card if clickable = false
                clicked = 0;
                card.classList.remove("card--back");
                card.classList.add("card--front");
                card.innerHTML = cardArray[index];
                checkIfWin();
                if (cardArray[index] !== cardArray[selectedCard]) {
                    wait = 1;
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
        card.addEventListener("click", cardClicked); // Add click event to each card
}

const displayWinner = () => { 
    htmlCards.forEach(card => {
        cardContainer.removeChild(card); // Remove cards
    })
    wins += 1;
    clearInterval(timerInterval); // stop timer
    sessionStorage.setItem("wins", wins.toString()); // Save win count to session storage
    winCounter.innerHTML = sessionStorage.getItem("wins"); // Show win count in html
    cardContainer.removeChild(fullWidthDiv); // remove card line splitter
    winMessage.classList.remove("hidden"); // show win message
    startButton.classList.remove("hidden"); // show start game button
}

const checkIfWin = () => {
    let cardFrontCounter = 0;
    htmlCards.forEach(card => {
        if (card.classList.contains("card--front")) { // If all cards has "card--front" class game is completed
            cardFrontCounter += 1;
        }
    })
    if (cardFrontCounter === cardPairs*2) { // Compare card count
        displayWinner();
    }
}