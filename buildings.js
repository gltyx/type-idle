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
    getProduceSingle: () => {
        return applyModifiers(AutoWriter.id, AutoWriter.baseProduce);
    },
    getProduce: () => {
        return AutoWriter.getProduceSingle() * AutoWriter.level;
    },
    level: 0,
    totalProduce: 0,
    icon: "/images/auto-writer-icon.png",
    lockedicon: "/images/auto-writer-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(Printer.id, Printer.baseProduce);
    },
    getProduce: () => {
        return Printer.getProduceSingle() * Printer.level;
    },
    level: 0,
    totalProduce: 0,
    icon: "/images/printer-icon.png",
    lockedicon: "/images/printer-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(ResearchLab.id, ResearchLab.baseProduce);
    },
    getProduce: () => { return ResearchLab.getProduceSingle() * ResearchLab.level; },
    getResearchProduceSingle: () => { return applyResearchModifiers(ResearchLab.id, 0.5); },
    getResearchProduce: () => { return ResearchLab.getResearchProduceSingle() * ResearchLab.level; },
    level: 0,
    totalProduce: 0,
    icon: "/images/research-lab-icon.png",
    lockedicon: "/images/research-lab-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(CyberCafe.id, CyberCafe.baseProduce);
    },
    getProduce: () => { return CyberCafe.getProduceSingle() * CyberCafe.level; },
    level: 0,
    totalProduce: 0,
    icon: "/images/cyber-cafe-icon.png",
    lockedicon: "/images/cyber-cafe-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(ServerFarm.id, ServerFarm.baseProduce);
    },
    getProduce: () => { return ServerFarm.getProduceSingle() * ServerFarm.level; },
    level: 0,
    totalProduce: 0,
    icon: "/images/server-farm-icon.png",
    lockedicon: "/images/server-farm-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(TypingArena.id, TypingArena.baseProduce);
    },
    getProduce: () => TypingArena.getProduceSingle() * TypingArena.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/typing-arena-icon.png",
    lockedicon: "/images/typing-arena-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(ITOffice.id, ITOffice.baseProduce);
    },
    getProduce: () => ITOffice.getProduceSingle() * ITOffice.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/it-office-icon.png",
    lockedicon: "/images/it-office-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(StockMarket.id, StockMarket.baseProduce);
    },
    getProduce: () => StockMarket.getProduceSingle() * StockMarket.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/stock-market-icon.png",
    lockedicon: "/images/stock-market-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(MagazinePublisher.id, MagazinePublisher.baseProduce);
    },
    getProduce: () => MagazinePublisher.getProduceSingle() * MagazinePublisher.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/magazine-publisher-icon.png",
    lockedicon: "/images/magazine-publisher-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(TypingGuild.id, TypingGuild.baseProduce);
    },
    getProduce: () => TypingGuild.getProduceSingle() * TypingGuild.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/typing-guild-icon.png",
    lockedicon: "/images/typing-guild-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(HackerGroup.id, HackerGroup.baseProduce);
    },
    getProduce: () => HackerGroup.getProduceSingle() * HackerGroup.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/hacker-group-icon.png",
    lockedicon: "/images/hacker-group-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(GameArcade.id, GameArcade.baseProduce);
    },
    getProduce: () => GameArcade.getProduceSingle() * GameArcade.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/game-arcade-icon.png",
    lockedicon: "/images/game-arcade-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(KeystrokeCasino.id, KeystrokeCasino.baseProduce);
    },
    getProduce: () => KeystrokeCasino.getProduceSingle() * KeystrokeCasino.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/keystroke-casino-icon.png",
    lockedicon: "/images/keystroke-casino-locked-icon.png",
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
    getProduceSingle: () => {
        return applyModifiers(AIAgent.id, AIAgent.baseProduce);
    },
    getProduce: () => AIAgent.getProduceSingle() * AIAgent.level,
    level: 0,
    totalProduce: 0,
    icon: "/images/ai-agent-icon.png",
    lockedicon: "/images/ai-agent-locked-icon.png",
}


const buildings = [
    AutoWriter, Printer, ResearchLab, CyberCafe, ServerFarm, TypingArena, ITOffice, StockMarket, MagazinePublisher, TypingGuild, HackerGroup, GameArcade, KeystrokeCasino
];


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
    const researchContainer = document.getElementById('upgrades-parent');
    
    
    if(ResearchLab.level == 0) {
        researchContainer.style.display = 'none';
    } else {
        researchContainer.style.display = 'block';
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
        const newHtml = `<img src="${building.lockedicon}" class="icon">???`;
        if(buildingElement.innerHTML !== newHtml) buildingElement.innerHTML = newHtml;
        buildingElement.disabled = true;
    } else {
        const newHtml = `<span>Purchase ${building.name}</span><img src="${building.icon}" class="icon"><span><img src="/images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> ${formatShortScale(getBuildingCost(building))}</span> <span>${building.level}x owned</span>`;
        if(buildingElement.innerHTML !== newHtml) buildingElement.innerHTML = newHtml;
        buildingElement.disabled = getBuildingCost(building) > keystrokesBank;
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
