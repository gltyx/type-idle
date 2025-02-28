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
        `url("/images/tooltips/achievements/448/${achievement.id}.webp")`);
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
    
    // Create stats section
    const statsSection = createAchievementStats();
    
    // Create filters section
    const filtersSection = createAchievementFilters();
    
    // Add stats and filters to page before the container
    const parent = achievementsContainer.parentElement;
    
    // Remove any existing stats or filters
    const existingStats = document.getElementById('achievements-stats');
    const existingFilters = document.getElementById('achievements-filters');
    if (existingStats) existingStats.remove();
    if (existingFilters) existingFilters.remove();
    
    // Add new elements
    parent.insertBefore(statsSection, achievementsContainer);
    parent.insertBefore(filtersSection, achievementsContainer);
    
    // Sort achievements: unlocked first, then by progress percentage
    achievements.sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        
        // Secondary sort by progress percentage
        const aProgress = a.progress() / a.maxprogress;
        const bProgress = b.progress() / b.maxprogress;
        return bProgress - aProgress; // Higher progress first
    });
    
    // Display each achievement
    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.id = `achievement-${achievement.id}`;
        achievementElement.classList.add(achievement.unlocked ? 'unlocked' : 'locked');
        
        // Calculate progress
        let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
        progressPercent = Math.min(progressPercent, 100);
        let progressNumber = Math.min(achievement.progress().toFixed(0), achievement.maxprogress);
        
        if(achievement.unlocked) {
            progressPercent = 100;
            progressNumber = achievement.maxprogress;
        }
        
        achievementElement.innerHTML = `
            <div class="achievement-header">
                <img src="/images/tooltips/achievements/448/${achievement.id}.webp" alt="${achievement.name}">
                <span class="achievement-badge">${achievement.unlocked ? '✓' : '!'}</span>
                ${!achievement.unlocked ? '<div class="achievement-icon-overlay">🔒</div>' : ''}
                <span class="achievement-status">${achievement.unlocked ? 'Completed' : 'Incomplete'}</span>
                <h3 class="achievement-name">${achievement.name}</h3>
            </div>
            <div class="achievement-details">
                <p>${achievement.description}</p>
                <div class="progress-container">
                    <div class="progress-bar" id="achievement-${achievement.id}-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
                <div class="progress-text">
                    <span>Progress</span>
                    <span id="achievement-${achievement.id}-progress">${progressNumber} / ${achievement.maxprogress}</span>
                </div>
                <p class="trivia">"${achievement.trivia}"</p>
            </div>
        `;
        
        achievementsContainer.appendChild(achievementElement);
    });
    
    // Update total progress display
    updateAchievementStats();
}

function createAchievementStats() {
    const statsSection = document.createElement('div');
    statsSection.id = 'achievements-stats';
    
    statsSection.innerHTML = `
        <div id="achievements-count">Achievements: 0/0</div>
        <div id="achievements-total-progress">
            <span>Overall Progress:</span>
            <div id="achievements-progress-bar">
                <div id="achievements-progress-fill"></div>
            </div>
            <span id="achievements-progress-percentage">0%</span>
        </div>
    `;
    
    return statsSection;
}

function createAchievementFilters() {
    const filtersSection = document.createElement('div');
    filtersSection.id = 'achievements-filters';
    
    filtersSection.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="unlocked">Unlocked</button>
        <button class="filter-btn" data-filter="locked">Locked</button>
        <button class="filter-btn" data-filter="in-progress">In Progress</button>
    `;
    
    // Add event listeners to filter buttons
    filtersSection.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filtersSection.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter achievements
            filterAchievements(button.getAttribute('data-filter'));
        });
    });
    
    return filtersSection;
}

function filterAchievements(filter) {
    const achievementElements = document.querySelectorAll('.achievement');
    
    achievementElements.forEach(element => {
        const isUnlocked = element.classList.contains('unlocked');
        const achievement = achievements.find(a => `achievement-${a.id}` === element.id);
        const inProgress = !isUnlocked && achievement && achievement.progress() > 0;
        
        switch (filter) {
            case 'all':
                element.style.display = '';
                break;
            case 'unlocked':
                element.style.display = isUnlocked ? '' : 'none';
                break;
            case 'locked':
                element.style.display = !isUnlocked ? '' : 'none';
                break;
            case 'in-progress':
                element.style.display = inProgress ? '' : 'none';
                break;
        }
    });
}

function updateAchievementStats() {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const progressPercent = (unlockedCount / totalCount) * 100;
    
    const countElement = document.getElementById('achievements-count');
    const fillElement = document.getElementById('achievements-progress-fill');
    const percentageElement = document.getElementById('achievements-progress-percentage');
    
    if (countElement) countElement.textContent = `Achievements: ${unlockedCount}/${totalCount}`;
    if (fillElement) fillElement.style.width = `${progressPercent}%`;
    if (percentageElement) percentageElement.textContent = `${progressPercent.toFixed(1)}%`;
}

function updateAchievement(achievement) {
    const achievementElement = document.getElementById(`achievement-${achievement.id}`);
    if (achievementElement) {
        // If achievement was just unlocked
        if (achievement.unlocked && achievementElement.classList.contains('locked')) {
            achievementElement.classList.remove('locked');
            achievementElement.classList.add('unlocked', 'recently-unlocked');
            
            // Update status and badge
            const statusElement = achievementElement.querySelector('.achievement-status');
            if (statusElement) statusElement.textContent = 'Completed';
            
            const badgeElement = achievementElement.querySelector('.achievement-badge');
            if (badgeElement) badgeElement.textContent = '✓';
            
            // Remove lock overlay
            const lockOverlay = achievementElement.querySelector('.achievement-icon-overlay');
            if (lockOverlay) lockOverlay.remove();
            
            // After 5 seconds, remove the glow effect
            setTimeout(() => {
                achievementElement.classList.remove('recently-unlocked');
            }, 5000);
        }
        
        // Update progress bar and text
        let progressNumber = achievement.progress().toFixed(0);
        progressNumber = Math.min(progressNumber, achievement.maxprogress);
        let progressPercent = (achievement.progress() / achievement.maxprogress) * 100;
        progressPercent = Math.min(progressPercent, 100);
        if(achievement.unlocked) {
            progressPercent = 100;
            progressNumber = achievement.maxprogress;
        }
        const achievementProgress = document.getElementById(`achievement-${achievement.id}-progress-bar`);
        achievementProgress.style.width = `${progressPercent}%`;
        const achievementProgressText = document.getElementById(`achievement-${achievement.id}-progress`);
        achievementProgressText.textContent = `${progressNumber} / ${achievement.maxprogress}`;
    }
}
