function carouselNav(id, direction) {
    const carousel = document.getElementById(id);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let current = [...slides].findIndex(s => s.classList.contains('active'));
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current += direction;
    if (current < 0) current = slides.length - 1;
    if (current >= slides.length) current = 0;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function carouselGo(id, index) {
    const carousel = document.getElementById(id);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        let startX = 0;
        let endX = 0;
        carousel.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        carousel.addEventListener('touchend', e => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 40) {
                carouselNav(carousel.id, diff > 0 ? 1 : -1);
            }
        }, { passive: true });
    });
});
