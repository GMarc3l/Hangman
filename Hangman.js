let word;
let charstoguess = [];
let wordToGuess;
let gameEnd = false;
const chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let triesLeft = 15;
let lettersCnt = 0;
let clickedChar = [];


function saveWord() {
  word = document.getElementById("word").value;
  document.getElementById("word").value ='';
  for(let i = 0; i< word.length; ++i){
    charstoguess.push("_");
  }
  createKeyboard();
}


function createKeyboard(){
  document.getElementById("unrevealedWord").innerHTML = charstoguess;
  document.getElementById("title").innerHTML = "Choose a letter";
  document.getElementById("status").innerHTML = "Tries left: " + triesLeft;
  for (let i = 0; i < chars.length; ++i) {
    const button = document.createElement("button");
    button.innerText = chars[i];
    button.value = chars[i];
    button.addEventListener("click", function() {
      if (gameEnd == false) {
        checkChar(button.value);
      }
    });
    document.body-keyboard.appendChild(button);
  }
}


function checkChar(char){
  if (word.indexOf(char) < 0) {
    --triesLeft;
    document.getElementById("status").innerHTML = "Tries left: " + triesLeft;
  } else if (clickedChar.indexOf(char) < 0) {
    clickedChar.push(char);
    revealLetters(char);
  }
  gameStatus();
}


function revealLetters(element) {
  for(let i = word.indexOf(element); i < word.length; ++i) {
    if (word.charAt(i) == element) {
      ++lettersCnt;
      charstoguess[i] = element;
    }
  }
  document.getElementById("unrevealedWord").innerHTML = charstoguess;
}


function playAgain() {
  const button = document.createElement("button");
  button.innerText = "Play again!";
  button.addEventListener("click", function () {
    location.reload();
  });
  document.body-playAgainBtn.appendChild(button);
}


function gameStatus() {
  if (triesLeft == 0) {
    gameEnd = true;
    document.getElementById("unrevealedWord").innerHTML = "You lost!";
    playAgain();
  } else if (lettersCnt == word.length) {
    gameEnd = true;
    document.getElementById("unrevealedWord").innerHTML = "You won!";
    playAgain();
  }
}
