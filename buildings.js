/**
* Applies all multiplier modifiers to the base production of a building.
* @param {number} buildingId ID of the building (0 for manually typed words)
* @param {number} baseProduction Base production of the building
* @returns {number} Production after modifiers
*/
function applyModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getMultiplier === "function"
            ? modifier.getMultiplier()
            : modifier.multiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
function applyNonTempModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (!modifier.duration && modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getMultiplier === "function"
            ? modifier.getMultiplier()
            : modifier.multiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
/**
 * Applies all research multiplier modifiers to the base research of a building
 * @param {*} buildingId ID of the building
 * @param {*} baseProduction Base research of the building
 * @returns 
 */
function applyResearchModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getResearchMultiplier === "function"
            ? modifier.getResearchMultiplier()
            : modifier.researchMultiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}
/**
* Applies passive income to manual keystrokes.
* @param {number} keystrokes Manual keystrokes.
* @returns {number} Manual keystrokes + passive income % to manual.
*/
function applyKPStoManual(keystrokes) {
    let totalMultiplier = 0;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings && modifier.affectedBuildings.includes(0)) {
            totalMultiplier += typeof modifier.getKPStoManual === "function"
            ? modifier.getKPStoManual()
            : modifier.KPStoManual || 0;
        }
    });
    return keystrokes + (keystrokes * totalMultiplier * getPassiveIncome());
}

function getBuildingCost(building) {
    const growthFactor = 1.15;
    let cost = building.baseCost * Math.pow(growthFactor, building.level) * (building.level + 1);
    let ITOfficeReduction = Math.max(0.8, Math.pow(0.995, ITOffice.level));
    return Math.ceil(cost * ITOfficeReduction);
}

function getSpecialBoost(building) {
    if(building.id === AutoWriter.id) {
        return `${(AutoWriter.level * 5).toFixed(2)}% boost to manual keystrokes`;
    } else if (building.id === Printer.id) {
        return `${(Printer.level * 0.75).toFixed(2)}% boost to all buildings`;
    } else if (building.id === ServerFarm.id) {
        return `${(ServerFarm.level * 0.1).toFixed(2)}% of passive income to manual keystrokes`;
    } else if (building.id === ITOffice.id) {
        return `${(100 - (Math.max(0.8, Math.pow(0.995, ITOffice.level)) * 100)).toFixed(2)}% discount on all buildings`;
    }
    return '';
}

const AutoWriter = {
    id: 1,
    name: "Auto Writer",
    description: "Automatically types keystrokes for you.",
    trivia: "Gives you a break from typing.",
    lockdescription: "Unlocks at 100 total keystrokes.",
    special: "Unlocks wordle minigame. Each Auto Writer increases manually typed words production by 5%.",
    unlockCondition: () => { return totalKeystrokes >= 100; },
    locked: true,
    baseCost: 100,
    baseProduce: 1,
    level: 0,
    totalProduce: 0,
};

const Printer = {
    id: 2,
    name: "Printer",
    description: "Produces keystrokes at a higher rate.",
    trivia: "You can print keystrokes?",
    lockdescription: "Unlocks at 500 total keystrokes.",
    special: "Unlocks 'Reports' button in the navbar. Each Printer increases all buildings income by 0.75%.",
    unlockCondition: () => { return totalKeystrokes >= 500; },
    locked: true,
    baseCost: 500,
    baseProduce: 5,
    level: 0,
    totalProduce: 0,
};

const ResearchLab = {
    id: 3,
    name: "Research Lab",
    description: "Research new typing techniques.",
    trivia: "Lab coat not included.",
    lockdescription: "Unlocks at 2,000 total keystrokes.",
    special: "Unlocks research system. Grants research points.",
    unlockCondition: () => { return totalKeystrokes >= 2_000; },
    locked: true,
    baseCost: 2000,
    baseProduce: 20,
    getResearchProduceSingle: () => { return applyResearchModifiers(ResearchLab.id, 0.5); },
    getResearchProduce: () => { return ResearchLab.getResearchProduceSingle() * ResearchLab.level; },
    level: 0,
    totalProduce: 0,
};

const CyberCafe = {
    id: 4,
    name: "Cyber Cafe",
    description: "Provides a social space for typing enthusiasts.",
    trivia: "Free Wi-Fi included.",
    lockdescription: "Unlocks at 10,000 total keystrokes.",
    special: "Produces keystrokes even when offline.",
    unlockCondition: () => { return totalKeystrokes >= 10_000; },
    locked: true,
    baseCost: 10000,
    baseProduce: 50,
    level: 0,
    totalProduce: 0,
};

const ServerFarm = {
    id: 5,
    name: "Server Farm",
    description: "A massive server farm dedicated to typing tasks.",
    trivia: "It's not a real farm.",
    lockdescription: "Unlocks at 50,000 total keystrokes.",
    special: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
    unlockCondition: () => { return totalKeystrokes >= 50_000; },
    locked: true,
    baseCost: 50000,
    baseProduce: 200,
    level: 0,
    totalProduce: 0,
};

const TypingArena = {
    id: 6,
    name: "Typing Arena",
    description: "Compete in typing races and earn buffs based on your performance.",
    trivia: "No, you can't use autocorrect.",
    lockdescription: "Unlocks at 100,000 total keystrokes.",
    special: "Unlocks 'Arena' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000,
    locked: true,
    baseCost: 100000,
    baseProduce: 500,
    level: 0,
    totalProduce: 0,
};

const ITOffice = {
    id: 7,
    name: "IT Office",
    description: "Provides tech support for your typing business.",
    trivia: "Have you tried turning it off and on again?",
    lockdescription: "Unlocks at 200,000 total keystrokes.",
    special: "Decreases the cost of all buildings by 0.5%. (Capped at 20%)",
    unlockCondition: () => totalKeystrokes >= 200_000,
    locked: true,
    baseCost: 200000,
    baseProduce: 1000,
    level: 0,
    totalProduce: 0,
};

const StockMarket = {
    id: 8,
    name: "Stock Market",
    description: "Invest keystrokes in the stock market.",
    trivia: "Buy low, sell high.",
    lockdescription: "Unlocks at 500,000 total keystrokes.",
    special: "Unlocks 'Stock Market' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 500_000,
    locked: true,
    baseCost: 500000,
    baseProduce: 2000,
    level: 0,
    totalProduce: 0,
};
const MagazinePublisher = {
    id: 9,
    name: "Magazine Publisher",
    description: "Publishes typing magazines.",
    trivia: "The only magazine about typing.",
    lockdescription: "Unlocks at 1,000,000 total keystrokes.",
    special: "Publishes news every 20 seconds. Some news are golden. Clicking on golden news gives a temporary boost.",
    unlockCondition: () => totalKeystrokes >= 1_000_000,
    locked: true,
    baseCost: 1000000,
    baseProduce: 5000,
    level: 0,
    totalProduce: 0,
}
const TypingGuild = {
    id: 10,
    name: "Typing Guild",
    description: "Setup a guild of typing enthusiasts.",
    trivia: "Guild meetings are held in the Typing Arena.",
    lockdescription: "Unlocks at 2,000,000 total keystrokes.",
    special: "Unlocks 'Guild' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 2_000_000,
    locked: true,
    baseCost: 2000000,
    baseProduce: 10_000,
    level: 0,
    totalProduce: 0,
}
const HackerGroup = {
    id: 11,
    name: "Hacker Group",
    description: "Recruit hackers to help your keystroke business.",
    trivia: "Ethical hacking only.",
    lockdescription: "Unlocks at 100,000,000 total keystrokes.",
    special: "Unlocks 'Hacker' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000_000,
    locked: true,
    baseCost: 100_000_000,
    baseProduce: 500_000,
    level: 0,
    totalProduce: 0,
}

const GameArcade = {
    id: 12,
    name: "Game Arcade",
    description: "Setup a game arcade with typing games.",
    trivia: "No, you can't play Fortnite here.",
    lockdescription: "Unlocks at 1,000,000,000 total keystrokes.",
    special: "Unlocks 'Arcade' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 1_000_000_000,
    locked: true,
    baseCost: 1_000_000_000,
    baseProduce: 4_000_000,
    level: 0,
    totalProduce: 0,
}

const KeystrokeCasino = {
    id: 13,
    name: "Keystroke Casino",
    description: "Setup a casino for typing enthusiasts.",
    trivia: "The house always wins.",
    lockdescription: "Unlocks at 100,000,000,000 total keystrokes.",
    special: "Unlocks 'Casino' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100_000_000_000,
    locked: true,
    baseCost: 100_000_000_000,
    baseProduce: 400_000_000,
    level: 0,
    totalProduce: 0,
}
const AIAgent = {
    id: 14,
    name: "AI Agent",
    description: "Deploy AI to generate keystrokes.",
    trivia: "AI-generated keystrokes.",
    lockdescription: "Unlocks at 1,000,000,000,000 total keystrokes.",
    special: "Unlocks 'Memory' button in the navbar. Zero human interaction required at the stock market.",
    unlockCondition: () => totalKeystrokes >= 1_000_000_000_000,
    locked: true,
    baseCost: 1_000_000_000_000,
    baseProduce: 5_000_000_000,
    level: 0,
    totalProduce: 0,
}


const buildings = [
    AutoWriter, Printer, ResearchLab, CyberCafe, ServerFarm, TypingArena, ITOffice, StockMarket, MagazinePublisher, TypingGuild, HackerGroup, GameArcade, KeystrokeCasino, AIAgent
];

buildings.forEach(building => {
    building.getCost = () => getBuildingCost(building);
    building.getProduceSingle = () => applyModifiers(building.id, building.baseProduce);
    building.getProduce = () => building.getProduceSingle() * building.level;
});

let totalResearchPoints = 0;

function initBuildings() {
    const buildingsContainer = document.getElementById('buildings-container');
    buildingsContainer.innerHTML = '';
    
    buildings.forEach((building, index) => {
        const buildingElement = document.createElement('button');
        buildingElement.className = 'building';
        buildingElement.setAttribute('data-index', index);
        updateBuildingElement(buildingElement, building);
        
        buildingElement.addEventListener('mouseover', () => showBuildingTooltip(buildingElement, building));
        buildingElement.addEventListener('mouseout', () => hideTooltip());
        
        // Add event listeners for 3D effect
        buildingElement.addEventListener('mousemove', handleMouseMoveBuildingRotate);
        buildingElement.addEventListener('mouseleave', handleMouseLeaveBuildingRotate);
        
        buildingsContainer.appendChild(buildingElement);
    });
    
    buildingsContainer.querySelectorAll('.building').forEach(buildingElement => {
        buildingElement.addEventListener('click', (event) => {
            const index = event.currentTarget.getAttribute('data-index');
            buyBuilding(index);
            hideTooltip();
            showBuildingTooltip(event.currentTarget, buildings[index]);
        });
    });
}

function handleMouseMoveBuildingRotate(event) {
    const building = event.currentTarget;
    const rect = building.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -25; // Adjust the multiplier for more/less tilt
    const rotateY = ((x - centerX) / centerX) * 25; // Adjust the multiplier for more/less tilt

    building.style.setProperty('--rotateX', `${rotateX}deg`);
    building.style.setProperty('--rotateY', `${rotateY}deg`);
}

function handleMouseLeaveBuildingRotate(event) {
    const building = event.currentTarget;
    building.style.setProperty('--rotateX', `0deg`);
    building.style.setProperty('--rotateY', `0deg`);
}

function displayBuildings() {
    const buildingsContainer = document.getElementById('buildings-container');
    
    
    if(ResearchLab.level > 0) {
        document.getElementById('research-tab').disabled = false;
    }
    buildingsContainer.querySelectorAll('.building').forEach((buildingElement, index) => {
        const building = buildings[index];
        if (building.locked) {
            if (building.unlockCondition()) {
                building.locked = false;
            }
        }
        updateBuildingElement(buildingElement, building);
    });
}

function updateBuildingElement(buildingElement, building) {
    if (building.locked) {
        const newHtml = `
            <div class="building-header">
                <div class="building-name">Unknown Building</div>
            </div>
            <div class="building-locked">
                <img src="/images/buildings/128/${building.id}-locked.png" class="icon">
                <p>${building.lockdescription}</p>
            </div>`;
        if(buildingElement.innerHTML !== newHtml) buildingElement.innerHTML = newHtml;
        buildingElement.disabled = true;
    } else {
        const cost = getBuildingCost(building);
        const isAffordable = cost <= keystrokesBank;
        const production = formatShortScale(building.getProduceSingle());
        const totalProduction = formatShortScale(building.getProduce());
        
        // Calculate payback time (how long until the building pays for itself)
        const paybackTime = production > 0 ? cost / production : Infinity;
        const paybackTimeFormatted = paybackTime !== Infinity ? 
            formatTime(paybackTime) : 'Never';
        
        // Calculate return on investment (ROI)
        const roi = production > 0 ? (production / cost) * 100 : 0;
        // Calculate cost efficiency (cost per unit of production)
        const costEfficiency = building.getProduceSingle() > 0 ? 
            formatShortScale(cost / building.getProduceSingle()) : 
            'N/A';
        
        // Get building's special ability
        const specialEffect = getSpecialBoost(building);
        
        const newHtml = `
        <div class="building-bg1" style="background-image: url('/images/tooltips/buildings/448/${building.id}.jpg');">
        <div class="building-bg2">
            <div class="building-header">
                <img src="/images/buildings/128/${building.id}.png" class="icon" style="width: 32px; height: 32px;">
                <div class="building-name">${building.name}</div>
                <div class="building-level">${building.level}x</div>
            </div>
            <div class="building-content">
                <div class="building-info">
                    <div class="building-production">
                        ${building.level > 0 ? `Produces: ${production}/sec each` : 'Purchase to start production'}
                    </div>
                    ${building.level > 0 ? `<div class="building-production">Total: ${totalProduction}/sec</div>` : ''}
                    ${building.level > 0 ? `<div class="building-efficiency">Cost efficiency: ${costEfficiency}/keystroke</div>` : ''}
                </div>
            </div>
            <div class="building-cost">
                <img src="/images/icons/128/keystroke-coin-icon.png" alt="Keystroke Coin">
                <span>${formatShortScale(cost)}</span>
            </div>
            <div class="building-footer">
                <div class="building-special">${specialEffect}</div>
            </div>
        </div>
        </div>`;
            
        if(buildingElement.innerHTML !== newHtml) buildingElement.innerHTML = newHtml;
        buildingElement.disabled = !isAffordable;
    }
}

// Add this helper function to format time values
function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)} seconds`;
    } else if (seconds < 3600) {
        return `${(seconds / 60).toFixed(1)} minutes`;
    } else if (seconds < 86400) {
        return `${(seconds / 3600).toFixed(1)} hours`;
    } else {
        return `${(seconds / 86400).toFixed(1)} days`;
    }
}


function buyBuilding(index) {
    const building = buildings[index];
    if (keystrokesBank >= getBuildingCost(building)) {
        keystrokesBank -= getBuildingCost(building);
        building.level += 1;
        updateStats();
        displayBuildings();
        playBuySound();
        gtag('event', 'building_purchase', {
            'event_category': 'engagement',
            'building': building.name,
            'level': building.level
          });
    }
}

/**
* 
* @returns {number} Total passive income from all buildings for 1 tick.
*/
function getPassiveIncome() {
    let passiveIncome = 0;
    buildings.forEach(building => {
        if (building.level > 0) {
            passiveIncome += building.getProduce();
        }
    });
    return passiveIncome;
}
function getPassiveIncomeWithoutTempBoosts() {
    let passiveIncome = 0;
    buildings.forEach(building => {
        if (building.level > 0) {
            passiveIncome += applyNonTempModifiers(building.id, building.baseProduce) * building.level;
        }
    });
    return passiveIncome;
}

function getResearchPoints() {
    return ResearchLab.getResearchProduce();
}

function generateKeystrokesAndResearchFromBuildings() {
    let totalProduction = 0;
    let totalResearch = 0;
    buildings.forEach(building => {
        const produce = building.getProduce() / Tickrate;
        building.totalProduce += produce;
        totalProduction += produce;
        if (typeof building.getResearchProduce === 'function') {
            totalResearch += building.getResearchProduce() / Tickrate;
        }
    });
    
    keystrokesBank += totalProduction;
    totalKeystrokes += totalProduction;
    totalResearchPoints += totalResearch;
    cashEarnedBuildings += totalProduction;
    
    updateStats();
    wordsToGenerate += totalProduction / 5; // 5 keystrokes per word
    if(wordsToGenerate >= 2) {
        wordsToGenerate = 2;
    }
}
