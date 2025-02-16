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
            }
            document.getElementById('hacker-timeleft-remaining').innerText = (30 - (performance.now() - hackerHijackStartTime) / 1000).toFixed(0);
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
                }
            } else if(hackerUIState !== "ready") {
                hackerUIState = "ready";
                document.getElementById('hacker-tab').classList.add("ready");
                document.getElementById('hacker-timeleft').style.display = "none";
                document.getElementById('hacker-canvas').style.display = "block";
                document.getElementById('hacker-start').style.display = "block";
                document.getElementById('hacker-computer').style.display = "none";
                document.getElementById('hacker-start-button').innerText = `Start Hijack`;
                document.getElementById('hacker-cooldown').style.display = "none";
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
                document.getElementById('hacker-access-granted').textContent = "Failed to connect!";
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
                document.getElementById('hacker-access-granted').textContent = "Access granted!";
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
                document.getElementById('hacker-access-granted').textContent = "Access denied!";
            }
        }
        document.getElementById('hacker-cooldown-remaining').innerText = (finishBoost.duration / Tickrate).toFixed(0);
    }
}

let computerCode = "";
let lastComputerCode = "";
let hackerPassword = "";
let hackerPasswordList = [];
let hackerLoginTries = 5;


const hackerBracketWords = ["(retry)", "[error]", "{locked}", "(dud)", "[null]"];
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
            lastComputerCode = snippetToShow;
        }
    }
}

function hackerBootScreen(step) {
    const computer = document.getElementById('hacker-computer');
    if(step === 0) {
        computerCode = `
            <div style="color: green; font-family: monospace;">
            <p>Booting up...</p>
            </div>
        `;
    } else if(step === 1) {
        computerCode = `
            <div style="color: green; font-family: monospace;">
            <p>Booting up...</p>
            <p>Loading system files...</p>
            </div>
        `;
    } else if(step === 2) {
        computerCode = `
            <div style="color: green; font-family: monospace;">
            <p>Booting up...</p>
            <p>Loading system files...</p>
            <p>Initializing hardware...</p>
            </div>
        `;
    } else if(step === 3) {
        computerCode = `
            <div style="color: green; font-family: monospace;">
            <p>Booting up...</p>
            <p>Loading system files...</p>
            <p>Initializing hardware...</p>
            <p>Starting services...</p>
            </div>
        `;
    } else if(step === 4) {
        computerCode = `
            <div style="color: green; font-family: monospace;">
            <p>Booting up...</p>
            <p>Loading system files...</p>
            <p>Initializing hardware...</p>
            <p>Starting services...</p>
            <p>Welcome to TypeIdle OS</p>
            </div>
        `;
        hackerPassword = getRandomWord(7);
        for(let i = 0; i < 20; i++) {
            let randomWord = getRandomWord(7);
            while(hackerPasswordList.includes(randomWord) || randomWord === hackerPassword) {
                randomWord = getRandomWord(7);
            }
            hackerPasswordList.push(randomWord);
        }
        
        for(let i = 0; i < 3; i++) {
            let randomBracketWord = hackerBracketWords[Math.floor(Math.random() * hackerBracketWords.length)];
            let randomIndex = Math.floor(Math.random() * hackerPasswordList.length);
            hackerPasswordList.splice(randomIndex, 0, randomBracketWord);
        }
        
        
        while(hackerPasswordList.join("").length < 600) {
            let randomIndex = Math.floor(Math.random() * hackerPasswordList.length);
            if(Math.random() < 0.5) {
                let randomChar = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                hackerPasswordList.splice(randomIndex, 0, randomChar);
            } else {
                hackerPasswordList.splice(randomIndex, 0, ".");
            }
        }
        
        setTimeout(() => {
            let codeArray = hackerPasswordList.map(word => {
                let encodedWord = htmlEncode(word);
                return `<span class="hacker-password wrong-password" onmouseout="hackerHidePassword()" onmouseover="hackerShowPassword(this)" onclick="hackerSubmitPassword(this)">${encodedWord}</span>`;
            });
            let randomIndex = Math.floor(Math.random() * (codeArray.length + 1));
            codeArray.splice(randomIndex, 0, `<span class="hacker-password correct-password" onmouseout="hackerHidePassword()" onmouseover="hackerShowPassword(this)" onclick="hackerSubmitPassword(this)">${hackerPassword}</span>`);
            computerCode = codeArray.join("");
            computerScrollingPercent = 0;
            stopUsingComputerCode = true;
            document.getElementById('hacker-computer-side').style.display = "flex";
        }, 2000);
    }
}

function htmlEncode(str) {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

function hackerShowPassword(Element) {
    document.getElementById('hacker-selected-password').innerText = Element.innerText;
}

function hackerHidePassword() {
    document.getElementById('hacker-selected-password').innerText = "";
}

function hackerSubmitPassword(Element) {
    if(hackerLoginTries === 0) return;
    if(Element.innerText.startsWith(".")) return;

    if(hackerBracketWords.includes(Element.innerText)) {
        Element.innerText = ".".repeat(Element.innerText.length);
        const wrongPasswords = Array.from(document.getElementsByClassName('wrong-password')).filter(pw => !pw.innerText.startsWith(".") && pw.innerText.length > 1);
        const randomWrongPassword = wrongPasswords[Math.floor(Math.random() * wrongPasswords.length)];
        randomWrongPassword.innerText = ".".repeat(randomWrongPassword.innerText.length);
        return;
    }

    const loginAttempts = document.getElementById('hacker-login-attempts');
    const loginAttempt = document.createElement('p');
    loginAttempt.innerText = `> ${Element.innerText}`;
    loginAttempts.appendChild(loginAttempt);

    const word = htmlEncode(Element.innerText);
    const oldLength = computerCode.length;

    let correctChars = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === hackerPassword[i]) {
            correctChars++;
        }
    }

    const correctFeedback = document.createElement('p');
    correctFeedback.innerText = `Correct characters: ${correctChars}/${hackerPassword.length}`;
    loginAttempts.appendChild(correctFeedback);

    const loginFeedback = document.createElement('p');
    if(word === hackerPassword) {
        loginFeedback.innerText = "Access granted!";
        // Random reward of 600-3600$
        const rewardInDollars = Math.floor(Math.random() * 3000 + 600);
        const rewardInKeystrokes = dollarsToKeystrokes(rewardInDollars);

        keystrokesBank += rewardInKeystrokes;
        totalKeystrokes += rewardInKeystrokes;

        document.getElementById('hacker-reward-dollars').innerText = rewardInDollars;
        document.getElementById('hacker-reward-keystrokes').innerText = rewardInKeystrokes;
        gtag('event', 'hacker_password_cracked', {
            
        });
        setTimeout(() => {
            hackerCrackActive = false;
            hackerConnected = false;
            spawnBoost(10);
            hackerUIState = "";
        }, 2000);
    } else {
        loginFeedback.innerText = "Wrong password";
        Element.innerText = ".".repeat(word.length);
        hackerLoginTries--;
        document.getElementById('hacker-login-attempts-left').innerText = hackerLoginTries;
        gtag('event', 'hacker_wrong_password', {
            
        });
        if(hackerLoginTries === 0) {
            loginFeedback.innerText = "Wrong password/Access denied!";
            gtag('event', 'hacker_access_denied', {
                 
            });
            setTimeout(() => {
                hackerCrackActive = false;
                hackerConnected = false;
                hackerUIState = "";
                spawnBoost(11);
            }, 2000);
        }
    }
    loginAttempts.appendChild(loginFeedback);
    const newLength = computerCode.length;
    computerScrollingPercent = oldLength / newLength * 100;
}

function startHackMinigame() {
    if (hackerHijackActive) return;
    
    hackerHijackActive = true;
    hackerHijackStartTime = performance.now();
    scrollingProgressPercent = 0;

    computerCode = "";
    lastComputerCode = "";
    hackerPassword = "";
    hackerPasswordList = [];
    usingComputerCode = true;
    stopUsingComputerCode = false;
    computerScrollingPercent = 0;
    hackerLoginTries = 5;
    document.getElementById('hacker-login-attempts-left').innerText = hackerLoginTries;
    
    hackerCodeBackDrop = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    
    hackerPoints = generateRandomPoints(5 + 5 * hackerCurrentLevel);
    hackerLines = generateRandomLines(hackerPoints);
    
    hackerCanvas.addEventListener('mousedown', onMouseDown);
    hackerCanvas.addEventListener('mousemove', onMouseMove);
    hackerCanvas.addEventListener('mouseup', onMouseUp);
    
    updateHackMinigameProgress();
}

function generateRandomPoints(count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push({
            x: Math.random() * hackerCanvas.width,
            y: Math.random() * hackerCanvas.height,
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
    if(!hackerHijackActive) return;
    hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
    drawLines();
    drawPoints();
    const progressPercent = calculateUntangleProgress();
    scrollingProgressPercent += (progressPercent - scrollingProgressPercent) / Tickrate * 4;
    
    if(progressPercent >= 100) scrollingProgressPercent = 100;
    const snippetToShow = getPartialCodeSnippet(hackerCodeBackDrop, scrollingProgressPercent);
    
    document.getElementById('hacker-code-snippet').innerHTML = snippetToShow;
    
    if (progressPercent >= 100) {
        finishHijackMinigame(true);
    } else {
        if(performance.now() - hackerHijackStartTime > 30000) {
            finishHijackMinigame(false);
        }
    }
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

function finishHijackMinigame(won) {
    hackerDraggingPoint = null;
    hackerHijackActive = false;
    // final draw
    calculateUntangleProgress();
    hackerCtx.clearRect(0, 0, hackerCanvas.width, hackerCanvas.height);
    drawLines();
    drawPoints();
    
    if(won) {
        hackerConnected = true;
        setTimeout(() => {
            hackerCrackActive = true;
            hackerConnected = false;
        }, 1500);
        gtag('event', 'hacker_conn_hijack_won', {
            
        });
    } else {
        spawnBoost(6);
        gtag('event', 'hacker_conn_hijack_lost', {
            
        });
    }
}
