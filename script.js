// script.js

let currentWordIndex = 0;
let wordsToType = [];
let correctKeystrokesTimestamps = [];
let lastTypedWord = "";
let currentCharIndex = 0; // Track the current character position
let currentWordStreak = 0; // Track consecutive correct words
let perfectWordStreak = 0; // Track consecutive perfect words (no mistakes)
let currentWordMistakes = 0; // Track mistakes in the current word

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
    window.typeParticleSystem = new TypeParticleSystem();
    //==========================================
    updateStickyOffsets();
    
    setTimeout(() => {
        updateStickyOffsets();
    }, 2000); // Update sticky offsets after 2s (Iframe fix)
    //==========================================
    sendHeartbeat(); // send the first heartbeat
}

function updateStickyOffsets() {
    const stickyTop = document.getElementById('sticky-top');
    const stickyTopOffset = document.getElementById('sticky-top-offset');
    const navbarContainer = document.getElementById('navbar-container');
    const stickyLeftOffset = document.getElementById('sticky-left-offset');
    
    if (stickyTop && stickyTopOffset) {
        stickyTopOffset.style.height = `${stickyTop.offsetHeight}px`;
    }
    
    if (navbarContainer && stickyLeftOffset) {
        stickyLeftOffset.style.width = `${navbarContainer.offsetWidth}px`;
    }
    
    if (navbarContainer && stickyTop) {
        navbarContainer.style.top = `${stickyTop.offsetHeight}px`;
    }
}

document.getElementById('input-box').addEventListener('input', function(e) {
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value;
    
    // Handle backspace
    if (e.inputType === 'deleteContentBackward') {
        if (currentCharIndex > 0) {
            currentCharIndex--;
        }
    } else if (e.inputType === 'insertText') {
        currentCharIndex = inputText.length;
    }
    
    updateWordProgress(inputText.length, wordsToType[currentWordIndex].length);
    colorTextByCharacter(inputText, wordsToType[currentWordIndex], currentWordIndex);
    highlightNextKey();
    
    if (inputBox.value.endsWith(' ')) {
        const trimmedInput = inputText.trim();
        const currentWord = wordsToType[currentWordIndex];
        
        if (trimmedInput === currentWord) {
            // Handle correct word
            let isPerfectWord = currentWordMistakes === 0;
            
            manualKeystrokes += trimmedInput.length;
            let keyStrokeModCount = applyKPStoManual(trimmedInput.length);
            
            // Add streak bonus
            currentWordStreak++;
            if (currentWordStreak >= 3) {
                const streakBonus = Math.min(1 + (currentWordStreak * 0.05), 2); // Max 2x bonus
                keyStrokeModCount *= streakBonus;
                showStreakCounter(currentWordStreak);
            }
            
            // Add perfect word bonus
            if (isPerfectWord) {
                perfectWordStreak++;
                if (perfectWordStreak >= 2) {
                    const perfectBonus = Math.min(1 + (perfectWordStreak * 0.1), 3); // Max 3x bonus
                    keyStrokeModCount *= perfectBonus;
                    
                    if (perfectWordStreak >= 3) {
                        createPerfectWordEffect(trimmedInput);
                    }
                }
            } else {
                perfectWordStreak = 0;
            }
            
            keyStrokeModCount = applyModifiers(0, keyStrokeModCount);
            totalKeystrokes += keyStrokeModCount;
            keystrokesBank += keyStrokeModCount;
            cashEarnedManually += keyStrokeModCount;
            lastTypedWord = trimmedInput;
            
            markWordCompleted(currentWordIndex);
            currentWordIndex++;
            currentWordMistakes = 0;
            
            // Track each keystroke of the correct word
            for (let i = 0; i < trimmedInput.length; i++) {
                correctKeystrokesTimestamps.push(Date.now());
            }
            
            createFloatingWord(`<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> +${formatShortScale(keyStrokeModCount)}`);
            updateWordsToType();
            playTypeSound();
            inputBox.value = '';
            currentCharIndex = 0;
            
            gtag('event', 'word_input', {
                'wpm': wpm,
                'event_category': 'typing'
            });
        } else {
            // Handle incorrect word
            currentWordStreak = 0;
            perfectWordStreak = 0;
            hideStreakCounter();
            
            if (skipOnMistake) {
                currentWordIndex++;
                updateWordsToType();
                inputBox.value = '';
                currentCharIndex = 0;
                currentWordMistakes = 0;
                playTypoSound();
            }
        }
        highlightNextKey();
    }
});

// Add a tracking function for mistakes
document.getElementById('input-box').addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') return;
    if (e.key.length > 1) return; // Ignore modifier keys
    
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value;
    const currentWord = wordsToType[currentWordIndex];
    
    // Check if the current keystroke is incorrect
    if (inputText.length < currentWord.length && 
        e.key !== currentWord[inputText.length]) {
            currentWordMistakes++;
        }
    });
    
    function updateWordProgress(current, total) {
        const progressBar = document.querySelector('.word-progress-bar');
        if (progressBar) {
            const percentage = Math.min((current / total) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            
            // Change color based on progress
            if (percentage < 33) {
                progressBar.style.backgroundColor = 'var(--mistake-color)';
            } else if (percentage < 66) {
                progressBar.style.backgroundColor = 'var(--wordle-present-bg)';
            } else {
                progressBar.style.backgroundColor = 'var(--correct-color)';
            }
        }
    }
    
    function markWordCompleted(index) {
        const wordsDisplay = document.getElementById('words-to-type');
        if (wordsDisplay.children[index]) {
            wordsDisplay.children[index].classList.add('completed');
        }
    }
    
    function showStreakCounter(streak) {
        const streakContainer = document.getElementById('streak-container');
        if (!streakContainer) {
            const typingPanel = document.getElementById('typing-panel');
            const newStreakContainer = document.createElement('div');
            newStreakContainer.id = 'streak-container';
            typingPanel.appendChild(newStreakContainer);
        }
        
        const container = document.getElementById('streak-container');
        container.textContent = `${streak}x Streak!`;
        container.classList.add('active');
        
        // Add appropriate class based on streak
        container.className = ''; // Reset classes
        container.classList.add('active');
        if (streak >= 10) {
            container.classList.add('epic-streak');
        } else if (streak >= 5) {
            container.classList.add('great-streak');
        } else {
            container.classList.add('good-streak');
        }
        
        // Create streak particles if available
        if (window.typeParticleSystem && streak >= 3) {
            window.typeParticleSystem.createStreakEffect(streak);
        }
    }
    
    function hideStreakCounter() {
        const streakContainer = document.getElementById('streak-container');
        if (streakContainer) {
            streakContainer.classList.remove('active');
        }
    }
    
    function createPerfectWordEffect(word) {
        const gameContainer = document.getElementById('game-container');
        const perfectWord = document.createElement('div');
        perfectWord.textContent = `Perfect: ${word}`;
        perfectWord.className = 'floating-word perfect-word';
        
        const rect = document.getElementById('input-box').getBoundingClientRect();
        perfectWord.style.left = `${rect.left + rect.width / 2}px`;
        perfectWord.style.top = `${rect.top}px`;
        
        const randomDuration = (Math.random() * 1 + 1.5).toFixed(2);
        perfectWord.style.animationDuration = randomDuration + 's';
        
        gameContainer.appendChild(perfectWord);
        
        setTimeout(() => {
            gameContainer.removeChild(perfectWord);
        }, randomDuration * 1000);
        
        // Use the particle system if available
        if (window.typeParticleSystem) {
            window.typeParticleSystem.createPerfectWordEffect(word);
        }
    }
    
    function colorTextByCharacter(inputText, word, currentIndex) {
        const wordsDisplay = document.getElementById('words-to-type');
        let coloredText = '';
        let mistakeFound = false;
        
        // Make current word stand out
        if (wordsDisplay.children[currentIndex]) {
            for (let i = 0; i < wordsDisplay.children.length; i++) {
                wordsDisplay.children[i].classList.remove('current');
            }
            wordsDisplay.children[currentIndex].classList.add('current');
        }
        
        // Process each character
        for (let i = 0; i < word.length; i++) {
            let characterClass = '';
            
            if (i < inputText.length) {
                // User has typed this character
                if (word[i] === inputText[i] && !mistakeFound) {
                    characterClass = 'character correct';
                } else {
                    characterClass = 'character mistake';
                    mistakeFound = true;
                }
            } else {
                // Character not yet typed
                characterClass = i === inputText.length ? 'character current' : 'character';
            }
            
            coloredText += `<span class="${characterClass}">${word[i]}</span>`;
        }
        
        if (wordsDisplay.children[currentIndex]) {
            wordsDisplay.children[currentIndex].innerHTML = coloredText;
        }
    }
    
    function updateWordsToType() {
        const wordsDisplay = document.getElementById('words-to-type');
        
        // Check if we need to add a progress bar
        if (!document.querySelector('.word-progress-container')) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'word-progress-container';
            const progressBar = document.createElement('div');
            progressBar.className = 'word-progress-bar';
            progressContainer.appendChild(progressBar);
            document.querySelector('.words-to-type-container').appendChild(progressContainer);
        }
        
        // Reset word progress
        document.querySelector('.word-progress-bar').style.width = '0%';
        
        if(currentWordIndex > 0) {
            let firstElement = wordsDisplay.children[0];
            const currentElement = wordsDisplay.children[currentWordIndex];
            let toRemove = [];
            
            while (currentElement && currentElement.getBoundingClientRect().top - 10 > firstElement.getBoundingClientRect().top) {
                toRemove.push(wordsDisplay.children[toRemove.length]);
                firstElement = wordsDisplay.children[toRemove.length];
            }
            
            if(toRemove.length > 0) {
                for(let i = 0; i < toRemove.length; i++) {
                    if (toRemove[i]) {
                        wordsDisplay.removeChild(toRemove[i]);
                        wordsToType.shift();
                        wordsToType.push(getRandomWord());
                    }
                }
                currentWordIndex = 0;
            }
        }
        
        // Add new words if needed
        if(wordsDisplay.children.length < wordsToType.length) {
            for(let i = wordsDisplay.children.length; i < wordsToType.length; i++) {
                const wordElement = document.createElement('div');
                wordElement.className = 'word';
                wordElement.textContent = wordsToType[i];
                wordsDisplay.appendChild(wordElement);
            }
        }
        
        // Update highlighting for the current word
        if (wordsToType[currentWordIndex]) {
            colorTextByCharacter('', wordsToType[currentWordIndex], currentWordIndex);
            document.getElementById('input-box').placeholder = `Type '${wordsToType[currentWordIndex]}' here...`;
        }
        
        highlightNextKey();
    }
    
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