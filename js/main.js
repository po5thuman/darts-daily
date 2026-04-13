// ════════════════════════════════════════════════════════════════
// DATE & TIME (UTC)
// ════════════════════════════════════════════════════════════════
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const now = new Date();
document.getElementById("currentDate").textContent =
    days[now.getUTCDay()] + " " + now.getUTCDate() + " " + months[now.getUTCMonth()] + " " + now.getUTCFullYear();
// ════════════════════════════════════════════════════════════════
// COUNTDOWN TIMER (UTC)
// ════════════════════════════════════════════════════════════════
function updateCountdown() {
    const n = new Date();
    const midnightUTC = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + 1, 0, 0, 0);
    const diff = midnightUTC - n.getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("countdown").textContent =
        String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();
// ════════════════════════════════════════════════════════════════
// AUTO-REFRESH AT MIDNIGHT (UTC)
// ════════════════════════════════════════════════════════════════
function scheduleRefresh() {
    const n = new Date();
    const midnightUTC = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + 1, 0, 0, 0);
    const msUntilMidnight = midnightUTC - n.getTime();
    setTimeout(() => {
        window.location.href = window.location.href.split('?')[0] + '?refresh=' + Date.now();
    }, msUntilMidnight + 2000);
}
scheduleRefresh();
// Fallback: check every 30 seconds if the UTC day has changed
const pageLoadUTCDate = new Date().getUTCDate();
setInterval(function() {
    const currentUTCDate = new Date().getUTCDate();
    if (currentUTCDate !== pageLoadUTCDate) {
        window.location.href = window.location.href.split('?')[0] + '?refresh=' + Date.now();
    }
}, 30000);
// ════════════════════════════════════════════════════════════════
// STREAK COUNTER (UTC)
// ════════════════════════════════════════════════════════════════
function getUTCDateString() {
    const n = new Date();
    return n.getUTCFullYear() + "-" + String(n.getUTCMonth() + 1).padStart(2, "0") + "-" + String(n.getUTCDate()).padStart(2, "0");
}
function getYesterdayUTCDateString() {
    const n = new Date();
    n.setUTCDate(n.getUTCDate() - 1);
    return n.getUTCFullYear() + "-" + String(n.getUTCMonth() + 1).padStart(2, "0") + "-" + String(n.getUTCDate()).padStart(2, "0");
}
function updateStreak() {
    const today = getUTCDateString();
    const lastVisit = localStorage.getItem("dartsDailyLastVisit");
    let streak = parseInt(localStorage.getItem("dartsDailyStreak") || "0");
    if (lastVisit !== today) {
        const yesterday = getYesterdayUTCDateString();
        streak = (lastVisit === yesterday) ? streak + 1 : 1;
        localStorage.setItem("dartsDailyStreak", streak);
        localStorage.setItem("dartsDailyLastVisit", today);
    }
    document.getElementById("streakCount").textContent = streak;
}
updateStreak();
// ════════════════════════════════════════════════════════════════
// THEME TOGGLE
// ════════════════════════════════════════════════════════════════
function toggleTheme() {
    const isLight = document.body.classList.toggle("light");
    document.getElementById("themeLabel").textContent = isLight ? "Light" : "Dark";
    localStorage.setItem("dartsDailyTheme", isLight ? "light" : "dark");
}
(function() {
    const saved = localStorage.getItem("dartsDailyTheme");
    if (saved === "light") {
        document.body.classList.add("light");
        document.getElementById("themeLabel").textContent = "Light";
    }
})();
// ════════════════════════════════════════════════════════════════
// SHARE FUNCTIONS
// ════════════════════════════════════════════════════════════════
const pageURL = encodeURIComponent(window.location.href);
function shareX(text) {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + pageURL, "_blank", "width=550,height=420");
}
function shareFB(customText) {
    var url = encodeURIComponent(window.location.href);
    window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + url,
        "_blank",
        "width=600,height=460"
    );
}
function shareWA(text) {
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(text + " " + window.location.href), "_blank");
}
function shareReddit(text) {
    window.open("https://reddit.com/submit?url=" + pageURL + "&title=" + encodeURIComponent(text), "_blank", "width=600,height=460");
}
function shareTelegram(text) {
    window.open("https://t.me/share/url?url=" + pageURL + "&text=" + encodeURIComponent(text), "_blank", "width=600,height=460");
}
function copyLink(button) {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyTextToClipboard(url, button);
        });
    } else {
        fallbackCopyTextToClipboard(url, button);
    }
}
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Fallback: Failed to copy', err);
    }
    document.body.removeChild(textArea);
}
function showCopyFeedback(button) {
    const originalText = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalText;
    }, 2000);
}
// ════════════════════════════════════════════════════════════════
// DAY OF YEAR CALCULATION (UTC)
// ════════════════════════════════════════════════════════════════
function getDayOfYear() {
    const n = new Date();
    const start = Date.UTC(n.getUTCFullYear(), 0, 1);
    const today = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor((today - start) / oneDay);
}
const dayOfYear = getDayOfYear();
// ════════════════════════════════════════════════════════════════
// PLAYER OF THE DAY
// ════════════════════════════════════════════════════════════════
async function loadPlayerOfDay() {
    try {
        const res = await fetch("players.json");
        const players = await res.json();
        const p = players[dayOfYear % players.length];
        const avatar = document.getElementById("p-avatar");
        if (p.photo) {
            avatar.innerHTML = "<img src=\"" + p.photo + "\" alt=\"" + p.name + "\" onerror=\"this.parentElement.textContent='" + (p.flag || "🎯") + "'\">";
        } else {
            avatar.textContent = p.flag || "🎯";
        }
        const statusClass = p.status === "Active" ? "status-active" : "status-retired";
        document.getElementById("p-name").innerHTML = p.name + " <span class=\"status-badge " + statusClass + "\">" + p.status + "</span>";
        document.getElementById("p-nickname").textContent = "\"" + p.nickname + "\"";
        document.getElementById("p-tags").innerHTML = p.tags.map(t => "<span class=\"tag\">" + t + "</span>").join("");
        const infoItems = [
            { label: "Born", value: p.born },
            { label: "Hometown", value: p.hometown },
            { label: "Pro Since", value: p.pro_since },
            { label: p.retired ? "Retired" : "Status", value: p.retired ? p.retired : "Active" },
            { label: "Dart Weight", value: p.dart_weight },
            { label: "Dart Brand", value: p.dart_brand },
            { label: "Walk-on", value: p.walk_on_music },
            { label: "Style", value: p.throwing_style }
        ];
        document.getElementById("p-info-grid").innerHTML = infoItems.map(i =>
            "<div class=\"info-row\"><div class=\"info-label\">" + i.label + "</div><div class=\"info-value\">" + i.value + "</div></div>"
        ).join("");
        document.getElementById("p-highlights").innerHTML = p.highlights.map(h =>
            "<div class=\"highlight-item\"><div class=\"highlight-dot\"></div><div>" + h + "</div></div>"
        ).join("");
        document.getElementById("p-quote").innerHTML = "<span>\"" + p.quote + "\"</span><br><small>-- " + p.name + "</small>";
        document.getElementById("p-funfact").textContent = p.fun_fact;
        document.getElementById("p-bio").textContent = p.bio;
        document.getElementById("p-share-x").onclick = () => shareX(p.share_text);
        document.getElementById("p-share-fb").onclick = () => shareFB("🎯 Player of the Day: " + p.name + " — " + p.nickname + ". Check out their full profile on Darts Daily!");
        document.getElementById("p-share-wa").onclick = () => shareWA(p.share_text);
        document.getElementById("p-share-reddit").onclick = () => shareReddit(p.share_text);
        document.getElementById("p-share-telegram").onclick = () => shareTelegram(p.share_text);
        document.getElementById("p-share-copy").onclick = function() { copyLink(this); };
        document.getElementById("player-loading").style.display = "none";
        document.getElementById("player-content").style.display = "block";
    } catch (err) {
        document.getElementById("player-loading").textContent = "Error loading player data.";
        console.error(err);
    }
}
loadPlayerOfDay();
// ════════════════════════════════════════════════════════════════
// TRIVIA OF THE DAY
// ════════════════════════════════════════════════════════════════
let triviaAnswered = false;
async function loadTriviaOfDay() {
    try {
        const res = await fetch("trivia.json");
        const trivia = await res.json();
        const t = trivia[dayOfYear % trivia.length];
        const letters = ["A", "B", "C", "D"];
        document.getElementById("t-question").textContent = t.question;
        document.getElementById("t-options").innerHTML = t.options.map((option, index) =>
            "<button class=\"trivia-btn\" onclick=\"checkTriviaAnswer(this, " + index + ", " + t.correct + ")\">" + letters[index] + ") " + option + "</button>"
        ).join("");
        document.getElementById("t-explanation").textContent = t.explanation;
        document.getElementById("t-share-x").onclick = () => shareX(t.share_text);
        document.getElementById("t-share-fb").onclick = () => shareFB("🧠 Trivia of the Day: " + t.question + " — Can you get it right? Test your darts knowledge on Darts Daily!");
        document.getElementById("t-share-wa").onclick = () => shareWA(t.share_text);
        document.getElementById("t-share-reddit").onclick = () => shareReddit(t.share_text);
        document.getElementById("t-share-telegram").onclick = () => shareTelegram(t.share_text);
        document.getElementById("t-share-copy").onclick = function() { copyLink(this); };
        document.getElementById("trivia-loading").style.display = "none";
        document.getElementById("trivia-content").style.display = "block";
    } catch (err) {
        document.getElementById("trivia-loading").textContent = "Error loading trivia.";
        console.error(err);
    }
}
function checkTriviaAnswer(btn, selected, correct) {
    if (triviaAnswered) return;
    triviaAnswered = true;
    document.querySelectorAll(".trivia-btn").forEach(b => b.disabled = true);
    if (selected === correct) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        document.querySelectorAll(".trivia-btn")[correct].classList.add("correct");
    }
    document.getElementById("triviaResult").style.display = "block";
    const el = document.getElementById("triviaPlayers");
    el.textContent = (parseInt(el.textContent.replace(",", "")) + 1).toLocaleString();
}
loadTriviaOfDay();
// ════════════════════════════════════════════════════════════════
// STAT OF THE DAY
// ════════════════════════════════════════════════════════════════
async function loadStatOfDay() {
    try {
        const res = await fetch("stats.json");
        const stats = await res.json();
        const s = stats[dayOfYear % stats.length];
        document.getElementById("s-number").textContent = s.number;
        document.getElementById("s-stat").innerHTML = s.stat;
        document.getElementById("s-share-x").onclick = () => shareX(s.share_text);
        document.getElementById("s-share-fb").onclick = () => shareFB("📊 Stat of the Day: " + s.number + " — " + s.share_text + " on Darts Daily!");
        document.getElementById("s-share-wa").onclick = () => shareWA(s.share_text);
        document.getElementById("s-share-reddit").onclick = () => shareReddit(s.share_text);
        document.getElementById("s-share-telegram").onclick = () => shareTelegram(s.share_text);
        document.getElementById("s-share-copy").onclick = function() { copyLink(this); };
        document.getElementById("stat-loading").style.display = "none";
        document.getElementById("stat-content").style.display = "block";
    } catch (err) {
        document.getElementById("stat-loading").textContent = "Error loading stat.";
        console.error(err);
    }
}
loadStatOfDay();
// ════════════════════════════════════════════════════════════════
// HISTORY OF THE DAY
// ════════════════════════════════════════════════════════════════
async function loadHistoryOfDay() {
    try {
        const res = await fetch("history.json");
        const history = await res.json();
        const h = history[dayOfYear % history.length];
        document.getElementById("h-year").textContent = h.year;
        document.getElementById("h-story").innerHTML = h.story;
        document.getElementById("h-share-x").onclick = () => shareX(h.share_text);
        document.getElementById("h-share-fb").onclick = () => shareFB("📅 This Day in Darts History (" + h.year + "): " + h.share_text);
        document.getElementById("h-share-wa").onclick = () => shareWA(h.share_text);
        document.getElementById("h-share-reddit").onclick = () => shareReddit(h.share_text);
        document.getElementById("h-share-telegram").onclick = () => shareTelegram(h.share_text);
        document.getElementById("h-share-copy").onclick = function() { copyLink(this); };
        document.getElementById("history-loading").style.display = "none";
        document.getElementById("history-content").style.display = "block";
    } catch (err) {
        document.getElementById("history-loading").textContent = "Error loading history.";
        console.error(err);
    }
}
loadHistoryOfDay();
// ════════════════════════════════════════════════════════════════
// LATEST NEWS
// ════════════════════════════════════════════════════════════════
async function loadLatestNews() {
    try {
        const sources = [
            { name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/darts/rss.xml', icon: '🎯' },
            { name: 'The Guardian', url: 'https://www.theguardian.com/sport/darts/rss', icon: '🌏' },
            { name: 'PDC Official', url: 'https://www.pdc.tv/rss.xml', icon: '📢' }
        ];
        let allNews = [];
        for (let source of sources) {
            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
                const data = await response.json();
                if (data.items) {
                    data.items.forEach(item => {
                        allNews.push({
                            title: item.title,
                            link: item.link,
                            source: source.name,
                            date: new Date(item.pubDate),
                            dateStr: new Date(item.pubDate).toLocaleDateString('en-GB', {day: 'numeric', month: '2-digit', year: 'numeric'}),
                            icon: source.icon
                        });
                    });
                }
            } catch (e) {
                console.warn(`Error fetching from ${source.name}`);
            }
        }
        const latest = allNews.sort((a, b) => b.date - a.date).slice(0, 6);
        document.getElementById("news-list").innerHTML = latest.map((item, index) =>
            `<div class="news-item" style="${index === 0 ? 'padding-top:0;' : ''}">
                <div class="news-icon">${item.icon}</div>
                <div>
                    <div class="news-title"><a href="${item.link}" target="_blank" style="color:var(--text);text-decoration:none;">${item.title}</a></div>
                    <div class="news-meta"><span class="news-source">${item.source}</span> &nbsp;·&nbsp; ${item.dateStr}</div>
                </div>
            </div>`
        ).join("");
        document.getElementById("news-loading").style.display = "none";
        document.getElementById("news-content").style.display = "block";
    } catch (err) {
        document.getElementById("news-loading").textContent = "Error loading news.";
        console.error(err);
    }
}
loadLatestNews();
// ════════════════════════════════════════════════════════════════
// UPCOMING EVENTS
// ════════════════════════════════════════════════════════════════
let eventsData = [];
let currentEventPage = 1;
const eventsPerPage = 5;
async function loadUpcomingEvents() {
    const eventsContent = document.getElementById("events-content");
    const eventsLoading = document.getElementById("events-loading");
    try {
        const res = await fetch("events.json");
        const events = await res.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventsData = events
            .filter(e => {
                const startDate = new Date(e.date_iso);
                startDate.setHours(0, 0, 0, 0);
                if (e.end_date_iso) {
                    const endDate = new Date(e.end_date_iso);
                    endDate.setHours(0, 0, 0, 0);
                    return endDate >= today;
                }
                return startDate >= today;
            })
            .sort((a, b) => new Date(a.date_iso) - new Date(b.date_iso));
        if (eventsData.length === 0) {
            eventsLoading.textContent = 'No upcoming events found.';
            return;
        }
        displayEventsPage(1);
        eventsLoading.style.display = 'none';
        eventsContent.style.display = 'block';
    } catch (err) {
        eventsLoading.textContent = 'Error loading events.';
        console.error(err);
    }
}
function displayEventsPage(pageNumber) {
    currentEventPage = pageNumber;
    const startIndex = (pageNumber - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const pageEvents = eventsData.slice(startIndex, endIndex);
    const eventsList = document.getElementById('events-list');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventsList.innerHTML = pageEvents.map((event, index) => {
        const startDate = new Date(event.date_iso);
        startDate.setHours(0, 0, 0, 0);
        const endDate = event.end_date_iso ? new Date(event.end_date_iso) : null;
        if (endDate) endDate.setHours(0, 0, 0, 0);
        const isOngoing = startDate <= today && (!endDate || endDate >= today);
        return `
            <div class="event-item" style="${index === 0 ? 'padding-top:0;' : ''}">
                <div class="event-date-box">
                    <div class="event-date-day">${startDate.getDate()}</div>
                    <div class="event-date-month">${startDate.toLocaleString('en-GB', { month: 'short' }).toUpperCase()}</div>
                </div>
                <div class="event-details">
                    <div class="event-name">
                        ${event.name}
                        ${isOngoing ? '<span class="event-ongoing-badge">TODAY</span>' : ''}
                    </div>
                    <div class="event-meta">
                        <span class="event-location">
                            <img src="https://flagcdn.com/20x15/${event.icon.toLowerCase()}.png" alt="${event.icon}" class="flag-icon">
                            ${event.location}
                        </span>
                        &nbsp;·&nbsp;
                        <span class="event-date">📅 ${event.date_display}</span>
                    </div>
                    <div class="event-bottom-row">
                        <span class="event-badge">${event.tour}</span>
                        ${event.ticket_url ? `
                            <a href="${event.ticket_url}" target="_blank" rel="noopener noreferrer" class="ticket-btn">
                                🎟️ Buy Tickets
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    const totalPages = Math.ceil(eventsData.length / eventsPerPage);
    document.getElementById("events-page-info").textContent = `Page ${pageNumber} of ${totalPages}`;
    document.getElementById("events-prev").disabled = pageNumber === 1;
    document.getElementById("events-next").disabled = pageNumber === totalPages;
}
document.getElementById("events-prev").addEventListener("click", () => {
    if (currentEventPage > 1) {
        displayEventsPage(currentEventPage - 1);
    }
});
document.getElementById("events-next").addEventListener("click", () => {
    const totalPages = Math.ceil(eventsData.length / eventsPerPage);
    if (currentEventPage < totalPages) {
        displayEventsPage(currentEventPage + 1);
    }
});
loadUpcomingEvents();
// ════════════════════════════════════════════════════════════════
// PRODUCT CAROUSEL
// ════════════════════════════════════════════════════════════════
let currentImageIndex = 0;
let productImages = [];
let touchStartX = 0;
let touchEndX = 0;
async function loadProductOfDay() {
    try {
        const res = await fetch("products.json");
        const products = await res.json();
        const p = products[dayOfYear % products.length];
        document.getElementById("prod-badge").textContent = p.badge;
        document.getElementById("prod-name").textContent = p.name;
        document.getElementById("prod-desc").textContent = p.desc;
        const ratingContainer = document.getElementById("prod-rating");
        if (p.rating && p.reviews) {
            const starPercentage = (p.rating / 5) * 100;
            ratingContainer.innerHTML = `
                <span class="rating-number">${p.rating}</span>
                <div class="stars-outer">
                    <div class="stars-inner" style="width: ${starPercentage}%"></div>
                </div>
                <span class="review-count">(${p.reviews} reviews)</span>
            `;
            ratingContainer.style.display = "flex";
        } else {
            ratingContainer.style.display = "none";
        }
        let buttons = "";
        if (p.darts_corner_url) {
            buttons += "<a href=\"" + p.darts_corner_url + "\" class=\"btn btn-main\" target=\"_blank\" rel=\"noopener\">Darts Corner</a>";
        }
        if (p.amazon_url) {
            buttons += "<a href=\"" + p.amazon_url + "\" class=\"btn btn-outline\" target=\"_blank\" rel=\"noopener\">View Today's Deal</a>";
        }
        document.getElementById("prod-buttons").innerHTML = buttons;
        productImages = p.images;
        currentImageIndex = 0;
        initCarousel();
        document.getElementById("prod-share-x").onclick = () => shareX("Check out today's deal: " + p.name + " on Darts Daily!");
        document.getElementById("prod-share-fb").onclick = () => shareFB("🛍️ Product of the Day: " + p.name + " — Check out today's top darts deal on Darts Daily!");
        document.getElementById("prod-share-wa").onclick = () => shareWA("Check out today's deal: " + p.name + " on Darts Daily!");
        document.getElementById("prod-share-reddit").onclick = () => shareReddit("Today's Darts Deal: " + p.name);
        document.getElementById("prod-share-telegram").onclick = () => shareTelegram("Check out today's deal: " + p.name);
        document.getElementById("prod-share-copy").onclick = function() { copyLink(this); };
        document.getElementById("product-loading").style.display = "none";
        document.getElementById("product-content").style.display = "block";
    } catch (err) {
        document.getElementById("product-loading").textContent = "Error loading product.";
        console.error(err);
    }
}
function initCarousel() {
    const track = document.getElementById("carousel-track");
    const dotsContainer = document.getElementById("carousel-dots");
    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    productImages.forEach((imgSrc, index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Product image " + (index + 1);
        track.appendChild(img);
        const dot = document.createElement("span");
        dot.className = "carousel-dot" + (index === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    document.getElementById("carousel-prev").addEventListener("click", prevSlide);
    document.getElementById("carousel-next").addEventListener("click", nextSlide);
    const container = document.getElementById("carousel-container");
    container.addEventListener("touchstart", handleTouchStart, false);
    container.addEventListener("touchend", handleTouchEnd, false);
    container.addEventListener("mousedown", handleTouchStart, false);
    container.addEventListener("mouseup", handleTouchEnd, false);
}
function goToSlide(index) {
    currentImageIndex = index;
    updateCarousel();
}
function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updateCarousel();
}
function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    updateCarousel();
}
function updateCarousel() {
    const track = document.getElementById("carousel-track");
    const dots = document.querySelectorAll(".carousel-dot");
    track.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentImageIndex);
    });
}
function handleTouchStart(e) {
    touchStartX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}
function handleTouchEnd(e) {
    touchEndX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
    handleSwipe();
}
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}
loadProductOfDay();
