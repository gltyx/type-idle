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
