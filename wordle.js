let currentWordleWord = "";
let wordleBoostRemaining = 0;
let currentGuessCount = 0;
const maxGuesses = 5;
let wordleUIState = "";
/*
  Fingers:
  a = left pinky
  b = left ring
  c = left middle
  d = left index
  e = left thumb  (not used in these rows)
  f = right thumb (not used in these rows)
  g = right index
  h = right middle
  i = right ring
  j = right pinky
*/

const keyboardLayouts = {
  'qwerty-nordic': {
    row: [
      'QWERTYUIOPÅ¨',  // 12 chars
      'ASDFGHJKLÖÄ\'', // 12 chars
      '<ZXCVBNM,.-'    // 11 chars
    ],
    fingers: [
      // QWERTYUIOPÅ¨
      // Q W E R T | Y U | I | O | P Å ¨
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // ASDFGHJKLÖÄ'
      // A S D F G | H J | K | L | Ö Ä '
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // <ZXCVBNM,.-
      // < Z | X | C | V B | N M | , . -
      // a  a | b | c | d d | g g | h i j
      'aabcddgghij'
    ],
    margins: ['0','2rem','-6rem'],
    handMargin: '2rem',
    bumps: 'FJ'
  },

  'qwerty-us': {
    row: [
      'QWERTYUIOP[]', // 12 chars
      'ASDFGHJKL;\'', // 11 chars
      'ZXCVBNM,./'    // 10 chars
    ],
    fingers: [
      // QWERTYUIOP[]
      // Q W E R T | Y U | I | O | P [ ]
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // ASDFGHJKL;'
      // A S D F G | H J | K | L | ; '
      // a b c d d | g g | h | i | j j
      'abcddgghijj',

      // ZXCVBNM,./
      // Z X C V B | N M | , . /
      // a b c d d | g g | h i j
      'abcddgghij'
    ],
    margins: ['0','-3rem','-3rem'],
    handMargin: '0.9rem',
    bumps: 'FJ'
  },

  'qwerty-uk': {
    row: [
      'QWERTYUIOP[]',   // 12 chars
      'ASDFGHJKL;\'#',  // 12 chars
      'ZXCVBNM,./'      // 10 chars
    ],
    fingers: [
      // QWERTYUIOP[]
      // => same pattern as qwerty-us top row
      'abcddgghijjj',

      // ASDFGHJKL;'#
      // A S D F G | H J | K | L | ; ' #
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // ZXCVBNM,./
      // => same pattern as qwerty-us bottom row
      'abcddgghij'
    ],
    margins: ['0','1.1rem','-3rem'],
    handMargin: '1.1rem',
    bumps: 'FJ'
  },

  'dvorak': {
    row: [
      // As given:  "',.PYFGCRL/="
      "'.,PYFGCRL/=", // 12 chars
      // "AOEUIDHTNS-"
      'AOEUIDHTNS-',  // 11 chars
      // ";QJKXBMWVZ"
      ';QJKXBMWVZ'    // 10 chars
    ],
    fingers: [
      // '.,PYFGCRL/=
      // ' , . P  Y | F G | C | R | L / =
      // a b c d  d | g g | h | i | j j j
      'abcddgghijjj',

      // AOEUIDHTNS-
      // A O E U I | D H | T | N | S -
      // a b c d d | g g | h | i | j j
      'abcddgghijj',

      // ;QJKXBMWVZ
      // ; Q | J | K | X B | M W | V | Z
      // a b | c | d | d g | g h | i | j
      //  (10 chars)
      'abcddgghij'
    ],
    margins: ['0','-3rem','-3rem'],
    handMargin: '0.9rem',
    bumps: 'UH'
  },

  'azerty': {
    row: [
      'AZERTYUIOP¨£', // 12 chars
      'QSDFGHJKLMù*', // 12 chars
      '<WXCVBN,;:!'   // 11 chars
    ],
    fingers: [
      // AZERTYUIOP¨£
      // A Z E R T | Y U | I | O | P ¨ £
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // QSDFGHJKLMù*
      // Q S D F G | H J | K | L | M ù *
      // a b c d d | g g | h | i | j j j
      'abcddgghijjj',

      // <WXCVBN,;:!
      // < W | X | C | V B | N , | ; : !
      // a a | b | c | d d | g g | h i j
      'aabcddgghij'
    ],
    margins: ['0','1rem','-9rem'],
    handMargin: '1rem',
    bumps: 'FJ'
  }
};
/*
  Single-character codes -> Friendly names
*/
const fingerNames = {
  a: 'Left Pinky',
  b: 'Left Ring',
  c: 'Left Middle',
  d: 'Left Index',
  e: 'Left Thumb',
  f: 'Right Thumb',
  g: 'Right Index',
  h: 'Right Middle',
  i: 'Right Ring',
  j: 'Right Pinky'
};

/**
 * This function uses the fingerNames map to return the friendly name
  instead of the single-character code.
 * @param {*} layoutName 
 * @param {*} key 
 * @returns 
 */
function getProperFingerName(layoutName, key) {
  // First, get the single-character code for the finger.
  const fingerCode = getProperFinger(layoutName, key);

  // Use our fingerNames map to convert the code into a friendly string.
  // If the code doesn't exist in fingerNames, default to "Unknown".
  return fingerNames[fingerCode] || 'Unknown';
}

/**
 * The basic function that returns the single-character code
  (i.e. 'a', 'b', 'c', etc.).
 * @param {*} layoutName
 * @param {*} key 
 * @returns 
 */
function getProperFinger(layoutName, key) {
  // Retrieve the layout object
  const layout = keyboardLayouts[layoutName];
  if (!layout) {
    throw new Error(`Unknown layout: ${layoutName}`);
  }

  // Search each row of the layout
  for (let rowIndex = 0; rowIndex < layout.row.length; rowIndex++) {
    const rowKeys = layout.row[rowIndex];           // e.g., "QWERTYUIOPÅ¨"
    const fingerAssignments = layout.fingers[rowIndex]; // e.g., "abcddgghijjj"

    // By default, we'll do exact match. For case-insensitivity, do something like:
    // const keyPos = rowKeys.toUpperCase().indexOf(key.toUpperCase());
    const keyPos = rowKeys.indexOf(key);

    if (keyPos !== -1) {
      // Return the single-character code (a/b/c/d/g/h/i/j)
      return fingerAssignments[keyPos] || '';
    }
  }

  // If the key isn't found in any row, return empty or handle as needed
  return '';
}


const legalKeys = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ\''];
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
      renderWordleKeyboard();
    }
  }
}

function censorWord(example) {
  return example.replace(new RegExp(currentWordleWord, 'gi'), '*'.repeat(currentWordleWord.length));
}
let focusedTile;
let focusLostTimeout;
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
      // add focus events
      tile.addEventListener('focusin', (event) => {
        clearTimeout(focusLostTimeout);
        focusedTile = event.target;
      });
      tile.addEventListener('focusout', () => {
       focusLostTimeout = setTimeout(() => {
          focusedTile = null;
        }, 100);
      });
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
    const keyElement = document.querySelector(`.wordle-key[data-key="${letter}"]`);
    if (currentWordleWord.toUpperCase()[index] === letter) {
      tile.classList.add('correct');
      if (keyElement) keyElement.classList.add('correct');
    } else if (currentWordleWord.toUpperCase().includes(letter)) {
      tile.classList.add('present');
      if (keyElement) keyElement.classList.add('present');
    } else {
      tile.classList.add('absent');
      if (keyElement) keyElement.classList.add('absent');
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

function renderWordleKeyboard() {
  const keyboardContainer = document.getElementById('wordle-keyboard');
  keyboardContainer.innerHTML = '';
  const layout = keyboardLayouts[keyboardLayout].row;
  const margins = keyboardLayouts[keyboardLayout].margins;
  const bumps = keyboardLayouts[keyboardLayout].bumps;
  layout.forEach((row, index) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'wordle-keyboard-row';
    rowElement.style.marginLeft = margins[index];
    row.split('').forEach(key => {
      const keyElement = document.createElement('div');
      keyElement.className = 'wordle-key';
      if(bumps.includes(key)) keyElement.classList.add('bump');
      keyElement.textContent = key;
      keyElement.setAttribute('data-key', key);
      if(legalKeys.includes(key)) {
      keyElement.addEventListener('click', () => handleKeyClick(key));
      } else {
        keyElement.classList.add("illegal-key");
      }
      rowElement.appendChild(keyElement);
    });
    keyboardContainer.appendChild(rowElement);
  });
}

function handleKeyClick(key) {
    const activeRow = document.querySelector('.wordle-guess-row .wordle-tile[contenteditable="true"]');
    if (activeRow) {
        const row = activeRow.parentNode;
        const tiles = Array.from(row.getElementsByClassName('wordle-tile'));
        if (focusedTile) {
          console.log("focus");
          focusedTile.textContent = key;
          handleTileInput({ target: focusedTile });
          return;
        }
        const emptyTile = tiles.find(tile => tile.textContent === '');
        if (emptyTile) {
            emptyTile.textContent = key;
            handleTileInput({ target: emptyTile });
        }
    }
}
