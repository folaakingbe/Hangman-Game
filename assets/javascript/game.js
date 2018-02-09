// Global variables
var guessedLetters = [];
var winCount = 0;
var lossCount = 0;
var winOrLose = "";
var possibleWords = ["Blaziken", "Absol", "Delphox", "Flygon", "Volcarona", "Mienshao", "Zangoose", "Weavile", "Pyroar", "Luxray"];
var newWord = true;
var mysteryWord = "";
var hiddenWord = "";
var hangman = [];
var guessesLeft = 12;
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var userGuess = "";
var realLetter = false;

// Functions
function getNewWord() {
    newWord = false;
    word = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    return word.toUpperCase();
}

// Replace each letter in array except for periods and spaces with underlines
function hideWord(secretWord) {
    // var lengthOfWord = secretWord.length;
    // var numberOfGuesses = blank.length;
    for (i = 0; i < secretWord.length; i++) {
        if (secretWord.charAt(i) === " " || secretWord.charAt(i) === "." || secretWord.charAt(i) === "-") {
            hangman[i] = secretWord.charAt(i);
        }
        else {
            hangman[i] = "_";
        }
    }
    updateHiddenWord();
}

function fillWord(blank) {
    var newLetter = true;
    var foundLetter = false;
    for (i = 0; i < guessedLetters.length; i++) {
        if (blank === guessedLetters[i]) {
            newLetter = false;
        }
    }
    if (newLetter === true) {
        for (i = 0; i < mysteryWord.length; i++) {
            if (blank === mysteryWord.charAt(i)) {
                hangman[i] = blank;
                foundLetter = true;
            }
        }
        guessedLetters[guessedLetters.length] = blank;
        if (foundLetter === false) {
            guessesLeft = guessesLeft - 1;
        }
    }
}

function updateHiddenWord() {
    var update = "";
    for (i = 0; i < hangman.length; i++) {
        update = update + hangman[i];
    }
    hiddenWord = update;
}

function isLetter(letter) {
    for (i = 0; i < mysteryWord.length; i++) {
        if (userGuess === letter) {
            realLetter = true;
        }
    }
}

function resetWord() {
    guessedLetters = [];
    winOrLose = "";
    document.getElementById("result").innerHTML = winOrLose;
    hangman = [];
    guessesLeft = 12;
    mysteryWord = getNewWord();
    hideWord(mysteryWord);
    document.getElementById("hidden").innerHTML = hangman.join(" ");
    document.getElementById("guess").innerHTML = guessesLeft;
    document.getElementById("letters").innerHTML = guessedLetters;
}

// function arrayIntoString(hang) {
//     for (i = 0; i < hangman.length) {
//         hiddenWord
//     }
// }

function winLose() {
    if (hiddenWord === mysteryWord) {
        winOrLose = "You Win!";
        document.getElementById("result").innerHTML = winOrLose;
        winCount = winCount + 1;
        newWord = true;
        // resetWord();
    }
    else if (guessesLeft === 0) {
        winOrLose = "You Lose...";
        document.getElementById("result").innerHTML = winOrLose;
        lossCount = lossCount + 1;
        newWord = true;
        // resetWord();
    }
}

// Accept user inputs
var test = "test again";
console.log(test.length);

document.onkeyup = function (event) {
    document.getElementById("wins").innerHTML = winCount;
    document.getElementById("losses").innerHTML = lossCount;
    // Get a new hidden word if needed

    // if (newWord === true) {
    //     // mysteryWord = getNewWord();
    //     // hideWord(mysteryWord);
    //     resetWord();
    // }
    // User guesses letter
    userGuess = String.fromCharCode(event.which).toUpperCase();
    if (newWord === true) {
        resetWord();
        // document.getElementById("hidden").innerHTML = hangman.join(" ");
        // document.getElementById("guess").innerHTML = guessesLeft;
        // document.getElementById("letters").innerHTML = guessedLetters;
    }

    else {
        realLetter = false;
        alphabet.forEach(isLetter);
        if (realLetter) {
            fillWord(userGuess);
            updateHiddenWord();
        }
        document.getElementById("hidden").innerHTML = hangman.join(" ");
        document.getElementById("guess").innerHTML = guessesLeft;
        document.getElementById("letters").innerHTML = guessedLetters;
        if (hiddenWord === mysteryWord) {
            winOrLose = "You Win!";
            document.getElementById("result").innerHTML = winOrLose;
            winCount = winCount + 1;
            newWord = true;
            // resetWord();
        }
        else if (guessesLeft === 0) {
            winOrLose = "You Lose...";
            document.getElementById("result").innerHTML = winOrLose;
            lossCount = lossCount + 1;
            newWord = true;
            // resetWord();
        }
    }
}