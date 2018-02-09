// Global variables

// Letters Guessed by user
var guessedLetters = [];
// Win Count
var winCount = 0;
// Lose count
var lossCount = 0;
// Message for Winner or Loser
var winOrLose = "";
// Possible hidden words (Smaller List is commented)
var possibleWords = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill",
                    "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina",
                    "Nidoqueen", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras",
                    "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl",
                    "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem",
                    "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster",
                    "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
                    "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie",
                    "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Tauros", "Eevee", "Vaporeon", "Jolteon", "Flareon",
                    "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];
// var possibleWords = ["Blaziken", "Absol", "Delphox", "Flygon", "Volcarona", "Mienshao", "Zangoose", "Weavile", "Pyroar", "Luxray"];

// Boolean if new word is needed
var newWord = true;
// Solved word
var mysteryWord = "";
// Word as it is being solved
var hiddenWord = "";
// Word as it is being solved in array form
var hangman = [];
// Number of Guesses
var maxGuesses = 12;
var guessesLeft = maxGuesses;
// Letters of the alphabet
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
// User input
var userGuess = "";
// Boolean if actual letter is pressed
var realLetter = false;

// Functions

// Returns a random word from the list
function getNewWord() {
    newWord = false;
    word = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    return word.toUpperCase();
}

// Replace each letter in array except for periods and spaces and such with underlines
function hideWord(secretWord) {
    // var lengthOfWord = secretWord.length;
    // var numberOfGuesses = blank.length;
    for (i = 0; i < secretWord.length; i++) {
        if (secretWord.charAt(i) === " " || secretWord.charAt(i) === "." || secretWord.charAt(i) === "-" || secretWord.charAt(i) === "'") {
            hangman[i] = secretWord.charAt(i);
        }
        else {
            hangman[i] = "_";
        }
    }
    updateHiddenWord();
}

// Fills word after each input
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

// 
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
    guessesLeft = maxGuesses;
    mysteryWord = getNewWord();
    hideWord(mysteryWord);
    document.getElementById("hidden").innerHTML = hangman.join(" ");
    document.getElementById("guess").innerHTML = guessesLeft;
    document.getElementById("letters").innerHTML = guessedLetters;
}



function winLose() {
    if (hiddenWord === mysteryWord) {
        winOrLose = "You Win!";
        document.getElementById("result").innerHTML = winOrLose;
        winCount = winCount + 1;
        newWord = true;
        
    }
    else if (guessesLeft === 0) {
        winOrLose = "You Lose...";
        document.getElementById("result").innerHTML = winOrLose;
        document.getElementById("hidden").innerHTML = mysteryWord;
        lossCount = lossCount + 1;
        newWord = true;
        
    }
}

// Accept user inputs
document.onkeyup = function (event) {
    document.getElementById("wins").innerHTML = winCount;
    document.getElementById("losses").innerHTML = lossCount;
    userGuess = String.fromCharCode(event.which).toUpperCase();
    if (newWord === true) {
        resetWord();
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
        winLose();
    }
}