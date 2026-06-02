document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. 滾動滑入動畫 (Intersection Observer)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  // 設定觀察器規則：元素出現 15% 在螢幕畫面中時觸發
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 當元素進入畫面，加上顯示的 class
        entry.target.classList.add('is-visible');
        // 觸發過一次後就解除觀察，避免每次滾動都重複播放動畫
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // 將所有帶有 fade-in 的元素交給觀察器
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ==========================================
  // 2. 動態生成「回到頂部」按鈕
  // ==========================================
  const backToTopBtn = document.createElement('div');
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.innerHTML = '↑'; // 你也可以用 ⭡ 或 SVG Icon 代替
  document.body.appendChild(backToTopBtn);

  // 監聽網頁滾動事件
  window.addEventListener('scroll', () => {
    // 往下滾動超過 300px 後，顯示按鈕
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      // 否則隱藏按鈕
      backToTopBtn.classList.remove('show');
    }
  });

  // 點擊按鈕，平滑滾動回最上方
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' /* 絲滑的滾動效果 */
    });
  });
});