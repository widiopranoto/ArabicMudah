// Game State
let gameState = {
    currentChapterIndex: 0,
    currentSceneIndex: 0,
    xp: 0,
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
        start: document.getElementById('start-screen'),
        play: document.getElementById('play-screen'),
        chapterComplete: document.getElementById('chapter-complete-screen'),
        gameComplete: document.getElementById('game-complete-screen')
    },
    header: {
        chapterTitle: document.getElementById('chapter-title'),
        progressBar: document.getElementById('progress-bar'),
        xpValue: document.getElementById('xp-value')
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
    }
};

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateHeaderUI();

    // Event Listeners
    document.getElementById('btn-start-game').addEventListener('click', () => {
        playSound('start');
        startGame();
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm("Hapus semua progress?")) {
            resetProgress();
        }
    });

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

// --- Navigation & Flow ---

function showScreen(screenId) {
    // Hide all
    Object.values(ui.screens).forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });
    // Show target
    const target = document.getElementById(`${screenId}-screen`) || ui.screens[screenId];
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
}

function startGame() {
    // Find first incomplete chapter
    let targetIdx = 0;
    // For simplicity, find the first one that is NOT in completedChapters
    const firstIncomplete = CHAPTERS.findIndex(c => !gameState.completedChapters.includes(c.id));

    if (firstIncomplete !== -1) {
        targetIdx = firstIncomplete;
    } else {
        // All done, maybe reset to 0 or stay at last?
        targetIdx = 0;
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
    ui.scene.arabicText.innerHTML = ''; // Clear previous
    ui.narrative.choicesContainer.innerHTML = ''; // Clear choices
    ui.narrative.choicesContainer.classList.add('hidden');

    if (scene.arabic) {
        // Render words
        const words = scene.arabic.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' '; // Add space for readability
            span.classList.add('arabic-word');
            span.dataset.word = word.trim();
            span.dataset.index = index;

            // Interaction: Click Word
            if (scene.interaction === 'click-word') {
                span.classList.add('clickable');
                span.addEventListener('click', () => handleWordClick(word.trim(), span, scene));
            }

            ui.scene.arabicText.appendChild(span);
        });
    }

    // 3. Handle Interaction State
    gameState.waitingForInteraction = false;
    ui.narrative.nextBtn.classList.remove('hidden'); // Default show next

    if (scene.interaction) {
        gameState.waitingForInteraction = true;
        ui.narrative.nextBtn.classList.add('hidden'); // Hide Next button until interaction done

        if (scene.interaction === 'choice') {
            renderChoices(scene);
        }
    }

    // Update Button Text for non-interactive or post-interaction
    if (!scene.interaction) {
        ui.narrative.nextBtn.textContent = (gameState.currentSceneIndex === chapter.scenes.length - 1) ? "Selesai Bab Ini" : "Lanjut";
    }
}


// --- Interaction Handlers ---

function handleWordClick(word, element, scene) {
    if (!gameState.waitingForInteraction) return;

    // Loose matching for Arabic (sometimes spaces or tashkeel vary)
    // We check if the clicked word *contains* the target sequence or vice versa
    // This handles cases where target is "Muhammad" but word is "Muhammadun" (if split incorrectly)
    // But since we split by space, usually it matches.
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
                // Correct
                btn.style.backgroundColor = '#55efc4'; // Green
                btn.style.color = '#fff';
                playSound('chime');
                finishInteraction(scene.feedback);
            } else {
                // Wrong
                btn.style.backgroundColor = '#ff7675'; // Red
                btn.style.color = '#fff';
                playSound('alert');
            }
        });
        ui.narrative.choicesContainer.appendChild(btn);
    });
}

function finishInteraction(feedbackText) {
    gameState.waitingForInteraction = false;

    // Update text to show feedback
    if (feedbackText) {
        ui.narrative.text.textContent = feedbackText;
        ui.narrative.speaker.textContent = "Ustadz";
    }

    // Show Next Button
    ui.narrative.nextBtn.classList.remove('hidden');
    ui.narrative.nextBtn.textContent = (gameState.currentSceneIndex === CHAPTERS[gameState.currentChapterIndex].scenes.length - 1) ? "Selesai Bab Ini" : "Lanjut";

    // Disable visuals
    const words = document.querySelectorAll('.arabic-word');
    words.forEach(w => {
        w.classList.remove('clickable');
        // Remove click listeners by cloning? Or just rely on waitingForInteraction flag.
        // The flag handles logic, CSS handles cursor.
    });

    // Disable choice buttons
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

// --- Data Persistence ---

function addXP(amount) {
    gameState.xp += amount;
    updateHeaderUI();
}

function updateHeaderUI() {
    const xpEl = document.getElementById('xp-value');
    if (xpEl) xpEl.textContent = gameState.xp;

    const chapter = CHAPTERS[gameState.currentChapterIndex];
    const titleEl = document.getElementById('chapter-title');
    if (titleEl && chapter) {
        titleEl.textContent = chapter.title;
    }
}

function saveProgress() {
    const data = {
        xp: gameState.xp,
        completedChapters: gameState.completedChapters
    };
    localStorage.setItem('arabWalkthroughProgress', JSON.stringify(data));
}

function loadProgress() {
    const saved = localStorage.getItem('arabWalkthroughProgress');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.xp = data.xp || 0;
        gameState.completedChapters = data.completedChapters || [];
    }
}

function resetProgress() {
    localStorage.removeItem('arabWalkthroughProgress');
    gameState.xp = 0;
    gameState.completedChapters = [];
    location.reload();
}

function resetGameSession() {
    gameState.currentChapterIndex = 0;
    gameState.currentSceneIndex = 0;
}

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play().catch(e => console.log("Audio play prevented:", e));
    }
}
