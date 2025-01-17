let currentWordleWord = "";
let wordleBoostRemaining = 0;
let currentGuessCount = 0;
const maxGuesses = 5;
let wordleUIState = "";

function displayWordle() {
  if(AutoWriter.level > 0) {
    document.getElementById('wordle-tab').style.display = "block";
  }
  let wordleBoost = modifiers.find(modifier => modifier.name === "Wordle Boost");
  if(wordleBoost) {
    document.getElementById('wordle-boost-remaining').textContent = `Boost remaining: ${(wordleBoost.duration / Tickrate).toFixed(0)}s`;
    if(wordleUIState != "boost") {
      // Activate the boost UI
      wordleUIState = "boost";
      document.getElementById('wordle-tab').classList.remove("ready");
      document.getElementById('wordle-game').classList.add('boost-active');
      document.getElementById('wordle-feedback').textContent = "Correct! Boost activated! Doubled production from Auto Writers and manually typed words";
    }
  } else {
    if(wordleUIState != "init") {
      if(wordleUIState == "loss") return; // Don't reset if the player just lost
      if(wordleUIState != "load") {
        // Start a new Wordle if we didnt just load the game
        currentWordleWord = getRandomWord();
        while (currentWordleWord.length > 5) {
          currentWordleWord = getRandomWord();
        }
      }
      // Initialize the Wordle UI for a new game.
      wordleUIState = "init";
      currentGuessCount = 0;
      document.getElementById('wordle-tab').classList.add("ready");
      document.getElementById('wordle-game').classList.remove('boost-active');
      document.getElementById('wordle-boost-remaining').textContent = ``;
      document.getElementById('wordle-hint').textContent = `Hint: ${wordsList[currentWordleWord].definition}`;
      document.getElementById('additional-wordle-hint').textContent = `Example: ${censorWord(wordsList[currentWordleWord].example)}`;
      document.getElementById('wordle-feedback').textContent = "Solve the Wordle to earn a boost!";
      resetWordleGrid();
    }
  }
}

function censorWord(example) {
  return example.replace(new RegExp(currentWordleWord, 'gi'), '*'.repeat(currentWordleWord.length));
}

function resetWordleGrid() {
  const grid = document.getElementById('wordle-grid');
  grid.innerHTML = '';
  for (let i = 0; i < maxGuesses; i++) {
    const row = document.createElement('div');
    row.className = 'wordle-guess-row';
    row.style.display = 'flex';
    row.style.marginBottom = '10px';
    
    for (let j = 0; j < currentWordleWord.length; j++) {
      const tile = document.createElement('div');
      tile.className = 'wordle-tile';
      tile.setAttribute('contenteditable', i === currentGuessCount ? 'true' : 'false');
      tile.addEventListener('input', handleTileInput);
      tile.addEventListener('keydown', handleTileNavigation);
      row.appendChild(tile);
    }
    grid.appendChild(row);
  }
}

function handleTileInput(event) {
  const tile = event.target;
  const row = tile.parentNode;
  const tiles = Array.from(row.getElementsByClassName('wordle-tile'));
  
  if (tile.textContent.length > 1) {
    tile.textContent = tile.textContent[0]; // Limit to one character
  }
  
  const nextTile = tiles[tiles.indexOf(tile) + 1];
  if (nextTile && tile.textContent !== '') {
    nextTile.focus();
  }
  
  if (tiles.every(t => t.textContent.length === 1)) {
    validateWord(row);
  }
}

function handleTileNavigation(event) {
  const tile = event.target;
  const row = tile.parentNode;
  const tiles = Array.from(row.getElementsByClassName('wordle-tile'));
  const index = tiles.indexOf(tile);
  
  if (event.key === 'Backspace' && tile.textContent === '' && index > 0) {
    tiles[index - 1].focus();
  } else if (event.key === 'ArrowLeft' && index > 0) {
    tiles[index - 1].focus();
  } else if (event.key === 'ArrowRight' && index < tiles.length - 1) {
    tiles[index + 1].focus();
  }
}

function validateWord(row) {
  const tiles = Array.from(row.getElementsByClassName('wordle-tile'));
  const guess = tiles.map(tile => tile.textContent.toUpperCase()).join('');
  
  if (guess.length !== currentWordleWord.length) {
    document.getElementById('wordle-feedback').textContent = `Enter a ${currentWordleWord.length}-letter word!`;
    return;
  }
  
  tiles.forEach((tile, index) => {
    const letter = guess[index];
    if (currentWordleWord.toUpperCase()[index] === letter) {
      tile.classList.add('correct');
    } else if (currentWordleWord.toUpperCase().includes(letter)) {
      tile.classList.add('present');
    } else {
      tile.classList.add('absent');
    }
    tile.setAttribute('contenteditable', 'false'); // Make the tile non-editable after submission
  });
  
  currentGuessCount++;
  
  if (guess === currentWordleWord.toUpperCase()) {
    document.getElementById('wordle-feedback').textContent = "Correct! Boost activated! Doubled production from Auto Writers and manually typed words.";
    activateWordleBoost();
  } else if (currentGuessCount >= maxGuesses) {
    document.getElementById('wordle-feedback').innerHTML = `Out of guesses! The word was: <strong>${currentWordleWord}</strong>. Starting a new Wordle...`;
    wordleUIState = "loss";
    document.getElementById('wordle-tab').classList.remove("ready");
    setTimeout(() => {
      wordleUIState = "";
    }, 5000);
  } else {
    document.getElementById('wordle-feedback').textContent = "Try again!";
    prepareNextRow();
  }
}

function prepareNextRow() {
  const grid = document.getElementById('wordle-grid');
  const nextRow = grid.getElementsByClassName('wordle-guess-row')[currentGuessCount];
  Array.from(nextRow.getElementsByClassName('wordle-tile')).forEach(tile => {
    tile.setAttribute('contenteditable', 'true');
    tile.textContent = '';
  });
}
function activateWordleBoost() {
  wordlesSolved++;
  spawnBoost(0);
}
