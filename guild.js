let guildInit = false;
let guildUIState = "";
function displayGuild() {
    if(!guildInit) {
        if(TypingGuild.level == 0) return;
        document.getElementById('guild-tab').style.display = 'block';
        document.querySelectorAll('input[name="guild-task"]').forEach(input => {
            input.addEventListener('change', handleGuildTaskChange);
        });
        if(currentGuildTask === "wordle") {
            document.getElementById('wordle-guild').checked = true;
            activateWordleGuild();
        }
        if(currentGuildTask === "arena") {
            document.getElementById('arena-guild').checked = true;
            activateArenaGuild();
        }
        if(currentGuildTask === "publishing") {
            document.getElementById('publishing-guild').checked = true;
            activatePublishingGuild();
        }
        guildInit = true;
    }
    let guildChangeCooldown = modifiers.find(modifier => modifier.name === "Guild task change cooldown");
    if(guildChangeCooldown) {
        if(guildUIState != "cooldown") {
            guildUIState = "cooldown";
            document.getElementById('guild-task-change-remaining').style.display = 'block';
            document.querySelectorAll('input[name="guild-task"]').forEach(input => {
                input.disabled = true;
            });
        }
        document.getElementById('guild-task-change-remaining').textContent = `Change cooldown: ${(guildChangeCooldown.duration / Tickrate).toFixed(0)}s`;
    } else {
        if(guildUIState != "init") {
            guildUIState = "init";
            document.getElementById('guild-task-change-remaining').style.display = 'none';
            document.querySelectorAll('input[name="guild-task"]').forEach(input => {
                input.disabled = false;
            });
        }
    }
}

function handleGuildTaskChange(event) {
    playClickSound();
    currentGuildTask = event.target.value;
    spawnBoost(5); // Set a cooldown on changing guild tasks
    switch (currentGuildTask) {
    case 'wordle':
    activateWordleGuild();
    break;
    case 'arena':
    activateArenaGuild();
    break;
    case 'publishing':
    activatePublishingGuild();
    break;
    }
    gtag('event', 'guild_task_change', {
        'guild_task': currentGuildTask
      });
}
function activateWordleGuild() {
    document.getElementById('additional-wordle-hint').style.display = 'block';
    deactivateArenaGuild();
    deactivatePublishingGuild();
}
function activateArenaGuild() {

    deactivateWordleGuild();
    deactivatePublishingGuild();
}

function activatePublishingGuild() {
    
    deactivateWordleGuild();
    deactivateArenaGuild();
}

function deactivateWordleGuild() {
    document.getElementById('additional-wordle-hint').style.display = 'none';
}
function deactivateArenaGuild() {

}
function deactivatePublishingGuild() {
    
}
//document.getElementById('additional-wordle-hint')