// 監聽所有帶 fade-in 的元素
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // 動畫一次就好
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
