const achievements = [
    { id: 1, name: "First Steps", description: "Reach 100 keystrokes.", unlocked: false, condition: () => totalKeystrokes >= 100 },
    { id: 2, name: "Typing Enthusiast", description: "Reach 1000 keystrokes.", unlocked: false, condition: () => totalKeystrokes >= 1000 },
    { id: 3, name: "Automator", description: "Own 5 Auto Writers.", unlocked: false, condition: () => AutoWriter.level >= 5 },
    { id: 4, name: "Printing Press", description: "Own 3 Printers.", unlocked: false, condition: () => Printer.level >= 3 },
    { id: 5, name: "Typing Master", description: "Reach 10,000 keystrokes.", unlocked: false, condition: () => totalKeystrokes >= 10000 },
    { id: 6, name: "Speed Demon", description: "Achieve a WPM of 100.", unlocked: false, condition: () => wpm >= 100 },
    { id: 7, name: "Automation Expert", description: "Own 20 Auto Writers.", unlocked: false, condition: () => AutoWriter.level >= 20 },
    { id: 8, name: "Printing Mogul", description: "Own 15 Printers.", unlocked: false, condition: () => Printer.level >= 15 },
    { id: 9, name: "Research Pioneer", description: "Own 10 Research Labs.", unlocked: false, condition: () => ResearchLab.level >= 10 },
    { id: 10, name: "Cyber Cafe Manager", description: "Own 5 Cyber Cafes.", unlocked: false, condition: () => CyberCafe.level >= 5 },
    { id: 11, name: "Server Farm Lord", description: "Own 3 Server Farms.", unlocked: false, condition: () => ServerFarm.level >= 3 },
    { id: 12, name: "Keystroke Tycoon", description: "Generate 100,000 keystrokes through buildings.", unlocked: false, condition: () => cashEarnedBuildings >= 100000 },
    { id: 13, name: "Achievement Hunter", description: "Unlock 10 achievements.", unlocked: false, condition: () => achievements.filter(a => a.unlocked).length >= 10 },
    { id: 14, name: "Wordle Novice", description: "Solve 1 Wordle puzzle.", unlocked: false, condition: () => wordlesSolved >= 1 },
    { id: 15, name: "Wordle Enthusiast", description: "Solve 10 Wordle puzzles.", unlocked: false, condition: () => wordlesSolved >= 10 },
    { id: 16, name: "Wordle Master", description: "Solve 50 Wordle puzzles.", unlocked: false, condition: () => wordlesSolved >= 50 },
    { id: 17, name: "Wordle Legend", description: "Solve 100 Wordle puzzles.", unlocked: false, condition: () => wordlesSolved >= 100 },
    { id: 18, name: "Arena Challenger", description: "Beat normal opponent in the Arena.", unlocked: false, condition: () => arenaBeatNormal >= 1 || arenaBeatHard >= 1 || arenaBeatVeryHard >= 1},
    { id: 19, name: "Arena Champion", description: "Beat hard opponent in the Arena.", unlocked: false, condition: () => arenaBeatHard >= 1 || arenaBeatVeryHard >= 1 },
    { id: 20, name: "Arena Legend", description: "Beat very hard opponent in the Arena.", unlocked: false, condition: () => arenaBeatVeryHard >= 1 }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            playAchievementSound();
            displayAchievements();
            showNotification(`<p><strong>Achievement Unlocked: ${achievement.name}</strong></p><p><i>${achievement.description}</i></p>`);
        }
    });
}

function displayAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = '';

    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        
        if (achievement.unlocked) {
            achievementElement.classList.add('unlocked');
            achievementElement.innerHTML = `<strong>${achievement.name}</strong><br>${achievement.description}`;
        } else {
            achievementElement.classList.add('locked');
            achievementElement.innerHTML = `<strong>???</strong><br>hidden achievement`;
        }

        achievementsContainer.appendChild(achievementElement);
    });
}
