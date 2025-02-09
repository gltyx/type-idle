let memoryUIState = "";
let memorySequenceActive = false;
let memoryStoryActive = false;
let memoryInput = false;
let memoryGameOver = false;
let memoryLevel = 0;
let memorySequence = "";
let memorySequenceInput = "";
let memoryStory;

function displayMemory() {
    if (AIAgent.level > 0) {
        document.getElementById('memory-tab').disabled = false;
    }
    if (memorySequenceActive) {
        handleMemorySequence();
    } else if (memoryStoryActive) {
        handleMemoryStory();
    } else {
        handleMemoryReadyOrGameOver();
    }
}

function handleMemorySequence() {
    if (memoryInput) {
        if (memoryUIState !== "input") {
            memoryUIState = "input";
            document.getElementById('memory-sequence-input').style.display = "flex";
            document.getElementById('memory-sequence-game-canvas').style.display = "none";
            document.getElementById('memory-input-box').focus();
        }
    } else {
        if (memoryUIState !== "active") {
            memoryUIState = "active";
            document.getElementById('memory-input-box').value = "";
            document.getElementById('memory-sequence-score').innerText = memoryLevel;
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-start').style.display = "none";
            document.getElementById('memory-sequence-input').style.display = "none";
            document.getElementById('memory-sequence-game-canvas').style.display = "flex";
            document.getElementById('memory-sequence').innerText = memorySequence;
        }
    }
}

function handleMemoryStory() {
    if (memoryInput) {
        if (memoryUIState !== "input") {
            memoryUIState = "input";
            document.getElementById('memory-story-remember-btn').style.display = "none";
            document.getElementById('memory-story-submit-btn').style.display = "block";
            document.getElementById('memory-story-questions').style.display = "block";
            document.getElementById('memory-story-text').classList.add("blur");
            document.getElementById('memory-story-questions').innerHTML = "";
            memoryStory.questions.forEach((question, index) => {
                document.getElementById('memory-story-questions').innerHTML += `
                    <div class="memory-question">
                        <p>${question.question} <span class="memory-result"></span></p>
                        <div class="memory-options grid-2x2">
                            ${question.options.map((option, index) => `
                                <div class="memory-option" onclick="selectMemoryOption(this)">
                                    <div class="memory-option-answer">${String.fromCharCode(65 + index)}</div>
                                    <div class="memory-option-text">${option}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
        }
    } else {
        if (memoryUIState !== "active") {
            memoryUIState = "active";
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-story-title').innerText = memoryStory.title;
            document.getElementById('memory-story-text').innerText = memoryStory.content;
            document.getElementById('memory-story-text').classList.remove("blur");
            document.getElementById('memory-start').style.display = "none";
            document.getElementById('memory-story').style.display = "flex";
            document.getElementById('memory-story-remember-btn').style.display = "block";
            document.getElementById('memory-story-retry-btn').style.display = "none";
            document.getElementById('memory-story-submit-btn').style.display = "none";
            document.getElementById('memory-story-questions').style.display = "none";
        }
    }
}

function handleMemoryReadyOrGameOver() {
    if (!memoryGameOver) {
        if (memoryUIState !== "ready") {
            memoryUIState = "ready";
            document.getElementById('memory-input-box').value = "";
            document.getElementById('memory-tab').classList.add("ready");
            document.getElementById('memory-start').style.display = "flex";
            document.getElementById('memory-story').style.display = "none";
            document.getElementById('memory-game-over').style.display = "none";
        }
    } else {
        if (memoryUIState !== "gameover") {
            memoryUIState = "gameover";
            document.getElementById('memory-sequence-score2').innerText = memoryLevel;
            document.getElementById('memory-tab').classList.remove("ready");
            document.getElementById('memory-game-over').style.display = "flex";
            document.getElementById('memory-sequence-input').style.display = "none";
        }
    }
}

function resetMemoryGame() {
    memorySequenceActive = false;
    memoryStoryActive = false;
    memoryInput = false;
    memoryGameOver = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
}

function startMemorySequence() {
    if (memorySequenceActive || memoryStoryActive) return;

    memorySequenceActive = true;
    memoryInput = false;
    memoryLevel = 0;
    memorySequence = "";
    memorySequenceInput = "";
    generateSequence();
    generateSequence();
    generateSequence();
}

function startMemoryStory() {
    if (memorySequenceActive || memoryStoryActive) return;

    memoryStoryActive = true;
    memoryInput = false;
    memoryStory = stories[Math.floor(Math.random() * stories.length)];
}

function generateSequence() {
    memorySequence += Math.floor(Math.random() * 10);
}

function memoryBeginSequence() {
    if (!memorySequenceActive || memoryInput) return;
    memoryInput = true;
}

function memoryBeginStory() {
    if (!memoryStoryActive || memoryInput) return;
    memoryInput = true;
}

function memorySubmitSequence() {
    if (!memoryInput) return;

    memorySequenceInput = document.getElementById('memory-input-box').value;
    if (memorySequenceInput === memorySequence) {
        memoryLevel += 1;
        generateSequence();
        memoryInput = false;
    } else {
        memorySequenceActive = false;
        memoryInput = false;
        memoryGameOver = true;
    }
}
function selectMemoryOption(element) {
    // Remove the selected class from all options
    const options = element.parentElement.querySelectorAll('.memory-option');
    options.forEach(option => option.classList.remove('selected'));

    // Add the selected class to the clicked option
    element.classList.add('selected');
}

function memorySubmitStory() {
    if (!memoryInput) return;

    let correctAnswers = 0;
    const questions = document.querySelectorAll('.memory-question');
    questions.forEach((question, questionIndex) => {
        // Mark all the options correct/incorrect
        const options = question.querySelectorAll('.memory-option');
        options.forEach(option => {
            const optionText = option.querySelector('.memory-option-text').innerText;
            if (optionText === memoryStory.questions[questionIndex].answer) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        });

        // Check the selected option
        const selectedOption = question.querySelector('.memory-option.selected');
        if (selectedOption) {
            const selectedAnswer = selectedOption.querySelector('.memory-option-text').innerText;
            if (selectedAnswer === memoryStory.questions[questionIndex].answer) {
                correctAnswers += 1;
                question.querySelector('.memory-result').innerText = "✅";
            } else {
                question.querySelector('.memory-result').innerText = "❌";
            }
        }
    });

    document.getElementById('memory-story-retry-btn').style.display = "block";
    document.getElementById('memory-story-submit-btn').style.display = "none";

    /*
    if (correctAnswers === memoryStory.questions.length) {
        memoryLevel += 1;
        memoryInput = false;
        // Proceed to the next story or sequence
    } else {
        memoryStoryActive = false;
        memoryInput = false;
        memoryGameOver = true;
    } */
}