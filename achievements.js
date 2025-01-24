const achievements = [
    {
        id: 1,
        name: "First Steps",
        description: "Reach 100 keystrokes.",
        trivia: "You're just getting started!",
        unlocked: false,
        condition: () => totalKeystrokes >= 100
    },
    {
        id: 2,
        name: "Typing Enthusiast",
        description: "Reach 1000 keystrokes.",
        trivia: "You must really like typing!",
        unlocked: false,
        condition: () => totalKeystrokes >= 1000
    },
    {
        id: 3,
        name: "Automator",
        description: "Own 5 Auto Writers.",
        trivia: "Let the robots do the work for you.",
        unlocked: false,
        condition: () => AutoWriter.level >= 5
    },
    {
        id: 4,
        name: "Printing Press",
        description: "Own 3 Printers.",
        trivia: "You can print keystrokes? That's impressive!",
        unlocked: false,
        condition: () => Printer.level >= 3
    },
    {
        id: 5,
        name: "Typing Master",
        description: "Reach 10,000 keystrokes.",
        trivia: "Your fingers must be getting a workout!",
        unlocked: false,
        condition: () => totalKeystrokes >= 10000
    },
    {
        id: 6,
        name: "Speed Demon",
        description: "Achieve a WPM of 100.",
        trivia: "Are you sure you're not a machine?",
        unlocked: false,
        condition: () => wpm >= 100
    },
    {
        id: 7,
        name: "Automation Expert",
        description: "Own 20 Auto Writers.",
        trivia: "Soon, you'll have an army of Auto Writers!",
        unlocked: false,
        condition: () => AutoWriter.level >= 20
    },
    {
        id: 8,
        name: "Printing Mogul",
        description: "Own 15 Printers.",
        trivia: "You're running a printing empire!",
        unlocked: false,
        condition: () => Printer.level >= 15
    },
    {
        id: 9,
        name: "Research Pioneer",
        description: "Own 10 Research Labs.",
        trivia: "e=mc^2",
        unlocked: false,
        condition: () => ResearchLab.level >= 10
    },
    {
        id: 10,
        name: "Cyber Cafe Manager",
        description: "Own 5 Cyber Cafes.",
        trivia: "Quickest internet in town!",
        unlocked: false,
        condition: () => CyberCafe.level >= 5
    },
    {
        id: 11,
        name: "Server Farm Lord",
        description: "Own 3 Server Farms.",
        trivia: "Zettabytes of data!",
        unlocked: false,
        condition: () => ServerFarm.level >= 3
    },
    {
        id: 12,
        name: "Keystroke Tycoon",
        description: "Generate 100,000 keystrokes through buildings.",
        trivia: "Starting a small business.",
        unlocked: false,
        condition: () => cashEarnedBuildings >= 100000
    },
    {
        id: 13,
        name: "Achievement Hunter",
        description: "Unlock 10 achievements.",
        trivia: "Gotta catch 'em all!",
        unlocked: false,
        condition: () => achievements.filter(a => a.unlocked).length >= 10
    },
    {
        id: 14,
        name: "Wordle Novice",
        description: "Solve 1 Wordle puzzle.",
        trivia: "One down, many more to go!",
        unlocked: false,
        condition: () => wordlesSolved >= 1
    },
    {
        id: 15,
        name: "Wordle Enthusiast",
        description: "Solve 10 Wordle puzzles.",
        trivia: "You're getting the hang of this!",
        unlocked: false,
        condition: () => wordlesSolved >= 10
    },
    {
        id: 16,
        name: "Wordle Master",
        description: "Solve 50 Wordle puzzles.",
        trivia: "You're a Wordle wizard!",
        unlocked: false,
        condition: () => wordlesSolved >= 50
    },
    {
        id: 17,
        name: "Wordle Legend",
        description: "Solve 100 Wordle puzzles.",
        trivia: "Legendary Wordle solver!",
        unlocked: false,
        condition: () => wordlesSolved >= 100
    },
    {
        id: 18,
        name: "Arena Challenger",
        description: "Beat normal opponent in the Arena.",
        trivia: "You're a typing gladiator!",
        unlocked: false,
        condition: () => arenaBeatNormal >= 1 || arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 19,
        name: "Arena Champion",
        description: "Beat hard opponent in the Arena.",
        trivia: "Champion of the typing arena!",
        unlocked: false,
        condition: () => arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 20,
        name: "Arena Legend",
        description: "Beat very hard opponent in the Arena.",
        trivia: "Typing legend in the arena!",
        unlocked: false,
        condition: () => arenaBeatVeryHard >= 1
    },
    {
        id: 21,
        name: "Stock Investor",
        description: "Own 1 stock.",
        trivia: "First step to becoming a stock market mogul!",
        unlocked: false,
        condition: () => stocks.some(stock => stock.owned >= 1)
    },
    {
        id: 22,
        name: "Stock Market Tycoon",
        description: "Make $100,000 profit with stocks.",
        trivia: "You're a stock market genius!",
        unlocked: false,
        condition: () => stockProfitDollars >= 100000
    },
    {
        id: 23,
        name: "Golden Scoop",
        description: "Click on a golden news article.",
        trivia: "Not all that glitters is gold, except when it's a news article! You've uncovered a golden opportunity and clicked your way to success.",
        unlocked: false,
        condition: () => goldNewsClicks > 0
    }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            playAchievementSound();
            displayAchievements();
            showAchievement(achievement);
            gtag('event', 'achievement_unlock', {
                'event_category': 'Achievements',
                'achievement_id': achievement.id,
                'achievement_name': achievement.name
              });
        }
    });
}

function showAchievement(achievement) {
    showNotification(
        `<h1>${achievement.name}</h1>
        <h2>Achievement Unlocked</h2>`,
        `<p>${achievement.description}</p>
        <p class="trivia">"${achievement.trivia}"</p>`,
        `url("images/tooltips/achievements/${achievement.id}.webp")`);
}

function displayAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = '';

    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.onmouseenter = () => showAchievementTooltip(achievementElement, achievement);
        achievementElement.onmouseleave = () => hideTooltip();
        if (achievement.unlocked) {
            achievementElement.classList.add('unlocked');
            achievementElement.style.backgroundImage = `url("images/tooltips/achievements/${achievement.id}.webp")`;
            achievementElement.innerHTML = ``;
        } else {
            achievementElement.classList.add('locked');
            achievementElement.style.backgroundImage = `url("images/tooltips/achievements/0.webp")`
            achievementElement.innerHTML = ``;
        }

        achievementsContainer.appendChild(achievementElement);
    });
}
