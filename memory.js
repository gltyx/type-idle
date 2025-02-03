let memoryUIState = "";
let memoryActive = false;
let memoryInput = false;
let memoryGameOver = false;
let memoryLevel = 0;
let memorySequence = "";
let memorySequenceInput = "";

function displayMemory() {
    if(AIAgent.level > 0) {
        document.getElementById('memory-tab').style.display = "block";
    }
    if (memoryActive) {
        if(memoryInput) {
            if (memoryUIState !== "input") {
                memoryUIState = "input";
                document.getElementById('memory-sequence-input').style.display = "block";
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
                document.getElementById('memory-sequence-game-canvas').style.display = "block";
                document.getElementById('memory-sequence').innerText = memorySequence;
            }
        }
    } else {
        if (!memoryGameOver) {
            if (memoryUIState !== "ready") {
                memoryUIState = "ready";
                document.getElementById('memory-input-box').value = "";
                document.getElementById('memory-tab').classList.add("ready");
                document.getElementById('memory-start').style.display = "block";
                document.getElementById('memory-game-over').style.display = "none";
            }
        } else {
            if (memoryUIState !== "gameover") {
                memoryUIState = "gameover";
                document.getElementById('memory-sequence-score2').innerText = memoryLevel;
                document.getElementById('memory-tab').classList.remove("ready");
                document.getElementById('memory-game-over').style.display = "block";
                document.getElementById('memory-sequence-input').style.display = "none";
            }
        }
    }
}

function resetMemoryGame() {
    memoryActive = false;
    memoryInput = false;
    memoryGameOver = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
}

function startMemorySequence() {
    if(memoryActive) return;

    memoryActive = true;
    memoryInput = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
    generateSequence();
    generateSequence();
    generateSequence();
}

function generateSequence() {
    memorySequence += Math.floor(Math.random() * 10);
}

function memoryBeginSequence() {
    if (!memoryActive || memoryInput) return;
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
        memoryActive = false;
        memoryInput = false;
        memoryGameOver = true;
    }
}