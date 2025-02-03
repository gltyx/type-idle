const achievements = [
    {
        id: 1,
        name: "First Steps",
        description: "Reach 100 keystrokes.",
        trivia: "You're just getting started!",
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 100,
        showindex: 0,
        condition: () => totalKeystrokes >= 100
    },
    {
        id: 2,
        name: "Typing Enthusiast",
        description: "Reach 1000 keystrokes.",
        trivia: "You must really like typing!",
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 1000,
        showindex: 1,
        condition: () => totalKeystrokes >= 1000
    },
    {
        id: 3,
        name: "Automator",
        description: "Own 5 Auto Writers.",
        trivia: "Let the robots do the work for you.",
        unlocked: false,
        progress: () => AutoWriter.level,
        maxprogress: 5,
        showindex: 100,
        condition: () => AutoWriter.level >= 5
    },
    {
        id: 4,
        name: "Printing Press",
        description: "Own 3 Printers.",
        trivia: "You can print keystrokes? That's impressive!",
        unlocked: false,
        progress: () => Printer.level,
        maxprogress: 3,
        showindex: 200,
        condition: () => Printer.level >= 3
    },
    {
        id: 5,
        name: "Typing Master",
        description: "Reach 10,000 keystrokes.",
        trivia: "Your fingers must be getting a workout!",
        unlocked: false,
        progress: () => totalKeystrokes,
        maxprogress: 10000,
        showindex: 2,
        condition: () => totalKeystrokes >= 10000
    },
    {
        id: 6,
        name: "Speed Demon",
        description: "Achieve a WPM of 100.",
        trivia: "Are you sure you're not a machine?",
        unlocked: false,
        progress: () => wpm,
        maxprogress: 100,
        showindex: 1000,
        condition: () => wpm >= 100
    },
    {
        id: 7,
        name: "Automation Expert",
        description: "Own 20 Auto Writers.",
        trivia: "Soon, you'll have an army of Auto Writers!",
        unlocked: false,
        progress: () => AutoWriter.level,
        maxprogress: 20,
        showindex: 101,
        condition: () => AutoWriter.level >= 20
    },
    {
        id: 8,
        name: "Printing Mogul",
        description: "Own 15 Printers.",
        trivia: "You're running a printing empire!",
        unlocked: false,
        progress: () => Printer.level,
        maxprogress: 15,
        showindex: 201,
        condition: () => Printer.level >= 15
    },
    {
        id: 9,
        name: "Research Pioneer",
        description: "Own 10 Research Labs.",
        trivia: "e=mc^2",
        unlocked: false,
        progress: () => ResearchLab.level,
        maxprogress: 10,
        showindex: 300,
        condition: () => ResearchLab.level >= 10
    },
    {
        id: 10,
        name: "Cyber Cafe Manager",
        description: "Own 5 Cyber Cafes.",
        trivia: "Quickest internet in town!",
        unlocked: false,
        progress: () => CyberCafe.level,
        maxprogress: 5,
        showindex: 400,
        condition: () => CyberCafe.level >= 5
    },
    {
        id: 11,
        name: "Server Farm Lord",
        description: "Own 3 Server Farms.",
        trivia: "Zettabytes of data!",
        unlocked: false,
        progress: () => ServerFarm.level,
        maxprogress: 3,
        showindex: 500,
        condition: () => ServerFarm.level >= 3
    },
    {
        id: 12,
        name: "Keystroke Tycoon",
        description: "Generate 100,000 keystrokes through buildings.",
        trivia: "Starting a small business.",
        unlocked: false,
        progress: () => cashEarnedBuildings,
        maxprogress: 100000,
        showindex: 1001,
        condition: () => cashEarnedBuildings >= 100000
    },
    {
        id: 13,
        name: "Achievement Hunter",
        description: "Unlock 10 achievements.",
        trivia: "Gotta catch 'em all!",
        unlocked: false,
        progress: () => achievements.filter(a => a.unlocked).length,
        maxprogress: 10,
        showindex: 1002,
        condition: () => achievements.filter(a => a.unlocked).length >= 10
    },
    {
        id: 14,
        name: "Wordle Novice",
        description: "Solve 1 Wordle puzzle.",
        trivia: "One down, many more to go!",
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 1,
        showindex: 1003,
        condition: () => wordlesSolved >= 1
    },
    {
        id: 15,
        name: "Wordle Enthusiast",
        description: "Solve 10 Wordle puzzles.",
        trivia: "You're getting the hang of this!",
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 10,
        showindex: 1004,
        condition: () => wordlesSolved >= 10
    },
    {
        id: 16,
        name: "Wordle Master",
        description: "Solve 50 Wordle puzzles.",
        trivia: "You're a Wordle wizard!",
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 50,
        showindex: 1005,
        condition: () => wordlesSolved >= 50
    },
    {
        id: 17,
        name: "Wordle Legend",
        description: "Solve 100 Wordle puzzles.",
        trivia: "Legendary Wordle solver!",
        unlocked: false,
        progress: () => wordlesSolved,
        maxprogress: 100,
        showindex: 1006,
        condition: () => wordlesSolved >= 100
    },
    {
        id: 18,
        name: "Arena Challenger",
        description: "Beat normal opponent in the Arena.",
        trivia: "You're a typing gladiator!",
        unlocked: false,
        progress: () => arenaBeatNormal + arenaBeatHard + arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1007,
        condition: () => arenaBeatNormal >= 1 || arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 19,
        name: "Arena Champion",
        description: "Beat hard opponent in the Arena.",
        trivia: "Champion of the typing arena!",
        unlocked: false,
        progress: () => arenaBeatHard + arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1008,
        condition: () => arenaBeatHard >= 1 || arenaBeatVeryHard >= 1
    },
    {
        id: 20,
        name: "Arena Legend",
        description: "Beat very hard opponent in the Arena.",
        trivia: "Typing legend in the arena!",
        unlocked: false,
        progress: () => arenaBeatVeryHard,
        maxprogress: 1,
        showindex: 1009,
        condition: () => arenaBeatVeryHard >= 1
    },
    {
        id: 21,
        name: "Stock Investor",
        description: "Own 1 stock.",
        trivia: "First step to becoming a stock market mogul!",
        unlocked: false,
        progress: () => stocks.filter(stock => stock.owned >= 1).length,
        maxprogress: 1,
        showindex: 1010,
        condition: () => stocks.some(stock => stock.owned >= 1)
    },
    {
        id: 22,
        name: "Stock Market Tycoon",
        description: "Make $100,000 profit with stocks.",
        trivia: "You're a stock market genius!",
        unlocked: false,
        progress: () => stockProfitDollars,
        maxprogress: 100000,
        showindex: 1011,
        condition: () => stockProfitDollars >= 100000
    },
    {
        id: 23,
        name: "Golden Scoop",
        description: "Click on a golden news article.",
        trivia: "You found the golden scoop!",
        unlocked: false,
        progress: () => goldNewsClicks,
        maxprogress: 1,
        showindex: 1012,
        condition: () => goldNewsClicks > 0
    }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked) {
            if (achievement.condition()) {
                achievement.unlocked = true;
                playAchievementSound();
                showAchievement(achievement);
                gtag('event', 'achievement_unlock', {
                    'event_category': 'Achievements',
                    'achievement_id': achievement.id,
                    'achievement_name': achievement.name
                });
            }
            updateAchievement(achievement);
        }
    });
}

function showAchievement(achievement) {
    showNotification(
        `<h1>${achievement.name}</h1>
        <h2>Achievement Unlocked</h2>`,
        `<p>${achievement.description}</p>
        <p class="trivia">"${achievement.trivia}"</p>`,
        `url("/images/tooltips/achievements/${achievement.id}.webp")`);
    }
    function updateAchievement(achievement) {
        const achievementElement = document.getElementById(`achievement-${achievement.id}`);
        if (achievementElement) {
            let progressNumber = achievement.progress().toFixed(0);
            progressNumber = Math.min(progressNumber, achievement.maxprogress);
            let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
            progressPercent = Math.min(progressPercent, 100);
            if(achievement.unlocked) {
                progressPercent = 100;
                progressNumber = achievement.maxprogress;
                achievementElement.classList.remove('locked');
                achievementElement.classList.add('unlocked');
            }
            const achievementProgress = document.getElementById(`achievement-${achievement.id}-progress-bar`);
            achievementProgress.style.width = `${progressPercent}%`;
            const achievementProgressText = document.getElementById(`achievement-${achievement.id}-progress`);
            achievementProgressText.textContent = `${progressNumber} / ${achievement.maxprogress}`;
        }
    }
    function displayAchievements() {
        const achievementsContainer = document.getElementById('achievements-container');
        achievementsContainer.innerHTML = '';
        
        achievements.sort((a, b) => a.showindex - b.showindex);
        achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'achievement';
            achievementElement.id = `achievement-${achievement.id}`;
            achievementElement.classList.add(achievement.unlocked ? 'unlocked' : 'locked');
            
            const achievementIcon = document.createElement('img');
            achievementIcon.src = `/images/tooltips/achievements/${achievement.id}.webp`;
            achievementIcon.alt = achievement.name;
            achievementIcon.classList.add('achievement-icon');
            achievementElement.appendChild(achievementIcon);
            
            const achievementDetails = document.createElement('div');
            achievementDetails.className = 'achievement-details';
            achievementElement.appendChild(achievementDetails);
            
            const achievementName = document.createElement('h3');
            achievementName.className = 'achievement-name';
            achievementName.textContent = achievement.name;
            achievementDetails.appendChild(achievementName);
            
            const achievementDescription = document.createElement('p');
            achievementDescription.textContent = achievement.description;
            achievementDetails.appendChild(achievementDescription);
            
            const achievementProgressContainer = document.createElement('div');
            achievementProgressContainer.className = 'progress-container';
            achievementDetails.appendChild(achievementProgressContainer);
            
            const achievementProgress = document.createElement('div');
            achievementProgress.className = 'progress-bar';
            achievementProgress.id = `achievement-${achievement.id}-progress-bar`;
            let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
            progressPercent = Math.min(progressPercent, 100);
            let progressNumber = achievement.progress().toFixed(0);
            progressNumber = Math.min(progressNumber, achievement.maxprogress);
            if(achievement.unlocked) {
                progressPercent = 100;
                progressNumber = achievement.maxprogress;
            }
            achievementProgress.style.width = `${progressPercent}%`;
            achievementProgressContainer.appendChild(achievementProgress);
            
            const achievementProgressText = document.createElement('p');
            achievementProgressText.id = `achievement-${achievement.id}-progress`;
            achievementProgressText.className = 'abscenter progress-text';
            achievementProgressText.textContent = `${progressNumber} / ${achievement.maxprogress}`;
            achievementProgressContainer.appendChild(achievementProgressText);
            
            const achievementTrivia = document.createElement('p');
            achievementTrivia.textContent = achievement.trivia;
            achievementTrivia.className = 'trivia';
            achievementDetails.appendChild(achievementTrivia);
            /*
            achievementElement.onmouseenter = () => showAchievementTooltip(achievementElement, achievement);
            achievementElement.onmouseleave = () => hideTooltip();
            if (achievement.unlocked) {
            achievementElement.classList.add('unlocked');
            achievementElement.style.backgroundImage = `url("/images/tooltips/achievements/${achievement.id}.webp")`;
            achievementElement.innerHTML = ``;
            } else {
            achievementElement.classList.add('locked');
            achievementElement.style.backgroundImage = `url("/images/tooltips/achievements/0.webp")`
            achievementElement.innerHTML = ``;
            }
            */
            achievementsContainer.appendChild(achievementElement);
        });
    }
    