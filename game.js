// Game State
let gameState = {
    username: "",
    currentChapterIndex: 0,
    currentSceneIndex: 0,
    xp: 0,
    level: 1,
    completedChapters: [],
    waitingForInteraction: false,
    currentInteraction: null
};

// Audio Elements
const sounds = {
    start: document.getElementById('snd-start'),
    on: document.getElementById('snd-on'),
    chime: document.getElementById('snd-chime'),
    alert: document.getElementById('snd-alert'),
    end: document.getElementById('snd-end'),
    boom: document.getElementById('snd-boom')
};

// UI Elements
const ui = {
    screens: {
        login: document.getElementById('login-screen'),
        start: document.getElementById('start-screen'),
        play: document.getElementById('play-screen'),
        chapterComplete: document.getElementById('chapter-complete-screen'),
        gameComplete: document.getElementById('game-complete-screen')
    },
    header: {
        playerInfo: document.getElementById('player-info'),
        chapterTitle: document.getElementById('chapter-title'),
        progressBar: document.getElementById('progress-bar'),
        xpValue: document.getElementById('xp-value'),
        levelValue: document.getElementById('level-value')
    },
    scene: {
        display: document.getElementById('scene-display'),
        arabicText: document.getElementById('arabic-text'),
        visualContext: document.getElementById('visual-context')
    },
    narrative: {
        box: document.querySelector('.narrative-box'),
        speaker: document.getElementById('speaker-name'),
        text: document.getElementById('narrative-text'),
        interactionArea: document.getElementById('interaction-area'),
        nextBtn: document.getElementById('btn-next'),
        choicesContainer: document.getElementById('choices-container')
    },
    login: {
        form: document.getElementById('login-form'),
        input: document.getElementById('username-input'),
        btn: document.getElementById('btn-login')
    }
};

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Show login screen first
    showScreen('login');

    // Login Event
    ui.login.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = ui.login.input.value.trim();
        if (name) {
            playSound('on');
            loginUser(name);
        }
    });

    // Start Game Event
    document.getElementById('btn-start-game').addEventListener('click', () => {
        playSound('start');
        startGame();
    });

    // Reset Event
    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm("Hapus progress untuk user ini?")) {
            resetProgress();
        }
    });

    // Logout Event
    document.getElementById('btn-logout').addEventListener('click', () => {
        playSound('on');
        logoutUser();
    });

    // Navigation Events
    ui.narrative.nextBtn.addEventListener('click', () => {
        playSound('on');
        nextScene();
    });

    document.getElementById('btn-next-chapter').addEventListener('click', () => {
        playSound('start');
        startNextChapter();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        resetGameSession();
        playSound('start');
        showScreen('start');
    });
});

// --- User Management ---

function loginUser(username) {
    gameState.username = username;
    loadProgress(username);
    updateHeaderUI();
    showScreen('start');

    // Welcome message
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg) {
        welcomeMsg.textContent = `Ahlan, ${username}! Siap melanjutkan petualangan?`;
    }
}

function logoutUser() {
    gameState.username = "";
    ui.login.input.value = "";
    showScreen('login');
}

function saveProgress() {
    if (!gameState.username) return;

    // Load all users
    let allUsers = JSON.parse(localStorage.getItem('arabGameUsers') || '{}');

    // Update current user
    allUsers[gameState.username] = {
        xp: gameState.xp,
        level: gameState.level,
        completedChapters: gameState.completedChapters
    };

    localStorage.setItem('arabGameUsers', JSON.stringify(allUsers));
}

function loadProgress(username) {
    let allUsers = JSON.parse(localStorage.getItem('arabGameUsers') || '{}');
    const userData = allUsers[username];

    if (userData) {
        gameState.xp = userData.xp || 0;
        gameState.level = userData.level || 1;
        gameState.completedChapters = userData.completedChapters || [];
    } else {
        // New user defaults
        gameState.xp = 0;
        gameState.level = 1;
        gameState.completedChapters = [];
    }
}

function resetProgress() {
    if (!gameState.username) return;

    gameState.xp = 0;
    gameState.level = 1;
    gameState.completedChapters = [];
    saveProgress();
    updateHeaderUI();
    alert("Progress berhasil direset.");
}

// --- Navigation & Flow ---

function showScreen(screenId) {
    // Hide all
    Object.values(ui.screens).forEach(s => {
        if(s) {
            s.classList.add('hidden');
            s.classList.remove('active');
        }
    });
    // Show target
    const target = ui.screens[screenId];
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
}

function startGame() {
    // Find first incomplete chapter
    let targetIdx = 0;
    const firstIncomplete = CHAPTERS.findIndex(c => !gameState.completedChapters.includes(c.id));

    if (firstIncomplete !== -1) {
        targetIdx = firstIncomplete;
    } else {
        targetIdx = 0; // Replay if all done
    }

    startChapter(targetIdx);
}

function startChapter(idx) {
    if (idx >= CHAPTERS.length) {
        showScreen('gameComplete');
        playSound('end');
        return;
    }

    gameState.currentChapterIndex = idx;
    gameState.currentSceneIndex = 0;

    updateHeaderUI();
    showScreen('play');
    renderScene();
}

function renderScene() {
    const chapter = CHAPTERS[gameState.currentChapterIndex];
    const scene = chapter.scenes[gameState.currentSceneIndex];

    // Update Progress
    const progress = ((gameState.currentSceneIndex) / chapter.scenes.length) * 100;
    ui.header.progressBar.style.width = `${progress}%`;

    // 1. Render Narrative
    ui.narrative.text.textContent = scene.text;
    ui.narrative.speaker.textContent = scene.speaker || "Narator";

    // 2. Render Arabic Text (Visuals)
    ui.scene.arabicText.innerHTML = '';
    ui.narrative.choicesContainer.innerHTML = '';
    ui.narrative.choicesContainer.classList.add('hidden');

    if (scene.arabic) {
        const words = scene.arabic.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.classList.add('arabic-word');
            span.dataset.word = word.trim();

            if (scene.interaction === 'click-word') {
                span.classList.add('clickable');
                span.addEventListener('click', () => handleWordClick(word.trim(), span, scene));
            }

            ui.scene.arabicText.appendChild(span);
        });
    }

    // 3. Handle Interaction State
    gameState.waitingForInteraction = false;
    ui.narrative.nextBtn.classList.remove('hidden');

    if (scene.interaction) {
        gameState.waitingForInteraction = true;
        ui.narrative.nextBtn.classList.add('hidden');

        if (scene.interaction === 'choice') {
            renderChoices(scene);
        }
    }

    if (!scene.interaction) {
        ui.narrative.nextBtn.textContent = (gameState.currentSceneIndex === chapter.scenes.length - 1) ? "Selesai Bab Ini" : "Lanjut";
    }
}

// --- Interaction Handlers ---

function handleWordClick(word, element, scene) {
    if (!gameState.waitingForInteraction) return;

    // Check match (relaxed)
    const isCorrect = word.includes(scene.target) || scene.target.includes(word);

    if (isCorrect) {
        element.classList.add('correct');
        playSound('chime');
        finishInteraction(scene.feedback);
    } else {
        element.classList.add('wrong');
        playSound('alert');
        setTimeout(() => element.classList.remove('wrong'), 500);
    }
}

function renderChoices(scene) {
    ui.narrative.choicesContainer.classList.remove('hidden');

    scene.choices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.textContent = choiceText;
        btn.classList.add('choice-btn');
        btn.addEventListener('click', () => {
            if (!gameState.waitingForInteraction) return;

            if (choiceText === scene.correctChoice) {
                btn.style.backgroundColor = '#55efc4';
                btn.style.color = '#fff';
                playSound('chime');
                finishInteraction(scene.feedback);
            } else {
                btn.style.backgroundColor = '#ff7675';
                btn.style.color = '#fff';
                playSound('alert');
            }
        });
        ui.narrative.choicesContainer.appendChild(btn);
    });
}

function finishInteraction(feedbackText) {
    gameState.waitingForInteraction = false;

    if (feedbackText) {
        ui.narrative.text.textContent = feedbackText;
        ui.narrative.speaker.textContent = "Ustadz";
    }

    ui.narrative.nextBtn.classList.remove('hidden');
    ui.narrative.nextBtn.textContent = (gameState.currentSceneIndex === CHAPTERS[gameState.currentChapterIndex].scenes.length - 1) ? "Selesai Bab Ini" : "Lanjut";

    const words = document.querySelectorAll('.arabic-word');
    words.forEach(w => w.classList.remove('clickable'));

    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(b => b.disabled = true);
}

function nextScene() {
    const chapter = CHAPTERS[gameState.currentChapterIndex];

    if (gameState.currentSceneIndex < chapter.scenes.length - 1) {
        gameState.currentSceneIndex++;
        renderScene();
    } else {
        completeChapter();
    }
}

function completeChapter() {
    const chapter = CHAPTERS[gameState.currentChapterIndex];

    if (!gameState.completedChapters.includes(chapter.id)) {
        gameState.completedChapters.push(chapter.id);
        addXP(chapter.xpReward);
    }

    saveProgress();

    document.getElementById('chapter-xp').textContent = chapter.xpReward;
    showScreen('chapterComplete');
    playSound('end');
}

function startNextChapter() {
    startChapter(gameState.currentChapterIndex + 1);
}

function resetGameSession() {
    gameState.currentChapterIndex = 0;
    gameState.currentSceneIndex = 0;
}

// --- XP & Leveling ---

function addXP(amount) {
    gameState.xp += amount;

    // Level up every 1000 XP
    const newLevel = Math.floor(gameState.xp / 1000) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        alert(`Selamat! Kamu naik ke Level ${newLevel}!`);
        playSound('chime');
    }

    updateHeaderUI();
}

function updateHeaderUI() {
    if (ui.header.xpValue) ui.header.xpValue.textContent = gameState.xp;
    if (ui.header.levelValue) ui.header.levelValue.textContent = gameState.level;

    if (gameState.username) {
        ui.header.playerInfo.textContent = `${gameState.username} (Lvl ${gameState.level})`;
    }

    const chapter = CHAPTERS[gameState.currentChapterIndex];
    if (ui.header.chapterTitle && chapter) {
        ui.header.chapterTitle.textContent = chapter.title;
    }
}

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play().catch(e => console.log("Audio play prevented:", e));
    }
}
