/*
 * Create a list that holds all of your cards
 */
let allCards = document.querySelectorAll('.card');
let cardsToShuffle = [...allCards];
let deck = document.querySelector('.deck');
let cardsToCompare = [];
let pairsMatched = 0;
let movesSection = document.querySelector('.moves');
let moves = 0;
let stars = document.querySelector('.stars');
let rating = 3;
let modal = document.querySelector('#modal'); //congrats popup
let result = document.querySelector('#result');
let restartGame = document.getElementById('restartGame');
let timer = document.getElementById('timer');
let timeCounter = 0;
let seconds = 0;
let minutes = 0;
let cardsClicked = 0;

// setting timer to display 00:00, and nulling seconds and minutes
function resetTimer() {
  seconds = 0;
  minutes = 0;
  cardsClicked = 0;
  timer.textContent = "00:00";
}

// stop counting time
function stopTimer(){
  clearInterval(timeCounter);
}

// start making time every second
function startTimer(){
  timeCounter = setInterval(makeTimer, 1000);
}

// making seconds and minutes
function makeTimer(){
  seconds++;
  if (seconds === 60){
    seconds = 0;
    minutes++;
    if (minutes === 60){ //noone will play it for more than 1 hour, right?
      seconds = 0;
      minutes = 0;
    }
  }
  timer.textContent = minutes.toString() + " : " + seconds.toString();
}

// -- start of Modal window - some code is taken from https://www.w3schools.com/howto/howto_css_modals.asp -- //
// Get the <span> element that closes the modal
var closeModal = document.getElementById('closeModal');

// When the user clicks on <closeModal> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
  makeNewCards();
}

// close the modal and start new game when uer clicks Play Again button
playAgain.onclick = function() {
  modal.style.display = "none";
  makeNewCards();
}

// start new game if the repeat icon is clicked
restartGame.onclick = function() {
  stopTimer();
  makeNewCards();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
      makeNewCards();
  }
}

// show modal with results: rating and time
function showResult() {
  modal.style.display = "block";
  result.innerHTML = 'Congratulations! You won!<br>Your rating is ' + rating + ' stars!<br>It took you ' + minutes + ' minutes ' + seconds + ' seconds to find all matches!';
}
// -- end of Modal -- //

movesSection.innerHTML = moves;

// show result and stop timer if all pairs found
function congrats(){
  if (pairsMatched == 8){
    showResult();
    stopTimer();
  }
}

// hide cards if no match in open pair
function hideCard(){
  cardsToCompare[0].classList.remove("open", "show");
  cardsToCompare[1].classList.remove("open", "show");
  cardsToCompare = [];
}

// comparison of card pair, every match counts, check if user won, if no match - hide cards
function compareCards(){
  if (cardsToCompare[0].innerHTML === cardsToCompare[1].innerHTML){
    cardsToCompare[0].classList.add("open", "show", "match");
    cardsToCompare[1].classList.add("open", "show", "match");
    pairsMatched++;
    congrats();
    cardsToCompare = [];
  } else {
    setTimeout(hideCard, 1000);
  }
}

// rating logic
function setRating(){
  if (moves > 8 && moves < 16){
    stars.children[0].innerHTML = '<i class="fa fa-star-o"></i>';
    rating = 2;
  } else if (moves > 15) {
    stars.children[1].innerHTML = '<i class="fa fa-star-o"></i>';
    rating = 1;
  }
}

// with every move set proper rating
function increaseMoves(){
  moves++;
  movesSection.innerHTML = moves;
  setRating();
}

function resetMovesRatingAndPairsMatched(){
  moves = 0;
  movesSection.innerHTML = moves;
  stars.children[0].innerHTML = '<i class="fa fa-star"></i>';
  stars.children[1].innerHTML = '<i class="fa fa-star"></i>';
  stars.children[2].innerHTML = '<i class="fa fa-star"></i>';
  pairsMatched = 0;
}

// add cards to compare in pairs, increase a move with every pair of cards open
function addToCardsToCompare(){
  cardsToCompare.push(event.target);
  if (cardsToCompare.length == 2){
    increaseMoves();
    compareCards();
  }
}

//if a card is clicked: display the cards symbol, add cards to compare, start timer
function showCard(){
  if (!(event.target.classList.contains("open"))){
    event.target.classList.add("open", "show");
    addToCardsToCompare();
    cardsClicked++;
    if (cardsClicked === 1) { //we need to start timer only once
      startTimer();
    }
  }
}

//set up the event listener for a card
function addClickEventToAllCards(){
  let  cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    // if card is clicked - show card
    cards[i].addEventListener('click', showCard);
  }
}

function makeNewCards(){
  resetMovesRatingAndPairsMatched();
  resetTimer();
  let newCards = shuffle(cardsToShuffle);
  for (let i = 0; i < newCards.length; i++){
    newCards[i].classList.remove("open", "show", "match");
    deck.appendChild(newCards[i]);
  }
  addClickEventToAllCards();
}

makeNewCards();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
