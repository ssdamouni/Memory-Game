const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
]; 

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let number = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    newDiv.setAttribute("idnumber", number)
    number ++;
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let clickedArray = [];
let idNumberArray = [];
let matchCountDisplay = document.getElementById('match-count');
let matchCount = 0;
function handleCardClick(event) {
  event.target.setAttribute("id", "revealed");
  if (event.target.getAttribute('id') == "revealed"){
    event.target.style.backgroundColor =  event.target.className;
  }
  clickedArray.push(event.target.className);
  idNumberArray.push(event.target.getAttribute('idnumber'));
  //idNumberArray.push(event.target.idNumber);
  if (clickedArray.length === 2 && idNumberArray[0] == idNumberArray[1]){
    console.log("Pick two different cards");
    let revealedCards = document.querySelectorAll('#revealed');
    for(let i = 0; i < revealedCards.length; i++){ 
      revealedCards[i].removeAttribute('id') 
      revealedCards[i].removeAttribute('style')
    }
    clickedArray = [];
    idNumberArray = [];
  }else if (clickedArray.length === 2 && clickedArray[0] == clickedArray[1]){
    console.log("It's a match!!!")
    let revealedCards = document.querySelectorAll('#revealed');
    for(let i = 0; i < revealedCards.length; i++){ 
      revealedCards[i].removeAttribute('id') 
      revealedCards[i].setAttribute('id', 'matched')
      revealedCards[i].style.border = "solid 5px black"
      matchCount += 1;
      matchCountDisplay.innerText = `${matchCount}`
    }
    clickedArray = [];
    idNumberArray = [];
  } else if (clickedArray.length === 2 && clickedArray[0] != clickedArray[1]){
    console.log("It's not a match!")
    let revealedCards = document.querySelectorAll('#revealed');
    setTimeout(function (){
      for (let i = 0; i < revealedCards.length; i++){
        revealedCards[i].removeAttribute('id')
        revealedCards[i].removeAttribute('style')
      }
    }, 1000);
    
    clickedArray = [];
    idNumberArray = [];
  } else {
    console.log('only one selection')
  }
}
//clicking same selection twice gives you a match maybe add id's
// when the DOM loads
createDivsForColors(shuffledColors);
