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




//================================================================================================
// Main game keyboard logic:
function renderGameKeyboard() {
    const keyboardContainer = document.getElementById('game-keyboard');
    keyboardContainer.innerHTML = '';
    const layout = keyboardLayouts[keyboardLayout].row;
    const margins = keyboardLayouts[keyboardLayout].margins;
    const bumps = keyboardLayouts[keyboardLayout].bumps;
    layout.forEach((row, index) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'game-keyboard-row';
        rowElement.style.marginLeft = margins[index];
        row.split('').forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'game-key';
            if(bumps.includes(key)) keyElement.classList.add('bump');
            if(!legalKeys.includes(key)) keyElement.classList.add('disabled');
            keyElement.textContent = key;
            keyElement.setAttribute('data-key', key);
            rowElement.appendChild(keyElement);
        });
        keyboardContainer.appendChild(rowElement);
    });
    document.getElementById('hand').style.marginLeft = keyboardLayouts[keyboardLayout].handMargin;
}



function highlightNextKey() {
    let mistakeFound = false;
    const inputText = document.getElementById('input-box').value.trim();
    for(let i = 0; i < inputText.length; i++) {
        if(inputText[i] !== wordsToType[currentWordIndex][i]) {
            mistakeFound = true;
            break;
        }
    }
    if(inputText.length > wordsToType[currentWordIndex].length) mistakeFound = true;
    if(inputText.length === 0) mistakeFound = false;
    if(mistakeFound) {
        document.querySelectorAll('.game-key').forEach(keyElement => {
            keyElement.classList.remove('highlight');
            keyElement.classList.add('invalid');
        }); 
        document.querySelectorAll('.finger').forEach(finger => {
            finger.classList.remove('highlight-finger');
        });
    } else {
        if(inputText.length === wordsToType[currentWordIndex].length) {
            document.querySelectorAll('.game-key').forEach(keyElement => {
                keyElement.classList.remove('invalid');
                keyElement.classList.add('highlight');
            }); 
        } else {
            const nextKey = wordsToType[currentWordIndex][inputText.length].toUpperCase();
            document.querySelectorAll('.game-key').forEach(keyElement => {
                keyElement.classList.remove('invalid');
                if (keyElement.getAttribute('data-key') === nextKey) {
                    keyElement.classList.add('highlight');
                } else {
                    keyElement.classList.remove('highlight');
                }
            });
            
            const fingerName = getProperFingerName(keyboardLayout, nextKey.toUpperCase());
            document.querySelectorAll('.finger').forEach(finger => {
                finger.classList.remove('highlight-finger');
                finger.classList.remove('toprow');
                finger.classList.remove('midrow');
                finger.classList.remove('botrow');
            });
            const fingerElement = document.getElementById(fingerName.toLowerCase().replace(' ', '-'));
            if(fingerElement) {
                document.getElementById('finger-guide').innerHTML = `Use your <strong>${fingerName}</strong> finger to type the next key.`;
                fingerElement.classList.add('highlight-finger');
                const rowIndex = keyboardLayouts[keyboardLayout].row.findIndex(row => row.includes(nextKey));
                if (rowIndex === 0) {
                    fingerElement.classList.add('toprow');
                } else if (rowIndex === 1) {
                    fingerElement.classList.add('midrow');
                } else if (rowIndex === 2) {
                    fingerElement.classList.add('botrow');
                }
            } else {
                document.getElementById('finger-guide').textContent = '';
            }
        }
    }
}
//================================================================================================


// Wordle keyboard logic: 
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
  