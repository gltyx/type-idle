let arcadeUIState = "";
let arcadeActive = false;
let arcadeStartTime = 0;
let arcadeScore = 0;
let arcadeTick = 0;
let arcadeTicksToSpawn = 0;
let arcadeDifficulty = 0;
let arcadeInvaders = [];

function displayArcade() {
    if(GameArcade.level > 0) {
        document.getElementById('arcade-tab').style.display = "block";
    }
    if (arcadeActive) {
        if (arcadeUIState !== "active") {
            arcadeUIState = "active";
            document.getElementById('arcade-tab').classList.remove("ready");
            document.getElementById('arcade-start').style.display = "none";
            document.getElementById('arcade-timeleft').style.display = "block";
            document.getElementById('arcade-cooldown').style.display = "none";
            document.getElementById('arcade-input-box').focus();
        }
        tickArcade();
        document.getElementById('arcade-score').innerText = arcadeScore.toFixed(0);
    } else {
        let cooldownBoost = modifiers.find(modifier => modifier.name === "Arcade cooldown");
        if (!cooldownBoost) {
            if (arcadeUIState !== "ready") {
                arcadeUIState = "ready";
                document.getElementById('arcade-input-box').value = "";
                document.getElementById('arcade-tab').classList.add("ready");
                document.getElementById('arcade-start').style.display = "block";
                document.getElementById('arcade-timeleft').style.display = "none";
                document.getElementById('arcade-cooldown').style.display = "none";
            }
        } else {
            if (arcadeUIState !== "cooldown") {
                arcadeUIState = "cooldown";
                document.getElementById('arcade-score2').innerText = arcadeScore.toFixed(0);
                document.getElementById('arcade-tab').classList.remove("ready");
                document.getElementById('arcade-cooldown').style.display = "block";
                document.getElementById('arcade-start').style.display = "none";
                document.getElementById('arcade-timeleft').style.display = "none";
            }
            document.getElementById('arcade-cooldown-remaining').innerText = (cooldownBoost.duration / Tickrate).toFixed(0);
        }
    }
}

document.getElementById('arcade-input-box').addEventListener('input', function() {
    if(arcadeActive) {
        const inputText = document.getElementById('arcade-input-box').value.trim();
        arcadeInvaders.forEach(invader => {
            if(invader.word === inputText) {
                arcadeScore += invader.speed * 10;
                invader.element.classList.add('arcade-remove-animation');
                setTimeout(() => {
                    invader.element.remove();
                }, 500);
                arcadeInvaders = arcadeInvaders.filter(i => i !== invader);
                document.getElementById('arcade-input-box').value = "";
                playExplosionSound();
            }
        });
    }
});

function startArcadeMinigame() {
    if(arcadeActive) return;
    arcadeActive = true;
    arcadeInvaders = [];
    arcadeTick = 0;
    arcadeScore = 0;
    arcadeTicksToSpawn = 60;
    arcadeStartTime = performance.now();
    arcadeDifficulty = document.getElementById('arcade-difficulty-select').value;
}

function createInvader() {
    const word = getRandomWord(5);
    const invaderElement = document.createElement('div');
    invaderElement.classList.add('arcade-invader');
    invaderElement.innerText = word;
    let speed = 1 + Math.log10(arcadeTick + 1);
    if(arcadeDifficulty === "2") {
        speed *= 0.5;
    } else if(arcadeDifficulty === "1") {
        speed *= 0.25;
    }
    arcadeInvaders.push({ word: word, x_pos: Math.random() * 500 + 150, y_pos: 0, speed: speed, element: invaderElement });
    invaderElement.style.left = arcadeInvaders[arcadeInvaders.length - 1].x_pos + "px";
    document.getElementById('arcade-game-canvas').appendChild(invaderElement);
}

function tickArcade() {
    if (arcadeActive) {
        arcadeTick++;
        arcadeTicksToSpawn--;
        if(arcadeTicksToSpawn <= 0) {
            createInvader();
            arcadeTicksToSpawn = Math.max(1, 60 - Math.floor(arcadeTick / 100));
            if(arcadeDifficulty === "2") {
                arcadeTicksToSpawn *= 1.25;
            } else if(arcadeDifficulty === "1") {
                arcadeTicksToSpawn *= 1.5;
            }
        }
        arcadeInvaders.forEach(invader => {
            invader.y_pos += invader.speed;
            invader.element.style.top = invader.y_pos + "px";
            if(invader.y_pos > 600) {
                finishArcade();
            }
        });
    }
}

function finishArcade() {
    arcadeActive = false;
    arcadeInvaders.forEach(invader => {
        invader.element.remove();
    });
    arcadeInvaders = [];
    spawnBoost(7);
    playLoseSound();
    gtag('event', 'arcade_end', {
        'event_category': 'arcade',
        'Difficulty': arcadeDifficulty,
        'Score': arcadeScore,
    });
}