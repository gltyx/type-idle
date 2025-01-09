// initially empty list
let modifiers = [
    /*
    // Example modifier:
    {
        name: "Mechanical Keyboards",
        description: "Doubles production from Auto Writers.",
        affectedBuildings: [1],
        multiplier: 2
    }
    */
];

let autowriterBoostApplied = false;
let printerBoostApplied = false;
let serverBoostApplied = false;
let trophyBoostApplied = false;

function checkModifiers() {
    // check modifiers with duration and remove expired ones
    for (let i = modifiers.length - 1; i >= 0; i--) {
        const modifier = modifiers[i];
        if (modifier.hasOwnProperty("duration")) {
            modifier.duration -= 1; // Reduce duration by 1 tick
            if (modifier.duration <= 0) {
                modifiers.splice(i, 1); // Remove the modifier if duration is 0
                //showNotification(`<p><strong>Modifier Expired:</strong> ${modifier.name}</p>`);
            }
        }
    }
    // check modifiers that unlock with buildings
    if(AutoWriter.level > 0 && !autowriterBoostApplied) {
        autowriterBoostApplied = true;
        modifiers.push(
            {
                name: "Auto Writer Boost",
                description: "Each Auto Writer increases manually typed words production by 5%.",
                affectedBuildings: [0], // 0 for manually typed words
                getMultiplier: () => 1 + AutoWriter.level * 0.05, // Dynamic multiplier
            });
    }
    if(Printer.level > 0 && !printerBoostApplied) {
        printerBoostApplied = true;
        modifiers.push(
            {
                name: "Printer Boost",
                description: "Each Printer increases passive income by 0.75%.",
                affectedBuildings: buildings.flatMap(b => b.id), // IDs of all buildings contributing to passive income
                getMultiplier: () => 1 + Printer.level * 0.0075, // Dynamic multiplier
            });
    }
    if(ServerFarm.level > 0 && !serverBoostApplied) {
        serverBoostApplied = true;
        modifiers.push(
            {
                name: "Server Boost",
                description: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
                affectedBuildings: [0], // 0 for manually typed words
                getKPStoManual: () => ServerFarm.level * 0.001, // Dynamic multiplier
            });
    }
    if(TypingArena.level > 0 && !trophyBoostApplied) {
        trophyBoostApplied = true;
        modifiers.push(
            {
                name: "Trophy Boost",
                description: "",
                affectedBuildings: [TypingArena.id], // IDs of all buildings contributing to passive income
                getMultiplier: () => 1 + arenaGoldMedals * 0.025, // Dynamic multiplier
            });
    }
}

const upgrades = [
    {
        id: 1,
        name: "Mechanical Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        cost: 100,
        unlocked: false,
        visible: false,
        visibleCondition: () => AutoWriter.level > 0,
        effect: () => {
            modifiers.push({
                name: "Mechanical Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 2,
        name: "Color Printer",
        description: "Doubles production from Printers.",
        cost: 200,
        unlocked: false,
        visible: false,
        visibleCondition: () => Printer.level > 0,
        effect: () => {
            modifiers.push({
                name: "Color Printer",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    },
    {
        id: 3,
        name: "RGB Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        cost: 100,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(1), // Visible after Mechanical Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "RGB Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 4,
        name: "Laser Printer",
        description: "Doubles production from Printers.",
        cost: 500,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(2), // Visible after Color Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "Laser Printer",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    },
    {
        id: 5,
        name: "Quantum Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        cost: 1000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(3), // Visible after RGB Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
    {
        id: 6,
        name: "3D Printer",
        description: "Triples production from Printers.",
        cost: 2000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(4), // Visible after Laser Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "3D Printer",
                description: "Triples production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 3
            });
        },
    },
    {
        id: 7,
        name: "Quantum Printers",
        description: "Doubles production from Printers.",
        cost: 2500,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(6), // Visible after 3D Printer is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Printers",
                description: "Doubles production from Printers.",
                affectedBuildings: [Printer.id],
                multiplier: 2
            });
        },
    }
];
function isUpgradeUnlocked(upgradeId) {
    const upgrade = upgrades.find(upg => upg.id === upgradeId);
    return upgrade ? upgrade.unlocked : false;
}

function initUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container');
    const ownedUpgradesContainer = document.getElementById('ownedupgrades-container');
    upgradesContainer.innerHTML = '';
    ownedUpgradesContainer.innerHTML = '';

    // Sort upgrades by cost in ascending order
    const sortedUpgrades = [...upgrades].sort((a, b) => a.cost - b.cost);

    sortedUpgrades.forEach((upgrade, index) => {
        const upgradeElement = document.createElement('button');
        upgradeElement.style.backgroundImage = `url("images/tooltips/upgrades/${upgrade.id}.jpg")`;
        const ownedUpgradeElement = document.createElement('div');
        ownedUpgradeElement.className = 'owned-upgrade';
        ownedUpgradeElement.style.backgroundImage = `url("images/tooltips/upgrades/${upgrade.id}.jpg")`;
        ownedUpgradeElement.innerHTML = `<div><strong>${upgrade.name}</strong></div>`;
        ownedUpgradeElement.style.display = 'none'; // Initially hide owned upgrade element
        ownedUpgradesContainer.appendChild(ownedUpgradeElement);

        upgradeElement.className = 'upgrade';
        upgradeElement.setAttribute('data-index', upgrade.id - 1);
        ownedUpgradeElement.setAttribute('data-index', upgrade.id - 1);
        upgradeElement.innerHTML = `<div><span>${upgrade.name}</span></div>`;
        //upgradeElement.innerHTML = `<div><span>${upgrade.name}</span><span><img src="images/research-bulb-icon.png" class="researchicon" alt="Research">${upgrade.cost}</span></div>`;
        upgradeElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;

        upgradeElement.addEventListener('click', () => {
            if (totalResearchPoints >= upgrade.cost && !upgrade.unlocked) {
                totalResearchPoints -= upgrade.cost;
                upgrade.unlocked = true;
                upgrade.effect();
                updateStats();
                displayUpgrades();
                playBuySound();
            }
        });

        // Add tooltip element
        upgradeElement.addEventListener('mouseover', () => showUpgradeToolTip(upgradeElement, upgrade));
        upgradeElement.addEventListener('mouseout', () => hideTooltip());

        ownedUpgradeElement.addEventListener('mouseover', () => showOwnedUpgradeToolTip(ownedUpgradeElement, upgrade));
        ownedUpgradeElement.addEventListener('mouseout', () => hideTooltip());

        upgradesContainer.appendChild(upgradeElement);
    });
}



function displayUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container');
    const ownedUpgradesContainer = document.getElementById('ownedupgrades-container');
    
    upgradesContainer.querySelectorAll('.upgrade').forEach((upgradeElement, index) => {
        const upgradeIndex = upgradeElement.getAttribute("data-index");
        const upgrade = upgrades[upgradeIndex];
        const ownedUpgradeElement = ownedUpgradesContainer.querySelector(`.owned-upgrade[data-index="${upgradeIndex}"]`);

        if(!upgrade.visible) {
            upgrade.visible = upgrade.visibleCondition();
        }

        if (upgrade.unlocked) {
            upgradeElement.style.display = 'none'; // Hide original button
            ownedUpgradeElement.style.display = 'block'; // Show owned upgrade element
        } else {
            if(upgrade.visible) {
                upgradeElement.style.display = 'block';
            } else {
                upgradeElement.style.display = 'none';
            }
            upgradeElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;
        }
    });
}
