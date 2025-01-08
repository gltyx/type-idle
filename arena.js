let raceStartTime = 0; 
let playerKeystrokes = 0;
let opponentKeystrokes = 0;
let raceActive = false;
let arenaWords = [];
let playerWPM = 0;
let opponentWPM = 0;
let selectedDifficulty = "Normal";
let opponentELO = 1000;
let medalsToGain = 1;
const raceTargetKeystrokes = 200; // 40 words
const difficultySettings = {
    Normal: { baseELO: 1000, goldMedals: 1 },
    Hard: { baseELO: 1200, goldMedals: 2 },
    VeryHard: { baseELO: 1600, goldMedals: 3 },
};

const difficultySelect = document.getElementById("difficulty-select");
difficultySelect.addEventListener("change", () => {
    selectedDifficulty = difficultySelect.value;
});

let arenaUIState = "";
function displayArena() {
    if(TypingArena.level > 0) {
        document.getElementById("arena-tab").style.display = "block";
    } else {
        document.getElementById("arena-tab").style.display = "none";
    }
    let finishBoost = modifiers.find(modifier => modifier.name === "Race Finish Buff");
    let championBoost = modifiers.find(modifier => modifier.name === "Champion of the Arena");
    if(!finishBoost) {
        if(raceActive) {
            if(arenaUIState != "race") {
                arenaUIState = "race";
                document.getElementById("arena-tab").classList.remove("ready");
                document.getElementById("arena-input-box").value = "";
                document.getElementById("arena-race").style.display = "block";
                document.getElementById("start-race").style.display = "none";
                document.getElementById("arena-result").innerHTML = "";
                document.getElementById("arena-input-box").focus();
            }
        } else {
            if(arenaUIState != "init") {
                arenaUIState = "init";
                //document.getElementById("arena-tab").classList.remove("complete");
                document.getElementById("arena-tab").classList.add("ready");
                document.getElementById("gold-medals").textContent = arenaGoldMedals;
                document.getElementById("arena-race").style.display = "none";
                document.getElementById("start-race").style.display = "block";
                document.getElementById("arena-result").innerHTML = "";
            }
        }
    } else {
        if(arenaUIState != "race_end") {
            arenaUIState = "race_end";
            //document.getElementById("arena-tab").classList.add("complete");
            document.getElementById("gold-medals").textContent = arenaGoldMedals;
            document.getElementById("arena-race").style.display = "none";
            document.getElementById("start-race").style.display = "none";
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
function updateRaceProgress() {
    const playerProgressBar = document.getElementById("player-progress-bar");
    const opponentProgressBar = document.getElementById("opponent-progress-bar");

    playerProgressBar.style.width = `${(playerKeystrokes / raceTargetKeystrokes) * 100}%`;
    opponentProgressBar.style.width = `${(opponentKeystrokes / raceTargetKeystrokes) * 100}%`;
}
function startArenaRace() {
    if (raceActive) return;

    raceActive = true;
    playerKeystrokes = 0;
    opponentKeystrokes = 0;

    // Record the start time (in milliseconds)
    raceStartTime = performance.now();

    // Generate words for typing race
    arenaWords = [];
    for (let i = 0; i < 30; i++) {
        arenaWords.push(getRandomWord());
    }
    updateArenaWordList();

    const selectedDifficultyConfig = difficultySettings[selectedDifficulty];
    opponentELO = selectedDifficultyConfig.baseELO;
    medalsToGain = selectedDifficultyConfig.goldMedals;
    // Start opponent's typing simulation
    simulateOpponentTyping();

    // Update UI
    document.getElementById("player-progress").textContent = "0";
    document.getElementById("opponent-progress").textContent = "0";
}


function updateArenaWordList() {
    colorTextArena('');
}

document.getElementById("arena-input-box").addEventListener("input", function () {
    const inputBox = document.getElementById("arena-input-box");
    const inputText = inputBox.value.trim();
    colorTextArena(inputText);
    if (inputBox.value.endsWith(" ")) {
        if (inputText === arenaWords[0]) {
            playerKeystrokes += inputText.length;
            arenaWords.shift(); 
            arenaWords.push(getRandomWord());
            updateArenaWordList();
        }
        inputBox.value = "";

        document.getElementById("player-progress").textContent = playerKeystrokes;
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
        opponentKeystrokes += Math.round(opponentKPS);

        updateRaceProgress();
        document.getElementById("opponent-progress").textContent = Math.min(
            opponentKeystrokes,
            raceTargetKeystrokes
        );

        if (opponentKeystrokes >= raceTargetKeystrokes) {
            clearInterval(typingInterval);
            finishArenaRace(false);
        }
    }, 1000); // update every second
}



function finishArenaRace(playerWon) {
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
}

function colorTextArena(inputText) {
    const wordsDisplay = document.getElementById('arena-words-to-type');
    const firstWord = arenaWords[0];
    let coloredText = '';
    let mistakeFound = false;
    
    for (let i = 0; i < firstWord.length; i++) {
        if (i < inputText.length && firstWord[i] === inputText[i] && !mistakeFound) {
            coloredText += `<span class="correct">${firstWord[i]}</span>`;
        } else {
            if (i < inputText.length || mistakeFound) {
                coloredText += `<span class="mistake">${firstWord[i]}</span>`;
                mistakeFound = true;
            } else {
                coloredText += `<span class="current">${firstWord[i]}</span>`;
            }
        }
    }
    
    for (let i = 1; i < arenaWords.length; i++) {
        coloredText += ' ' + arenaWords[i];
    }
    
    wordsDisplay.innerHTML = coloredText;
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
    modifiers.push({
        name: "Race Finish Buff",
        description: "",
        affectedBuildings: [],
        multiplier: 1,
        duration: 5 * 60 * Tickrate
    });
    
}

function applyArenaChampionBuff() {
    modifiers.push({
        name: "Champion of the Arena",
        description: "",
        affectedBuildings: [0, AutoWriter.id],
        multiplier: 2,
        KPStoManual: 0.01,
        duration: 5 * 60 * Tickrate
    }); 
}
