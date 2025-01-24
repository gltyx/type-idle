let hackerRaceActive = false;
let hackerRaceStartTime = 0;
let hackerPoints = [];
let hackerLines = [];
let hackerUIState = "";
let hackerCodeBackDrop = "";
const hackerRaceTargetKeystrokes = 300;
const canvas = document.getElementById('hacker-canvas');
const ctx = canvas.getContext('2d');
let hackerDraggingPoint = null;
let hackerCurrentLevel = 1;

function displayHacker() {
    if(HackerGroup.level > 0) {
        document.getElementById('hacker-tab').style.display = "block";
    }
    let finishBoost = modifiers.find(modifier => modifier.name === "Hacker cooldown");
    if(!finishBoost) {
        if(hackerRaceActive) {
            if(hackerUIState !== "active") {
                hackerUIState = "active";
                document.getElementById('hacker-tab').classList.remove("ready");
                document.getElementById('hacker-start').style.display = "none";
                document.getElementById('hacker-timeleft').style.display = "block";
                document.getElementById('hacker-cooldown').style.display = "none";
            }
            document.getElementById('hacker-timeleft-remaining').innerText = (30 - (performance.now() - hackerRaceStartTime) / 1000).toFixed(0);
            updateHackMinigameProgress();
        } else {
            if(hackerUIState !== "ready") {
                hackerUIState = "ready";
                document.getElementById('hacker-tab').classList.add("ready");
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-start').style.display = "block";
                document.getElementById('hacker-start-button').innerText = `Start Level ${hackerCurrentLevel}`;
                document.getElementById('hacker-cooldown').style.display = "none";
            }
        }
    } else {
        if(hackerUIState !== "cooldown") {
            hackerUIState = "cooldown";
            document.getElementById('hacker-tab').classList.remove("ready");
            document.getElementById('hacker-cooldown').style.display = "block";
            document.getElementById('hacker-start').style.display = "none";
            document.getElementById('hacker-timeleft').style.display = "none";
        }
        document.getElementById('hacker-cooldown-remaining').innerText = (finishBoost.duration / Tickrate).toFixed(0);
    }
}

function startHackMinigame() {
    if (hackerRaceActive) return;
    
    hackerRaceActive = true;
    hackerRaceStartTime = performance.now();
    scrollingProgressPercent = 0;
    
    hackerCodeBackDrop = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    
    hackerPoints = generateRandomPoints(5 + 5 * hackerCurrentLevel);
    hackerLines = generateRandomLines(hackerPoints);
    
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    
    updateHackMinigameProgress();
}

function generateRandomPoints(count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 10
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
    if(!hackerRaceActive) return;
    const { offsetX, offsetY } = event;
    for (const point of hackerPoints) {
        if (Math.hypot(point.x - offsetX, point.y - offsetY) < point.radius) {
            hackerDraggingPoint = point;
            break;
        }
    }
}

function onMouseMove(event) {
    if(!hackerRaceActive) return;
    if (hackerDraggingPoint) {
        const { offsetX, offsetY } = event;
        hackerDraggingPoint.x = offsetX;
        hackerDraggingPoint.y = offsetY;
        updateHackMinigameProgress();
    }
}

function onMouseUp() {
    hackerDraggingPoint = null;
}

function updateHackMinigameProgress() {
    if(!hackerRaceActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawPoints();
    const progressPercent = calculateUntangleProgress();
    scrollingProgressPercent += (progressPercent - scrollingProgressPercent) / Tickrate * 4;
    
    if(progressPercent >= 100) scrollingProgressPercent = 100;
    const snippetToShow = getPartialCodeSnippet(hackerCodeBackDrop, scrollingProgressPercent);
    
    document.getElementById('hacker-code-snippet').innerHTML = snippetToShow;
    
    if (progressPercent >= 100) {
        finishHackMinigame(true);
    } else {
        if(performance.now() - hackerRaceStartTime > 30000) {
            finishHackMinigame(false);
        }
    }
}

function drawPoints() {
    for (const point of hackerPoints) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.stroke();
    }
}

function drawLines() {
    for (const line of hackerLines) {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.strokeStyle = line.tangled ? 'red' : 'green';
        ctx.stroke();
    }
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

function finishHackMinigame(won) {
    hackerDraggingPoint = null;
    hackerRaceActive = false;
    // final draw
    calculateUntangleProgress();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawPoints();

    if(!won) {
        playLoseSound();
        hackerCurrentLevel = 1;
        spawnBoost(6); // Hacker cooldown
    } else {
        playWinSound();
        hackerCurrentLevel++;
    }
}
