function updateReportsButton() {
    const reportsTab = document.getElementById('reports-tab');
    if (Printer.level > 0) {
        reportsTab.style.display = 'block';
    }
}

let reportsInitialized = false;

function initReports() {
    if (!reportsInitialized) {
        const reportsContainer = document.getElementById('production-reports');
        buildings.forEach(building => {
            const reportDiv = document.createElement('div');
            reportDiv.id = `report-${building.id}`;
            reportDiv.className = "report";
            reportDiv.style.backgroundImage = `url("images/tooltips/buildings/${building.id}.jpg")`;
            reportsContainer.appendChild(reportDiv);
        });
        reportsInitialized = true;
    }
    displayReports();
}

function getReportSignature(building) {
    const activeModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(building.id))
    .map(mod => {
        const multiplier = typeof mod.getMultiplier === 'function'
        ? mod.getMultiplier()
        : mod.multiplier || 1;
        return {
            name: mod.name,
            multiplier
        };
    });
    
    // Return a JSON-serializable object that includes the level and the modifiers.
    return JSON.stringify({
        level: building.level,
        modifiers: activeModifiers
    });
}

function displayReports() {
    updateReportsButton();
    updateManualReport();
    buildings.forEach(building => {
        const reportDiv = document.getElementById(`report-${building.id}`);
        if (!reportDiv) return;
        
        if (building.level > 0) {
            reportDiv.style.display = 'block';
            
            // 1. Compute the new signature.
            const newSignature = getReportSignature(building);
            
            // 2. Compare with existing (stored) signature.
            const oldSignature = reportDiv.dataset.modifiersSignature;
            
            // 3. If they differ, update the ul content.
            if (newSignature !== oldSignature) {
                // Rebuild only the <ul> or the entire content if you prefer
                const baseProduction = building.baseProduce;
                const singleProduce = building.getProduceSingle();
                const totalProduction = building.getProduce();
                
                const activeModifiers = modifiers
                .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(building.id))
                .map(mod => {
                    const multiplier = typeof mod.getMultiplier === 'function'
                    ? mod.getMultiplier()
                    : mod.multiplier || 1;
                    const percentage = ((multiplier - 1) * 100).toFixed(2);
                    return {
                        name: mod.name,
                        multiplier,
                        percentage
                    };
                });
                
                let modifiersDetails = activeModifiers.length
                ? activeModifiers.map(mod => `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${mod.percentage}%</span></li>`).join("")
                : '<li>None</li>';
                
                // Compute total multiplier
                const totalMultiplier = activeModifiers.reduce(
                    (acc, mod) => acc * mod.multiplier,
                    1
                );
                
                
                
                
                // Update the inner HTML (or just the UL portion).
                reportDiv.innerHTML = `
                    <div class="report-receipt">
                    <h3>${building.name}</h3>
                    <hr>
                    <p><strong>Owned:</strong> ${building.level}</p>
                    <p><strong>Base Production:</strong> ${baseProduction.toFixed(2)} keystrokes/second</p>
                    <p><strong>Active Modifiers:</strong></p>
                    <ul>${modifiersDetails}</ul>
                    <p><strong>Total Multiplier:</strong> ${totalMultiplier.toFixed(2)}x</p>
                    <hr>
                    <p><strong>Single Production:</strong> ${formatShortScale(singleProduce)} keystrokes/second</p>
                    <p><strong>Total Production:</strong> ${formatShortScale(totalProduction)} keystrokes/second</p>
                    </div>
                    `;
                
                // Update the stored signature so we don’t rebuild again unnecessarily.
                reportDiv.dataset.modifiersSignature = newSignature;
                reportDiv.querySelector('.report-receipt').classList.add('updated');
                setTimeout(() => {
                    reportDiv.querySelector('.report-receipt').classList.remove('updated');
                }, 500); // Remove class after animation
            }
        } else {
            reportDiv.style.display = 'none';
        }
    });
}

function updateManualReport() {
    let manualIncomeReport = document.getElementById('report-manual');
    
    // Calculate value of one manual keystroke
    const baseManualKeystrokeValue = applyKPStoManual(1); // Apply KPS to manual keystrokes
    const modifiedManualKeystrokeValue = applyModifiers(0, baseManualKeystrokeValue); // Apply modifiers
    
    
    const passiveIncome = getPassiveIncome();
    // List modifiers that increase manual keystrokes value
    const manualModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(0))
    .map(mod => {
        const kps = typeof mod.getKPStoManual === 'function'
        ? mod.getKPStoManual()
        : mod.KPStoManual;
        if(kps) {
            const flatBoost = kps * getPassiveIncome();
            return `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${formatShortScale(flatBoost)} (${(kps * 100).toFixed(2)}% of passive income)</span></li>`;
        } else {
            return ``;
        }
    });
    
    // List multipliers for manual keystrokes
    const activeModifiers = modifiers
    .filter(mod => mod.affectedBuildings && mod.affectedBuildings.includes(0))
    .map(mod => {
        const multiplier = typeof mod.getMultiplier === 'function'
        ? mod.getMultiplier()
        : mod.multiplier || 1;
        const percentage = ((multiplier - 1) * 100).toFixed(2);
        return {
            name: mod.name,
            multiplier,
            percentage
        };
    });
    
    let modifiersDetails = activeModifiers.length
    ? activeModifiers.map(mod => `<li><span class="modifierName">${mod.name}:</span> <span class="modifierValue">+${mod.percentage}%</span></li>`).join("")
    : '<li>None</li>';
    
    // Compute total multiplier
    const totalMultiplier = activeModifiers.reduce(
        (acc, mod) => acc * mod.multiplier,
        1
    );
    
    let manualFlatModifiersDetails = manualModifiers.length
    ? manualModifiers.join("")
    : '<li>None</li>';
    
    
    if(manualFlatModifiersDetails === "") {
        manualFlatModifiersDetails = '<li>None</li>';
    }
    
    let newHTML = `
        <div class="report-receipt">
        <h3>Manual Keystrokes Value</h3>
        <hr>
        <p><strong>Base Value:</strong> 1 keystroke</p>
        <p><strong>Flat Modifiers:</strong></p>
        <ul>${manualFlatModifiersDetails}</ul>
        <p><strong>Value after flat modifiers:</strong> ${baseManualKeystrokeValue.toFixed(2)} keystrokes</p>
        <hr>
        <p><strong>Multiplier Modifiers:</strong></p>
        <ul>${modifiersDetails}</ul>
        <p><strong>Total Multiplier:</strong> ${totalMultiplier.toFixed(2)}x</p>
        <hr>
        <p><strong>Value after multiplier modifiers:</strong> ${formatShortScale(modifiedManualKeystrokeValue)} keystrokes</p>
        </div>
        `;
    if(manualIncomeReport.innerHTML != newHTML) {
        manualIncomeReport.innerHTML = newHTML;
        manualIncomeReport.querySelector('.report-receipt').classList.add('updated');
        setTimeout(() => {
            manualIncomeReport.querySelector('.report-receipt').classList.remove('updated');
        }, 500); // Remove class after animation
    }
}