// Game State
let gameState = {
    currentLevelIndex: 0,
    currentQuestionIndex: 0,
    xp: 0,
    playerLevel: 1, // RPG-style player level
    completedLevels: [], // IDs of completed levels
    score: 0
};

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    levelComplete: document.getElementById('level-complete-screen'),
    gameComplete: document.getElementById('game-complete-screen')
};

const ui = {
    xpDisplay: document.getElementById('xp-display'),
    levelDisplay: document.getElementById('level-display'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    feedbackArea: document.getElementById('feedback-area'),
    feedbackText: document.getElementById('feedback-text'),
    nextBtn: document.getElementById('next-btn'),
    levelXpGain: document.getElementById('level-xp-gain')
};

const sounds = {
    correct: document.getElementById('snd-correct'),
    wrong: document.getElementById('snd-wrong'),
    click: document.getElementById('snd-click'),
    win: document.getElementById('snd-win')
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateStatsUI();

    document.getElementById('start-btn').addEventListener('click', () => {
        playSound('click');
        startGame();
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        playSound('click');
        if(confirm('Apakah kamu yakin ingin menghapus semua progress?')) {
            resetProgress();
        }
    });

    ui.nextBtn.addEventListener('click', () => {
        playSound('click');
        nextQuestion();
    });

    document.getElementById('next-level-btn').addEventListener('click', () => {
        playSound('click');
        startNextLevel();
    });

    document.getElementById('restart-game-btn').addEventListener('click', () => {
        playSound('click');
        resetGameSession();
        showScreen('start');
    });
});

// Navigation Functions
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden'); // Ensure hidden class is added
        setTimeout(() => {
             // giving a small delay for animation logic if needed,
             // but for now just display:none via class
        }, 0);
    });

    // Show target screen
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
        // Force reflow for animation
        void screens[screenName].offsetWidth;
        screens[screenName].classList.add('active');
    }
}

// Game Logic
function startGame() {
    // Determine which level to start based on progress
    // For simplicity, we just loop through levels 1-6
    gameState.currentLevelIndex = 0;

    // Check if we can skip levels? (Optional, for now start from 0 or last saved?)
    // Let's start from the first incomplete level found in order
    const firstIncomplete = GAME_DATA.levels.findIndex(lvl => !gameState.completedLevels.includes(lvl.id));
    if (firstIncomplete !== -1) {
        gameState.currentLevelIndex = firstIncomplete;
    } else {
        // All completed, maybe restart or just start at 0
        gameState.currentLevelIndex = 0;
    }

    startLevel(gameState.currentLevelIndex);
}

function startLevel(index) {
    if (index >= GAME_DATA.levels.length) {
        showScreen('gameComplete');
        playSound('win');
        return;
    }

    gameState.currentLevelIndex = index;
    gameState.currentQuestionIndex = 0;

    showScreen('game');
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    const level = GAME_DATA.levels[gameState.currentLevelIndex];
    const question = level.questions[gameState.currentQuestionIndex];

    // Reset UI
    ui.questionText.textContent = question.question;
    ui.optionsContainer.innerHTML = '';
    ui.feedbackArea.classList.add('hidden');
    ui.feedbackArea.classList.remove('correct', 'wrong');
    ui.nextBtn.classList.add('hidden');

    // Create Options
    question.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.addEventListener('click', () => checkAnswer(opt, btn));
        ui.optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedOption, btnElement) {
    // Prevent multiple clicks
    const allBtns = ui.optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    const level = GAME_DATA.levels[gameState.currentLevelIndex];
    const question = level.questions[gameState.currentQuestionIndex];
    const isCorrect = selectedOption === question.answer;

    if (isCorrect) {
        btnElement.classList.add('correct');
        ui.feedbackText.textContent = "Benar! Bagus sekali.";
        ui.feedbackArea.classList.add('correct');
        playSound('correct');
        addXP(10); // Base XP per question
    } else {
        btnElement.classList.add('wrong');
        // Highlight correct answer
        allBtns.forEach(b => {
            if (b.textContent === question.answer) b.classList.add('correct');
        });
        ui.feedbackText.textContent = `Salah. Jawaban yang benar adalah: ${question.answer}`;
        ui.feedbackArea.classList.add('wrong');
        playSound('wrong');
    }

    ui.feedbackArea.classList.remove('hidden');
    ui.nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    const level = GAME_DATA.levels[gameState.currentLevelIndex];
    gameState.currentQuestionIndex++;

    updateProgressBar();

    if (gameState.currentQuestionIndex < level.questions.length) {
        showQuestion();
    } else {
        finishLevel();
    }
}

function updateProgressBar() {
    const level = GAME_DATA.levels[gameState.currentLevelIndex];
    const progress = ((gameState.currentQuestionIndex) / level.questions.length) * 100;
    ui.progressBar.style.width = `${progress}%`;
}

function finishLevel() {
    const level = GAME_DATA.levels[gameState.currentLevelIndex];

    // Add Bonus XP for level completion
    const bonusXP = level.xpReward;
    addXP(bonusXP);

    // Mark as completed
    if (!gameState.completedLevels.includes(level.id)) {
        gameState.completedLevels.push(level.id);
    }

    saveProgress();

    ui.levelXpGain.textContent = `+${bonusXP} XP`;
    playSound('win');
    showScreen('levelComplete');
}

function startNextLevel() {
    startLevel(gameState.currentLevelIndex + 1);
}

function resetGameSession() {
    gameState.currentLevelIndex = 0;
    gameState.currentQuestionIndex = 0;
}

// Stats & Persistence
function addXP(amount) {
    gameState.xp += amount;

    // Simple leveling system: Level up every 500 XP
    const newLevel = Math.floor(gameState.xp / 500) + 1;
    if (newLevel > gameState.playerLevel) {
        gameState.playerLevel = newLevel;
        // Could play a level up sound here
        alert(`Level Up! Kamu sekarang level ${newLevel}!`);
    }

    updateStatsUI();
    saveProgress();
}

function updateStatsUI() {
    ui.xpDisplay.textContent = gameState.xp;
    ui.levelDisplay.textContent = gameState.playerLevel;
}

function saveProgress() {
    const data = {
        xp: gameState.xp,
        playerLevel: gameState.playerLevel,
        completedLevels: gameState.completedLevels
    };
    localStorage.setItem('arabGameProgress', JSON.stringify(data));
}

function loadProgress() {
    const saved = localStorage.getItem('arabGameProgress');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.xp = data.xp || 0;
        gameState.playerLevel = data.playerLevel || 1;
        gameState.completedLevels = data.completedLevels || [];
    }
}

function resetProgress() {
    localStorage.removeItem('arabGameProgress');
    gameState.xp = 0;
    gameState.playerLevel = 1;
    gameState.completedLevels = [];
    updateStatsUI();
    location.reload();
}

// Audio Helper
function playSound(name) {
    const audio = sounds[name];
    if (audio) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio play failed (interaction needed or file missing):", error);
            });
        }
    }
}
