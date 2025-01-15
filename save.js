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
let stockProfitDollars = 0; // Profit in dollars
let stockProfitKeystrokes = 0; // Profit in keystrokes
let goldNewsClicks = 0;
let wpm = 0;

function saveGame() {
    lastSave = Date.now();
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
        stockProfitDollars,
        stockProfitKeystrokes,
        goldNewsClicks,
        buildings: buildings.map(building => ({ id: building.id, level: building.level, totalProduce: building.totalProduce })),
        upgrades: upgrades.map(upgrade => ({ id: upgrade.id, unlocked: upgrade.unlocked })),
        achievements: achievements.map(achievement => ({ id: achievement.id, unlocked: achievement.unlocked })),
        stocks: stocks.map(stock => ({
            id: stock.id,
            price: stock.price,
            owned: stock.owned,
            history: stock.history
        })),
        buffs: modifiers.filter(mod => mod.duration).map(mod => ({
            boostID: mod.boostID,
            duration: mod.duration
        })),
        wordle: {
            currentWord: currentWordleWord
        }
    };
    localStorage.setItem('typingGameSaveV3', JSON.stringify(gameData));
    return gameData;
}

function loadLocalSave() {
    loadGame(JSON.parse(localStorage.getItem('typingGameSaveV3')));
}

function loadGame(savedData) {
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
        stockProfitDollars = savedData.stockProfitDollars || 0;
        stockProfitKeystrokes = savedData.stockProfitKeystrokes || 0;
        goldNewsClicks = savedData.goldNewsClicks || 0;
        savedData.buildings.forEach(savedBuilding => {
            const building = buildings.find(b => b.id === savedBuilding.id);
            if (building) {
                building.level = savedBuilding.level;
                building.totalProduce = savedBuilding.totalProduce || 0;
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
        
        // Load stocks
        if (savedData.stocks) {
            savedData.stocks.forEach(savedStock => {
            const stock = stocks.find(s => s.id === savedStock.id);
            if (stock) {
                stock.price = savedStock.price;
                stock.owned = savedStock.owned;
                stock.history = savedStock.history || [];
            }
            });
        }
        // Load Wordle state
        if (savedData.wordle) {
            currentWordleWord = savedData.wordle.currentWord || "";
            wordleUIState = "load";
        }
        
        if (savedData.buffs) {
            savedData.buffs.forEach(savedBuff => {
                spawnBoost(savedBuff.boostID, savedBuff.duration);
            });
        }
        
        const now = Date.now();
        const offlineTime = (now - (savedData.lastSave || now)) / 1000;
        if(CyberCafe.level > 0) {
            const offlineProduction = offlineTime * CyberCafe.getProduce();
            keystrokesBank += offlineProduction;
            totalKeystrokes += offlineProduction;
            cashEarnedBuildings += offlineProduction;
            showNotification(
                `<h1>Welcome back!</h1>
                <h2>Offline Earnings</h2>`,
                `<p><strong>Offline Earnings:</strong> <img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(offlineProduction)} from Cyber Cafes!</p>`,
                `url('images/tooltips/buildings/${CyberCafe.id}.jpg')`
            );
        }
    } else {
        console.log('No save data found.');
    }
}

function resetGame() {
    autosave = false;
    localStorage.removeItem('typingGameSaveV3');
    location.reload();
}

document.getElementById('export-button').addEventListener('click', () => {
    const saveData = JSON.stringify(saveGame());
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typeidle_save.json';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('import-button').addEventListener('click', () => {
    document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            autosave = false;
            const saveData = JSON.parse(e.target.result);
            localStorage.setItem('typingGameSaveV3', JSON.stringify(saveData));
            location.reload();
        };
        reader.readAsText(file);
    }
});