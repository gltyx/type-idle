// Function to play sound
function playSound(soundId) 
{
    const sound = document.getElementById(soundId);
    sound.play();
}


let currentTypeTrack = 1;
let currentBuyTrack = 1;
let currentMenuTrack = 1;
let currentExplosionTrack = 1;
let currentSlotWinTrack = 1;
let currentSlotFallTrack = 1;
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
function playExplosionSound() {
    playSound(`explosionSound${currentExplosionTrack}`);
    currentExplosionTrack++;
    if(currentExplosionTrack > 3) {
        currentExplosionTrack = 1;
    }
}
function playSlotWinSound() {
    playSound(`slotWinSound${currentSlotWinTrack}`);
    currentSlotWinTrack++;
    if(currentSlotWinTrack > 3) {
        currentSlotWinTrack = 1;
    }
}
function playSlotFallSound() {
    playSound(`slotFallSound${currentSlotFallTrack}`);
    currentSlotFallTrack++;
    if(currentSlotFallTrack > 3) {
        currentSlotFallTrack = 1;
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
