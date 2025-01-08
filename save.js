let totalKeystrokes = 0;
let manualKeystrokes = 0;
let cashEarnedManually = 0;
let cashEarnedBuildings = 0;
let keystrokesBank = 0;
let wordlesSolved = 0;
let skipOnMistake = false;
let volume = 1;
let lastSave = Date.now();
let autosave = true;
let arenaGoldMedals = 0;
let arenaBeatNormal = 0;
let arenaBeatHard = 0;
let arenaBeatVeryHard = 0;
let wpm = 0;

function saveGame() {
    lastSave = Date.now();
    let wordleBoostRemaining = modifiers.find(modifier => modifier.name === "Wordle Boost")?.duration || 0;
    let finishRaceBoostRemaining = modifiers.find(modifier => modifier.name === "Race Finish Buff")?.duration || 0;
    let championArenaBuffRemaining = modifiers.find(modifier => modifier.name === "Champion of the Arena")?.duration || 0;
    const gameData = {
        totalKeystrokes,
        manualKeystrokes,
        keystrokesBank,
        totalResearchPoints,
        cashEarnedManually,
        cashEarnedBuildings,
        wordlesSolved,
        skipOnMistake,
        volume,
        lastSave,
        arenaGoldMedals,
        arenaBeatNormal,
        arenaBeatHard,
        arenaBeatVeryHard,
        finishRaceBoostRemaining,
        championArenaBuffRemaining,
        buildings: buildings.map(building => ({ id: building.id, level: building.level })),
        upgrades: upgrades.map(upgrade => ({ id: upgrade.id, unlocked: upgrade.unlocked })),
        achievements: achievements.map(achievement => ({ id: achievement.id, unlocked: achievement.unlocked })),
        wordle: {
            currentWord: currentWordleWord,
            boostEndTime: wordleBoostRemaining
        }
    };
    localStorage.setItem('typingGameSaveV3', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('typingGameSaveV3'));
    if (savedData) {
        totalKeystrokes = savedData.totalKeystrokes;
        manualKeystrokes = savedData.manualKeystrokes;
        keystrokesBank = savedData.keystrokesBank;
        totalResearchPoints = savedData.totalResearchPoints;
        cashEarnedManually = savedData.cashEarnedManually;
        cashEarnedBuildings = savedData.cashEarnedBuildings;
        wordlesSolved = savedData.wordlesSolved;
        skipOnMistake = savedData.skipOnMistake ?? false;
        volume = savedData.volume ?? 1;
        lastSave = savedData.lastSave ?? Date.now();
        arenaGoldMedals = savedData.arenaGoldMedals || 0;
        arenaBeatNormal = savedData.arenaBeatNormal || 0;
        arenaBeatHard = savedData.arenaBeatHard || 0;
        arenaBeatVeryHard = savedData.arenaBeatVeryHard || 0;
        let finishRaceBoostRemaining = savedData.finishRaceBoostRemaining || 0;
        let championArenaBuffRemaining = savedData.championArenaBuffRemaining || 0;
        savedData.buildings.forEach(savedBuilding => {
            const building = buildings.find(b => b.id === savedBuilding.id);
            if (building) {
                building.level = savedBuilding.level;
            }
        });
        
        savedData.upgrades.forEach(savedUpgrade => {
            const upgrade = upgrades.find(u => u.id === savedUpgrade.id);
            if (upgrade) {
                upgrade.unlocked = savedUpgrade.unlocked;
                if (upgrade.unlocked) {
                    upgrade.effect();
                }
            }
        });
        
        savedData.achievements.forEach(savedAchievement => {
            const achievement = achievements.find(a => a.id === savedAchievement.id);
            if (achievement) {
                achievement.unlocked = savedAchievement.unlocked;
            }
        });
        
        // Load Wordle state
        if (savedData.wordle) {
            currentWordleWord = savedData.wordle.currentWord || "";
            wordleBoostRemaining = savedData.wordle.boostEndTime || 0;
            if(wordleBoostRemaining > 0) {
                modifiers.push({
                    name: "Wordle Boost",
                    description: "Doubles production from Auto Writers and manually typed words.",
                    affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                    multiplier: 2,
                    duration: wordleBoostRemaining
                  });
            }
        }
        
        if(finishRaceBoostRemaining > 0) {
            modifiers.push({
                name: "Race Finish Buff",
                description: "",
                affectedBuildings: [],
                multiplier: 1,
                duration: finishRaceBoostRemaining // 5 minutes
            });
        }

        if(championArenaBuffRemaining > 0) {
            modifiers.push({
                name: "Champion of the Arena",
                description: "",
                affectedBuildings: [0, AutoWriter.id],
                multiplier: 2,
                KPStoManual: 0.01,
                duration: championArenaBuffRemaining
            }); 
        }

        
        const now = Date.now();
        const offlineTime = (now - (savedData.lastSave || now)) / 1000;
        if(CyberCafe.level > 0) {
            const offlineProduction = offlineTime * CyberCafe.getProduce();
            keystrokesBank += offlineProduction;
            totalKeystrokes += offlineProduction;
            cashEarnedBuildings += offlineProduction;
            showNotification(`<p><strong>Offline Earnings:</strong> <img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${offlineProduction.toFixed(2)} from Cyber Cafes!</p>`);
        }
    }
}

function resetGame() {
    autosave = false;
    localStorage.removeItem('typingGameSaveV3');
    location.reload();
}
