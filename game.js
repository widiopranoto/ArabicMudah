// Game State
let gameState = {
    username: "",
    currentChapterIndex: 0,
    currentSceneIndex: 0,
    xp: 0,
    level: 1,
    completedChapters: [],
    waitingForInteraction: false,
    currentInteraction: null,
    totalScore: 0 // New field
};

// Cloud Configuration
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8CxU6QFmwF3CD-zjZRAZuZ34_P9tAZOjpXyiPrywHSHkRiGgdRwGvzU2ikqcHO0eY_Q/exec"; // Placeholder

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
        levelSelect: document.getElementById('level-select-screen'), // New
        start: document.getElementById('start-screen'), // Will be replaced by Level Select
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
    if (ui.login.form) {
        ui.login.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = ui.login.input.value.trim();
            if (name) {
                try {
                    playSound('on');
                } catch (err) {
                    console.warn("Audio play failed, continuing login...", err);
                }
                loginUser(name);
            }
        });
    }

    // Start Game Event (From Level Select)
    // No longer using #btn-start-game for global start, logic moved to level selection

    // Reset Event
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if(confirm("Hapus progress untuk user ini?")) {
                resetProgress();
            }
        });
    }
    
    // Logout Event
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            playSound('on');
            logoutUser();
        });
    }

    // Navigation Events
    if (ui.narrative.nextBtn) {
        ui.narrative.nextBtn.addEventListener('click', () => {
            playSound('on');
            nextScene();
        });
    }

    const btnNextChapter = document.getElementById('btn-next-chapter');
    if (btnNextChapter) {
        btnNextChapter.addEventListener('click', () => {
            playSound('start');
            startNextChapter();
        });
    }
    
    // Back to Level Select
    const btnBackMenu = document.getElementById('btn-back-menu');
    if (btnBackMenu) {
        btnBackMenu.addEventListener('click', () => {
            playSound('on');
            showLevelSelect();
        });
    }

    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            resetGameSession();
            playSound('start');
            showLevelSelect();
        });
    }
});

// --- User Management ---

function loginUser(username) {
    gameState.username = username;
    loadProgress(username);
    updateHeaderUI();
    showLevelSelect(); // Navigate to Level Select instead of Start Screen
    
    // Attempt cloud sync on login (fire & forget)
    syncProgressToCloud();
}

function logoutUser() {
    gameState.username = "";
    if (ui.login.input) ui.login.input.value = "";
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
        completedChapters: gameState.completedChapters,
        totalScore: gameState.totalScore // Save score
    };
    
    localStorage.setItem('arabGameUsers', JSON.stringify(allUsers));
    
    // Sync to Google Sheet
    syncProgressToCloud();
}

function loadProgress(username) {
    let allUsers = JSON.parse(localStorage.getItem('arabGameUsers') || '{}');
    const userData = allUsers[username];

    if (userData) {
        gameState.xp = userData.xp || 0;
        gameState.level = userData.level || 1;
        gameState.completedChapters = userData.completedChapters || [];
        gameState.totalScore = userData.totalScore || 0;
    } else {
        // New user defaults
        gameState.xp = 0;
        gameState.level = 1;
        gameState.completedChapters = [];
        gameState.totalScore = 0;
    }
}

function resetProgress() {
    if (!gameState.username) return;
    
    gameState.xp = 0;
    gameState.level = 1;
    gameState.completedChapters = [];
    gameState.totalScore = 0;
    saveProgress();
    updateHeaderUI();
    showLevelSelect(); // Refresh UI
    alert("Progress berhasil direset.");
}

async function syncProgressToCloud() {
    if (!gameState.username || !GOOGLE_SCRIPT_URL.includes("script.google.com")) return;

    const payload = {
        username: gameState.username,
        level: gameState.level,
        xp: gameState.xp,
        score: gameState.totalScore
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors for Google Script Web App unless properly configured with CORS
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log("Synced to cloud successfully");
    } catch (e) {
        console.error("Cloud sync failed:", e);
    }
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
    } else {
        console.warn(`Screen '${screenId}' not found. Check HTML structure.`);
    }
}

function showLevelSelect() {
    updateHeaderUI();
    
    // Generate Level Cards
    const container = document.getElementById('level-grid');
    if (!container) {
        console.warn("Level Select container missing. Falling back to Chapter 1.");
        // Fallback for missing Level Select screen (e.g. old HTML)
        startChapter(0);
        return; 
    }
    
    container.innerHTML = '';
    
    CHAPTERS.forEach((chapter, index) => {
        const isLocked = index > 0 && !gameState.completedChapters.includes(CHAPTERS[index-1].id);
        const isCompleted = gameState.completedChapters.includes(chapter.id);
        
        const card = document.createElement('div');
        card.className = `level-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
        
        // Card Content
        let statusIcon = isLocked ? '🔒' : (isCompleted ? '✅' : '📖');
        
        card.innerHTML = `
            <div class="level-icon">${statusIcon}</div>
            <div class="level-info">
                <h3>${chapter.title}</h3>
                <p>${chapter.description}</p>
                ${isCompleted ? '<span class="badge-completed">Selesai</span>' : ''}
            </div>
        `;
        
        if (!isLocked) {
            card.addEventListener('click', () => {
                playSound('start');
                startChapter(index);
            });
        }
        
        container.appendChild(card);
    });
    
    showScreen('levelSelect');
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
    if (ui.header.progressBar) ui.header.progressBar.style.width = `${progress}%`;

    // 1. Render Narrative
    if (ui.narrative.text) ui.narrative.text.textContent = scene.text;
    if (ui.narrative.speaker) ui.narrative.speaker.textContent = scene.speaker || "Narator";
    
    // 2. Render Arabic Text (Visuals)
    if (ui.scene.arabicText) ui.scene.arabicText.innerHTML = '';
    if (ui.narrative.choicesContainer) {
        ui.narrative.choicesContainer.innerHTML = '';
        ui.narrative.choicesContainer.classList.add('hidden');
    }
    
    if (scene.arabic && ui.scene.arabicText) {
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
    if (ui.narrative.nextBtn) ui.narrative.nextBtn.classList.remove('hidden'); 

    if (scene.interaction) {
        gameState.waitingForInteraction = true;
        if (ui.narrative.nextBtn) ui.narrative.nextBtn.classList.add('hidden');
        
        if (scene.interaction === 'choice') {
            renderChoices(scene);
        }
    }
    
    if (!scene.interaction && ui.narrative.nextBtn) {
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
        try { playSound('chime'); } catch (e) { console.warn(e); }
        finishInteraction(scene.feedback);
    } else {
        element.classList.add('wrong');
        try { playSound('alert'); } catch (e) { console.warn(e); }
        setTimeout(() => element.classList.remove('wrong'), 500);
    }
}

function renderChoices(scene) {
    if (ui.narrative.choicesContainer) ui.narrative.choicesContainer.classList.remove('hidden');
    
    scene.choices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.textContent = choiceText;
        btn.classList.add('choice-btn');
        btn.addEventListener('click', () => {
            if (!gameState.waitingForInteraction) return;
            
            if (choiceText === scene.correctChoice) {
                btn.style.backgroundColor = '#55efc4';
                btn.style.color = '#fff';
                try { playSound('chime'); } catch (e) { console.warn(e); }
                finishInteraction(scene.feedback);
            } else {
                btn.style.backgroundColor = '#ff7675';
                btn.style.color = '#fff';
                try { playSound('alert'); } catch (e) { console.warn(e); }
            }
        });
        if (ui.narrative.choicesContainer) ui.narrative.choicesContainer.appendChild(btn);
    });
}

function finishInteraction(feedbackText) {
    gameState.waitingForInteraction = false;
    
    if (feedbackText && ui.narrative.text) {
        ui.narrative.text.textContent = feedbackText;
        if (ui.narrative.speaker) ui.narrative.speaker.textContent = "Ustadz";
    }

    if (ui.narrative.nextBtn) {
        ui.narrative.nextBtn.classList.remove('hidden');
        ui.narrative.nextBtn.textContent = (gameState.currentSceneIndex === CHAPTERS[gameState.currentChapterIndex].scenes.length - 1) ? "Selesai Bab Ini" : "Lanjut";
    }
    
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
    
    const xpSpan = document.getElementById('chapter-xp');
    if (xpSpan) xpSpan.textContent = chapter.xpReward;
    showScreen('chapterComplete');
    playSound('end');
}

function startNextChapter() {
    // Return to level select instead of auto-next
    showLevelSelect();
}

function resetGameSession() {
    gameState.currentChapterIndex = 0;
    gameState.currentSceneIndex = 0;
}

// --- XP & Leveling ---

function addXP(amount) {
    gameState.xp += amount;
    gameState.totalScore += amount; // Assuming score = total XP gained
    
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
    // XP Display: Current / Next Level Target
    const nextLevelXP = gameState.level * 1000;
    const currentLevelProgress = gameState.xp % 1000;
    
    if (ui.header.xpValue) {
        ui.header.xpValue.textContent = `${gameState.xp} / ${nextLevelXP}`;
    }
    
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
        try {
            sounds[name].currentTime = 0;
            const playPromise = sounds[name].play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn(`Audio '${name}' play prevented (likely autoplay policy):`, e);
                });
            }
        } catch (e) {
            console.error("Audio error:", e);
        }
    }
}
