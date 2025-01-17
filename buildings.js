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

const AutoWriter = {
    id: 1,
    name: "Auto Writer",
    description: "Automatically types keystrokes for you.",
    trivia: "Gives you a break from typing.",
    lockdescription: "Unlocks at 10 total keystrokes.",
    special: "Unlocks wordle minigame. Each Auto Writer increases manually typed words production by 5%.",
    unlockCondition: () => { return totalKeystrokes >= 10; },
    locked: true,
    getCost: () => 10 * Math.pow(AutoWriter.level + 1, 2) * Math.log(AutoWriter.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 0.1,
    getProduceSingle: () => {
        return applyModifiers(AutoWriter.id, AutoWriter.baseProduce);
    },
    getProduce: () => {
        return AutoWriter.getProduceSingle() * AutoWriter.level;
    },
    level: 0,
    totalProduce: 0,
    icon: "images/auto-writer-icon.png",
    lockedicon: "images/auto-writer-locked-icon.png",
};

const Printer = {
    id: 2,
    name: "Printer",
    description: "Produces keystrokes at a higher rate.",
    trivia: "You can print keystrokes?",
    lockdescription: "Unlocks at 50 total keystrokes.",
    special: "Unlocks 'Reports' button in the navbar. Each Printer increases all buildings income by 0.75%.",
    unlockCondition: () => { return totalKeystrokes >= 50; },
    locked: true,
    getCost: () => 50 * Math.pow(Printer.level + 1, 2) * Math.log(Printer.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 0.5,
    getProduceSingle: () => {
        return applyModifiers(Printer.id, Printer.baseProduce);
    },
    getProduce: () => {
        return Printer.getProduceSingle() * Printer.level;
    },
    level: 0,
    totalProduce: 0,
    icon: "images/printer-icon.png",
    lockedicon: "images/printer-locked-icon.png",
};

const ResearchLab = {
    id: 3,
    name: "Research Lab",
    description: "Research new typing techniques.",
    trivia: "Lab coat not included.",
    lockdescription: "Unlocks at 500 total keystrokes.",
    special: "Unlocks research system. Grants research points.",
    unlockCondition: () => { return totalKeystrokes >= 500; },
    locked: true,
    getCost: () => 200 * Math.pow(ResearchLab.level + 1, 2) * Math.log(ResearchLab.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 1,
    getProduceSingle: () => {
        return applyModifiers(ResearchLab.id, ResearchLab.baseProduce);
    },
    getProduce: () => { return ResearchLab.getProduceSingle() * ResearchLab.level; },
    getResearchProduceSingle: () => { return applyResearchModifiers(ResearchLab.id, 0.1); },
    getResearchProduce: () => { return ResearchLab.getResearchProduceSingle() * ResearchLab.level; },
    level: 0,
    totalProduce: 0,
    icon: "images/research-lab-icon.png",
    lockedicon: "images/research-lab-locked-icon.png",
};

const CyberCafe = {
    id: 4,
    name: "Cyber Cafe",
    description: "Provides a social space for typing enthusiasts.",
    trivia: "Free Wi-Fi included.",
    lockdescription: "Unlocks when you own 10 Auto Writers.",
    special: "Produces keystrokes even when offline.",
    unlockCondition: () => { return AutoWriter.level >= 10; },
    locked: true,
    getCost: () => 1000 * Math.pow(CyberCafe.level + 1, 2) * Math.log(CyberCafe.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 5,
    getProduceSingle: () => {
        return applyModifiers(CyberCafe.id, CyberCafe.baseProduce);
    },
    getProduce: () => { return CyberCafe.getProduceSingle() * CyberCafe.level; },
    level: 0,
    totalProduce: 0,
    icon: "images/cyber-cafe-icon.png",
    lockedicon: "images/cyber-cafe-locked-icon.png",
};

const ServerFarm = {
    id: 5,
    name: "Server Farm",
    description: "A massive server farm dedicated to typing tasks.",
    trivia: "It's not a real farm.",
    lockdescription: "Unlocks at 5000 total keystrokes.",
    special: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
    unlockCondition: () => { return totalKeystrokes >= 5000; },
    locked: true,
    getCost: () => 5000 * Math.pow(ServerFarm.level + 1, 2) * Math.log(ServerFarm.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 20,
    getProduceSingle: () => {
        return applyModifiers(ServerFarm.id, ServerFarm.baseProduce);
    },
    getProduce: () => { return ServerFarm.getProduceSingle() * ServerFarm.level; },
    level: 0,
    totalProduce: 0,
    icon: "images/server-farm-icon.png",
    lockedicon: "images/server-farm-locked-icon.png",
};

const TypingArena = {
    id: 6,
    name: "Typing Arena",
    description: "Compete in typing races and earn buffs based on your performance.",
    trivia: "No, you can't use autocorrect.",
    lockdescription: "Unlocks at 10,000 total keystrokes.",
    special: "Unlocks 'Arena' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 10000,
    locked: true,
    getCost: () => 10000 * Math.pow(TypingArena.level + 1, 2) * Math.log(TypingArena.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 40,
    getProduceSingle: () => {
        return applyModifiers(TypingArena.id, TypingArena.baseProduce);
    },
    getProduce: () => TypingArena.getProduceSingle() * TypingArena.level,
    level: 0,
    totalProduce: 0,
    icon: "images/typing-arena-icon.png",
    lockedicon: "images/typing-arena-locked-icon.png",
};

const ITOffice = {
    id: 7,
    name: "IT Office",
    description: "Provides tech support for your typing business.",
    trivia: "Have you tried turning it off and on again?",
    lockdescription: "Unlocks at 50,000 total keystrokes.",
    special: "Each IT Office decreases the cost of all buildings by 1%.",
    unlockCondition: () => totalKeystrokes >= 50000,
    locked: true,
    getCost: () => 50000 * Math.pow(ITOffice.level + 1, 2) * Math.log(ITOffice.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 100,
    getProduceSingle: () => {
        return applyModifiers(ITOffice.id, ITOffice.baseProduce);
    },
    getProduce: () => ITOffice.getProduceSingle() * ITOffice.level,
    level: 0,
    totalProduce: 0,
    icon: "images/it-office-icon.png",
    lockedicon: "images/it-office-locked-icon.png",
};

const StockMarket = {
    id: 8,
    name: "Stock Market",
    description: "Invest keystrokes in the stock market.",
    trivia: "Buy low, sell high.",
    lockdescription: "Unlocks at 100,000 total keystrokes.",
    special: "Unlocks 'Stock Market' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 100000,
    locked: true,
    getCost: () => 100000 * Math.pow(StockMarket.level + 1, 2) * Math.log(StockMarket.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 200,
    getProduceSingle: () => {
        return applyModifiers(StockMarket.id, StockMarket.baseProduce);
    },
    getProduce: () => StockMarket.getProduceSingle() * StockMarket.level,
    level: 0,
    totalProduce: 0,
    icon: "images/stock-market-icon.png",
    lockedicon: "images/stock-market-locked-icon.png",
};
const MagazinePublisher = {
    id: 9,
    name: "Magazine Publisher",
    description: "Publishes typing magazines.",
    trivia: "The only magazine about typing.",
    lockdescription: "Unlocks at 500,000 total keystrokes.",
    special: "Publishes news every 20 seconds. Some news are golden. Clicking on golden news gives a temporary boost.",
    unlockCondition: () => totalKeystrokes >= 500000,
    locked: true,
    getCost: () => 500000 * Math.pow(MagazinePublisher.level + 1, 2) * Math.log(MagazinePublisher.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 500,
    getProduceSingle: () => {
        return applyModifiers(MagazinePublisher.id, MagazinePublisher.baseProduce);
    },
    getProduce: () => MagazinePublisher.getProduceSingle() * MagazinePublisher.level,
    level: 0,
    totalProduce: 0,
    icon: "images/magazine-publisher-icon.png",
    lockedicon: "images/magazine-publisher-locked-icon.png",
}
const TypingGuild = {
    id: 10,
    name: "Typing Guild",
    description: "Join a guild of typing enthusiasts.",
    trivia: "Guild meetings are held in the Typing Arena.",
    lockdescription: "Unlocks at 1,000,000 total keystrokes.",
    special: "Unlocks 'Guild' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 1000000,
    locked: true,
    getCost: () => 1000000 * Math.pow(TypingGuild.level + 1, 2) * Math.log(TypingGuild.level + 2) * (ITOffice.level > 0 ? Math.pow(0.99, ITOffice.level) : 1),
    baseProduce: 1000,
    getProduceSingle: () => {
        return applyModifiers(TypingGuild.id, TypingGuild.baseProduce);
    },
    getProduce: () => TypingGuild.getProduceSingle() * TypingGuild.level,
    level: 0,
    totalProduce: 0,
    icon: "images/typing-guild-icon.png",
    lockedicon: "images/typing-guild-locked-icon.png",
}



const buildings = [
    AutoWriter, Printer, ResearchLab, CyberCafe, ServerFarm, TypingArena, ITOffice, StockMarket, MagazinePublisher, TypingGuild
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
        
        // Add tooltip element
        /*
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        buildingsContainer.appendChild(tooltip);
        */
        buildingElement.addEventListener('mouseover', () => showBuildingTooltip(buildingElement, building));
        buildingElement.addEventListener('mouseout', () => hideTooltip());
        
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
        const newHtml = `<span>Purchase ${building.name}</span><img src="${building.icon}" class="icon"><span><img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> ${formatShortScale(building.getCost())}</span> <span>${building.level}x owned</span>`;
        if(buildingElement.innerHTML !== newHtml) buildingElement.innerHTML = newHtml;
        buildingElement.disabled = building.getCost() > keystrokesBank;
    }
}

function buyBuilding(index) {
    const building = buildings[index];
    if (keystrokesBank >= building.getCost()) {
        keystrokesBank -= building.getCost();
        building.level += 1;
        updateStats();
        displayBuildings();
        playBuySound();
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
