// ════════════════════════════════════════════════════════════════
// DARTS WORDLE
// ════════════════════════════════════════════════════════════════

const WORDS = [
    "OCHE", "BULLS", "THROW", "SHAFT", "BOARD", "ARROW", "SCORE", "MATCH",
    "STEEL", "POINT", "FLUSH", "CLIMB", "RALLY", "SETUP", "GRIPS", "SHARP",
    "ROUND", "FINAL", "OUTER", "INNER", "CHAMP", "CROWD", "FLICK", "POWER",
    "WORLD", "PRIZE", "SPLIT", "STICK", "CLOCK", "CHECK", "PHASE", "PITCH",
    "PRESS", "BRAND", "RANGE", "LEVEL", "STAGE", "SPIKE", "PLANT", "FIELD",
    "SWEEP", "TRUNK", "BLOCK", "TWIRL", "BREAK", "BURST", "MARKS", "FOCUS",
    "TRICK", "ANGLE", "CURVE", "DRIFT", "REACH", "RAPID", "BLADE", "NYLON",
    "BRASS", "SIGMA", "TITAN", "ELITE", "BOBBY", "CHRIS", "JAMES", "GERWY",
    "PETER", "SMITH", "PRICE", "WAYNE", "LITTL", "BUNTI", "RAPID", "START",
    "SPORT", "GAMES", "DARTS", "WIRED", "CHALK", "FLOOR", "LIGHT", "TREBL",
    "SINGL", "DOUBL", "RINSE", "SISAL", "NINES", "FLITE", "STEMS", "ROBIN",
    "WAYNE", "LODGE", "ALLY", "QUEEN", "KINGS", "PAIRS", "MIXED", "TOURS",
    "OPENS", "RANKS", "ORDER", "MERIT", "CROWN", "WALKS", "ENTRY", "HEATS",
    "GROUP", "SEMI", "CASER", "CASES", "MATTE", "LASER", "MOUNT", "STAND",
    "TUNGN", "FEINT", "SURGE", "BOLTS", "FLYER", "DIVES", "LOADS", "TOTAL",
    "TALLY", "FIFTY", "SIXTY", "FORTY", "EIGHT", "SEVEN", "THREE", "BOGEY",
    "VISIT", "TURNS", "ENDED", "SOUTH", "NORTH", "GRAND", "MAJOR", "SUPER",
    "YOUTH", "WOMEN", "DEBUT", "REIGN", "GLORY", "MAXES", "BACKS", "FIRED",
    "BULLY", "STAKE", "NERVE", "GAMER", "LEGIT", "VOTED", "PUMPS", "HAULS"
];

// Valid 5-letter words for input validation (includes answer words + common English words)
const VALID_WORDS = new Set(WORDS.concat([
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT",
    "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT",
    "ALIEN", "ALIGN", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG",
    "ANGER", "APPLE", "APPLY", "ARENA", "ARGUE", "ARISE", "ASIDE", "ASSET",
    "AVOID", "AWARD", "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BASIS",
    "BATCH", "BEACH", "BEAST", "BEGAN", "BEGIN", "BEING", "BELOW", "BENCH",
    "BIBLE", "BLACK", "BLAME", "BLAND", "BLANK", "BLAST", "BLAZE", "BLEED",
    "BLEND", "BLESS", "BLIND", "BLOOM", "BLOWN", "BLUES", "BLUNT", "BONUS",
    "BOOST", "BOUND", "BRAIN", "BRAVE", "BREAD", "BREED", "BRICK", "BRIEF",
    "BRING", "BROAD", "BROKE", "BROWN", "BRUSH", "BUILD", "BUNCH", "BUYER",
    "CABIN", "CABLE", "CARGO", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR",
    "CHAOS", "CHARM", "CHART", "CHASE", "CHEAP", "CHIEF", "CHILD", "CHINA",
    "CHOSE", "CHUNK", "CIVIC", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR",
    "CLIMB", "CLING", "CLOSE", "CLOUD", "COACH", "COAST", "COLOR", "COMET",
    "COMIC", "CORAL", "COULD", "COUNT", "COURT", "COVER", "CRACK", "CRAFT",
    "CRASH", "CRAZY", "CREAM", "CRIME", "CRISP", "CROSS", "CRUEL", "CRUSH",
    "CYCLE", "DAILY", "DANCE", "DEATH", "DEBUT", "DELAY", "DELTA", "DENSE",
    "DEPTH", "DERBY", "DEVIL", "DIRTY", "DOING", "DOUBT", "DOZEN", "DRAFT",
    "DRAIN", "DRAMA", "DRANK", "DRAWN", "DREAM", "DRESS", "DRIED", "DRINK",
    "DRIVE", "DROPS", "DROVE", "DRUNK", "DRYER", "DYING", "EAGER", "EARLY",
    "EARTH", "EATEN", "EDGES", "EIGHT", "ELDER", "ELECT", "ELITE", "EMPTY",
    "ENEMY", "ENJOY", "ENTER", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT",
    "EXAMS", "EXIST", "EXTRA", "FACED", "FACTS", "FAITH", "FALSE", "FANCY",
    "FATAL", "FAULT", "FEAST", "FIBER", "FIFTY", "FIGHT", "FILED", "FILTH",
    "FINDS", "FIRED", "FIRST", "FIXED", "FLAGS", "FLAME", "FLASH", "FLESH",
    "FLOAT", "FLOOD", "FLOUR", "FLUID", "FLUNG", "FOGGY", "FORCE", "FORGE",
    "FORTH", "FORTY", "FORUM", "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH",
    "FRONT", "FROZE", "FRUIT", "FULLY", "FUNDS", "FUNNY", "GHOST", "GIANT",
    "GIVEN", "GLASS", "GLEAM", "GLIDE", "GLOBE", "GLOOM", "GOING", "GOODS",
    "GRACE", "GRADE", "GRAIN", "GRANT", "GRAPH", "GRASP", "GRASS", "GRAVE",
    "GREAT", "GREEN", "GREET", "GRIEF", "GRIND", "GROSS", "GROWN", "GUARD",
    "GUESS", "GUEST", "GUIDE", "GUILD", "GUILT", "GUMMY", "HABIT", "HANDS",
    "HAPPY", "HARSH", "HASN'T", "HAVEN", "HEART", "HEAVY", "HEFTY", "HELLO",
    "hence", "HERBS", "HOLDS", "HONEY", "HONOR", "HOPES", "HORSE", "HOTEL",
    "HOUSE", "HUMAN", "HUMOR", "HURRY", "IDEAL", "IMAGE", "IMPLY", "INDEX",
    "INDIE", "INFRA", "INNER", "INPUT", "IRONY", "ISSUE", "IVORY", "JAPAN",
    "JEWEL", "JOINT", "JOKER", "JUDGE", "JUICE", "JUMPS", "JUROR", "KARMA",
    "KEEPS", "KNACK", "KNEEL", "KNELT", "KNIFE", "KNOCK", "KNOWN", "LABEL",
    "LABOR", "LAKES", "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEADS",
    "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEMON", "LEVEL", "LIGHT",
    "LIKED", "LIMIT", "LINEN", "LINKS", "LIONS", "LISTS", "LIVED", "LIVER",
    "LIVES", "LOCAL", "LODGE", "LOGIC", "LOGIN", "LOOKS", "LOOSE", "LORDS",
    "LOVER", "LOWER", "LOYAL", "LUCKY", "LUNCH", "LYING", "MAGIC", "MANOR",
    "MAPLE", "MARCH", "MASKS", "MAYBE", "MAYOR", "MEANS", "MEANT", "MEDIA",
    "MERCY", "METAL", "METER", "MIGHT", "MINDS", "MINOR", "MINUS", "MIXED",
    "MODEL", "MONEY", "MONTH", "MORAL", "MOTIF", "MOTOR", "MOUNT", "MOUSE",
    "MOUTH", "MOVED", "MOVIE", "MUSIC", "NAIVE", "NAMED", "NASTY", "NAVAL",
    "NEEDS", "NERVE", "NEVER", "NEWLY", "NIGHT", "NOBLE", "NOISE", "NORTH",
    "NOTED", "NOVEL", "NURSE", "OCCUR", "OCEAN", "OFFER", "OFTEN", "OLIVE",
    "ONSET", "OPENS", "OPERA", "ORBIT", "OTHER", "OUGHT", "OUTER", "OWNED",
    "OWNER", "OXIDE", "OZONE", "PACKS", "PAGES", "PAINT", "PAIRS", "PANEL",
    "PANIC", "PANTS", "PAPER", "PARTS", "PARTY", "PASTA", "PATCH", "PAUSE",
    "PEACE", "PEACH", "PEARL", "PENNY", "PHASE", "PHONE", "PHOTO", "PIANO",
    "PICKS", "PIECE", "PILOT", "PITCH", "PIXEL", "PIZZA", "PLACE", "PLAIN",
    "PLANE", "PLANS", "PLANT", "PLATE", "PLAYS", "PLAZA", "PLEAD", "PLOTS",
    "PLUMB", "PLUME", "POEMS", "POLAR", "POLES", "POOLS", "POPUP", "PORTS",
    "POSED", "POSTS", "POUND", "POWER", "PRESS", "PRIDE", "PRIME", "PRINT",
    "PRIOR", "PRIZE", "PROBE", "PRONE", "PROOF", "PROUD", "PROVE", "PROXY",
    "PULLS", "PUNCH", "PUPIL", "PURSE", "QUEEN", "QUERY", "QUEST", "QUEUE",
    "QUICK", "QUIET", "QUOTA", "QUOTE", "RADAR", "RADIO", "RAISE", "RALLY",
    "RANCH", "RAPID", "RATIO", "REACH", "REACT", "READS", "READY", "REALM",
    "REBEL", "REFER", "REIGN", "RELAX", "REPLY", "RIDER", "RIDGE", "RIFLE",
    "RIGHT", "RIGID", "RINGS", "RISEN", "RISKS", "RISKY", "RIVAL", "RIVER",
    "ROADS", "ROCKY", "Roger", "ROLES", "ROOFS", "ROOMS", "ROOTS", "ROPES",
    "ROSES", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RUGBY", "RUINS", "RULED",
    "RULER", "RULES", "RURAL", "SADLY", "SAINT", "SALAD", "SALLY", "SALON",
    "SANDY", "SAUCE", "SAVED", "SCALE", "SCARE", "SCENE", "SCENT", "SCOPE",
    "SEATS", "SEEDS", "SEIZE", "SENSE", "SERVE", "SETUP", "SEVEN", "SHALL",
    "SHAME", "SHAPE", "SHARE", "SHELF", "SHELL", "SHIFT", "SHINE", "SHIRT",
    "SHOCK", "SHOES", "SHOOT", "SHORE", "SHORT", "SHOUT", "SHOWN", "SIGHT",
    "SIGNS", "SILLY", "SINCE", "SIXTH", "SIXTY", "SIZED", "SKILL", "SKULL",
    "SLAVE", "SLEEP", "SLICE", "SLIDE", "SLOPE", "SMALL", "SMART", "SMELL",
    "SMILE", "SMOKE", "SNAKE", "SOLAR", "SOLID", "SOLVE", "SONGS", "SORRY",
    "SOULS", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND",
    "SPENT", "SPICE", "SPINE", "SPITE", "SPOKE", "SPRAY", "SQUAD", "STACK",
    "STAFF", "STAGE", "STAIN", "STAKE", "STALE", "STALL", "STAMP", "STAND",
    "STARE", "START", "STATE", "STAYS", "STEAM", "STEEP", "STEER", "STEPS",
    "STERN", "STICK", "STIFF", "STILL", "STOCK", "STOLE", "STONE", "STOOD",
    "STORE", "STORM", "STORY", "STOVE", "STRIP", "STUCK", "STUDY", "STUFF",
    "STYLE", "SUGAR", "SUITE", "SUNNY", "SUPER", "SURGE", "SWAMP", "SWEAR",
    "SWEAT", "SWEEP", "SWEET", "SWEPT", "SWIFT", "SWING", "SWORD", "SWORN",
    "SWUNG", "TABLE", "TAKEN", "TALES", "TASTE", "TAXES", "TEACH", "TEAMS",
    "TEARS", "TEENS", "TEETH", "TENTH", "TERMS", "TESTS", "TEXTS", "THANK",
    "THEFT", "THEME", "THERE", "THESE", "THICK", "THIEF", "THING", "THINK",
    "THIRD", "THOSE", "THREE", "THREW", "THROW", "THUMB", "TIDAL", "TIGER",
    "TIGHT", "TIMER", "TIMES", "TIRED", "TITLE", "TODAY", "TOKEN", "TOMBS",
    "TOOLS", "TOOTH", "TOPIC", "TOTAL", "TOUCH", "TOUGH", "TOURS", "TOWER",
    "TOWNS", "TOXIC", "TRACE", "TRACK", "TRADE", "TRAIL", "TRAIN", "TRAIT",
    "TRAPS", "TRASH", "TREAT", "TREES", "TREND", "TRIAL", "TRIBE", "TRICK",
    "TRIED", "TROOP", "TRUCK", "TRULY", "TRUMP", "TRUNK", "TRUST", "TRUTH",
    "TUBES", "TUNES", "TURNS", "TWICE", "TWIST", "TYING", "TYPES", "ULTRA",
    "UNCLE", "UNDER", "UNDID", "UNION", "UNITE", "UNITY", "UNTIL", "UPPER",
    "UPSET", "URBAN", "USAGE", "USUAL", "UTTER", "VAGUE", "VALID", "VALUE",
    "VALVE", "VAULT", "VENUE", "VERSE", "VIDEO", "VIEWS", "VINYL", "VIRAL",
    "VIRUS", "VISIT", "VITAL", "VOCAL", "VODKA", "VOICE", "VOTED", "VOTER",
    "WAGES", "WASTE", "WATCH", "WATER", "WAVES", "WEARY", "WEAVE", "WEDGE",
    "WEIGH", "WEIRD", "WELLS", "WHALE", "WHEAT", "WHEEL", "WHERE", "WHICH",
    "WHILE", "WHITE", "WHOLE", "WHOSE", "WIDER", "WIDTH", "WINES", "WITCH",
    "WOMAN", "WOMEN", "WOODS", "WORDS", "WORLD", "WORRY", "WORSE", "WORST",
    "WORTH", "WOULD", "WOUND", "WRATH", "WRIST", "WRITE", "WRONG", "WROTE",
    "YACHT", "YIELD", "YOUNG", "YOUTH", "ZONES"
]));

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let todaysWord = "";
let guesses = [];

// Get today's word based on UTC date
function getTodaysWord() {
    const now = new Date();
    const start = Date.UTC(2026, 0, 1);
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const dayIndex = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return WORDS[dayIndex % WORDS.length];
}

// Get today's date string for localStorage
function getUTCDateString() {
    const n = new Date();
    return n.getUTCFullYear() + "-" + String(n.getUTCMonth() + 1).padStart(2, "0") + "-" + String(n.getUTCDate()).padStart(2, "0");
}

// Build the board
function buildBoard() {
    const board = document.getElementById("wordle-board");
    board.innerHTML = "";
    for (let r = 0; r < MAX_GUESSES; r++) {
        const row = document.createElement("div");
        row.className = "wordle-row";
        row.id = "row-" + r;
        for (let c = 0; c < WORD_LENGTH; c++) {
            const tile = document.createElement("div");
            tile.className = "wordle-tile";
            tile.id = "tile-" + r + "-" + c;
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

// Build the keyboard
function buildKeyboard() {
    const keyboard = document.getElementById("wordle-keyboard");
    keyboard.innerHTML = "";
    const rows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];
    rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";
        row.forEach(key => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = key;
            btn.id = "key-" + key;
            if (key === "ENTER" || key === "⌫") btn.classList.add("wide");
            btn.addEventListener("click", () => handleKey(key));
            rowDiv.appendChild(btn);
        });
        keyboard.appendChild(rowDiv);
    });
}

// Handle key input
function handleKey(key) {
    if (gameOver) return;

    if (key === "⌫") {
        if (currentCol > 0) {
            currentCol--;
            const tile = document.getElementById("tile-" + currentRow + "-" + currentCol);
            tile.textContent = "";
            tile.classList.remove("filled");
        }
        return;
    }

    if (key === "ENTER") {
        if (currentCol < WORD_LENGTH) {
            showMessage("Not enough letters");
            shakeRow(currentRow);
            return;
        }

        let guess = "";
        for (let c = 0; c < WORD_LENGTH; c++) {
            guess += document.getElementById("tile-" + currentRow + "-" + c).textContent;
        }

        if (!VALID_WORDS.has(guess)) {
            showMessage("Not in word list");
            shakeRow(currentRow);
            return;
        }

        guesses.push(guess);
        revealRow(currentRow, guess);
        return;
    }

    if (currentCol < WORD_LENGTH && /^[A-Z]$/.test(key)) {
        const tile = document.getElementById("tile-" + currentRow + "-" + currentCol);
        tile.textContent = key;
        tile.classList.add("filled");
        currentCol++;
    }
}

// Reveal row with colours
function revealRow(row, guess) {
    const answer = todaysWord;
    const result = [];
    const answerArr = answer.split("");
    const guessArr = guess.split("");
    const used = Array(WORD_LENGTH).fill(false);

    // First pass — correct
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessArr[i] === answerArr[i]) {
            result[i] = "correct";
            used[i] = true;
        }
    }

    // Second pass — present or absent
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i]) continue;
        let found = false;
        for (let j = 0; j < WORD_LENGTH; j++) {
            if (!used[j] && guessArr[i] === answerArr[j]) {
                result[i] = "present";
                used[j] = true;
                found = true;
                break;
            }
        }
        if (!found) result[i] = "absent";
    }

    // Animate tiles
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.getElementById("tile-" + row + "-" + i);
        setTimeout(() => {
            tile.classList.add(result[i]);
            updateKeyboard(guessArr[i], result[i]);
        }, i * 300);
    }

    // Check win/lose after animation
    setTimeout(() => {
        if (guess === answer) {
            const messages = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"];
            showMessage(messages[row] || "Nice!");
            gameOver = true;
            saveGameState(true);
            showShareButton();
        } else if (row >= MAX_GUESSES - 1) {
            showMessage(answer);
            gameOver = true;
            saveGameState(false);
            showShareButton();
        } else {
            currentRow++;
            currentCol = 0;
            saveProgress();
        }
    }, WORD_LENGTH * 300 + 200);
}

// Update keyboard colours
function updateKeyboard(letter, state) {
    const key = document.getElementById("key-" + letter);
    if (!key) return;
    const priority = { "correct": 3, "present": 2, "absent": 1 };
    const current = key.classList.contains("correct") ? 3 :
                    key.classList.contains("present") ? 2 :
                    key.classList.contains("absent") ? 1 : 0;
    if (priority[state] > current) {
        key.classList.remove("correct", "present", "absent");
        key.classList.add(state);
    }
}

// Show message
function showMessage(text) {
    const msgDiv = document.getElementById("wordle-message");
    msgDiv.innerHTML = "<span>" + text + "</span>";
    if (text !== todaysWord) {
        setTimeout(() => { msgDiv.innerHTML = ""; }, 2000);
    }
}

// Shake row
function shakeRow(row) {
    const rowEl = document.getElementById("row-" + row);
    rowEl.classList.add("shake");
    setTimeout(() => rowEl.classList.remove("shake"), 500);
}

// Show share button
function showShareButton() {
    document.getElementById("wordle-share-container").style.display = "block";
}

// Share result
function shareResult() {
    const today = getUTCDateString();
    const won = guesses[guesses.length - 1] === todaysWord;
    let text = "🎯 Darts Wordle " + today + " " + (won ? guesses.length : "X") + "/" + MAX_GUESSES + "\n\n";

    guesses.forEach(guess => {
        const answer = todaysWord;
        const answerArr = answer.split("");
        const guessArr = guess.split("");
        const used = Array(WORD_LENGTH).fill(false);
        const row = [];

        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArr[i] === answerArr[i]) {
                row[i] = "🟩";
                used[i] = true;
            }
        }
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (row[i]) continue;
            let found = false;
            for (let j = 0; j < WORD_LENGTH; j++) {
                if (!used[j] && guessArr[i] === answerArr[j]) {
                    row[i] = "🟨";
                    used[j] = true;
                    found = true;
                    break;
                }
            }
            if (!found) row[i] = "⬛";
        }
        text += row.join("") + "\n";
    });

    text += "\nhttps://www.dartsdaily.net";

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById("wordle-share-btn");
            btn.textContent = "✅ Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
                btn.textContent = "📋 Share Result";
                btn.classList.remove("copied");
            }, 2000);
        });
    }
}

// Save/Load stats
function loadStats() {
    const stats = JSON.parse(localStorage.getItem("dartsWordleStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    document.getElementById("w-played").textContent = stats.played;
    document.getElementById("w-win-pct").textContent = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
    document.getElementById("w-streak").textContent = stats.streak;
    document.getElementById("w-max-streak").textContent = stats.maxStreak;
    return stats;
}

function saveGameState(won) {
    const stats = JSON.parse(localStorage.getItem("dartsWordleStats") || '{"played":0,"won":0,"streak":0,"maxStreak":0}');
    stats.played++;
    if (won) {
        stats.won++;
        stats.streak++;
        if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
    } else {
        stats.streak = 0;
    }
    localStorage.setItem("dartsWordleStats", JSON.stringify(stats));
    localStorage.setItem("dartsWordleDate", getUTCDateString());
    localStorage.setItem("dartsWordleGuesses", JSON.stringify(guesses));
    localStorage.setItem("dartsWordleOver", "true");
    loadStats();
}

function saveProgress() {
    localStorage.setItem("dartsWordleDate", getUTCDateString());
    localStorage.setItem("dartsWordleGuesses", JSON.stringify(guesses));
    localStorage.setItem("dartsWordleOver", "false");
}

// Restore previous game state if same day
function restoreGame() {
    const savedDate = localStorage.getItem("dartsWordleDate");
    const today = getUTCDateString();

    if (savedDate !== today) {
        localStorage.removeItem("dartsWordleGuesses");
        localStorage.removeItem("dartsWordleOver");
        return;
    }

    const savedGuesses = JSON.parse(localStorage.getItem("dartsWordleGuesses") || "[]");
    const wasOver = localStorage.getItem("dartsWordleOver") === "true";

    savedGuesses.forEach((guess, row) => {
        const answer = todaysWord;
        const answerArr = answer.split("");
        const guessArr = guess.split("");
        const used = Array(WORD_LENGTH).fill(false);
        const result = [];

        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArr[i] === answerArr[i]) { result[i] = "correct"; used[i] = true; }
        }
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (result[i]) continue;
            let found = false;
            for (let j = 0; j < WORD_LENGTH; j++) {
                if (!used[j] && guessArr[i] === answerArr[j]) { result[i] = "present"; used[j] = true; found = true; break; }
            }
            if (!found) result[i] = "absent";
        }

        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = document.getElementById("tile-" + row + "-" + i);
            tile.textContent = guessArr[i];
            tile.classList.add("filled", result[i]);
            updateKeyboard(guessArr[i], result[i]);
        }
    });

    guesses = savedGuesses;
    currentRow = savedGuesses.length;
    currentCol = 0;

    if (wasOver) {
        gameOver = true;
        const lastGuess = savedGuesses[savedGuesses.length - 1];
        if (lastGuess === todaysWord) {
            showMessage("You got it! 🎯");
        } else {
            showMessage(todaysWord);
        }
        showShareButton();
    }
}

// Physical keyboard support
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Enter") { handleKey("ENTER"); return; }
    if (e.key === "Backspace") { handleKey("⌫"); return; }
    const letter = e.key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) handleKey(letter);
});

// Init
todaysWord = getTodaysWord();
buildBoard();
buildKeyboard();
loadStats();
restoreGame();

document.getElementById("wordle-share-btn").addEventListener("click", shareResult);
