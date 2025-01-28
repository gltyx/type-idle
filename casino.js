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
    let casinoBackGrid = document.createElement("div");
    casinoBackGrid.id = "casino-back-grid";
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        let reelDiv = document.createElement("div");
        reelDiv.id = `casino-reel${reel + 1}`;
        reelDiv.classList.add("casino-reel");

        let rellDiv2 = document.createElement("div");
        rellDiv2.classList.add("casino-reel");
        casinoBackGrid.appendChild(rellDiv2);

        for (let row = 0; row < CASINO_ROWS; row++) {
            let slotDiv = document.createElement("div");
            slotDiv.id = `casino-reel${reel + 1}-slot${row + 1}`;
            slotDiv.classList.add("casino-slot");

            let symbolElement = document.createElement("div");
            symbolElement.classList.add("symbol-NULL");
            slotDiv.appendChild(symbolElement);
            reelDiv.appendChild(slotDiv);

            let slotDiv2 = document.createElement("div");
            slotDiv2.id = `casino-back-reel${reel + 1}-slot${row + 1}`;
            slotDiv2.classList.add("casino-slot");
            slotDiv2.classList.add("casino-slot-back");
            rellDiv2.appendChild(slotDiv2);
        }
        document.getElementById("casino-board").appendChild(reelDiv);
    }
    document.getElementById("casino-board").appendChild(casinoBackGrid);
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
            document.getElementById("casino-win-feedback").innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x * ${totalMultiplier}x = $${win.toFixed(2)}</div>`;
            let winFeedElement = document.createElement("div");
            winFeedElement.innerHTML = `<div><div class="casino-slot tiny-slot"><div class="symbol-${symbol}"></div></div>${tally[symbol]}x * ${totalMultiplier}x = $${win.toFixed(2)}</div>`;
            document.getElementById("casino-win-feed").appendChild(winFeedElement);
            removeSymbol(symbol);
            playSlotWinSound();
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }
    if(totalWin > 0) {
        FallSymbols();
        playSlotFallSound();
        await new Promise(resolve => setTimeout(resolve, 700));
        drawBoard();
    }
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
            if(element.classList.contains('slot-pop-out') || element.classList.contains('slot-fade-out')) {
                element.classList.remove('slot-pop-out');
                element.classList.remove('slot-fade-out');
                element.classList.add('slot-pop-in');
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

function FallSymbols() {
    // Process each reel to collapse and fill
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        const remainingSymbols = [];
        // Collect non-null symbols from top to bottom
        for (let row = 0; row < CASINO_ROWS; row++) {
            if (casinoBoard[reel][row] !== null) {
                remainingSymbols.push({symbol: casinoBoard[reel][row], original_row: row});
            }
        }
        // Calculate how many new symbols are needed
        const newSymbolCount = CASINO_ROWS - remainingSymbols.length;
        // Generate new symbols and add them to the top
        const newSymbols = Array.from({ length: newSymbolCount }, () => ({ symbol: randomSymbol(), original_row: -1 }));
        // Combine new symbols with remaining symbols
        const newReel = [...newSymbols, ...remainingSymbols];
        // Update the reel and add pop-in animation
        for (let row = 0; row < CASINO_ROWS; row++) {
            casinoBoard[reel][row] = newReel[row].symbol;
            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
            const og_row = newReel[row].original_row;
            if(og_row === -1) {
                
            } else {
                if(og_row !== row) {
                    document.querySelector(`#casino-reel${reel + 1}-slot${og_row + 1}`).classList.add('slot-fade-out');
                }
            }
        }
        for (let row = 0; row < CASINO_ROWS; row++) {
            casinoBoard[reel][row] = newReel[row].symbol;
            const element = document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`);
            const og_row = newReel[row].original_row;
            if(og_row === -1) {
                
            } else {
                if(og_row !== row) {
                    element.classList.remove('slot-pop-out');
                    element.classList.remove('slot-fade-out');
                    element.classList.add('slot-fall-down');
                    drawSlot(reel, row);
                }
            }
        }
       // drawBoard();
    }
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


async function startCasinoGame() {
    if(casinoBusy) {
        return;
    }
    casinoBusy = true;
    document.getElementById("casino-win-feed").innerHTML = "";
    document.getElementById("casino-win-feedback").innerHTML = `<i>Good luck!</i>`;
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.add('slot-fade-out');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 700));
    spinReels();
    drawBoard();
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.remove('slot-fade-out');
            document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.add('slot-pop-in');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 700));
    for (let reel = 0; reel < CASINO_REELS; reel++) {
        for (let row = 0; row < CASINO_ROWS; row++) {
            document.querySelector(`#casino-reel${reel + 1}-slot${row + 1}`).classList.remove('slot-pop-in');
        }
    }
    let totalWin = 0;
    let win = await checkWins();
    while(win > 0) {
        totalWin += win;
        document.getElementById("casino-win-feedback").innerHTML = `You won: $${totalWin.toFixed(2)}`;
        win = await checkWins();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    if(totalWin > 0) {
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
