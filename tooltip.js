
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';

const tooltipBody = document.createElement('div');
tooltipBody.className = 'tooltip-body';

const tooltipHead = document.createElement('div');
tooltipHead.className = 'tooltip-header';

const tooltipSection = document.createElement('div');
tooltipSection.className = 'tooltip-section';

tooltipBody.appendChild(tooltipHead);
tooltipBody.appendChild(tooltipSection);
tooltip.appendChild(tooltipBody);
document.body.appendChild(tooltip);

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function setToolTipPos(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const leftPosition = rect.left - tooltipWidth;
    const rightPosition = rect.right;
    const centeredLeftPosition = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    const clampedLeftPosition = Math.min(
        Math.max(centeredLeftPosition, 0),
        windowWidth - tooltipWidth
    );
    
    // Determine vertical placement (above or below)
    if (topPosition >= 0) {
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    } else if (leftPosition >= 0) {
        // If it doesn't fit above or below, try to position on the left
        tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipHeight / 2)}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (rightPosition + tooltipWidth <= windowWidth) {
        // If it doesn't fit on the left, try the right
        tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipHeight / 2)}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else {
        // Default to showing it below and centered if no other options fit
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${clampedLeftPosition}px`;
    }
}

function showBuildingTooltip(buildingElement, building) {
    if(building.locked) {
        tooltip.style.backgroundImage = `url("images/tooltips/buildings/locked.jpg")`;
        tooltipHead.innerHTML = `<h1>Locked Building</h1>`;
        tooltipSection.innerHTML = `<p>${building.lockdescription}</p>`;
    } else {
        tooltip.style.backgroundImage = `url("images/tooltips/buildings/${building.id}.jpg")`;
        tooltipHead.innerHTML = `<h1>${building.name}</h1>`;
        tooltipSection.innerHTML = `
        <p>${building.description}</p>
        <p class="production">- Each ${building.name} produces <strong>${formatShortScale(building.getProduceSingle())}</strong> keystrokes per second.<br>- ${building.level} ${building.name}s producing <strong>${formatShortScale(building.getProduce())}</strong> keystrokes per second.</p>
        ${typeof building.getResearchProduceSingle === "function" ? `<p class="research">- Each ${building.name} produces <strong>${building.getResearchProduceSingle().toFixed(2)}</strong> research points per second.<br>- ${building.level} ${building.name}s producing <strong>${building.getResearchProduce().toFixed(2)}</strong> research points per second.</p>` : ''}
        <p class="special">Special: ${building.special}</p>
        <p class="totalproduced">Total produced: ${formatShortScale(building.totalProduce)} keystrokes.</p>
        <p class="trivia">"${building.trivia}"</p>`;
    }
    setToolTipPos(buildingElement);
    tooltip.classList.add('visible');
}

function showOwnedUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("images/tooltips/upgrades/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>`;
    setToolTipPos(upgradeElement);
    tooltip.classList.add('visible');
}

function showUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("images/tooltips/upgrades/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>
    <img src="images/research-bulb-icon.png" class="researchicon" alt="Research"> <span>${formatShortScale(upgrade.cost)}</span>`;
    setToolTipPos(upgradeElement);
    tooltip.classList.add('visible');
}

function showCurrentResearchCountTooltip(element) {
    tooltip.style.backgroundImage = `url("images/tooltips/buildings/3.jpg")`; // research building
    tooltipHead.innerHTML = `<h1>Research Points</h1>`;
    tooltipSection.innerHTML = `<p>Research points allow you to unlock valuable upgrades for your buildings.</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}

function showWordleTutorialTooltip(element) {
    tooltip.style.backgroundImage = 'url("images/tooltips/wordle-tutorial.jpg")';
    tooltipHead.innerHTML = `
    <h1>How to Play</h1>
    <h2>Guess the word in 5 tries</h2>`;
    tooltipSection.innerHTML = `
    <h3>Examples</h3>
    <div class="wordle-example">
        <div class="wordle-grid">
            <div class="wordle-guess-row">
                <div class="wordle-tile correct">W</div>
                <div class="wordle-tile">O</div>
                <div class="wordle-tile">R</div>
                <div class="wordle-tile">D</div>
            </div>
        </div>
        <p><strong>W</strong> is in the word and in the correct position.</p>
    </div>
    <div class="wordle-example">
        <div class="wordle-grid">
            <div class="wordle-guess-row">
                <div class="wordle-tile present">W</div>
                <div class="wordle-tile">O</div>
                <div class="wordle-tile">R</div>
                <div class="wordle-tile">D</div>
            </div>
        </div>
        <p><strong>W</strong> is in the word but in a different position.</p>
    </div>
    <div class="wordle-example">
        <div class="wordle-grid">
            <div class="wordle-guess-row">
                <div class="wordle-tile absent">W</div>
                <div class="wordle-tile">O</div>
                <div class="wordle-tile">R</div>
                <div class="wordle-tile">D</div>
            </div>
        </div>
        <p><strong>W</strong> is not in the word.</p>
    </div>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showStockBuyTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Buy Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Buy ${count} stocks at $${formatShortScale(count * stock.price)} (<img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showStockSellTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Sell Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Sell ${count} stocks for $${formatShortScale(count * stock.price)} (<img src="images/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showAchievementTooltip(element, achievement) {
    if(achievement.unlocked) {
        tooltip.style.backgroundImage = `url("images/tooltips/achievements/${achievement.id}.webp")`;
        tooltipHead.innerHTML = `<h1>${achievement.name}</h1>`;
        tooltipSection.innerHTML = `
    <p>${achievement.description}</p>
    <p class="trivia">"${achievement.trivia}"</p>`;
    } else {
        tooltip.style.backgroundImage = `url("images/tooltips/achievements/0.webp")`;
        tooltipHead.innerHTML = `<h1>Hidden Achievement</h1>`;
        tooltipSection.innerHTML = `<p>Unlock this achievement to reveal it.</p>`;
    }
    setToolTipPos(element);
    tooltip.classList.add('visible');
}


let researchPointsDiv = document.getElementById("researchPointsDiv");
researchPointsDiv.addEventListener('mouseover', () => showCurrentResearchCountTooltip(researchPointsDiv));
researchPointsDiv.addEventListener('mouseout', () => hideTooltip());

let wordleTutorial = document.getElementById("wordle-tutorial");
wordleTutorial.addEventListener('mouseover', () => showWordleTutorialTooltip(wordleTutorial.childNodes[0]));
wordleTutorial.addEventListener('mouseout', () => hideTooltip());