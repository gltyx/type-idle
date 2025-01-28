// casino.js

// Define the possible symbols and their optional multiplier probability
const CASINO_SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const CASINO_SYMBOLS_VALUES = [0.01, 0.01, 0.01, 0.01, 0.01, 0.05, 0.05, 0.1];
const CASINO_MULTIPLIER_CHANCE = 0.01;
const CASINO_BONUS_CHANCE = 0.01;
const CASINO_BONUS_SYMBOL = "BONUS";

const CASINO_REELS = 9; // Number of reels
const CASINO_ROWS = 5;  // Number of rows per reel
const CASINO_SYMBOLS_TO_WIN = 10; // Number of symbols to win

// Initialize the board
let casinoBoard = Array.from({ length: CASINO_REELS }, () => Array(CASINO_ROWS).fill(null));
let casinoInit = false;
let casinoBusy = false;

function getWin(symbol, count) {
    let value = CASINO_SYMBOLS_VALUES[CASINO_SYMBOLS.indexOf(symbol)];
    return value * count;
}

function displayCasino() {
    if(KeystrokeCasino.level > 0) {
        document.getElementById("casino-tab").style.display = "block";
    }
    if(!casinoInit) {
        initCasino();
    }
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
            symbolElement.classList.add("symbol-NULL");
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
            element.classList.remove("symbol-NULL", `symbol-${CASINO_BONUS_SYMBOL}`, "symbol-x2", "symbol-x3", "symbol-x4", "symbol-x5");
            element.classList.add(`symbol-${symbol}`);
            if(symbol?.startsWith("x") || symbol === CASINO_BONUS_SYMBOL) {
                element.innerHTML = casinoBoard[reel][row];
            } else {
                element.innerHTML = "";
            }
        }
    }
}
function drawSlot(reel, row) {
    let symbol = casinoBoard[reel][row];
    let element = document.getElementById(`casino-reel${reel + 1}-slot${row + 1}`).firstChild;
    CASINO_SYMBOLS.forEach(symbol => {
        element.classList.remove(`symbol-${symbol}`);
    });
    element.classList.remove("symbol-NULL", `symbol-${CASINO_BONUS_SYMBOL}`, "symbol-x2", "symbol-x3", "symbol-x4", "symbol-x5");
    element.classList.add(`symbol-${symbol}`);
    if(symbol?.startsWith("x") || symbol === CASINO_BONUS_SYMBOL) {
        element.innerHTML = casinoBoard[reel][row];
    } else {
        element.innerHTML = "";
    }
}


// Spin the reels and populate board
function spinReels() {
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        let bonusDropped = false;
        for (let row = 0; row < CASINO_ROWS; row++) {
            // Possibly drop bonus symbol once per reel
            if (!bonusDropped && Math.random() < CASINO_BONUS_CHANCE) {
                casinoBoard[reel][row] = CASINO_BONUS_SYMBOL;
                bonusDropped = true;
            } else {
                casinoBoard[reel][row] = randomSymbol();
            }
        }
    }
}

// Get a random symbol or multiplier
function randomSymbol() {
    if (Math.random() < CASINO_MULTIPLIER_CHANCE) {
        // Return a multiplier like x2, x3, etc.
        const multiplier = Math.floor(Math.random() * 4) + 2;
        return `x${multiplier}`;
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

async function checkWins() {
    // Flatten the board to count symbol occurrences
    const allSymbols = casinoBoard.flat();
    let tally = {};
    let totalMultiplier = 1;
    let bonusCount = 0;
    
    allSymbols.forEach(symbol => {
        if (symbol === CASINO_BONUS_SYMBOL) {
            bonusCount++;
        } else if (symbol.startsWith("x")) {
            // Multiply total wins
            const factor = parseInt(symbol.replace("x", ""), 10);
            totalMultiplier += factor;
        } else {
            tally[symbol] = (tally[symbol] || 0) + 1;
        }
    });
    
    // Identify all symbols with at least 7 matches
    let totalWin = 0;
    for (let symbol in tally) {
        if (tally[symbol] >= CASINO_SYMBOLS_TO_WIN) {
            let win = getWin(symbol, tally[symbol]) * totalMultiplier;
            totalWin += win;
            document.getElementById("casino-win-feedback").innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x ($${getWin(symbol, tally[symbol]).toFixed(2)}) * ${totalMultiplier}x = $${win.toFixed(2)}</div>`;
            let winFeedElement = document.createElement("div");
            winFeedElement.innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x * ${totalMultiplier}x = $${win.toFixed(2)}</div>`;
            document.getElementById("casino-win-feed").appendChild(winFeedElement);
            removeSymbol(symbol);
            playSlotWinSound();
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }
    if(totalWin > 0) {
        await FallSymbols();
        await new Promise(resolve => setTimeout(resolve, 700));
        drawBoard();
    }
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
            if(element.classList.contains('slot-pop-out') || element.classList.contains('slot-fade-out') || element.classList.contains('slot-hidden')) {
                element.classList.remove('slot-pop-out');
                element.classList.remove('slot-fade-out');
                element.classList.remove('slot-hidden');
                element.classList.add('slot-pop-in');
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
    
    // Handle bonus logic
    if (bonusCount >= 3) {
        if (bonusCount === 3) console.log("Bonus game triggered!");
        if (bonusCount === 4) console.log("Extra spins in bonus game!");
        if (bonusCount === 5) console.log("Super bonus game triggered!");
    }
    
    return totalWin;
}

async function FallSymbols() {
    // We'll handle each reel separately
    const fallPromises = [];

    for (let reel = 0; reel < CASINO_REELS; reel++) {
        // 1) Collect the old state
        const oldReelSymbols = casinoBoard[reel].map((symbol, row) => ({ symbol, row }));

        // 2) Build the new arrangement for this reel
        const remainingSymbols = oldReelSymbols.filter(s => s.symbol !== null); // all non-null
        const newSymbolCount = CASINO_ROWS - remainingSymbols.length;
        // Generate brand new symbols for the top
        const newSymbols = Array.from({ length: newSymbolCount }, () => ({ symbol: randomSymbol(), row: -1 }));
        // Combine them to form the new reel (top are new, bottom are old)
        const newReel = [...newSymbols, ...remainingSymbols];

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

    // Wait for all reels to finish falling
    await Promise.all(fallPromises);

    // 5) Finally draw the board so the real slots match the new arrangement
    drawBoard();
    playSlotFallSound();
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
function removeSymbol(symbol) {
    // Mark all instances of the symbol as null and add pop-out animation
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            if (casinoBoard[reel][row] === symbol) {
                const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
                if (element) {
                    element.classList.add('slot-pop-out');
                    element.classList.remove('slot-pop-in');
                }
                casinoBoard[reel][row] = null;
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
                casinoBoard[reelIndex][row] = randomSymbol(); 
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
                resolve();
            }
        }, spinDelay);
    });
}

async function startCasinoGame() {
    if (casinoBusy) return;
    casinoBusy = true;
    
    // Clear any old win messages
    document.getElementById("casino-win-feed").innerHTML = "";
    document.getElementById("casino-win-feedback").innerHTML = `<i>Good luck!</i>`;
    
    // 2) Fade out existing symbols (your existing code)
    // ------------------------------------------------
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.add('slot-fade-out');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 700));  // Wait for fade out
    
    // 3) Generate the final spin results, but store them separately
    // ------------------------------------------------------------
    // Instead of writing directly to casinoBoard, we build a 2D array of final results
    let finalBoard = Array.from({ length: CASINO_REELS }, () => Array(CASINO_ROWS).fill(null));
    
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        let bonusDropped = false;
        for (let row = 0; row < CASINO_ROWS; row++) {
            if (!bonusDropped && Math.random() < CASINO_BONUS_CHANCE) {
                finalBoard[reel][row] = CASINO_BONUS_SYMBOL;
                bonusDropped = true;
            } else {
                finalBoard[reel][row] = randomSymbol();
            }
        }
    }
    
    // 4) Animate each reel in sequence (typical slot-machine style)
    //    If you want them all to spin in parallel, you can do a Promise.all instead.
    // ---------------------------------------------------------------------------
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        // Remove the fade-out class so we can begin spinning
        for (let row = 0; row < CASINO_ROWS; row++) {
            let slotElem = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
            slotElem.classList.remove('slot-fade-out');
        }
        // Animate this reel, then move on to the next
        //await animateReel(reel, finalBoard[reel], 15, 60);
    }
    await Promise.all(Array.from({ length: CASINO_REELS }, (_, i) => animateReel(i, finalBoard[i], 15 + i * 15, 10)));
    
    // 5) Now that all reels are on their final symbols, check for wins
    // ----------------------------------------------------------------
    let totalWin = 0;
    let win = await checkWins();
    while (win > 0) {
        totalWin += win;
        document.getElementById("casino-win-feedback").innerHTML = `You won: $${totalWin.toFixed(2)}`;
        win = await checkWins();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (totalWin > 0) {
        document.getElementById("casino-win-feedback").innerHTML = `You won: $${totalWin.toFixed(2)}`;
    } else {
        document.getElementById("casino-win-feedback").innerHTML = `Better luck next time!`;
    }
    
    gtag('event', 'casino', {
        'event_category': 'play',
        'slot_outcome': totalWin.toFixed(2)
    });
    
    casinoBusy = false;
}
