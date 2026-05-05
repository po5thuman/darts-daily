// ════════════════════════════════════════════════════════════════
// DARTS WORD — HANGMAN STYLE
// ════════════════════════════════════════════════════════════════
const WORDS = [
    { word: "OCHE", hint: "The line you throw from" },
    { word: "BULLS", hint: "The centre of the board" },
    { word: "THROW", hint: "What you do with a dart" },
    { word: "SHAFT", hint: "Connects the barrel to the flight" },
    { word: "BOARD", hint: "What you throw darts at" },
    { word: "ARROW", hint: "Another name for a dart" },
    { word: "SCORE", hint: "Points you earn each turn" },
    { word: "MATCH", hint: "A competitive game between players" },
    { word: "STEEL", hint: "Type of dart tip" },
    { word: "POINT", hint: "The sharp end of a dart" },
    { word: "ROUND", hint: "One turn of three darts" },
    { word: "FINAL", hint: "The last match of a tournament" },
    { word: "OUTER", hint: "___ bull — the green ring" },
    { word: "INNER", hint: "___ bull — the red centre" },
    { word: "CROWD", hint: "The fans watching the match" },
    { word: "POWER", hint: "Force behind a strong throw" },
    { word: "WORLD", hint: "___ Championship — the biggest event" },
    { word: "PRIZE", hint: "Money awarded to the winner" },
    { word: "BLADE", hint: "Winmau ___ 6 — a popular board" },
    { word: "NYLON", hint: "Common shaft material" },
    { word: "BRASS", hint: "Budget dart barrel material" },
    { word: "SPORT", hint: "Darts is a popular ___" },
    { word: "GAMES", hint: "Multiple rounds of play" },
    { word: "DARTS", hint: "The sport itself" },
    { word: "LIGHT", hint: "Illumination around the board" },
    { word: "FLOOR", hint: "Where the oche line sits" },
    { word: "CHALK", hint: "Used to mark scores on a chalkboard" },
    { word: "GRIPS", hint: "The texture on a dart barrel" },
    { word: "SHARP", hint: "How your dart points should be" },
    { word: "SETUP", hint: "Your dart board arrangement" },
    { word: "STAND", hint: "A dart board ___ holds the board" },
    { word: "MOUNT", hint: "How you attach a board to the wall" },
    { word: "CASES", hint: "Where you store your darts" },
    { word: "LASER", hint: "___ oche — projects the throw line" },
    { word: "RINGS", hint: "The circular sections on a board" },
    { word: "CROWN", hint: "A champion wears the ___" },
    { word: "GLORY", hint: "What every player seeks" },
    { word: "REIGN", hint: "A champion's period of dominance" },
    { word: "DEBUT", hint: "A player's first appearance" },
    { word: "NERVE", hint: "What you need in a big final" },
    { word: "PRICE", hint: "Gerwyn ___ — Welsh world champion" },
    { word: "SMITH", hint: "Michael ___ — Bully Boy" },
    { word: "PETER", hint: "___ Wright — Snakebite" },
    { word: "JAMES", hint: "___ Wade — The Machine" },
    { word: "WAYNE", hint: "___ Mardle — Hawaii 501" },
    { word: "BOBBY", hint: "___ George — legendary darts player" },
    { word: "GRAND", hint: "___ Prix — a major PDC ranking event" },
    { word: "MAJOR", hint: "A big tournament" },
    { word: "TOURS", hint: "PDC ___ — professional circuit" },
    { word: "ORDER", hint: "___ of Merit — the PDC rankings" },
    { word: "MERIT", hint: "Order of ___ — how players are ranked" },
    { word: "STAGE", hint: "Where players perform at the Ally Pally" },
    { word: "VISIT", hint: "One trip to the oche" },
    { word: "TOTAL", hint: "Your combined score" },
    { word: "TALLY", hint: "To keep count of the score" },
    { word: "FIFTY", hint: "Score for a single bullseye" },
    { word: "SIXTY", hint: "The highest single-dart score" },
    { word: "EIGHT", hint: "Teen — common checkout number" },
    { word: "THREE", hint: "Number of darts per turn" },
    { word: "ANGLE", hint: "The trajectory of your throw" },
    { word: "FOCUS", hint: "Concentration needed for a big finish" },
    { word: "TRICK", hint: "___ shot — a fancy throw" },
    { word: "SURGE", hint: "A sudden run of high scores" },
    { word: "SWEEP", hint: "To win every leg in a set" },
    { word: "BREAK", hint: "___ of throw — winning against the thrower" },
    { word: "SPLIT", hint: "When a dart lands between two segments" },
    { word: "STICK", hint: "When a dart stays in the board" },
    { word: "SPIKE", hint: "The metal point of a steel tip dart" },
    { word: "SISAL", hint: "Material used in bristle dartboards" },
    { word: "STEMS", hint: "Another word for dart shafts" },
    { word: "FLYER", hint: "A dart that goes off target" },
    { word: "CLIMB", hint: "Moving up the rankings" },
    { word: "RALLY", hint: "A comeback run of winning legs" }
];

const MAX_WRONG = 6;
let todaysWord = "";
let todaysHint = "";
let guessedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

// ════════════════════════════════════════════════════════════════
// DATE & WORD SELECTION
// ════════════════════════════════════════════════════════════════
function getDayOfYear() {
    const n = new Date();
    const start = Date.UTC(n.getUTCFullYear(), 0, 1);
    const today = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
    return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

function getUTCDateString() {
    const n = new Date();
    return n.getUTCFullYear() + "-" + String(n.getUTCMonth() + 1).padStart(2, "0") + "-" + String(n.getUTCDate()).padStart(2, "0");
}

function getTodaysWord() {
    const dayOfYear = getDayOfYear();
    return WORDS[dayOfYear % WORDS.length];
}

// ════════════════════════════════════════════════════════════════
// BUILD UI
// ════════════════════════════════════════════════════════════════
function buildTiles() {
    const container = document.getElementById("word-tiles");
    container.innerHTML = "";
    for (let i = 0; i < todaysWord.length; i++) {
        const tile = document.createElement("div");
        tile.className = "word-tile";
        tile.id = "tile-" + i;
        tile.textContent = "";
        container.appendChild(tile);
    }
}

function buildKeyboard() {
    const keyboard = document.getElementById("wordle-keyboard");
    keyboard.innerHTML = "";
    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ];
    rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";
        row.forEach(key => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = key;
            btn.id = "key-" + key;
            btn.addEventListener("click", () => handleGuess(key));
            rowDiv.appendChild(btn);
        });
        keyboard.appendChild(rowDiv);
    });
}

// ════════════════════════════════════════════════════════════════
// GAME LOGIC
// ════════════════════════════════════════════════════════════════
function handleGuess(letter) {
    if (gameOver) return;
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);

    const key = document.getElementById("key-" + letter);
    if (key) key.classList.add("used");

    if (todaysWord.includes(letter)) {
        for (let i = 0; i < todaysWord.length; i++) {
            if (todaysWord[i] === letter) {
                const tile = document.getElementById("tile-" + i);
                tile.textContent = letter;
                tile.classList.add("revealed");
            }
        }
        const allRevealed = todaysWord.split("").every(l => guessedLetters.includes(l));
        if (allRevealed) {
            gameOver = true;
            for (let i = 0; i < todaysWord.length; i++) {
                const tile = document.getElementById("tile-" + i);
                tile.classList.remove("revealed");
                tile.classList.add("revealed-final");
            }
            const messages = ["Genius! 🎯","Brilliant! 🎯","Impressive! 🎯","Well played! 🎯","Nice one! 🎯","Phew! 🎯"];
            showMessage(messages[Math.min(wrongGuesses, messages.length - 1)]);
            saveGameState(true);
            showShareButton();
        }
    } else {
        const lifeEl = document.getElementById("life-" + (MAX_WRONG - 1 - wrongGuesses));
        if (lifeEl) lifeEl.classList.add("lost");
        wrongGuesses++;
        updateLivesLabel();
        if (wrongGuesses >= MAX_WRONG) {
            gameOver = true;
            for (let i = 0; i < todaysWord.length; i++) {
                const tile = document.getElementById("tile-" + i);
                if (!tile.textContent) tile.textContent = todaysWord[i];
                tile.classList.remove("revealed");
                tile.classList.add("revealed-fail");
            }
            showMessage("The word was " + todaysWord);
            saveGameState(false);
            showShareButton();
        }
    }
    saveProgress();
}

function updateLivesLabel() {
    const remaining = MAX_WRONG - wrongGuesses;
    document.getElementById("lives-label").textContent = remaining + " dart" + (remaining !== 1 ? "s" : "") + " remaining";
}

// ════════════════════════════════════════════════════════════════
// MESSAGES & SHARE
// ════════════════════════════════════════════════════════════════
function showMessage(text) {
    document.getElementById("wordle-message").innerHTML = "<span>" + text + "</span>";
}

function showShareButton() {
    document.getElementById("wordle-share-container").style.display = "block";
}

function buildShareText() {
    const today = getUTCDateString();
    const won = todaysWord.split("").every(l => guessedLetters.includes(l));
    const remaining = MAX_WRONG - wrongGuesses;
    let text = "🎯 Darts Word " + today + "\n";
    text += won ? "Solved with " + remaining + "/6 darts remaining!\n" : "❌ Failed\n";
    text += "\n";
    for (let i = 0; i < todaysWord.length; i++) {
        text += won ? "🟩" : (guessedLetters.includes(todaysWord[i]) ? "🟩" : "🟥");
    }
    text += "\n";
    text += "🎯".repeat(remaining) + "✖️".repeat(wrongGuesses);
    text += "\n\nhttps://www.dartsdaily.net";
    return text;
}

function shareResult() {
    const text = buildShareText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById("wordle-share-btn");
            const span = btn.querySelector("span");
            span.textContent = "Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
                span.textContent = "Share Result";
                btn.classList.remove("copied");
            }, 2000);
        });
    }
}

// ════════════════════════════════════════════════════════════════
// STATS & PERSISTENCE
// ════════════════════════════════════════════════════════════════
function loadStats() {
    const stats = JSON.parse(localStorage.getItem("dartsWordStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    document.getElementById("w-played").textContent = stats.played;
    document.getElementById("w-win-pct").textContent = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
    document.getElementById("w-streak").textContent = stats.streak;
    document.getElementById("w-max-streak").textContent = stats.maxStreak;
    return stats;
}

function saveGameState(won) {
    const stats = JSON.parse(localStorage.getItem("dartsWordStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    stats.played++;
    if (won) {
        stats.won++;
        stats.streak++;
        if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
    } else {
        stats.streak = 0;
    }
    localStorage.setItem("dartsWordStats", JSON.stringify(stats));
    loadStats();
    saveProgress();
}

function saveProgress() {
    localStorage.setItem("dartsWordDate", getUTCDateString());
    localStorage.setItem("dartsWordGuessed", JSON.stringify(guessedLetters));
    localStorage.setItem("dartsWordWrong", wrongGuesses.toString());
    localStorage.setItem("dartsWordOver", gameOver ? "true" : "false");
}

function restoreGame() {
    const savedDate = localStorage.getItem("dartsWordDate");
    const today = getUTCDateString();
    if (savedDate !== today) {
        localStorage.removeItem("dartsWordGuessed");
        localStorage.removeItem("dartsWordWrong");
        localStorage.removeItem("dartsWordOver");
        return;
    }
    const savedGuessed = JSON.parse(localStorage.getItem("dartsWordGuessed") || "[]");
    const savedWrong = parseInt(localStorage.getItem("dartsWordWrong") || "0");
    const wasOver = localStorage.getItem("dartsWordOver") === "true";

    guessedLetters = savedGuessed;
    wrongGuesses = savedWrong;

    guessedLetters.forEach(letter => {
        const key = document.getElementById("key-" + letter);
        if (key) key.classList.add("used");
    });

    for (let i = 0; i < todaysWord.length; i++) {
        if (guessedLetters.includes(todaysWord[i])) {
            const tile = document.getElementById("tile-" + i);
            tile.textContent = todaysWord[i];
            tile.classList.add("revealed");
        }
    }

    for (let i = 0; i < wrongGuesses; i++) {
        const lifeEl = document.getElementById("life-" + (MAX_WRONG - 1 - i));
        if (lifeEl) lifeEl.classList.add("lost");
    }

    updateLivesLabel();

    if (wasOver) {
        gameOver = true;
        const won = todaysWord.split("").every(l => guessedLetters.includes(l));
        for (let i = 0; i < todaysWord.length; i++) {
            const tile = document.getElementById("tile-" + i);
            tile.classList.remove("revealed");
            tile.textContent = todaysWord[i];
            tile.classList.add(won ? "revealed-final" : "revealed-fail");
        }
        showMessage(won ? "You got it! 🎯" : "The word was " + todaysWord);
        showShareButton();
    }
}

// ════════════════════════════════════════════════════════════════
// KEYBOARD SUPPORT
// ════════════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const letter = e.key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) handleGuess(letter);
});

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
const todaysEntry = getTodaysWord();
todaysWord = todaysEntry.word;
todaysHint = todaysEntry.hint;
buildTiles();
buildKeyboard();
loadStats();
document.getElementById("word-hint").textContent = "💡 " + todaysHint;
restoreGame();

document.getElementById("wordle-share-btn").addEventListener("click", shareResult);
document.getElementById("wordle-share-x")?.addEventListener("click", () => {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-fb")?.addEventListener("click", () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://www.dartsdaily.net", "_blank");
});
document.getElementById("wordle-share-wa")?.addEventListener("click", () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-reddit")?.addEventListener("click", () => {
    window.open("https://reddit.com/submit?title=" + encodeURIComponent(buildShareText()), "_blank");
});
document.getElementById("wordle-share-telegram")?.addEventListener("click", () => {
    window.open("https://t.me/share/url?url=https://www.dartsdaily.net&text=" + encodeURIComponent(buildShareText()), "_blank");
});
