function applyModifiers(buildingId, baseProduction) {
    let totalMultiplier = 1;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings.includes(buildingId)) {
            totalMultiplier *= typeof modifier.getMultiplier === "function"
                ? modifier.getMultiplier()
                : modifier.multiplier || 1;
        }
    });
    return baseProduction * totalMultiplier;
}

function applyKPStoManual(keystrokes) {
    let totalMultiplier = 0;
    modifiers.forEach(modifier => {
        if (modifier.affectedBuildings.includes(0)) {
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
    lockdescription: "Unlocks at 10 total keystrokes.",
    special: "Unlocks wordle minigame. Each Auto Writer increases manually typed words production by 5%.",
    unlockCondition: () => { return totalKeystrokes >= 10; },
    locked: true,
    getCost: () => 10 * Math.pow(AutoWriter.level + 1, 2) * Math.log(AutoWriter.level + 2),
    baseProduce: 0.1,
    getProduceSingle: () => {
        return applyModifiers(AutoWriter.id, AutoWriter.baseProduce);
    },
    getProduce: () => {
        return AutoWriter.getProduceSingle() * AutoWriter.level;
    },
    level: 0,
    icon: "images/auto-writer-icon.png",
    lockedicon: "images/auto-writer-locked-icon.png",
};

const Printer = {
    id: 2,
    name: "Printer",
    description: "Produces keystrokes at a higher rate.",
    lockdescription: "Unlocks at 50 total keystrokes.",
    special: "Unlocks 'Reports' button in the navbar. Each Printer increases all buildings income by 0.75%.",
    unlockCondition: () => { return totalKeystrokes >= 50; },
    locked: true,
    getCost: () => 50 * Math.pow(Printer.level + 1, 2) * Math.log(Printer.level + 2),
    baseProduce: 0.5,
    getProduceSingle: () => {
        return applyModifiers(Printer.id, Printer.baseProduce);
    },
    getProduce: () => {
        return Printer.getProduceSingle() * Printer.level;
    },
    level: 0,
    icon: "images/printer-icon.png",
    lockedicon: "images/printer-locked-icon.png",
};

const ResearchLab = {
    id: 3,
    name: "Research Lab",
    description: "Research new typing techniques.",
    lockdescription: "Unlocks at 500 total keystrokes.",
    special: "Unlocks research system. Grants research points.",
    unlockCondition: () => { return totalKeystrokes >= 500; },
    locked: true,
    getCost: () => 200 * Math.pow(ResearchLab.level + 1, 2) * Math.log(ResearchLab.level + 2),
    baseProduce: 1,
    getProduceSingle: () => {
        return applyModifiers(ResearchLab.id, ResearchLab.baseProduce);
    },
    getProduce: () => { return ResearchLab.getProduceSingle() * ResearchLab.level; },
    getResearchProduceSingle: () => { return 0.1; },
    getResearchProduce: () => { return ResearchLab.getResearchProduceSingle() * ResearchLab.level; },
    level: 0,
    icon: "images/research-lab-icon.png",
    lockedicon: "images/research-lab-locked-icon.png",
};

const CyberCafe = {
    id: 4,
    name: "Cyber Cafe",
    description: "Provides a social space for typing enthusiasts.",
    lockdescription: "Unlocks when you own 10 Auto Writers.",
    special: "Produces keystrokes even when offline.",
    unlockCondition: () => { return AutoWriter.level >= 10; },
    locked: true,
    getCost: () => 1000 * Math.pow(CyberCafe.level + 1, 2) * Math.log(CyberCafe.level + 2),
    baseProduce: 5,
    getProduceSingle: () => {
        return applyModifiers(CyberCafe.id, CyberCafe.baseProduce);
    },
    getProduce: () => { return CyberCafe.getProduceSingle() * CyberCafe.level; },
    level: 0,
    icon: "images/cyber-cafe-icon.png",
    lockedicon: "images/cyber-cafe-locked-icon.png",
};

const ServerFarm = {
    id: 5,
    name: "Server Farm",
    description: "A massive server farm dedicated to typing tasks.",
    lockdescription: "Unlocks at 5000 total keystrokes.",
    special: "No special yet.",
    unlockCondition: () => { return totalKeystrokes >= 5000; },
    locked: true,
    getCost: () => 5000 * Math.pow(ServerFarm.level + 1, 2) * Math.log(ServerFarm.level + 2),
    baseProduce: 20,
    getProduceSingle: () => {
        return applyModifiers(ServerFarm.id, ServerFarm.baseProduce);
    },
    getProduce: () => { return ServerFarm.getProduceSingle() * ServerFarm.level; },
    level: 0,
    icon: "images/server-farm-icon.png",
    lockedicon: "images/server-farm-locked-icon.png",
};

const TypingArena = {
    id: 6,
    name: "Typing Arena",
    description: "Compete in typing races and earn buffs based on your performance.",
    lockdescription: "Unlocks at 10,000 total keystrokes.",
    special: "Unlocks 'Arena' button in the navbar.",
    unlockCondition: () => totalKeystrokes >= 10000,
    locked: true,
    getCost: () => 10000 * Math.pow(TypingArena.level + 1, 2) * Math.log(TypingArena.level + 2),
    baseProduce: 40,
    getProduceSingle: () => {
        return applyModifiers(TypingArena.id, TypingArena.baseProduce);
    },
    getProduce: () => TypingArena.getProduceSingle() * TypingArena.level,
    level: 0,
    icon: "images/typing-arena-icon.png",
    lockedicon: "images/typing-arena-locked-icon.png",
};

const buildings = [
    AutoWriter, Printer, ResearchLab, CyberCafe, ServerFarm, TypingArena
];

modifiers.push(
    {
        name: "Auto Writer Boost",
        description: "Each Auto Writer increases manually typed words production by 5%.",
        affectedBuildings: [0], // 0 for manually typed words
        getMultiplier: () => 1 + AutoWriter.level * 0.05, // Dynamic multiplier
    },
    {
        name: "Printer Boost",
        description: "Each Printer increases passive income by 0.75%.",
        affectedBuildings: buildings.flatMap(b => b.id), // IDs of all buildings contributing to passive income
        getMultiplier: () => 1 + Printer.level * 0.0075, // Dynamic multiplier
    },
    {
        name: "Trophy Boost",
        description: "",
        affectedBuildings: [TypingArena.id], // IDs of all buildings contributing to passive income
        getMultiplier: () => 1 + arenaGoldMedals * 0.025, // Dynamic multiplier
    }
);

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
    const wordleGame = document.getElementById('wordle-game'); // Select the Wordle game div

    
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

    if (AutoWriter.level > 0) {
        wordleGame.style.display = 'block';
    } else {
        wordleGame.style.display = 'none';
    }
}

function updateBuildingElement(buildingElement, building) {
    if (building.locked) {
        buildingElement.innerHTML = `<img src="${building.lockedicon}" class="icon">???`;
        buildingElement.disabled = true;
    } else {
        buildingElement.innerHTML = `<span>Purchase ${building.name}</span><img src="${building.icon}" class="icon"><span><img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin"> ${formatShortScale(building.getCost())}</span> <span>${building.level}x owned</span>`;
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

function getPassiveIncome() {
    return AutoWriter.getProduce() + Printer.getProduce() + ResearchLab.getProduce() + CyberCafe.getProduce() + ServerFarm.getProduce() + TypingArena.getProduce();
}

function getResearchPoints() {
    return ResearchLab.getResearchProduce();
}

function generateKeystrokesAndResearchFromBuildings() {
    let totalProduction = getPassiveIncome();
    let totalResearch = getResearchPoints();

    totalProduction = totalProduction / Tickrate;
    totalResearch = totalResearch / Tickrate;

    keystrokesBank += totalProduction;
    totalKeystrokes += totalProduction;
    totalResearchPoints += totalResearch;
    cashEarnedBuildings += totalProduction;

    updateStats();
    wordsToGenerate += totalProduction / 5; // 5 keystrokes per word
}
