/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"styles.css\");\n\n//# sourceURL=webpack://webpack_ts/./src/styles.scss?");

/***/ }),

/***/ "./src/scripts.ts":
/*!************************!*\
  !*** ./src/scripts.ts ***!
  \************************/
/***/ (() => {

eval("var cardArray = [], moveCount = 0, selectedCard, cardPairs = 3, clicked = 0, clickable = true, htmlCards, wins = Number(sessionStorage.getItem(\"wins\")), min = 0, sec = 1, timerInterval;\r\nvar fullWidthDiv = document.createElement(\"div\"), movesCounter = document.querySelector(\".moves_number_container--js\"), timeCounter = document.querySelector(\".timer_number_container--js\"), winCounter = document.querySelector(\".win_number_container--js\"), resetButton = document.querySelector(\".reset_button--js\"), startButton = document.querySelector(\".start-game--js\"), cardContainer = document.querySelector(\".memory_game\"), winMessage = document.querySelector(\".completed\");\r\nfor (var i = 1; i <= cardPairs; i++) { // Push in card values (numbers)\r\n    cardArray.push(i.toString());\r\n    cardArray.push(i.toString());\r\n}\r\nwinCounter.innerHTML = sessionStorage.getItem(\"wins\") ? sessionStorage.getItem(\"wins\") : \"0\"; // Display win count from session storage\r\n/* ---------- Shuffle array ---------- */\r\n// frank mitchell array shuffling method\r\nfunction shuffle(array) {\r\n    var i = 0, j = 0, temp = null;\r\n    for (i = array.length - 1; i > 0; i -= 1) {\r\n        j = Math.floor(Math.random() * (i + 1));\r\n        temp = array[i];\r\n        array[i] = array[j];\r\n        array[j] = temp;\r\n    }\r\n    return array;\r\n}\r\n/* ------ End of shuffle array ------ */\r\nvar timer = function () {\r\n    var timeGo = function () {\r\n        timeCounter.innerHTML = \"\".concat(min < 10 ? '0' + min : min, \" : \").concat(sec < 10 ? '0' + sec : sec);\r\n        if (sec < 60) {\r\n            sec += 1;\r\n        }\r\n        else if (sec === 60) {\r\n            min += 1;\r\n            sec = 0;\r\n        }\r\n        if (min === 59 && sec === 60) {\r\n            clearInterval(timerInterval);\r\n        }\r\n    };\r\n    timerInterval = setInterval(timeGo, 1000); // Execute timeGo function once every second\r\n};\r\nvar startGame = function () {\r\n    winMessage.classList.add(\"hidden\"); // hide win message\r\n    startButton.classList.add(\"hidden\"); // hide start button\r\n    shuffle(cardArray); // shuffle \"cards\"\r\n    timer(); // start timer\r\n    moveCount = 0; // set move count variable to 0\r\n    movesCounter.innerHTML = \"0\"; // set move count to 0 in html\r\n    min = 0; // starting value for minutes\r\n    sec = 1; // starting value for seconds (starts with 1 because timeGo function starts with 1s delay)\r\n    timeCounter.innerHTML = \"00 : 00\"; // set html counter to 00 : 00\r\n    for (var i = 0; i < cardPairs * 2; i++) { // create cards\r\n        var cardDiv = document.createElement(\"div\");\r\n        cardContainer.appendChild(cardDiv).classList.add(\"card\", \"card--back\");\r\n        if (i === 2) { // split card line after first 3 cards\r\n            cardContainer.appendChild(fullWidthDiv).classList.add(\"full_width_line\");\r\n        }\r\n    }\r\n    htmlCards = document.querySelectorAll(\".card\"); // array of all cards\r\n    htmlCards.forEach(function (card, index) { return handleCardClicks(card, index); }); // handleCardClick() gets each card and card index\r\n};\r\nvar reset = function () {\r\n    htmlCards.forEach(function (card) {\r\n        card.classList.remove(\"card--front\");\r\n        card.classList.add(\"card--back\");\r\n        card.innerHTML = '';\r\n    });\r\n    /* Next 8 rows resets values and shuffle cards*/\r\n    min = 0;\r\n    sec = 1;\r\n    timeCounter.innerHTML = \"00 : 00\";\r\n    movesCounter.innerHTML = \"0\";\r\n    moveCount = 0;\r\n    clicked = 0;\r\n    clickable = true;\r\n    shuffle(cardArray);\r\n};\r\nstartButton.addEventListener(\"click\", startGame); // call startGame() when start game button clicked\r\nresetButton.addEventListener(\"click\", reset); // call reset() when reset button clicked\r\nvar handleCardClicks = function (card, index) {\r\n    var cardClicked = function () {\r\n        var frontShown = card.classList.contains(\"card--front\"); // Sets to true if card contains class or false if not\r\n        if (clickable && !frontShown) { // If card is clickable\r\n            if (clicked === 0) { // If first card from two\r\n                selectedCard = index; // Saves card to variable\r\n                card.classList.remove(\"card--back\");\r\n                card.classList.add(\"card--front\"); // show card\r\n                card.innerHTML = cardArray[index]; // add card value\r\n                clicked += 1; // Counter = 1 for next clicked card\r\n            }\r\n            else {\r\n                moveCount += 1;\r\n                movesCounter.innerHTML = moveCount.toString();\r\n                var wait_1;\r\n                clickable = false; // Can't click any card if clickable = false\r\n                clicked = 0;\r\n                card.classList.remove(\"card--back\");\r\n                card.classList.add(\"card--front\");\r\n                card.innerHTML = cardArray[index];\r\n                checkIfWin();\r\n                if (cardArray[index] !== cardArray[selectedCard]) {\r\n                    wait_1 = 1;\r\n                    setTimeout(function interval() {\r\n                        wait_1 = 0;\r\n                        clickable = true;\r\n                        htmlCards[selectedCard].classList.remove(\"card--front\");\r\n                        htmlCards[selectedCard].classList.add(\"card--back\");\r\n                        htmlCards[selectedCard].innerHTML = '';\r\n                        htmlCards[index].classList.remove(\"card--front\");\r\n                        htmlCards[index].classList.add(\"card--back\");\r\n                        htmlCards[index].innerHTML = '';\r\n                    }, 1000);\r\n                }\r\n                wait_1 === 1 ? clickable = false : clickable = true;\r\n            }\r\n        }\r\n    };\r\n    card.addEventListener(\"click\", cardClicked); // Add click event to each card\r\n};\r\nvar displayWinner = function () {\r\n    htmlCards.forEach(function (card) {\r\n        cardContainer.removeChild(card); // Remove cards\r\n    });\r\n    wins += 1;\r\n    clearInterval(timerInterval); // stop timer\r\n    sessionStorage.setItem(\"wins\", wins.toString()); // Save win count to session storage\r\n    winCounter.innerHTML = sessionStorage.getItem(\"wins\"); // Show win count in html\r\n    cardContainer.removeChild(fullWidthDiv); // remove card line splitter\r\n    winMessage.classList.remove(\"hidden\"); // show win message\r\n    startButton.classList.remove(\"hidden\"); // show start game button\r\n};\r\nvar checkIfWin = function () {\r\n    var cardFrontCounter = 0;\r\n    htmlCards.forEach(function (card) {\r\n        if (card.classList.contains(\"card--front\")) { // If all cards has \"card--front\" class game is completed\r\n            cardFrontCounter += 1;\r\n        }\r\n    });\r\n    if (cardFrontCounter === cardPairs * 2) { // Compare card count\r\n        displayWinner();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://webpack_ts/./src/scripts.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./src/scripts.ts"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/styles.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;