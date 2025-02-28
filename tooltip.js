
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';

const tooltipBackground = document.createElement('div');
tooltipBackground.className = 'tooltip-background';

const tooltipBody = document.createElement('div');
tooltipBody.className = 'tooltip-body';

const tooltipHead = document.createElement('div');
tooltipHead.className = 'tooltip-header';

const tooltipSection = document.createElement('div');
tooltipSection.className = 'tooltip-section';

tooltipBody.appendChild(tooltipHead);
tooltipBody.appendChild(tooltipSection);
tooltipBackground.appendChild(tooltipBody);
tooltip.appendChild(tooltipBackground);
document.body.appendChild(tooltip);

function hideTooltip() {
    tooltip.classList.remove('visible');
}
/**
 * This prefers to position the tooltip above the element, then below, then left, then right.
 * @param {*} element The element to position the tooltip relative to
 */
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

/**
 * This prefers to position the tooltip left of the element, then right, then above, then below.
 * @param {*} element The element to position the tooltip relative to
 */
function setToolTipPos2(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const leftPosition = rect.left - tooltipWidth;
    const rightPosition = rect.right;
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const centeredTopPosition = rect.top + (rect.height / 2) - (tooltipHeight / 2);
    const clampedTopPosition = Math.min(
        Math.max(centeredTopPosition, 0),
        windowHeight - tooltipHeight
    );
    
    // Determine horizontal placement (left or right)
    if (leftPosition >= 0) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (rightPosition + tooltipWidth <= windowWidth) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else if (topPosition >= 0) {
        // If it doesn't fit left or right, try to position above
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        // If it doesn't fit above, try below
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else {
        // Default to showing it right of the element if no other options fit
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    }
}

/**
 * This prefers to position the tooltip right of the element, then left, then above, then below.
 * @param {*} element The element to position the tooltip relative to
 */
function setToolTipPos3(element) {
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate potential positions
    const rightPosition = rect.right;
    const leftPosition = rect.left - tooltipWidth;
    const topPosition = rect.top - tooltipHeight;
    const bottomPosition = rect.bottom;
    const centeredTopPosition = rect.top + (rect.height / 2) - (tooltipHeight / 2);
    const clampedTopPosition = Math.min(
        Math.max(centeredTopPosition, 0),
        windowHeight - tooltipHeight
    );
    
    // Determine horizontal placement (right or left)
    if (rightPosition + tooltipWidth <= windowWidth) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    } else if (leftPosition >= 0) {
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${leftPosition}px`;
    } else if (topPosition >= 0) {
        // If it doesn't fit right or left, try to position above
        tooltip.style.top = `${topPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else if (bottomPosition + tooltipHeight <= windowHeight) {
        // If it doesn't fit above, try below
        tooltip.style.top = `${bottomPosition}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipWidth / 2)}px`;
    } else {
        // Default to showing it right of the element if no other options fit
        tooltip.style.top = `${clampedTopPosition}px`;
        tooltip.style.left = `${rightPosition}px`;
    }
}

function showBuildingTooltip(buildingElement, building) {
    if(building.locked) {
        tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/locked.jpg")`;
        tooltipHead.innerHTML = `<h1>Locked Building</h1>`;
        tooltipSection.innerHTML = `<p>${building.lockdescription}</p>`;
    } else {
        tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/${building.id}.jpg")`;
        tooltipHead.innerHTML = `<h1>${building.name}</h1>`;
        let researchHtml = '';
        let currentBoost = getSpecialBoost(building);
        if(currentBoost.length > 0) {
            currentBoost = `
                <li><strong>${currentBoost}</strong></li>
            `;
        }
        if(typeof building.getResearchProduceSingle === "function") {
            researchHtml = `
                <li>Each <strong>${building.name}</strong> produces <strong><img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research">${building.getResearchProduceSingle().toFixed(2)} per second.</strong></li>
                <li><strong>${building.level} ${building.name}s</strong> produces <strong><img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research">${formatShortScale(building.getResearchProduce())} per second.</strong></li>
            `;
        }
        tooltipSection.innerHTML = `
        <p>${building.description}</p>
        <ul class="tooltip-stats">
            <li><strong>${building.special}</strong></li>
            ${currentBoost}
            <li>Each <strong>${building.name}</strong> produces <strong><img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.getProduceSingle())} per second.</strong></li>
            <li><strong>${building.level} ${building.name}s</strong> produces <strong><img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.getProduce())} per second.</strong></li>
            <li><strong>Total produced: <img src="/images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(building.totalProduce)}</strong></li>
        ${researchHtml}
        </ul>
        <p class="trivia">"${building.trivia}"</p>`;
    }
    setToolTipPos2(buildingElement);
    tooltip.classList.add('visible');
}


function showOwnedUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>`;
    setToolTipPos3(upgradeElement);
    tooltip.classList.add('visible');
}

function showUpgradeToolTip(upgradeElement, upgrade) {
    tooltip.style.backgroundImage = `url("/images/tooltips/upgrades/448/${upgrade.id}.jpg")`;
    tooltipHead.innerHTML = `<h1>${upgrade.name}</h1>`;
    tooltipSection.innerHTML = `
    <p>${upgrade.description}</p>
    <p class="trivia">"${upgrade.trivia}"</p>
    <img src="/images/icons/128/research-bulb-icon.png" class="researchicon" alt="Research"> <span>${formatShortScale(upgrade.cost)}</span>`;
    setToolTipPos2(upgradeElement);
    tooltip.classList.add('visible');
}

function showCurrentResearchCountTooltip(element) {
    tooltip.style.backgroundImage = `url("/images/tooltips/buildings/448/3.jpg")`; // research building
    tooltipHead.innerHTML = `<h1>Research Points</h1>`;
    tooltipSection.innerHTML = `<p>Research points allow you to unlock valuable upgrades for your buildings.</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}

function showStockBuyTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Buy Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Buy ${count} stocks at $${formatShortScale(count * stock.price)} (<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showStockSellTooltip(element, count, stock) {
    tooltip.style.backgroundImage = `url("${stock.icon}")`;
    tooltipHead.innerHTML = `
    <h1>${stock.name}</h1>
    <h2>Sell Stocks</h2>`;
    tooltipSection.innerHTML = `
    <p>Sell ${count} stocks for $${formatShortScale(count * stock.price)} (<img src="images/icons/128/keystroke-coin-icon.png" class="currencyicon" alt="Keystroke Coin">${formatShortScale(dollarsToKeystrokes(count * stock.price))})</p>`;
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}
function showAchievementTooltip(element, achievement) {
    if(achievement.unlocked) {
        tooltip.style.backgroundImage = `url("/images/tooltips/achievements/448/${achievement.id}.webp")`;
        tooltipHead.innerHTML = `<h1>${achievement.name}</h1>`;
        tooltipSection.innerHTML = `
    <p>${achievement.description}</p>
    <p class="trivia">"${achievement.trivia}"</p>`;
    } else {
        tooltip.style.backgroundImage = `url("/images/tooltips/achievements/0.webp")`;
        tooltipHead.innerHTML = `<h1>Hidden Achievement</h1>`;
        tooltipSection.innerHTML = `<p>Unlock this achievement to reveal it.</p>`;
    }
    setToolTipPos3(element);
    tooltip.classList.add('visible');
}

function showBuffTooltip(element, buff) {
    tooltip.style.backgroundImage = `url("${buff.icon}")`;
    tooltipHead.innerHTML = `<h1>${buff.name}</h1>`;
    tooltipSection.innerHTML = buff.description
    setToolTipPos(element); 
    tooltip.classList.add('visible');
}

/*
let researchPointsDiv = document.getElementById("researchPointsDiv");
researchPointsDiv.addEventListener('mouseover', () => showCurrentResearchCountTooltip(researchPointsDiv));
researchPointsDiv.addEventListener('mouseout', () => hideTooltip());
*/