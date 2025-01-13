const imagesToPreload = [
    'bg.jpg',
    'images/wordle_bg.jpeg',
    'images/parchment.jpg',
    'images/research-bulb-icon.png',
    'images/keystroke-coin-icon.png',
    'images/gold-medal.webp'
];

buildings.forEach(building => {
    imagesToPreload.push(building.icon);
    imagesToPreload.push(building.lockedicon);
    imagesToPreload.push(`images/tooltips/buildings/${building.id}.jpg`);
});

upgrades.forEach(upgrade => {
    imagesToPreload.push(`images/tooltips/upgrades/${upgrade.id}.jpg`);
});

achievements.forEach(achievement => {
    imagesToPreload.push(`images/tooltips/achievements/${achievement.id}.webp`);
});

stocks.forEach(stock => {
    imagesToPreload.push(stock.icon);
});

let loadedImages = 0;
const totalImages = imagesToPreload.length;

const updateProgress = () => {
    const progress = ((loadedImages / totalImages) * 100).toFixed(0);
    document.getElementById('load-progress').innerText = `${progress}%`;
};

const preloadImage = (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            document.getElementById("loader").innerText = src;
            loadedImages++;
            updateProgress();
            resolve();
        };
        img.onerror = () => {
            document.getElementById("loader").innerText = src;
            loadedImages++;
            updateProgress();
            resolve();
        };
    });
};

const preloadAllImages = async () => {
    const promises = imagesToPreload.map(src => preloadImage(src));
    await Promise.all(promises);
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 500);
    initGame();
};

preloadAllImages();