// Function to play sound
function playSound(soundId) 
{
    const sound = document.getElementById(soundId);
    sound.play();
}


let currentTypeTrack = 1;
let currentBuyTrack = 1;
let currentMenuTrack = 1;
function playTypeSound() {
    playSound(`typeSound${currentTypeTrack}`);
    currentTypeTrack++;
    if(currentTypeTrack > 3) {
        currentTypeTrack = 1;
    }
}

function playBuySound() {
    playSound(`buySound${currentBuyTrack}`);
    currentBuyTrack++;
    if(currentBuyTrack > 3) {
        currentBuyTrack = 1;
    }
}
function playMenuSound() {
    playSound(`menuSound${currentMenuTrack}`);
    currentMenuTrack++;
    if(currentMenuTrack > 3) {
        currentMenuTrack = 1;
    }
}
function playTypoSound() {
    playLoseSound();
}
function playClickSound() {
    playSound("clickSound");
}
function playAchievementSound() {
    playSound("achievementSound");
}
function playWinSound() {
    playSound("winSound");
}
function playLoseSound() {
    playSound("loseSound");
}
