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
function checkModifiers() {
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
        visibleCondition: () => upgrades[0].unlocked, // Visible after Mechanical Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "RGB Keyboards",
                description: "Doubles production from Auto Writers and manually typed words.",
                affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
                multiplier: 2
            });
        },
    },
];

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
