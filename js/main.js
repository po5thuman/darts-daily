// ════════════════════════════════════════════════════════════════
// MAILERLITE FETCH
// ════════════════════════════════════════════════════════════════
fetch("https://assets.mailerlite.com/jsonp/2173793/forms/181450237687105130/takel");

// ════════════════════════════════════════════════════════════════
// DATE & TIME
// ════════════════════════════════════════════════════════════════
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const now = new Date();

document.getElementById("currentDate").textContent = 
    days[now.getDay()] + " " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

// ════════════════════════════════════════════════════════════════
// COUNTDOWN TIMER
// ════════════════════════════════════════════════════════════════
function updateCountdown() {
    const n = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - n;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("countdown").textContent = 
        String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ════════════════════════════════════════════════════════════════
// STREAK COUNTER
// ════════════════════════════════════════════════════════════════
function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("dartsDailyLastVisit");
    let streak = parseInt(localStorage.getItem("dartsDailyStreak") || "0");
    
    if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        streak = (lastVisit === yesterday.toDateString()) ? streak + 1 : 1;
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

function shareFB() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + pageURL, "_blank", "width=600,height=460");
}

function shareWA(text) {
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(text + " " + window.location.href), "_blank");
}

// ════════════════════════════════════════════════════════════════
// ADDITIONAL SHARE FUNCTIONS
// ════════════════════════════════════════════════════════════════
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
// MAILERLITE SUCCESS CALLBACK
// ════════════════════════════════════════════════════════════════
function ml_webform_success_38186798() {
    var $ = ml_jQuery || jQuery;
    $('.ml-subscribe-form-38186798 .row-success').show();
    $('.ml-subscribe-form-38186798 .row-form').hide();
}

// ════════════════════════════════════════════════════════════════
// DAY OF YEAR CALCULATION
// ════════════════════════════════════════════════════════════════
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);

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
        
        // All 6 share buttons
        document.getElementById("s-share-x").onclick = () => shareX(s.share_text);
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
        const res = await fetch("news.json");
        const news = await res.json();
        const latest = news.slice(0, 6);
        
        document.getElementById("news-list").innerHTML = latest.map((item, index) => 
            "<div class=\"news-item\" style=\"" + (index === 0 ? "padding-top:0;" : "") + "\">" +
                "<div class=\"news-icon\">" + item.icon + "</div>" +
                "<div>" +
                    "<div class=\"news-title\"><a href=\"" + item.url + "\" target=\"_blank\" style=\"color:var(--text);text-decoration:none;\">" + item.title + "</a></div>" +
                    "<div class=\"news-meta\"><span class=\"news-source\">" + item.source + "</span> &nbsp;·&nbsp; " + item.time + "</div>" +
                "</div>" +
            "</div>"
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
async function loadUpcomingEvents() {
    try {
        const res = await fetch('events.json');
        const events = await res.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcoming = events
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
            .sort((a, b) => new Date(a.date_iso) - new Date(b.date_iso))
            .slice(0, 5);
        
        if (upcoming.length === 0) {
            document.getElementById('events-loading').textContent = 'No upcoming events found.';
            return;
        }
        
        document.getElementById('events-list').innerHTML = upcoming.map((event, index) => {
            const startDate = new Date(event.date_iso);
            startDate.setHours(0, 0, 0, 0);
            const endDate = event.end_date_iso ? new Date(event.end_date_iso) : null;
            if (endDate) endDate.setHours(0, 0, 0, 0);
            
            const isOngoing = startDate <=today && (!endDate || endDate >= today);
            
            return `
                <div class="event-item" style="${index === 0 ? 'padding-top:0;' : ''}">
                    <div class="event-date-box">
                        <div class="event-date-day">${startDate.getDate()}</div>
                        <div class="event-date-month">${startDate.toLocaleString('en-GB', { month: 'short' }).toUpperCase()}</div>
                    </div>
                    <div class="event-details">
                        <div class="event-name">
                            ${event.name}
                            ${isOngoing ? '<span class="event-ongoing-badge">ON-GOING</span>' : ''}
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
        
        document.getElementById('events-loading').style.display = 'none';
        document.getElementById('events-content').style.display = 'block';
    } catch (err) {
        document.getElementById('events-loading').textContent = 'Error loading events.';
        console.error(err);
    }
}

loadUpcomingEvents();

// ════════════════════════════════════════════════════════════════
// MODAL FUNCTIONS
// ════════════════════════════════════════════════════════════════
const modalContent = {
    about: `
        <span class="modal-emoji">🎯</span>
        <h2>About Darts Daily</h2>
        <p>Darts Daily is your daily hub for everything professional darts. Built by a darts fan, for darts fans.</p>
        <p>We cover the full PDC calendar — from the Premier League and European Tour to the World Championship — bringing you the latest news, tournament dates, player profiles, daily stats and trivia all in one place.</p>
        <p>Whether you're looking for upcoming events near you, want to brush up on your darts knowledge or simply stay up to date with the latest from the oche — Darts Daily has you covered, every day.</p>
    `,
    contact: `
        <span class="modal-emoji">✉️</span>
        <h2>Contact</h2>
        <p>We'd love to hear from you! Whether you have a suggestion, spotted something wrong or just want to talk darts — get in touch.</p>
        <h3>Email</h3>
        <p><a href="mailto:dartsdaily@outlook.com">dartsdaily@outlook.com</a></p>
        <h3>Response Time</h3>
        <p>We aim to respond to all messages within 48 hours.</p>
        <h3>News Tips</h3>
        <p>Got a darts story or tip you think we should cover? Send it over to <a href="mailto:dartsdaily@outlook.com">dartsdaily@outlook.com</a> and we'll take a look.</p>
    `,
    privacy: `
        <span class="modal-emoji">🔒</span>
        <h2>Privacy Policy</h2>
        <p style="color:var(--muted);font-size:0.8rem;">Last updated: March 2026</p>
        <p>At Darts Daily (dartsdaily.net) we take your privacy seriously. This policy explains what data we collect and how we use it.</p>
        <h3>1. Information We Collect</h3>
        <p>Darts Daily uses Google Analytics to collect anonymous data about how visitors use our site. This includes pages visited, time spent on site and general location (country level). No personally identifiable information is collected.</p>
        <h3>2. Cookies</h3>
        <p>We use cookies solely for Google Analytics purposes. These cookies help us understand how our audience uses the site so we can improve the experience. You can disable cookies at any time through your browser settings.</p>
        <h3>3. Third Party Links</h3>
        <p>Darts Daily contains links to third party websites including Amazon and ticket providers. We are not responsible for the privacy practices of these external sites.</p>
        <h3>4. Affiliate Links</h3>
        <p>Some links on this site are affiliate links. This means we may earn a small commission if you make a purchase through them, at no extra cost to you. See our Affiliate Disclosure for more details.</p>
        <h3>5. Contact</h3>
        <p>If you have any questions about this privacy policy please contact us at <a href="mailto:dartsdaily@outlook.com">dartsdaily@outlook.com</a></p>
    `,
    affiliate: `
        <span class="modal-emoji">💰</span>
        <h2>Affiliate Disclosure</h2>
        <p>Darts Daily participates in affiliate marketing programmes including the Amazon Associates Programme.</p>
        <p>This means that some links on this site are affiliate links. If you click one of these links and make a purchase, we may earn a small commission — at absolutely no extra cost to you.</p>
        <p>We only recommend products and services that we believe are relevant and useful to darts fans. Affiliate commissions help keep Darts Daily free and allow us to continue providing daily darts content.</p>
        <p>All affiliate links on this site are clearly marked in line with Amazon Associates and ASA guidelines.</p>
        <p>Thank you for supporting Darts Daily. 🎯</p>
    `
};

function openModal(type) {
    document.getElementById("modal-content").innerHTML = modalContent[type];
    document.getElementById("modal-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("modal-overlay").classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
});

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

        // Product share buttons
        document.getElementById("prod-share-x").onclick = () => shareX("Check out today's deal: " + p.name + " on Darts Daily!");
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
