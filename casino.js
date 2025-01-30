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
        document.getElementById("casino-tab").style.display = "block";
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
        const slotHeight = 6; // in rem (assuming your slot is 6rem tall)
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
