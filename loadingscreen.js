// Load styles.css
function loadCSS() {
    return new Promise((resolve, reject) => {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'styles.css';
        link.onload = resolve;
        link.onerror = reject;
        head.appendChild(link);
    });
}

// Load TypeIdle.js
function loadJS() {
    return new Promise((resolve, reject) => {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = 'TypeIdle.js';
        script.onload = resolve;
        script.onerror = reject;
        head.appendChild(script);
    });
}

let texturesLoaded = 0;
function loadTextures() {
    let textures = ['bg.jpg', 'images/icons/128/keystroke-coin-icon.png'];
    buildings.forEach(building => {
        textures.push(`images/buildings/128/${building.id}.png`);
        textures.push(`images/buildings/128/${building.id}-locked.png`);
        textures.push(`images/tooltips/buildings/448/${building.id}.jpg`);
    });

    achievements.forEach(achievement => {
        textures.push(`images/tooltips/achievements/448/${achievement.id}.webp`);
    });
    return Promise.all(textures.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
            texturesLoaded++;
            document.getElementById('loading-text').innerHTML = `Loading textures... (${textures.indexOf(src) + 1}/${textures.length})`;
            document.getElementById('loading-progress').style.width = `${texturesLoaded / textures.length * 100}%`;
        });
    }));
}



document.getElementById('loading-text').innerHTML = 'Loading game files...';
// Load both files and then initialize the game
Promise.all([loadCSS(), loadJS()])
    .then(() => {
        document.getElementById('loading-text').innerHTML = 'Loading textures...';
        loadTextures()
            .then(() => {
                document.getElementById('loading-text').innerHTML = 'Initializing game...';
                initGame();
                document.getElementById('loading-screen').classList.add('loading-fade-out');
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                }, 500);
            })
            .catch((error) => {
                document.getElementById('loading-text').innerHTML = 'Error loading textures: ' + error;
                console.error('Error loading textures:', error);
            });
    })
    .catch((error) => {
        document.getElementById('loading-text').innerHTML = 'Error loading files: ' + error;
        console.error('Error loading files:', error);
    });