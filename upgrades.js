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

let boosts = [
    {
        id: 0,
        name: "Wordle Boost",
        description: "Doubles production from Auto Writers and manually typed words.",
        affectedBuildings: [0, AutoWriter.id], // 0 for manually typed words
        multiplier: 2,
        duration: Tickrate * 3 * 60,
        maxduration: Tickrate * 3 * 60,
        icon: "/images/boost/wordle.webp"
    },
    {
        id: 1,
        name: "Race Finish Buff",
        description: "Racing is disabled for 5 minutes.",
        affectedBuildings: [],
        multiplier: 1,
        duration: Tickrate * 5 * 60,
        maxduration: Tickrate * 5 * 60,
        hidden: true,
    },
    {
        id: 2,
        name: "Champion of the Arena",
        description: "Manual keystrokes boosted by 1% of passive income.",
        affectedBuildings: [0, AutoWriter.id],
        multiplier: 2,
        KPStoManual: 0.01,
        duration: Tickrate * 5 * 60,
        maxduration: Tickrate * 5 * 60,
        icon: "/images/boost/arena.webp"
    },
    {
        id: 3,
        name: "Golden News Boost",
        description: "7x passive income boost",
        duration: 60 * Tickrate, // 1 minute boost,
        maxduration: 60 * Tickrate,
        multiplier: 7,
        affectedBuildings: buildings.flatMap(b => b.id),
        icon: "/images/boost/news.webp"
    },
    {
        id: 4,
        name: "Golden News Boost",
        description: "7x production from manual keystrokes",
        duration: 60 * Tickrate, // 1 minute boost
        maxduration: 60 * Tickrate,
        multiplier: 7,
        affectedBuildings: [0], // 0 for manually typed keystrokes,
        icon: "/images/boost/news.webp"
    },
    {
        id: 5,
        name: "Guild task change cooldown",
        description: "Changing guild tasks is disabled for 5 minutes.",
        duration: 5 * 60 * Tickrate,
        maxduration: 5 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 6,
        name: "Hacker cooldown", // Hacker lost hijack cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 7,
        name: "Arcade cooldown",
        description: "Arcade minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 9,
        name: "Memory cooldown",
        description: "Memory minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true,
    },
    {
        id: 10,
        name: "Hacker cooldown", // Hacker won cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
    },
    {
        id: 11,
        name: "Hacker cooldown", // Hacker lost crack cooldown
        description: "Hacking minigame is on cooldown.",
        duration: 0.1 * 60 * Tickrate,
        maxduration: 0.1 * 60 * Tickrate,
        hidden: true
    }
]

function spawnBoost(id, duration) {
    const boost = boosts.find(b => b.id === id);
    if (boost) {
        const newModifier = { ...boost, duration: duration || boost.duration, boostID: id };
        modifiers.push(newModifier);
    }
}

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
        modifiers.push({
            name: "Auto Writer Boost",
            description: "Each Auto Writer increases manually typed words production by 5%.",
            affectedBuildings: [0], // 0 for manually typed words
            getMultiplier: () => 1 + AutoWriter.level * 0.05, // Dynamic multiplier
        });
    }
    
    if(Printer.level > 0 && !printerBoostApplied) {
        printerBoostApplied = true;
        modifiers.push({
            name: "Printer Boost",
            description: "Each Printer increases passive income by 0.75%.",
            affectedBuildings: buildings.flatMap(b => b.id), // IDs of all buildings contributing to passive income
            getMultiplier: () => 1 + Printer.level * 0.0075, // Dynamic multiplier
        });
    }
    
    
    if(ServerFarm.level > 0 && !serverBoostApplied) {
        serverBoostApplied = true;
        modifiers.push({
            name: "Server Boost",
            description: "Each Server Farm adds 0.1% of passive income to manual keystrokes.",
            affectedBuildings: [0], // 0 for manually typed words
            getKPStoManual: () => ServerFarm.level * 0.001, // Dynamic multiplier
        });
    }
    
    
    if(TypingArena.level > 0 && !trophyBoostApplied) {
        trophyBoostApplied = true;
        modifiers.push({
            name: "Trophy Boost",
            description: "",
            affectedBuildings: [TypingArena.id],
            getMultiplier: () => 1 + arenaGoldMedals * 0.025, 
        });
    }
}

modifiers.push({
    name: "WPM Boost",
    description: "Every 30 WPM increases manual keystrokes production by 100%.",
    affectedBuildings: [0, ...buildings.flatMap(b => b.id)], // 0 for manually typed words
    getMultiplier: () => 1 + wpm / 30,
});

const upgrades = [
    {
        id: 1,
        name: "Mechanical Keyboards",
        description: "Doubles production from Auto Writers and manually typed words.",
        trivia: "Mechanical keyboards are known for their tactile feedback and durability.",
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
        trivia: "Color printers use a combination of four colors to produce a wide range of colors.",
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
        trivia: "RGB keyboards makes typing in the dark easier.",
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
        trivia: "Laser printers use a laser to produce high-quality prints.",
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
        trivia: "Keys may or may not be pressed at the same time.",
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
        trivia: "3D printers can create three-dimensional objects from digital models.",
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
        trivia: "Quantum printers don't require ink or toner.",
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
    },
    {
        id: 8,
        name: "AI Typing Assistants",
        description: "Triples production from manually typed words.",
        trivia: "Just like a real assistant, but without the coffee breaks.",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(5), // Visible after Quantum Keyboards is unlocked
        effect: () => {
            modifiers.push({
                name: "AI Typing Assistants",
                description: "Triples production from manually typed words.",
                affectedBuildings: [0], // 0 for manually typed words
                multiplier: 3
            });
        },
    },
    {
        id: 9,
        name: "Advanced research labs",
        description: "Triples production and research from research labs.",
        trivia: "Lab with more beakers.",
        cost: 3400,
        unlocked: false,
        visible: false,
        visibleCondition: () => ResearchLab.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced research labs",
                description: "Triples production and research from research labs.",
                affectedBuildings: [ResearchLab.id],
                multiplier: 3,
                researchMultiplier: 3
            });
        },
    },
    {
        id: 10,
        name: "24/7 Cyber Cafes",
        description: "Triples production from Cyber Cafes.",
        trivia: "Cyber Cafes are always open.",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => CyberCafe.level > 0,
        effect: () => {
            modifiers.push({
                name: "24/7 Cyber Cafes",
                description: "Triples production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 3
            });
        },
    },
    {
        id: 11,
        name: "High-Pressure Espresso Machines",
        description: "Doubles production from Cyber Cafes with a concentrated flow of caffeine.",
        trivia: "When the shots are strong, customers type faster!",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(10), // Visible after 24/7 Cyber Cafes is unlocked
        effect: () => {
            modifiers.push({
                name: "High-Pressure Espresso Machines",
                description: "Doubles production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 2
            });
        },
    },
    {
        id: 12,
        name: "Gourmet Coffee Selection",
        description: "Doubles production from Cyber Cafes with a refined range of coffee blends.",
        trivia: "From Americano to Macchiato, premium flavors keep visitors typing away!",
        cost: 5000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(11), // Visible after High-Pressure Espresso Machines is unlocked
        effect: () => {
            modifiers.push({
                name: "Gourmet Coffee Selection",
                description: "Doubles production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 2
            });
        },
    },
    {
        id: 13,
        name: "Artisanal Latte Workshop",
        description: "Triples production from Cyber Cafes by perfecting the latte art craft.",
        trivia: "When the latte looks stunning, customers stay longer and type more!",
        cost: 10000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(12), // Visible after Gourmet Coffee Selection is unlocked
        effect: () => {
            modifiers.push({
                name: "Artisanal Latte Workshop",
                description: "Triples production from Cyber Cafes.",
                affectedBuildings: [CyberCafe.id],
                multiplier: 3
            });
        },
    },
    {
        id: 14,
        name: "Cloud Servers",
        description: "Doubles production from Server Farms.",
        trivia: "Cloud servers are virtual servers running in a cloud computing environment.",
        cost: 10000,
        unlocked: false,
        visible: false,
        visibleCondition: () => ServerFarm.level > 0,
        effect: () => {
            modifiers.push({
                name: "Cloud Servers",
                description: "Doubles production from Server Farms.",
                affectedBuildings: [ServerFarm.id],
                multiplier: 2
            });
        },
    },
    {
        id: 15,
        name: "Quantum Servers",
        description: "Doubles production from Server Farms.",
        trivia: "Qubits may or may not be in a superposition.",
        cost: 15000,
        unlocked: false,
        visible: false,
        visibleCondition: () => isUpgradeUnlocked(14), // Visible after Cloud Servers is unlocked
        effect: () => {
            modifiers.push({
                name: "Quantum Servers",
                description: "Doubles production from Server Farms.",
                affectedBuildings: [ServerFarm.id],
                multiplier: 2
            });
        },
    },
    {
        id: 16,
        name: "Yearly Typing Championships",
        description: "Triples production from Typing Arenas.",
        trivia: "Typing champions are crowned every year.",
        cost: 20000,
        unlocked: false,
        visible: false,
        visibleCondition: () => TypingArena.level > 0,
        effect: () => {
            modifiers.push({
                name: "Yearly Typing Championships",
                description: "Triples production from Typing Arenas.",
                affectedBuildings: [TypingArena.id],
                multiplier: 3
            });
        },
    },
    {
        id: 17,
        name: "Advanced IT Support",
        description: "Triples production from IT Offices.",
        trivia: "IT support that never sleeps, takes holidays or calls in sick.",
        cost: 30000,
        unlocked: false,
        visible: false,
        visibleCondition: () => ITOffice.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced IT Support",
                description: "Triples production from IT Offices.",
                affectedBuildings: [ITOffice.id],
                multiplier: 3
            });
        },
    },
    {
        id: 18,
        name: "Advanced Stock Trading Algorithms",
        description: "Doubles production from Stock Market.",
        trivia: "Algorithms that predict market trends with high accuracy.",
        cost: 40000,
        unlocked: false,
        visible: false,
        visibleCondition: () => StockMarket.level > 0,
        effect: () => {
            modifiers.push({
                name: "Advanced Stock Trading Algorithms",
                description: "Doubles production from Stock Market.",
                affectedBuildings: [StockMarket.id],
                multiplier: 2
            });
        },
    },
    {
        id: 19,
        name: "Elite Typing Guild",
        description: "Doubles production from Typing Guild.",
        trivia: "Only the best typists are allowed in the elite guild.",
        cost: 50000,
        unlocked: false,
        visible: false,
        visibleCondition: () => TypingGuild.level > 0,
        effect: () => {
            modifiers.push({
                name: "Elite Typing Guild",
                description: "Doubles production from Typing Guild.",
                affectedBuildings: [TypingGuild.id],
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
    const researchContainer = document.getElementById('research-container');
    const ownedResearchContainer = document.getElementById('owned-research-container');
    researchContainer.innerHTML = '';
    
    // Sort upgrades by cost in ascending order
    const sortedUpgrades = [...upgrades].sort((a, b) => a.cost - b.cost);
    
    sortedUpgrades.forEach((upgrade, index) => {
        // Big buttons
        const researchElement = document.createElement('button');
        researchElement.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
        researchElement.className = 'bigUpgrade';
        researchElement.setAttribute('data-index', upgrade.id - 1);
        researchElement.innerHTML = ``;
        researchElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;
        researchElement.addEventListener('click', () => {
            if (totalResearchPoints >= upgrade.cost && !upgrade.unlocked) {
                totalResearchPoints -= upgrade.cost;
                upgrade.unlocked = true;
                upgrade.effect();
                playBuySound();
            }
        });
        researchContainer.appendChild(researchElement);
        
        const researchOwnedElement = document.createElement('div');
        researchOwnedElement.className = 'owned-bigUpgrade';
        researchOwnedElement.setAttribute('data-index', upgrade.id - 1);
        researchOwnedElement.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
        researchOwnedElement.innerHTML = ``;
        researchOwnedElement.style.display = 'none'; // Initially hide owned upgrade element
        ownedResearchContainer.appendChild(researchOwnedElement);

        researchElement.addEventListener('mouseover', () => showUpgradeToolTip(researchElement, upgrade));
        researchElement.addEventListener('mouseout', () => hideTooltip());
        
        researchOwnedElement.addEventListener('mouseover', () => showOwnedUpgradeToolTip(researchOwnedElement, upgrade));
        researchOwnedElement.addEventListener('mouseout', () => hideTooltip());
    });
}



function displayUpgrades() {
    const researchContainer = document.getElementById('research-container');
    const ownedResearchContainer = document.getElementById('owned-research-container');
    

    upgrades.forEach((upgrade, upgradeIndex) => {
        const researchElement = researchContainer.querySelector(`.bigUpgrade[data-index="${upgradeIndex}"]`); // big upgrade
        const ownedResearchElement = ownedResearchContainer.querySelector(`.owned-bigUpgrade[data-index="${upgradeIndex}"]`); // big owned upgrade
        if(!upgrade.visible) {
            upgrade.visible = upgrade.visibleCondition();
        }
        
        if (upgrade.unlocked) {
            researchElement.style.display = 'none'; // Hide original button
            ownedResearchElement.style.display = 'block'; // Show owned upgrade element
        } else {
            if(upgrade.visible) {
                researchElement.style.display = 'block';
            } else {
                researchElement.style.display = 'none';
            }
            researchElement.disabled = upgrade.cost > totalResearchPoints || upgrade.unlocked;
        }
    });
}

function displayBuffs() {
    const buffsContainer = document.getElementById('buffs-container');
    reconstructBuffList();
    const buffs = modifiers.filter(mod => mod.duration && !mod.hidden);
    const buffElements = buffsContainer.querySelectorAll(".buff");
    buffElements.forEach((element, index) => {
        const buffRemaining = element.querySelector('.buffRemain');
        buffRemaining.style.top = `${100 - ((buffs[index].duration / buffs[index].maxduration) * 100)}%`
    });
}

function reconstructBuffList() {
    const buffsContainer = document.getElementById('buffs-container');
    const buffs = modifiers.filter(mod => mod.duration && !mod.hidden);
    if(buffsContainer.querySelectorAll(".buff").length === buffs.length) return;
    buffsContainer.innerHTML = '';
    buffs.forEach(buff => {
        const buffElement = document.createElement('div');
        buffElement.style.backgroundImage = `url("${buff.icon}")`
        buffElement.className = 'buff';
        
        const buffRemaining = document.createElement('div');
        buffRemaining.className = "buffRemain";
        buffElement.appendChild(buffRemaining);
        
        buffElement.addEventListener('mouseover', () => showBuffTooltip(buffElement, buff));
        buffElement.addEventListener('mouseout', () => hideTooltip());
        
        buffsContainer.appendChild(buffElement);
    });
}
