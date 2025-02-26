// script.js

let currentWordIndex = 0;
let wordsToType = [];
let correctKeystrokesTimestamps = [];
let lastTypedWord = "";

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
        if(confirm("Are you sure you want to reset your save?")) {
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
    document.getElementById('toggle-word-fall').addEventListener('change', function () {
        fallingWordsEnabled = this.checked;
    });
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
    // Set the height of #sticky-top-offset to the height of #sticky-top
    const stickyTop = document.getElementById('sticky-top');
    const stickyTopOffset = document.getElementById('sticky-top-offset');
    stickyTopOffset.style.height = `${stickyTop.clientHeight}px`;

    // Set the width fo #sticky-left-offset to the width of #navbar-container
    const navbarContainer = document.getElementById('navbar-container');
    const stickyLeftOffset = document.getElementById('sticky-left-offset');
    stickyLeftOffset.style.width = `${navbarContainer.clientWidth}px`;
    
    document.getElementById('navbar-container').style.top = `${stickyTop.clientHeight}px`;
    
    
    //==========================================
    sendHeartbeat(); // send the first heartbeat
}

document.getElementById('input-box').addEventListener('input', function() {
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value.trim();
    
    colorText(inputText, document.getElementById('words-to-type'), wordsToType, currentWordIndex);
    highlightNextKey();
    if (inputBox.value.endsWith(' ')) {
        if (inputText === wordsToType[currentWordIndex]) {
            manualKeystrokes += inputText.length;
            //let keyStrokeModCount = inputText.length + (inputText.length * (arenaGoldMedals * 0.01 * getPassiveIncome()));
            let keyStrokeModCount = applyKPStoManual(inputText.length);
            keyStrokeModCount = applyModifiers(0, keyStrokeModCount);
            //keyStrokeModCount *= AutoWriter.level * 0.05 + 1; // 1% boost per Auto Writer
            totalKeystrokes += keyStrokeModCount;
            keystrokesBank += keyStrokeModCount;
            cashEarnedManually += keyStrokeModCount;
            lastTypedWord = inputText;
            
            currentWordIndex++;
            //wordsToType.shift(); // Remove the first word
            //wordsToType.push(getRandomWord()); // Add a new random word
            
            // Track each keystroke of the correct word using original inputText.length for WPM calculation
            for (let i = 0; i < inputText.length; i++) {
                correctKeystrokesTimestamps.push(Date.now());
            }
            
            createFallingWord(inputText); // Create falling word effect
            createFloatingWord(`<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> +${formatShortScale(keyStrokeModCount)}`);
            updateWordsToType();
            playTypeSound();
            inputBox.value = '';
            gtag('event', 'word_input', {
                'wpm': wpm,
                'event_category': 'typing'
            });
        } else {
            if (skipOnMistake) {
                currentWordIndex++;
                updateWordsToType();
                inputBox.value = '';
                playTypoSound();
            }
        }
        highlightNextKey();
    }
});


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


function updateWordsToType() {
    const wordsDisplay = document.getElementById('words-to-type');
    if(currentWordIndex > 0) {
        let firstElement = wordsDisplay.children[0];
        const currentElement = wordsDisplay.children[currentWordIndex];
        let toRemove = [];
        while (currentElement.getBoundingClientRect().top > firstElement.getBoundingClientRect().top) {
            toRemove.push(wordsDisplay.children[toRemove.length]);
            firstElement = wordsDisplay.children[toRemove.length];
        }
        if(toRemove.length > 0) {
            for(let i = 0; i < toRemove.length; i++) {
                wordsDisplay.removeChild(toRemove[i]);
                wordsToType.shift();
                wordsToType.push(getRandomWord());
            }
            currentWordIndex = 0;
        }
    }
    if(wordsDisplay.children.length < wordsToType.length) {
        for(let i = wordsDisplay.children.length; i < wordsToType.length; i++) {
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = wordsToType[i];
            wordsDisplay.appendChild(wordElement);
        }
    }
    colorText('', wordsDisplay, wordsToType, currentWordIndex);
    document.getElementById('input-box').placeholder = `Type '${wordsToType[currentWordIndex]}' here...`;
    highlightNextKey();
}

function colorText(inputText, wordsDisplay, words, currentIndex) {
    const firstWord = words[currentIndex];
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
    /*
    for (let i = 1; i < words.length; i++) {
    coloredText += ' ' + words[i];
    }
    */
    wordsDisplay.children[currentIndex].innerHTML = coloredText;
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
    
    document.getElementById('currentAchievementCount').textContent = achievements.filter(a => a.unlocked).length;
    document.getElementById('maxAchievementCount').textContent = achievements.length;
    
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

function createFallingWord(word) {
    if(currentPage !== 'main-tab') return;
    if(!fallingWordsEnabled) return;
    const gameContainer = document.getElementById('game-container');
    const fallingWord = document.createElement('div');
    fallingWord.textContent = word;
    fallingWord.className = 'falling-word';
    
    // Set the left property randomly between 0% and 100%
    const rect = document.getElementById('input-box').getBoundingClientRect();
    // Set the left property randomly between 0% and 10%
    fallingWord.style.left = `${rect.left + Math.random() * rect.width}px`;
    fallingWord.style.top = `${rect.bottom}px`;
    //fallingWord.style.left = `${Math.random() * 100}%`;
    
    // Set a random animation duration between 1s and 3s
    const randomDuration = (Math.random() * 2 + 1).toFixed(2);
    fallingWord.style.animationDuration = randomDuration + 's';
    
    gameContainer.appendChild(fallingWord);
    
    // Remove the falling word after the animation completes
    setTimeout(() => {
        gameContainer.removeChild(fallingWord);
    }, randomDuration * 1000); // Convert the duration to milliseconds
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
        createFallingWord(getRandomWord());
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
}